import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Personal Training Packages
export const PERSONAL_TRAINING_PLANS = {
  'pt-single': {
    name: 'The Ignition',
    price: 75,
    sessions: 1,
    description: 'Single session to jumpstart your journey',
    serviceType: 'personal-training',
  },
  'pt-package-5': {
    name: 'The Momentum Builder',
    price: 350,
    sessions: 5,
    description: 'Build consistency and see real progress',
    serviceType: 'personal-training',
  },
  'pt-package-10': {
    name: 'The Transformer',
    price: 650,
    sessions: 10,
    description: 'Complete transformation package',
    serviceType: 'personal-training',
  },
  'pt-monthly': {
    name: 'The Elite Program',
    price: 750,
    sessions: 15,
    description: 'Push to be the greatest',
    serviceType: 'personal-training',
  },
};

// Massage Therapy Packages
export const MASSAGE_PLANS = {
  'massage-single': {
    name: 'The Relaxation Reset',
    price: 90,
    sessions: 1,
    description: 'Single therapeutic massage session',
    serviceType: 'massage',
  },
  'massage-package-5': {
    name: 'The Wellness Journey',
    price: 400,
    sessions: 5,
    description: 'Regular relief for ongoing wellness',
    serviceType: 'massage',
  },
};

// Injury Rehabilitation Packages
export const REHAB_PLANS = {
  'rehab-package-5': {
    name: 'The Recovery Starter',
    price: 425,
    sessions: 5,
    description: 'Targeted rehab for injury recovery',
    serviceType: 'rehab',
  },
  'rehab-package-10': {
    name: 'The Complete Recovery',
    price: 800,
    sessions: 10,
    description: 'Comprehensive rehabilitation program',
    serviceType: 'rehab',
  },
};

// Combined pricing plans
export const PRICING_PLANS = {
  ...PERSONAL_TRAINING_PLANS,
  ...MASSAGE_PLANS,
  ...REHAB_PLANS,
};

// Service categories for UI organization
export const SERVICE_CATEGORIES = [
  {
    id: 'personal-training',
    name: 'Personal Training',
    icon: '💪',
    description: 'One-on-one fitness coaching tailored to your goals',
    plans: PERSONAL_TRAINING_PLANS,
  },
  {
    id: 'massage',
    name: 'Massage Therapy',
    icon: '🧘',
    description: 'Therapeutic massage for relaxation and recovery',
    plans: MASSAGE_PLANS,
  },
  {
    id: 'rehab',
    name: 'Injury Rehabilitation',
    icon: '🏥',
    description: 'Specialized recovery programs for injury healing',
    plans: REHAB_PLANS,
  },
];
