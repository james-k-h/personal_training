export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Case Study Hero */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-colors">
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1 bg-black dark:bg-yellow-400 text-white dark:text-black rounded-full text-sm font-semibold mb-4">
                Success Story
              </div>
              <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
                Meet Marcus Johnson
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Age 42 | Software Engineer | Lost 60 lbs in 8 months
              </p>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  "As a busy software engineer working 60+ hour weeks, I thought
                  getting fit was impossible. I'd tried gyms, YouTube videos,
                  and fad diets—nothing stuck. Then I discovered JKH Fitness
                  Training."
                </p>
                <p className="font-semibold text-black dark:text-white">
                  The transformation wasn't just physical:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-black dark:text-yellow-400 mr-2">
                      ✓
                    </span>
                    <span>
                      Lost 60 pounds and dropped from 38% to 18% body fat
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black dark:text-yellow-400 mr-2">
                      ✓
                    </span>
                    <span>
                      Blood pressure normalized, no longer need medication
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black dark:text-yellow-400 mr-2">
                      ✓
                    </span>
                    <span>
                      Energy levels skyrocketed—now workout at 5 AM before work
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black dark:text-yellow-400 mr-2">
                      ✓
                    </span>
                    <span>Improved focus and productivity at work</span>
                  </li>
                </ul>
                <p className="italic border-l-4 border-black dark:border-yellow-400 pl-4 py-2">
                  "My trainer didn't just teach me exercises—they taught me a
                  lifestyle. The personalized approach made all the difference.
                  This is the best investment I've ever made in myself."
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
                alt="Marcus Johnson - JKH Fitness Success Story"
                className="rounded-xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-12">
            Why JKH Fitness Works
          </h2>

          {/* Benefit 1 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-yellow-400 flex items-center justify-center text-3xl transition-colors">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Personalized Training Programs
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 space-y-4 transition-colors">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Generic workout plans fail because they don't account for your
                unique body, goals, and lifestyle. At JKH Fitness, we start with
                a comprehensive assessment that evaluates your current fitness
                level, movement patterns, injuries, and personal objectives.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your trainer creates a custom roadmap that evolves with you.
                Whether you're training for a marathon, recovering from an
                injury, building muscle, or losing weight, your program adapts
                week by week based on your progress and feedback.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 transition-colors">
                  <h4 className="font-semibold text-black dark:text-yellow-400 mb-2">
                    Initial Assessment
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Comprehensive fitness evaluation and goal setting
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 transition-colors">
                  <h4 className="font-semibold text-black dark:text-yellow-400 mb-2">
                    Progressive Overload
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Scientifically structured progression for optimal results
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 transition-colors">
                  <h4 className="font-semibold text-black dark:text-yellow-400 mb-2">
                    Continuous Adaptation
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Programs evolve based on your progress and feedback
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-yellow-400 flex items-center justify-center text-3xl transition-colors">
                🥗
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Expert Nutrition Guidance
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 space-y-4 transition-colors">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You can't out-train a bad diet. Our certified nutritionists work
                alongside your trainer to create meal plans that fuel your
                workouts and accelerate your results. No restrictive fad
                diets—just sustainable, science-backed nutrition.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We teach you how to make nutrition work for your lifestyle.
                Whether you're cooking at home, eating out, or traveling, you'll
                have the tools to make informed choices that support your goals
                without sacrificing enjoyment.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-black dark:text-yellow-400">
                    What You Get:
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-black dark:text-yellow-400 mr-2">
                        •
                      </span>
                      Custom meal plans based on your preferences and goals
                    </li>
                    <li className="flex items-start">
                      <span className="text-black dark:text-yellow-400 mr-2">
                        •
                      </span>
                      Macronutrient tracking and guidance
                    </li>
                    <li className="flex items-start">
                      <span className="text-black dark:text-yellow-400 mr-2">
                        •
                      </span>
                      Restaurant and travel eating strategies
                    </li>
                    <li className="flex items-start">
                      <span className="text-black dark:text-yellow-400 mr-2">
                        •
                      </span>
                      Supplement recommendations when appropriate
                    </li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 transition-colors">
                  <h4 className="font-semibold text-black dark:text-yellow-400 mb-3">
                    Flexible Approaches:
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    We support various nutritional styles including
                    Mediterranean, plant-based, keto, and balanced
                    macros—whatever works best for you.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No foods are off-limits. We focus on moderation and building
                    a healthy relationship with food.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-yellow-400 flex items-center justify-center text-3xl transition-colors">
                📅
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Flexible Scheduling
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 space-y-4 transition-colors">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your schedule shouldn't be a barrier to fitness. With our
                flexible booking system, schedule sessions that work for
                you—early morning, lunch break, evening, or weekend. Life
                happens, and we understand that.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Book, reschedule, or cancel sessions up to 24 hours in advance
                through our easy-to-use platform. No phone calls, no hassle.
                Your trainer's calendar syncs in real-time, so you always see
                current availability.
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-6 mt-6 transition-colors">
                <h4 className="font-semibold text-black dark:text-yellow-400 mb-3">
                  Available Time Slots:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 dark:text-gray-300">
                  <div>
                    <p className="font-semibold">Morning</p>
                    <p className="text-sm">6:00 AM - 10:00 AM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Midday</p>
                    <p className="text-sm">11:00 AM - 2:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Evening</p>
                    <p className="text-sm">4:00 PM - 8:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Weekend</p>
                    <p className="text-sm">8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-yellow-400 flex items-center justify-center text-3xl transition-colors">
                📊
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Progress Tracking & Analytics
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 space-y-4 transition-colors">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                What gets measured gets improved. Our comprehensive tracking
                system monitors every aspect of your fitness journey—from
                strength gains and body composition to workout performance and
                recovery metrics.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Visualize your progress with detailed charts and reports. See
                exactly how much stronger you've become, how your body
                composition has changed, and which exercises are driving the
                best results. Data-driven insights help your trainer optimize
                your program for maximum effectiveness.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-black dark:border-yellow-400 transition-colors">
                  <h4 className="font-semibold text-black dark:text-white mb-2">
                    Body Metrics
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Weight & BMI</li>
                    <li>• Body fat percentage</li>
                    <li>• Muscle mass</li>
                    <li>• Measurements</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-black dark:border-yellow-400 transition-colors">
                  <h4 className="font-semibold text-black dark:text-white mb-2">
                    Performance
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Strength gains</li>
                    <li>• Endurance improvements</li>
                    <li>• Personal records</li>
                    <li>• Workout volume</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-black dark:border-yellow-400 transition-colors">
                  <h4 className="font-semibold text-black dark:text-white mb-2">
                    Wellness
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Sleep quality</li>
                    <li>• Energy levels</li>
                    <li>• Recovery status</li>
                    <li>• Nutrition adherence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefit 5 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-yellow-400 flex items-center justify-center text-3xl transition-colors">
                🏆
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Accountability & Motivation
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 space-y-4 transition-colors">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The difference between success and failure often comes down to
                accountability. Your trainer becomes your partner in this
                journey—someone who believes in you, pushes you when needed, and
                celebrates every milestone along the way.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Regular check-ins keep you on track even between sessions. Our
                supportive community creates an environment where everyone is
                working toward similar goals, sharing victories, and encouraging
                each other through challenges.
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mt-6 transition-colors">
                <h4 className="font-semibold text-black dark:text-yellow-400 mb-4">
                  How We Keep You Motivated:
                </h4>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-semibold">Regular Communication</p>
                      <p className="text-sm">
                        Weekly check-ins and daily support through our app
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-semibold">Milestone Celebrations</p>
                      <p className="text-sm">
                        Recognition for every achievement, big and small
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="font-semibold">Community Support</p>
                      <p className="text-sm">
                        Connect with members who share similar goals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="font-semibold">Progress Reviews</p>
                      <p className="text-sm">
                        Monthly assessments to show how far you've come
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black dark:bg-yellow-400 rounded-2xl p-12 text-center transition-colors">
          <h2 className="text-3xl font-bold text-white dark:text-black mb-4">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-gray-300 dark:text-gray-900 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of clients who have transformed their lives with JKH
            Fitness Training. Your journey starts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pricing"
              className="px-8 py-3 bg-white dark:bg-black text-black dark:text-yellow-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 font-semibold text-lg transition-colors shadow-lg"
            >
              View Packages
            </a>
            <a
              href="/about"
              className="px-8 py-3 bg-gray-800 dark:bg-yellow-500 text-white dark:text-black rounded-lg hover:bg-gray-700 dark:hover:bg-yellow-600 font-semibold text-lg transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
