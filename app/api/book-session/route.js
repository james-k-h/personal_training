import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import BookedSession from '@/models/BookedSession';
import Purchase from '@/models/Purchase';
import User from '@/models/User';

export async function POST(request) {
  try {
    const user = await requireAuth();
    const { purchaseId, scheduledDate, scheduledTime, notes } =
      await request.json();

    if (!purchaseId || !scheduledDate || !scheduledTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify user
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify purchase and check sessions remaining
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    if (purchase.userId.toString() !== dbUser._id.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (purchase.sessionsRemaining <= 0) {
      return NextResponse.json(
        { error: 'No sessions remaining in this package' },
        { status: 400 }
      );
    }

    // Check if package is expired (for monthly packages)
    if (purchase.expiresAt && new Date(purchase.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'This package has expired' },
        { status: 400 }
      );
    }

    // Create the booked session
    const bookedSession = await BookedSession.create({
      userId: dbUser._id,
      purchaseId: purchase._id,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      notes: notes || '',
      status: 'scheduled',
    });

    // Decrement sessions remaining
    purchase.sessionsRemaining -= 1;
    if (purchase.sessionsRemaining === 0) {
      purchase.status = 'completed';
    }
    await purchase.save();

    return NextResponse.json(
      {
        success: true,
        session: bookedSession,
        remainingSessions: purchase.sessionsRemaining,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error booking session:', error);
    return NextResponse.json(
      { error: error.message || 'Error booking session' },
      { status: 500 }
    );
  }
}
