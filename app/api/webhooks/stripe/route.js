// app/api/webhooks/stripe/route.js
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Purchase from '@/models/Purchase';

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    await connectDB();

    const user = await User.findById(session.metadata.userId);

    if (!user) {
      console.error('User not found for session:', session.id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create purchase record
    const expiresAt =
      session.metadata.packageType === 'monthly'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : null;

    await Purchase.create({
      userId: user._id,
      packageType: session.metadata.packageType,
      sessionsRemaining: parseInt(session.metadata.sessions),
      stripePaymentId: session.payment_intent,
      amount: session.amount_total / 100,
      status: 'active',
      expiresAt,
    });

    console.log('Purchase created for user:', user.email);
  }

  return NextResponse.json({ received: true });
}
