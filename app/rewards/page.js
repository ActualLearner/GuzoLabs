// app/Withdraw/page.js
"use client";

import React, { useState } from 'react';
import AppLayout from '../../components/AppLayout'; // Adjust path if needed
// Import icons for withdrawal options and feedback
import { FaGift, FaTicketAlt, FaMoneyBillWave, FaGem, FaSpinner, FaCheckCircle, FaExclamationTriangle, FaBed } from 'react-icons/fa';
import { mockCurrentUser } from '@/lib/mockData'; // Import the mock user data - Adjust path if needed

// --- Mock Withdrawal Options (Keep this separate or fetch from API) ---
// This data defines what rewards can be redeemed
const withdrawalOptions = [
  {
    id: 'wd1',
    title: '$5 Resort Dining Credit',
    pointsRequired: 500,
    type: 'credit',
    description: 'Use towards food and beverage at participating outlets.',
    icon: FaMoneyBillWave,
  },
  {
    id: 'wd2',
    title: '$10 Spa Voucher',
    pointsRequired: 1000,
    type: 'voucher',
    description: 'Relax and rejuvenate with a discount on spa treatments.',
    icon: FaGift,
  },
  {
    id: 'wd3',
    title: 'Late Check-out Pass',
    pointsRequired: 1500,
    type: 'perk',
    description: 'Enjoy your room a little longer (Subject to availability).',
    icon: FaTicketAlt,
  },
  {
    id: 'wd4',
    title: '$25 Gift Card (Online Store)',
    pointsRequired: 2500,
    type: 'gift_card',
    description: 'Redeemable at our online merchandise store.',
    icon: FaGift,
  },
    {
    id: 'wd5',
    title: 'Weekend Night Free (Standard Room)',
    pointsRequired: 10000, // Higher value item - Robert Johnson cannot afford this initially
    type: 'stay',
    description: 'Book a weekend stay and get one standard night free (Restrictions apply).',
    icon: FaBed, // Make sure FaBed is imported
  },
];

export default function WithdrawPage() {
  // Use the imported mock user data
  const currentUser = mockCurrentUser;

  // Initialize points state from the currentUser mock data
  // Fallback to 0 if currentUser or currentUser.points is undefined
  const [currentPoints, setCurrentPoints] = useState(currentUser?.points ?? 0);
  const [loadingItemId, setLoadingItemId] = useState(null); // ID of item being redeemed
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

   // Check if currentUser exists before proceeding (optional, for safety)
    if (!currentUser) {
        return (
            <AppLayout>
                <div className="text-center py-10 text-gray-400">Loading user information...</div>
            </AppLayout>
        );
    }

  const handleRedeem = async (option) => {
    setError('');
    setSuccessMessage('');

    // Check if user has enough points using the current state
    if (currentPoints < option.pointsRequired) {
      setError(`Insufficient points. You need ${option.pointsRequired.toLocaleString()} points.`);
      return;
    }

    setLoadingItemId(option.id);

    // --- TODO: Replace with actual API call to backend ---
    try {
      console.log(`Redeeming item ${option.id} for ${option.pointsRequired} points by user ${currentUser.id}`);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock API response (replace with actual response check)
      const mockApiSuccess = true; // Assume success for demo
      const pointsAfterRedemption = currentPoints - option.pointsRequired;

      if (mockApiSuccess) {
        // Update points state locally
        setCurrentPoints(pointsAfterRedemption);
        setSuccessMessage(`Successfully redeemed "${option.title}"! Your new balance is ${pointsAfterRedemption.toLocaleString()}.`);
        // Clear success message after a few seconds
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setError('Redemption failed. Please try again.');
      }

    } catch (err) {
      console.error("Redemption error:", err);
      setError('An error occurred during redemption. Please try again later.');
    } finally {
      setLoadingItemId(null); // Clear loading state for this item
    }
    // --- End TODO ---
  };

  return (
    // Pass user data to AppLayout for potential use in Header
    <AppLayout userData={currentUser}>
      <div className="w-full max-w-4xl mx-auto pt-8 pb-16 px-4">

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-2">
            Redeem Your Points
          </h1>
          <p className="text-md text-gray-400">
            Use your hard-earned points for valuable rewards and perks.
          </p>
        </div>

        {/* Current Points Display - Uses 'currentPoints' state */}
        <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700/50 mb-8 flex items-center justify-center gap-3">
          <FaGem className="w-6 h-6 text-cyan-400" />
          <span className="text-xl font-semibold text-white">
            Your Balance: {currentPoints.toLocaleString()} Points
          </span>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-900/80 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-6 text-sm text-center flex items-center justify-center gap-2">
            <FaExclamationTriangle /> {error}
          </div>
        )}
        {successMessage && (
           <div className="bg-green-900/80 border border-green-700 text-green-200 px-4 py-3 rounded-md mb-6 text-sm text-center flex items-center justify-center gap-2">
             <FaCheckCircle /> {successMessage}
          </div>
        )}

        {/* Withdrawal Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {withdrawalOptions.map((option) => {
            // Check affordability against the current state
            const canAfford = currentPoints >= option.pointsRequired;
            const isLoading = loadingItemId === option.id;

            return (
              // Reward Card
              <div
                key={option.id}
                className={`flex flex-col bg-slate-800 rounded-lg shadow-lg p-5 border border-slate-700/50 ${!canAfford && !isLoading ? 'opacity-60' : ''}`} // Dim if cannot afford (and not loading)
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <option.icon className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-100">{option.title}</h3>
                </div>

                 {/* Description */}
                 {option.description && (
                    <p className="text-xs text-gray-400 mb-4 flex-grow">{option.description}</p>
                 )}

                 {/* Points Required */}
                <div className="text-sm text-gray-300 mb-4 mt-auto pt-3 border-t border-slate-700"> {/* Added padding-top */}
                  Requires: <span className="font-semibold text-cyan-400">{option.pointsRequired.toLocaleString()} Points</span>
                </div>


                {/* Redeem Button */}
                <button
                  onClick={() => handleRedeem(option)}
                  disabled={!canAfford || isLoading}
                  className={`w-full mt-auto py-2 px-4 rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center gap-2 ${
                    isLoading
                      ? 'bg-slate-600 text-gray-400 cursor-wait' // Loading state
                      : canAfford
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500' // Can afford
                      : 'bg-slate-700 text-gray-500 cursor-not-allowed' // Cannot afford
                  }`}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin h-4 w-4" /> Processing...
                    </>
                  ) : (
                    'Redeem Now'
                  )}
                </button>
              </div>
            );
          })}

          {/* Optional: Add case for no withdrawal options */}
          {withdrawalOptions.length === 0 && (
            <p className="text-center text-gray-500 sm:col-span-2 lg:col-span-3 py-8">
                No withdrawal options currently available. Check back later!
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}