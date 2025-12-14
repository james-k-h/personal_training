'use client';
import { useState, useEffect } from 'react';

const benefits = [
  {
    id: 1,
    title: 'Personalized Training Programs',
    description:
      'Every body is different. Our expert trainers design custom workout plans tailored to your unique fitness level, goals, and any physical limitations. Whether you want to lose weight, build muscle, or improve endurance, we create a roadmap just for you.',
    icon: '🎯',
  },
  {
    id: 2,
    title: 'Expert Nutrition Guidance',
    description:
      'Fitness is 80% nutrition. Get personalized meal plans, macronutrient tracking, and expert advice on supplements. Our nutritionists work hand-in-hand with your trainer to ensure your diet supports your fitness goals and accelerates results.',
    icon: '🥗',
  },
  {
    id: 3,
    title: 'Flexible Scheduling',
    description:
      'Life is busy, and we get it. Book sessions that fit your schedule with our easy-to-use platform. Early morning, lunch break, or evening sessions—we accommodate your lifestyle. Cancel or reschedule up to 24 hours in advance with no penalties.',
    icon: '📅',
  },
  {
    id: 4,
    title: 'Progress Tracking & Analytics',
    description:
      'Watch your transformation unfold with detailed progress tracking. Monitor strength gains, body composition changes, and performance metrics. Our advanced analytics help you and your trainer make data-driven decisions to optimize your results.',
    icon: '📊',
  },
  {
    id: 5,
    title: 'Accountability & Motivation',
    description:
      'Stay committed with regular check-ins, milestone celebrations, and a supportive community. Your trainer becomes your accountability partner, keeping you motivated through challenges and celebrating every victory, no matter how small.',
    icon: '🏆',
  },
];

export default function BenefitCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefits.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % benefits.length);
  };

  const currentBenefit = benefits[currentIndex];

  return (
    <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden transition-colors">
      {/* Background highlight effect */}
      <div className="absolute inset-0 bg-gray-100 dark:bg-yellow-400/5 opacity-50 transition-all duration-500"></div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-yellow-400 flex items-center justify-center text-4xl shadow-lg transform transition-all duration-500">
            {currentBenefit.icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center min-h-[280px] md:min-h-[240px] flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-black dark:text-white mb-4 transition-all duration-500">
            {currentBenefit.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto transition-all duration-500">
            {currentBenefit.description}
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goToPrevious}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
            aria-label="Previous benefit"
          >
            <svg
              className="w-6 h-6 text-black dark:text-white group-hover:text-gray-800 dark:group-hover:text-yellow-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-black dark:bg-yellow-400'
                    : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to benefit ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
            aria-label="Next benefit"
          >
            <svg
              className="w-6 h-6 text-black dark:text-white group-hover:text-gray-800 dark:group-hover:text-yellow-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
