// app/pricing/page.js
import { getCurrentUser } from '@/lib/auth';
import PricingCard from '@/app/components/PricingCard';
import { PRICING_PLANS } from '@/lib/stripe';

export default async function PricingPage() {
  const user = await getCurrentUser();

  return (
    <main>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">
              Choose Your Package
            </h1>
            <p className="mt-4 text-xl text-gray-600">
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
              <p className="text-gray-600">
                Sign in with Google to purchase a package
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
