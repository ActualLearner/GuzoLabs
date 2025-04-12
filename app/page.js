// app/page.js (or app/Home/page.js)
"use client"; // Needed for useRouter hook in buttons

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaGem, FaTasks, FaStar, FaGift } from 'react-icons/fa';
import AppLayout from '@/components/AppLayout'; // Assuming components are in @/components alias or adjust path
import { mockCurrentUser } from '@/lib/mockData'; // Import the mock user data - Adjust path if needed

export default function HomePage() {
  const router = useRouter();

  // Use the imported mock data for the current user
  // In a real app, this would come from context, session, or an API call
  const currentUser = mockCurrentUser;

  // Button Click Handlers
  const handleNavigate = (path) => {
    router.push(path);
  };

  // Ensure currentUser exists before trying to access its properties
  if (!currentUser) {
    // Handle the case where the user data might not be loaded yet or is unavailable
    // You could show a loading state or a generic welcome message
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center text-center px-4 pt-10 pb-16">
           {/* Optional: Add a loading indicator component here */}
           <p className="text-gray-400">Loading user data...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    // AppLayout provides the main screen structure, background, and header
    // Pass the user data to AppLayout so the Header within it can potentially use it
    <AppLayout userData={currentUser}>
      {/* Main Content Area within AppLayout */}
      <div className="flex flex-col items-center justify-center text-center px-4 pt-10 pb-16">

        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
            {/* Use fullName from userInfo */}
            Welcome back, <span className="text-cyan-400">{currentUser.userInfo?.fullName || 'Member'}!</span>
          </h1>
          <p className="text-md text-gray-400">
            Ready to explore your benefits and earn more rewards?
          </p>
        </div>

        {/* Quick Stats Section */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12">
          {/* Points Display */}
          <div className="flex flex-col items-center">
             <FaGem className="w-8 h-8 text-cyan-400 mb-2" />
             {/* Use points directly */}
             <span className="text-2xl font-semibold text-white">{currentUser.points?.toLocaleString() || 0}</span>
             <span className="text-sm text-gray-400">Points Balance</span>
          </div>
           {/* Membership Tier Display */}
          {currentUser.membershipType && (
            <div className="flex flex-col items-center">
                <FaStar className="w-8 h-8 text-yellow-400 mb-2" />
                {/* Use membershipType */}
                <span className="text-2xl font-semibold text-white">{currentUser.membershipType}</span>
                <span className="text-sm text-gray-400">Membership Tier</span>
            </div>
          )}
        </div>

        {/* Call to Action Buttons/Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Explore Rewards */}
          <button
            onClick={() => handleNavigate('/Reward')} // Ensure '/Reward' matches your page route
            className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-200 font-semibold px-6 py-5 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <FaGift className="w-6 h-6 text-cyan-400" />
            Explore Rewards
          </button>

          {/* View Missions */}
          <button
            onClick={() => handleNavigate('/Missions')} // Ensure '/Missions' matches your page route
            className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-200 font-semibold px-6 py-5 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <FaTasks className="w-6 h-6 text-cyan-400" />
            View Loyalty Missions
          </button>

          {/* View Membership */}
          <button
            onClick={() => handleNavigate('/Memberships')} // Ensure '/Memberships' matches your page route
            className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-200 font-semibold px-6 py-5 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1" // Span full width on small, adjust for others
          >
             <FaStar className="w-6 h-6 text-cyan-400" />
            Your Membership
          </button>
        </div>

      </div>
    </AppLayout>
  );
}