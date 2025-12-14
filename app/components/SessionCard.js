import { format } from 'date-fns';

export default function SessionCard({ session }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all bg-white dark:bg-gray-900">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-black dark:text-white">
            {format(new Date(session.scheduledDate), 'EEEE, MMMM dd, yyyy')}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {format(new Date(session.scheduledDate), 'h:mm a')} •{' '}
            {session.duration} minutes
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
