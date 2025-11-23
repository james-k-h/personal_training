import { format } from 'date-fns';

export default function SessionCard({ session }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-900">
            {format(new Date(session.scheduledDate), 'EEEE, MMMM dd, yyyy')}
          </p>
          <p className="text-sm text-gray-600">
            {format(new Date(session.scheduledDate), 'h:mm a')} •{' '}
            {session.duration} minutes
          </p>
          {session.location && (
            <p className="text-sm text-gray-500 mt-1">📍 {session.location}</p>
          )}
          {session.notes && (
            <p className="text-sm text-gray-600 mt-2">{session.notes}</p>
          )}
        </div>
        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          Scheduled
        </span>
      </div>
    </div>
  );
}
