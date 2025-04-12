// app/Dashboard/page.js
"use client";

import React, { useState } from 'react';
import AppLayout from '../../components/AppLayout'; // Adjust path if needed
import { useRouter } from 'next/navigation';
// Import new icons for benefits
import { FaEnvelope, FaBell, FaSignOutAlt, FaLock, FaUserEdit, FaTags, FaShippingFast, FaStar } from 'react-icons/fa';

// --- Enhanced Mock Data ---
const currentUserData = {
  name: "User Name",
  email: "user@example.com",
  points: 8000,
  joinDate: "2023-10-26",
  prefs: {
    emailNotifications: true,
  },
  // Add membership details
  membership: {
    level: "Gold", // e.g., "Bronze", "Silver", "Gold", "Platinum"
    nextRenewal: "2024-12-31",
  }
};

// Mock data defining benefits per membership level
const membershipBenefitsData = {
  "Bronze": [
    { id: 'b1', name: '5% Off All Purchases', description: 'Standard discount on eligible items.', icon: FaTags },
  ],
  "Silver": [
    { id: 's1', name: '10% Off All Purchases', description: 'Increased discount on eligible items.', icon: FaTags },
    { id: 's2', name: 'Early Access to Sales', description: 'Get notified 1 day before sales start.', icon: FaBell },
  ],
  "Gold": [
    { id: 'g1', name: '15% Off All Purchases', description: 'Enhanced discount on eligible items.', icon: FaTags },
    { id: 'g2', name: 'Free Standard Shipping', description: 'On all orders over $25.', icon: FaShippingFast },
    { id: 'g3', name: 'Priority Customer Support', description: 'Get faster responses from our team.', icon: FaStar },
  ],
  "Platinum": [
    { id: 'p1', name: '20% Off All Purchases', description: 'Maximum discount on eligible items.', icon: FaTags },
    { id: 'p2', name: 'Free Express Shipping', description: 'On all orders, no minimum.', icon: FaShippingFast },
    { id: 'p3', name: 'Dedicated Account Manager', description: 'Personalized support.', icon: FaStar },
    { id: 'p4', name: 'Exclusive Event Invites', description: 'Invitations to special member events.', icon: FaEnvelope },
  ]
};


export default function DashboardPage() {
  const router = useRouter();
  const [emailNotifications, setEmailNotifications] = useState(currentUserData.prefs.emailNotifications);

  // Get the current user's benefits based on their membership level
  const userBenefits = membershipBenefitsData[currentUserData.membership?.level] || [];

  const handleLogout = () => {
    console.log("Logging out...");
    alert("Logout functionality not fully implemented yet.");
    // router.push('/login');
  };

  const handleToggleNotifications = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    console.log("Email notifications toggled to:", newValue);
    // TODO: Save preference change via API
  };


  return (
    <AppLayout>
      <div className="w-full max-w-3xl mx-auto pt-6 pb-12 space-y-8">

        {/* Page Header */}
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-2">
            User Dashboard
          </h1>
          <p className="text-md text-gray-400">
            View your benefits, manage settings, and track your account.
          </p>
        </div>

        {/* --- NEW: Membership Benefits Section --- */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
             <h2 className="text-xl font-semibold text-gray-200">Your Membership Benefits</h2>
             {/* Display current tier */}
             {currentUserData.membership?.level && (
                 <span className="text-sm font-bold px-3 py-1 rounded-full bg-cyan-900/70 text-cyan-300 uppercase tracking-wider">
                    {currentUserData.membership.level} Tier
                </span>
             )}
          </div>
          {userBenefits.length > 0 ? (
            <ul className="space-y-4">
              {userBenefits.map((benefit) => (
                <li key={benefit.id} className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-slate-700 mt-1">
                     <benefit.icon className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  </div>
                  {/* Text Content */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-200">{benefit.name}</h3>
                    <p className="text-xs text-gray-400">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No active membership benefits found. Visit the membership page to upgrade!
            </p>
          )}
           {/* Optional: Add link to manage/view membership details */}
           {/* <div className="mt-5 pt-4 border-t border-slate-700/50 text-right">
                <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Manage Membership
                 </button>
           </div> */}
        </section>
        {/* --- END: Membership Benefits Section --- */}


        {/* Account Information Section (Existing) */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Account Information</h2>
          <div className="space-y-3 text-sm">
             {/* ... existing account info fields ... */}
             <div className="flex items-center">
               <FaUserEdit className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
               <span className="text-slate-400 mr-2 font-medium">Name:</span>
               <span className="text-gray-200">{currentUserData.name}</span>
             </div>
             <div className="flex items-center">
               <FaEnvelope className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
               <span className="text-slate-400 mr-2 font-medium">Email:</span>
               <span className="text-gray-200">{currentUserData.email}</span>
             </div>
          </div>
        </section>

        {/* Settings Section (Existing) */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Preferences</h2>
          <div className="space-y-4">
             {/* ... existing settings fields ... */}
             <div className="flex items-center justify-between">
               <label htmlFor="emailNotifications" className="flex items-center text-sm cursor-pointer">
                  <FaBell className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                 <span className="text-gray-200">Email Notifications</span>
               </label>
               <button /* ... toggle button ... */ id="emailNotifications" role="switch" aria-checked={emailNotifications} onClick={handleToggleNotifications} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${emailNotifications ? 'bg-cyan-600' : 'bg-slate-600'}`}> <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}/> </button>
             </div>
             <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                 <div className="flex items-center text-sm"> <FaLock className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" /><span className="text-gray-200">Password</span> </div>
                  <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"> Change Password </button>
             </div>
          </div>
        </section>

        {/* Account Actions Section (Existing) */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
           <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Account Actions</h2>
           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-800/80 hover:bg-red-700 text-red-100 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"> <FaSignOutAlt className="w-4 h-4" /> Log Out </button>
        </section>
      </div>
    </AppLayout>
  );
}