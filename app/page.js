// app/page.js
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import BenefitCarousel from '@/app/components/BenefitCarousel';

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Fitness Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized training programs designed specifically for your
            goals. Expert guidance, flexible scheduling, and proven results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-lg"
            >
              View Packages
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors text-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="#features"
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors text-lg"
              >
                Learn More
              </Link>
            )}
          </div>
        </div>

        <div
          id="features"
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Personalized Plans
            </h3>
            <p className="text-gray-600">
              Custom workout programs tailored to your fitness level, goals, and
              schedule.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Expert Coaching
            </h3>
            <p className="text-gray-600">
              Work with certified trainers who are dedicated to your success and
              progress.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Easy Management
            </h3>
            <p className="text-gray-600">
              Track sessions, manage packages, and view progress all in one
              convenient portal.
            </p>
          </div>
        </div>

        {/* Success Story Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Real Results, Real Stories
          </h2>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80"
              alt="Success story"
              className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-40"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">
                  Sarah's Transformation Journey
                </h3>
                <p className="text-white/90 text-base md:text-lg leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  "I never thought I could do it. After struggling with my
                  fitness goals for years, I joined FitPro Training and
                  everything changed. My trainer created a personalized plan
                  that worked with my busy schedule. In just 6 months, I lost 45
                  pounds, gained incredible strength, and most importantly,
                  found a love for fitness I never knew existed. The one-on-one
                  attention and constant motivation made all the difference.
                  Today, I'm not just healthier—I'm living my best life."
                </p>
                <p className="text-blue-400 font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  — Sarah M., Member since 2023
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
              alt="Personal training session"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white font-semibold text-lg p-4">
                One-on-One Training
              </p>
            </div>
          </div>

          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
              alt="Gym equipment"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white font-semibold text-lg p-4">
                State-of-the-Art Equipment
              </p>
            </div>
          </div>

          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
              alt="Group fitness"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white font-semibold text-lg p-4">
                Achieve Your Goals
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Carousel Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Why Choose FitPro Training
          </h2>
          <BenefitCarousel />
        </div>
      </div>
    </div>
  );
}
