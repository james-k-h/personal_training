// components/CheckoutButton.js
'use client';

import { useState } from 'react';

export default function CheckoutButton({ packageType }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageType }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating checkout session');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error processing checkout');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {loading ? 'Processing...' : 'Purchase Now'}
    </button>
  );
}
