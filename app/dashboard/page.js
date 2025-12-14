import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Session from '@/models/Session';
import Purchase from '@/models/Purchase';
import SessionCard from '../components/SessionCard';
import { format } from 'date-fns';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  await connectDB();
  const dbUser = await User.findOne({ email: user.email });

  // Get upcoming sessions
  const sessions = await Session.find({
    userId: dbUser._id,
    scheduledDate: { $gte: new Date() },
    status: 'scheduled',
  })
    .sort({ scheduledDate: 1 })
    .limit(10)
    .lean();

  // Get active purchases
  const purchases = await Purchase.find({
    userId: dbUser._id,
    status: 'active',
    sessionsRemaining: { $gt: 0 },
  }).lean();

  const totalSessions = purchases.reduce(
    (sum, p) => sum + p.sessionsRemaining,
    0
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your training sessions and packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Sessions Remaining
            </h3>
            <p className="mt-2 text-3xl font-bold text-black dark:text-yellow-400">
              {totalSessions}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Upcoming Sessions
            </h3>
            <p className="mt-2 text-3xl font-bold text-black dark:text-yellow-400">
              {sessions.length}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Active Packages
            </h3>
            <p className="mt-2 text-3xl font-bold text-black dark:text-yellow-400">
              {purchases.length}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              Upcoming Sessions
            </h2>
          </div>
          <div className="p-6">
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming sessions scheduled
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Contact your trainer to book a session
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <SessionCard key={session._id.toString()} session={session} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              Your Packages
            </h2>
          </div>
          <div className="p-6">
            {purchases.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No active packages
                </p>
                <a
                  href="/pricing"
                  className="inline-block mt-4 px-6 py-2 bg-black dark:bg-yellow-400 text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-yellow-500 transition-colors"
                >
                  Purchase a Package
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase._id.toString()}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 transition-colors"
                  >
                    <h3 className="font-semibold text-black dark:text-white capitalize">
                      {purchase.packageType.replace('-', ' ')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Sessions remaining: {purchase.sessionsRemaining}
                    </p>
                    {purchase.expiresAt && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Expires:{' '}
                        {format(new Date(purchase.expiresAt), 'MMM dd, yyyy')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
