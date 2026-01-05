'use client';

import { useState } from 'react';

export default function CancelSessionModal({ isOpen, onClose, session }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/sessions/${session._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (data.refunded) {
          alert(
            'Session cancelled successfully! Your session has been returned to your package.'
          );
        } else {
          alert(
            'Session cancelled. No refund available (within 24 hours of scheduled time).'
          );
        }
        onClose();
        window.location.reload();
      } else {
        alert(data.error || 'Error cancelling session');
      }
    } catch (error) {
      console.error('Cancel error:', error);
      alert('Error cancelling session');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !session) return null;

  // Check if within 24 hours
  const sessionDateTime = new Date(session.scheduledDate);
  const now = new Date();
  const hoursUntilSession = (sessionDateTime - now) / (1000 * 60 * 60);
  const isWithin24Hours = hoursUntilSession < 24;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-black dark:text-white">
              Cancel Session
            </h2>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Are you sure you want to cancel this session?
          </p>

          {isWithin24Hours ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800 dark:text-red-300 font-semibold mb-2">
                ⚠️ Late Cancellation Notice
              </p>
              <p className="text-sm text-red-700 dark:text-red-400">
                This session is scheduled within the next 24 hours. According to
                our cancellation policy, you will{' '}
                <strong>not receive a session credit back</strong> to your
                package.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800 dark:text-green-300 font-semibold mb-2">
                ✓ Full Refund Available
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                You're cancelling more than 24 hours in advance. Your session
                will be returned to your package.
              </p>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Keep Session
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? 'Cancelling...' : 'Cancel Session'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
