'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import ScheduleSessionModal from './ScheduleSessionModal';

export default function DashboardClient({
  userName,
  totalSessions,
  sessions,
  purchases,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Welcome back, {userName}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your training sessions and packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Sessions Remaining
                </h3>
                <p className="mt-2 text-3xl font-bold text-black dark:text-yellow-400">
                  {totalSessions}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={totalSessions === 0}
                className="px-3 py-1 text-xs bg-black dark:bg-yellow-400 text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-yellow-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Schedule
              </button>
            </div>
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
                  Click "Schedule" above to book a session
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <SessionCard key={session._id} session={session} />
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
                    key={purchase._id}
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

      <ScheduleSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        purchases={purchases}
      />
    </div>
  );
}
function SessionCard({ session }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all bg-white dark:bg-gray-900">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-black dark:text-white">
            {format(new Date(session.scheduledDate), 'EEEE, MMMM dd, yyyy')}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {session.scheduledTime} • {session.duration} minutes
          </p>
          {session.location && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              📍 {session.location}
            </p>
          )}
          {session.notes && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {session.notes}
            </p>
          )}
        </div>
        <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-yellow-400 text-black dark:text-black rounded-full">
          Scheduled
        </span>
      </div>
    </div>
  );
}
