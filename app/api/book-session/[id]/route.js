import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import BookedSession from '@/models/BookedSession';
import User from '@/models/User';

// PATCH - Update session
export async function PATCH(request, { params }) {
  try {
    const user = await requireAuth();
    const { id } = params;
    const updates = await request.json();

    await connectDB();

    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const session = await BookedSession.findById(id);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Verify ownership
    if (session.userId.toString() !== dbUser._id.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update allowed fields
    const allowedUpdates = ['scheduledDate', 'status', 'notes'];
    allowedUpdates.forEach((field) => {
      if (updates[field] !== undefined) {
        session[field] = updates[field];
      }
    });

    await session.save();

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: error.message || 'Error updating session' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel session
export async function DELETE(request, { params }) {
  try {
    const user = await requireAuth();
    const { id } = params;

    await connectDB();

    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const session = await BookedSession.findById(id);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Verify ownership
    if (session.userId.toString() !== dbUser._id.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update session status to cancelled
    session.status = 'cancelled';
    await session.save();

    // Optionally: return session back to purchase
    const Purchase = require('@/models/Purchase').default;
    const purchase = await Purchase.findById(session.purchaseId);
    if (purchase && purchase.status === 'active') {
      purchase.sessionsRemaining += 1;
      await purchase.save();
    }

    return NextResponse.json({ message: 'Session cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling session:', error);
    return NextResponse.json(
      { error: error.message || 'Error cancelling session' },
      { status: 500 }
    );
  }
}
