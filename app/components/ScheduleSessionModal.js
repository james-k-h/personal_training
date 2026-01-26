'use client';

import { useState, useEffect } from 'react';
import { PRICING_PLANS } from '@/lib/stripe';
import { getEligibleRolesForPackage } from '@/lib/packageStaffMapping';

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

export default function ScheduleSessionModal({ isOpen, onClose, purchases }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPurchase, setSelectedPurchase] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);

  // Fetch staff members when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchStaff();
    }
  }, [isOpen]);

  // Reset staff selection when package changes
  useEffect(() => {
    if (selectedPurchase) {
      setSelectedStaff(''); // Reset staff when package changes
    }
  }, [selectedPurchase]);

  const fetchStaff = async () => {
    setLoadingStaff(true);
    try {
      const response = await fetch('/api/staff');
      const data = await response.json();
      if (response.ok) {
        console.log('Fetched staff:', data.staff);
        setAllStaff(data.staff || []);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoadingStaff(false);
    }
  };

  // Get filtered staff based on selected package
  const getEligibleStaff = () => {
    if (!selectedPurchase || !allStaff.length) {
      console.log('No purchase selected or no staff loaded');
      return [];
    }

    const purchase = purchases.find((p) => p._id === selectedPurchase);
    if (!purchase) {
      console.log('Purchase not found');
      return [];
    }

    console.log('Selected package type:', purchase.packageType);

    const eligibleRoles = getEligibleRolesForPackage(purchase.packageType);
    console.log('Eligible roles for package:', eligibleRoles);

    const filteredStaff = allStaff.filter((staff) => {
      const isEligible = eligibleRoles.includes(staff.role);
      console.log(
        `Staff: ${staff.name} (${staff.role}) - Eligible: ${isEligible}`
      );
      return isEligible;
    });

    console.log('Filtered staff count:', filteredStaff.length);
    return filteredStaff;
  };

  // Check if selected date is a weekend
  const isWeekend = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString + 'T00:00:00');
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // Get available time slots based on selected date
  const getAvailableTimeSlots = () => {
    return isWeekend(selectedDate) ? weekendTimeSlots : weekdayTimeSlots;
  };

  // Handle date change and reset time if needed
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);

    if (selectedTime && isWeekend(newDate)) {
      if (!weekendTimeSlots.includes(selectedTime)) {
        setSelectedTime('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !selectedPurchase || !selectedStaff) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/book-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purchaseId: selectedPurchase,
          staffId: selectedStaff,
          scheduledDate: selectedDate,
          scheduledTime: selectedTime,
          notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Session booked successfully!');
        onClose();
        window.location.reload();
      } else {
        alert(data.error || 'Error booking session');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error booking session');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];
  const eligibleStaff = getEligibleStaff();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Schedule a Session
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
          {/* Select Package */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Select Package *
            </label>
            <select
              value={selectedPurchase}
              onChange={(e) => setSelectedPurchase(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-yellow-400 transition-colors"
            >
              <option value="">Choose a package...</option>
              {purchases.map((purchase) => {
                const planInfo = PRICING_PLANS[purchase.packageType];
                return (
                  <option key={purchase._id} value={purchase._id}>
                    {planInfo?.name || purchase.packageType} -{' '}
                    {purchase.sessionsRemaining} sessions remaining
                  </option>
                );
              })}
            </select>
          </div>

          {/* Select Staff */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Select Trainer/Specialist *
            </label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              required
              disabled={!selectedPurchase || loadingStaff}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {!selectedPurchase
                  ? 'Select a package first...'
                  : loadingStaff
                  ? 'Loading staff...'
                  : eligibleStaff.length === 0
                  ? 'No staff available for this package'
                  : 'Choose a trainer/specialist...'}
              </option>
              {eligibleStaff.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} - {member.specialty}
                </option>
              ))}
            </select>
            {selectedPurchase && eligibleStaff.length > 0 && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Showing {eligibleStaff.length} eligible{' '}
                {eligibleStaff.length === 1 ? 'specialist' : 'specialists'} for
                this package type
              </p>
            )}
            {selectedPurchase &&
              eligibleStaff.length === 0 &&
              !loadingStaff && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  No staff members match this package type. Please contact
                  support.
                </p>
              )}
          </div>

          {/* Select Date */}
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
              style={{
                colorScheme: 'light dark',
              }}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-yellow-400 transition-colors [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:dark:invert [&::-webkit-calendar-picker-indicator]:dark:opacity-70"
            />
            {selectedDate && isWeekend(selectedDate) && (
              <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                Weekend hours: 8:00 AM - 6:00 PM
              </p>
            )}
          </div>

          {/* Select Time */}
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

          {/* Notes */}
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

          {/* Buttons */}
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
              {loading ? 'Booking...' : 'Book Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
