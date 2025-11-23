// app/api/sessions/route.js
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Session from '@/models/Session';
import User from '@/models/User';

// GET - Fetch user's sessions
export async function GET(request) {
  try {
    const user = await requireAuth();
    await connectDB();

    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'scheduled';
    const upcoming = searchParams.get('upcoming') === 'true';

    const query = {
      userId: dbUser._id,
      status,
    };

    if (upcoming) {
      query.scheduledDate = { $gte: new Date() };
    }

    const sessions = await Session.find(query)
      .sort({ scheduledDate: upcoming ? 1 : -1 })
      .populate('purchaseId')
      .lean();

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: error.message || 'Error fetching sessions' },
      { status: 500 }
    );
  }
}

// POST - Create new session (for trainers/admins)
export async function POST(request) {
  try {
    const user = await requireAuth();
    const { userId, purchaseId, scheduledDate, duration, location, notes } =
      await request.json();

    await connectDB();

    // Verify the purchase exists and has sessions remaining
    const Purchase = require('@/models/Purchase').default;
    const purchase = await Purchase.findById(purchaseId);

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

    // Create the session
    const session = await Session.create({
      userId,
      purchaseId,
      scheduledDate: new Date(scheduledDate),
      duration: duration || 60,
      location,
      notes,
      status: 'scheduled',
    });

    // Decrement sessions remaining
    purchase.sessionsRemaining -= 1;
    if (purchase.sessionsRemaining === 0) {
      purchase.status = 'completed';
    }
    await purchase.save();

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating session' },
      { status: 500 }
    );
  }
}

// app/api/sessions/[id]/route.js
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Session from '@/models/Session';
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

    const session = await Session.findById(id);
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

    const session = await Session.findById(id);
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
