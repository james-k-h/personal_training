'use client';

import { useState, useEffect } from 'react';

const benefits = [
  {
    id: 1,
    title: 'Personalized Training Programs',
    description:
      'Every body is different. Our expert trainers design custom workout plans tailored to your unique fitness level, goals, and any physical limitations. Whether you want to lose weight, build muscle, or improve endurance, we create a roadmap just for you.',
    icon: '🎯',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Expert Nutrition Guidance',
    description:
      'Fitness is 80% nutrition. Get personalized meal plans, macronutrient tracking, and expert advice on supplements. Our nutritionists work hand-in-hand with your trainer to ensure your diet supports your fitness goals and accelerates results.',
    icon: '🥗',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 3,
    title: 'Flexible Scheduling',
    description:
      'Life is busy, and we get it. Book sessions that fit your schedule with our easy-to-use platform. Early morning, lunch break, or evening sessions—we accommodate your lifestyle. Cancel or reschedule up to 24 hours in advance with no penalties.',
    icon: '📅',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    title: 'Progress Tracking & Analytics',
    description:
      'Watch your transformation unfold with detailed progress tracking. Monitor strength gains, body composition changes, and performance metrics. Our advanced analytics help you and your trainer make data-driven decisions to optimize your results.',
    icon: '📊',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 5,
    title: 'Accountability & Motivation',
    description:
      'Stay committed with regular check-ins, milestone celebrations, and a supportive community. Your trainer becomes your accountability partner, keeping you motivated through challenges and celebrating every victory, no matter how small.',
    icon: '🏆',
    color: 'from-yellow-500 to-yellow-600',
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
    <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden">
      {/* Background gradient effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentBenefit.color} opacity-5 transition-all duration-500`}
      ></div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentBenefit.color} flex items-center justify-center text-4xl shadow-lg transform transition-all duration-500`}
          >
            {currentBenefit.icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center min-h-[280px] md:min-h-[240px] flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 transition-all duration-500">
            {currentBenefit.title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto transition-all duration-500">
            {currentBenefit.description}
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goToPrevious}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
            aria-label="Previous benefit"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors"
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
                    ? 'w-8 h-3 bg-blue-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to benefit ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
            aria-label="Next benefit"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors"
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
