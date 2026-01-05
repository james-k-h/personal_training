import { NextResponse } from 'next/server';
import { stripe, PRICING_PLANS } from '@/lib/stripe';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    const user = await requireAuth();
    const { packageType } = await request.json();

    if (!PRICING_PLANS[packageType]) {
      return NextResponse.json(
        { error: 'Invalid package type' },
        { status: 400 }
      );
    }

    await connectDB();
    const dbUser = await User.findOne({ email: user.email });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create or retrieve Stripe customer
    let customerId = dbUser.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: dbUser._id.toString(),
        },
      });
      customerId = customer.id;
      dbUser.stripeCustomerId = customerId;
      await dbUser.save();
    }

    const plan = PRICING_PLANS[packageType];

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: plan.description,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId: dbUser._id.toString(),
        packageType,
        sessions: plan.sessions.toString(),
        price: plan.price.toString(),
        serviceType: plan.serviceType,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
