import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import BookedSession from '@/models/BookedSession';
import Purchase from '@/models/Purchase';
import Staff from '@/models/Staff';
import { canStaffBeAssignedToPackage } from '@/lib/packageStaffMapping';

// PATCH - Update session
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = params;
    const body = await request.json();
    const { staffId, scheduledDate, scheduledTime, notes } = body;

    // Find the existing session with purchase info
    const existingSession = await BookedSession.findOne({
      _id: id,
      userId: session.user.id,
    }).populate('purchaseId');

    if (!existingSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Verify staff if provided
    if (staffId) {
      const staff = await Staff.findById(staffId);
      if (!staff || !staff.isActive) {
        return NextResponse.json(
          { error: 'Staff member not found or inactive' },
          { status: 404 },
        );
      }

      // Validate staff role matches package type
      const packageType = existingSession.purchaseId.packageType;
      if (!canStaffBeAssignedToPackage(staff.role, packageType)) {
        return NextResponse.json(
          {
            error: `${staff.name} (${staff.role}) cannot be assigned to this package type. Please select an appropriate specialist.`,
            details: {
              staffRole: staff.role,
              packageType: packageType,
            },
          },
          { status: 400 },
        );
      }

      // Check for scheduling conflicts
      if (
        staffId !== existingSession.staffId.toString() ||
        scheduledTime !== existingSession.scheduledTime ||
        scheduledDate !==
          existingSession.scheduledDate.toISOString().split('T')[0]
      ) {
        const conflictingSession = await BookedSession.findOne({
          _id: { $ne: id },
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
            { status: 409 },
          );
        }
      }
    }

    // Update the session
    const updatedSession = await BookedSession.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      {
        ...(staffId && { staffId }),
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        notes,
      },
      { new: true },
    )
      .populate('staffId', 'name role specialty image')
      .populate('purchaseId');

    if (!updatedSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({ session: updatedSession }, { status: 200 });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 },
    );
  }
}

// DELETE - Cancel session
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = params;

    // Find the session and populate purchase info
    const bookedSession = await BookedSession.findOne({
      _id: id,
      userId: session.user.id,
    }).populate('purchaseId');

    if (!bookedSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Check if session is already cancelled
    if (bookedSession.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Session is already cancelled' },
        { status: 400 },
      );
    }

    // Calculate hours until session
    const sessionDateTime = new Date(bookedSession.scheduledDate);
    const now = new Date();
    const hoursUntilSession = (sessionDateTime - now) / (1000 * 60 * 60);

    // Determine if refund should be given (more than 24 hours notice)
    const shouldRefund = hoursUntilSession >= 24;

    // Update session status to cancelled
    bookedSession.status = 'cancelled';
    await bookedSession.save();

    // Refund the session if cancelling with 24+ hours notice
    if (shouldRefund && bookedSession.purchaseId) {
      const purchase = await Purchase.findById(bookedSession.purchaseId._id);

      if (purchase) {
        purchase.sessionsRemaining += 1;
        await purchase.save();

        return NextResponse.json(
          {
            message: 'Session cancelled successfully',
            refunded: true,
            sessionsRemaining: purchase.sessionsRemaining,
          },
          { status: 200 },
        );
      }
    }

    // No refund (within 24 hours)
    return NextResponse.json(
      {
        message: 'Session cancelled (no refund - within 24 hours)',
        refunded: false,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel session' },
      { status: 500 },
    );
  }
}
