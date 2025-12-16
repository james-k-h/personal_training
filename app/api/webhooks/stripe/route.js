import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Purchase from '@/models/Purchase';

// IMPORTANT: This disables body parsing so we can verify the webhook signature
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  console.log('Webhook received');

  if (!signature) {
    console.error('No signature provided');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('Event verified:', event.type);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log('Processing checkout session:', session.id);
    console.log('Metadata:', session.metadata);

    try {
      await connectDB();

      // Find the user
      const user = await User.findById(session.metadata.userId);

      if (!user) {
        console.error(
          'User not found for session:',
          session.id,
          'userId:',
          session.metadata.userId
        );
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      console.log('Found user:', user.email);

      // Calculate expiration date for monthly packages
      const expiresAt =
        session.metadata.packageType === 'monthly'
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : null;

      // Create purchase record
      const purchase = await Purchase.create({
        userId: user._id,
        packageType: session.metadata.packageType,
        sessionsRemaining: parseInt(session.metadata.sessions),
        stripePaymentId: session.payment_intent,
        amount: parseInt(session.metadata.price),
        status: 'active',
        expiresAt,
      });

      console.log('Purchase created successfully:', purchase._id);
      console.log('Package type:', purchase.packageType);
      console.log('Sessions remaining:', purchase.sessionsRemaining);

      return NextResponse.json({
        received: true,
        purchaseId: purchase._id.toString(),
        message: 'Purchase created successfully',
      });
    } catch (error) {
      console.error('Error creating purchase:', error);
      return NextResponse.json(
        {
          error: 'Error creating purchase',
          details: error.message,
        },
        { status: 500 }
      );
    }
  }

  // Handle payment_intent.succeeded event as backup
  if (event.type === 'payment_intent.succeeded') {
    console.log('Payment intent succeeded:', event.data.object.id);
  }

  return NextResponse.json({ received: true });
}
