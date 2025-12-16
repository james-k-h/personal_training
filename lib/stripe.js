import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const PRICING_PLANS = {
  single: {
    name: 'Single Session',
    price: 75,
    sessions: 1,
    description: 'One personal training session',
  },
  'package-5': {
    name: '5 Session Package',
    price: 350,
    sessions: 5,
    description: 'Save $25 with this package',
  },
  'package-10': {
    name: '10 Session Package',
    price: 650,
    sessions: 10,
    description: 'Save $100 with this package',
  },
  monthly: {
    name: 'Monthly Unlimited',
    price: 500,
    sessions: 999,
    description: 'Unlimited sessions for 30 days',
  },
};
