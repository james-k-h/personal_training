//  About us
// Staff
import { generateMetadata as getMetadata } from '../metadata';
import StaffCard from '../components/StaffCard';

export const metadata = {
  title: 'About Us - JKH Fitness',
  description:
    'Learn about JKH Fitness - founded in 2022 by passionate fitness enthusiasts dedicated to injury prevention and holistic wellness.',
  keywords:
    'about JKH Fitness, fitness team, personal trainers, massage therapist, injury rehab specialist',
};

const staffMembers = [
  {
    id: 1,
    name: 'James Harrison',
    role: 'Lead Personal Trainer',
    specialty: 'Strength & Conditioning',
    age: 34,
    gender: 'Male',
    bio: 'Former college athlete turned certified trainer with 12 years of experience. Specializes in functional training and Olympic lifting. James believes in building sustainable fitness habits that last a lifetime.',
    image:
      'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=400&h=400&fit=crop',
    funFact: 'Deadlifted 500 lbs at age 50 and still going strong!',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Personal Trainer',
    specialty: 'HIIT & Weight Loss',
    age: 28,
    gender: 'Female',
    bio: 'Certified nutrition coach and HIIT specialist who transformed her own life through fitness. Sarah combines high-intensity workouts with sustainable nutrition plans to help clients achieve lasting results.',
    image:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop',
    funFact: 'Completed 10 marathons across 5 continents before age 30!',
  },
  {
    id: 3,
    name: 'Marcus Rodriguez',
    role: 'Personal Trainer',
    specialty: 'Athletic Performance',
    age: 31,
    gender: 'Male',
    bio: 'Former professional soccer player with expertise in sports performance and agility training. Marcus helps athletes of all levels unlock their peak performance through science-based programming.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop',
    funFact: 'Can hold a plank for 10 minutes straight (yes, really)!',
  },
  {
    id: 4,
    name: 'Emily Thompson',
    role: 'Massage Therapist',
    specialty: 'Sports & Deep Tissue',
    age: 36,
    gender: 'Female',
    bio: 'Licensed massage therapist with 14 years of experience in sports medicine. Emily specializes in deep tissue work and myofascial release to help athletes recover faster and perform better.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    funFact:
      'Knows over 20 different massage techniques from around the world!',
  },
  {
    id: 5,
    name: 'Dr. Kevin Park',
    role: 'Injury Rehabilitation Specialist',
    specialty: 'Physical Therapy & Recovery',
    age: 42,
    gender: 'Male',
    bio: 'Doctor of Physical Therapy with dual certification in orthopedic and sports rehabilitation. Dr. Park has helped hundreds of clients recover from injuries and return to their active lifestyles stronger than before.',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    funFact: 'Recovered from a career-ending injury to run an ultramarathon!',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section with Gym Image */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
          alt="Inside JKH Fitness gym"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              About JKH Fitness
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
              Where passion meets purpose, and every journey begins with a
              single rep.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  JKH Fitness was born in 2022 from a simple realization: too
                  many people were getting hurt trying to get healthy. As
                  lifelong fitness enthusiasts who had each overcome our own
                  injuries, we knew there had to be a better way.
                </p>
                <p>
                  What started as weekend conversations over protein shakes
                  evolved into a shared vision—a fitness sanctuary where injury
                  prevention isn't an afterthought, but the foundation of
                  everything we do. We weren't just opening another gym; we were
                  creating a movement.
                </p>
                <p>
                  Every piece of equipment we selected, every trainer we brought
                  on board, and every program we developed was chosen with one
                  question in mind: "Will this keep our members safe while
                  helping them grow stronger?" From our state-of-the-art
                  flooring that reduces joint impact to our emphasis on proper
                  form over heavy weights, injury prevention is woven into our
                  DNA.
                </p>
                <p>
                  But we're more than just a safe space to work out. We're a
                  community of people who believe fitness should enhance your
                  life, not sideline it. Whether you're a weekend warrior trying
                  to stay active or an athlete pushing your limits, we're here
                  to help you move better, feel better, and live better—for the
                  long haul.
                </p>
                <p className="font-semibold text-black dark:text-yellow-400 text-lg">
                  Because the best workout is the one you can do tomorrow, next
                  week, and years from now.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 transition-colors">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                  Our Mission
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white dark:text-black font-bold">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black dark:text-white mb-1">
                        Injury Prevention First
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Education and proper technique before intensity
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white dark:text-black font-bold">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black dark:text-white mb-1">
                        Holistic Wellness
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Training, recovery, and rehabilitation under one roof
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white dark:text-black font-bold">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black dark:text-white mb-1">
                        Sustainable Progress
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Long-term results through consistent, smart training
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white dark:text-black font-bold">
                        4
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black dark:text-white mb-1">
                        Community Support
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        A judgment-free zone where everyone belongs
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Staff Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our certified professionals are passionate about helping you
              achieve your goals safely and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((staff) => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mt-20 bg-gradient-to-r from-black to-gray-800 dark:from-yellow-400 dark:to-yellow-500 rounded-2xl p-12 text-center transition-colors">
          <h2 className="text-3xl font-bold text-white dark:text-black mb-6">
            Why Choose JKH Fitness?
          </h2>
          <p className="text-gray-200 dark:text-gray-900 text-lg mb-8 max-w-3xl mx-auto">
            Since 2022, we've been helping people transform their lives through
            smart, sustainable fitness. Join our growing community and
            experience the difference that expert guidance and genuine care can
            make.
          </p>
          <a
            href="/pricing"
            className="inline-block px-8 py-3 bg-white dark:bg-black text-black dark:text-yellow-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 font-semibold text-lg transition-colors shadow-lg"
          >
            Start Your Journey Today
          </a>
        </section>
      </div>
    </div>
  );
}
