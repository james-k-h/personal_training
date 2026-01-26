// UPDATE YOUR EXISTING /api/book-session/route.js
// Now includes validation for staff-to-package compatibility

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import BookedSession from '@/models/BookedSession';
import Purchase from '@/models/Purchase';
import Staff from '@/models/Staff';
import { canStaffBeAssignedToPackage } from '@/lib/packageStaffMapping';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { purchaseId, staffId, scheduledDate, scheduledTime, notes } = body;

    // Validate required fields
    if (!purchaseId || !staffId || !scheduledDate || !scheduledTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify purchase exists and has sessions remaining
    const purchase = await Purchase.findOne({
      _id: purchaseId,
      userId: session.user.id,
    });

    if (!purchase) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    if (purchase.sessionsRemaining <= 0) {
      return NextResponse.json(
        { error: 'No sessions remaining in this package' },
        { status: 400 }
      );
    }

    // Verify staff exists and is active
    const staff = await Staff.findById(staffId);
    if (!staff || !staff.isActive) {
      return NextResponse.json(
        { error: 'Staff member not found or inactive' },
        { status: 404 }
      );
    }

    // CRITICAL VALIDATION: Check if staff role is compatible with package type
    if (!canStaffBeAssignedToPackage(staff.role, purchase.packageType)) {
      return NextResponse.json(
        {
          error: `${staff.name} (${staff.role}) cannot be assigned to this package type. Please select an appropriate specialist.`,
          details: {
            staffRole: staff.role,
            packageType: purchase.packageType,
          },
        },
        { status: 400 }
      );
    }

    // Check for scheduling conflicts (same staff, same date/time)
    const conflictingSession = await BookedSession.findOne({
      staffId,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      status: 'scheduled',
    });

    if (conflictingSession) {
      return NextResponse.json(
        {
          error:
            'This staff member is already booked at this time. Please select a different time slot.',
        },
        { status: 409 }
      );
    }

    // Create the booked session
    const bookedSession = await BookedSession.create({
      userId: session.user.id,
      purchaseId,
      staffId,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      notes: notes || '',
    });

    // Decrement sessions remaining
    purchase.sessionsRemaining -= 1;
    await purchase.save();

    // Populate the response with staff details
    await bookedSession.populate('staffId', 'name role specialty image');

    return NextResponse.json(
      {
        message: 'Session booked successfully',
        session: bookedSession,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to book session' },
      { status: 500 }
    );
  }
}
