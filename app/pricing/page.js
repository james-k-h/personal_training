import { getCurrentUser } from '@/lib/auth';
import PricingCard from '../components/PricingCard';
import { PRICING_PLANS } from '@/lib/stripe';

export default async function PricingPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Choose Your Package
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Flexible training options to fit your goals and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(PRICING_PLANS).map(([key, plan]) => (
            <PricingCard
              key={key}
              packageType={key}
              plan={plan}
              isAuthenticated={!!user}
            />
          ))}
        </div>

        {!user && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Sign in with Google to purchase a package
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
