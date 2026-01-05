import { getCurrentUser } from '@/lib/auth';
import PricingCard from '../components/PricingCard';
import { SERVICE_CATEGORIES } from '@/lib/stripe';

export default async function PricingPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Choose Your Service
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Flexible packages to fit your wellness goals and budget
          </p>
        </div>

        {!user && (
          <div className="mb-12 text-center bg-gray-50 dark:bg-gray-800 p-6 rounded-lg transition-colors">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Sign in with Google to purchase packages and book sessions
            </p>
          </div>
        )}

        {/* Service Categories */}
        {SERVICE_CATEGORIES.map((category) => (
          <div key={category.id} className="mb-16">
            {/* Category Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-3xl font-bold text-black dark:text-white">
                  {category.name}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg ml-14">
                {category.description}
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(category.plans).map(([key, plan]) => (
                <PricingCard
                  key={key}
                  packageType={key}
                  plan={plan}
                  isAuthenticated={!!user}
                  isPopular={key === 'pt-package-10'}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Info Section */}
        <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 transition-colors">
          <h3 className="text-2xl font-bold text-black dark:text-white mb-4 text-center">
            Why Choose FitPro?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl mb-3">✅</div>
              <h4 className="font-semibold text-black dark:text-white mb-2">
                Certified Professionals
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All our trainers, therapists, and rehab specialists are fully
                certified
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📅</div>
              <h4 className="font-semibold text-black dark:text-white mb-2">
                Flexible Scheduling
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Book sessions at times that work for your busy schedule
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💯</div>
              <h4 className="font-semibold text-black dark:text-white mb-2">
                Results Guaranteed
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Personalized programs designed to help you reach your goals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
