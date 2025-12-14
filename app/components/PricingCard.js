'use client';

import { useSession, signIn } from 'next-auth/react';
import CheckoutButton from './CheckoutButton';

export default function PricingCard({ packageType, plan, isAuthenticated }) {
  const { data: session } = useSession();
  const isPopular = packageType === 'package-10';

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors ${
        isPopular ? 'ring-2 ring-black dark:ring-yellow-400' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-black dark:bg-yellow-400 text-white dark:text-black">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {plan.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {plan.description}
        </p>

        <div className="mt-6">
          <span className="text-4xl font-bold text-black dark:text-white">
            ${plan.price}
          </span>
          {packageType !== 'monthly' && (
            <span className="text-gray-600 dark:text-gray-300 ml-2">
              for {plan.sessions} sessions
            </span>
          )}
        </div>

        {packageType !== 'monthly' && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            ${(plan.price / plan.sessions).toFixed(2)} per session
          </p>
        )}

        <div className="mt-6">
          {session ? (
            <CheckoutButton packageType={packageType} />
          ) : (
            <button
              onClick={() => signIn('google')}
              className="w-full px-4 py-3 bg-black dark:bg-yellow-400 text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-yellow-500 font-medium transition-colors"
            >
              Sign In to Purchase
            </button>
          )}
        </div>

        <ul className="mt-6 space-y-3">
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-black dark:text-yellow-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              60-minute sessions
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-black dark:text-yellow-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Personalized workout plans
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-black dark:text-yellow-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Nutrition guidance
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-black dark:text-yellow-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Progress tracking
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
