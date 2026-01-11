'use client';

import { useState } from 'react';

const weekdayTimeSlots = [
  '06:00 AM',
  '07:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
];

const weekendTimeSlots = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
];

export default function EditSessionModal({ isOpen, onClose, session }) {
  const [selectedDate, setSelectedDate] = useState(
    session?.scheduledDate?.split('T')[0] || ''
  );
  const [selectedTime, setSelectedTime] = useState(
    session?.scheduledTime || ''
  );
  const [notes, setNotes] = useState(session?.notes || '');
  const [loading, setLoading] = useState(false);

  // Check if selected date is a weekend
  const isWeekend = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString + 'T00:00:00');
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  };

  // Get available time slots based on selected date
  const getAvailableTimeSlots = () => {
    return isWeekend(selectedDate) ? weekendTimeSlots : weekdayTimeSlots;
  };

  // Handle date change and reset time if needed
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);

    // If time is selected and new date is weekend, check if time is still valid
    if (selectedTime && isWeekend(newDate)) {
      if (!weekendTimeSlots.includes(selectedTime)) {
        setSelectedTime(''); // Reset time if not available on weekends
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/book-session/${session._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scheduledDate: selectedDate,
          scheduledTime: selectedTime,
          notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Session updated successfully!');
        onClose();
        window.location.reload();
      } else {
        alert(data.error || 'Error updating session');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating session');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !session) return null;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Edit Session
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Select Date *
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={today}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-yellow-400 transition-colors"
            />
            {selectedDate && isWeekend(selectedDate) && (
              <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                Weekend hours: 8:00 AM - 6:00 PM
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Select Time *
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              disabled={!selectedDate}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {selectedDate ? 'Choose a time...' : 'Select a date first...'}
              </option>
              {selectedDate &&
                getAvailableTimeSlots().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any special requests or notes for your trainer..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-yellow-400 transition-colors"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-black dark:bg-yellow-400 text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-yellow-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
