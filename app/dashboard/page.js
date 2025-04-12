// app/Dashboard/page.js
"use client";

import React, { useState } from 'react';
import AppLayout from '../../components/AppLayout'; // Adjust path
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaBell, FaSignOutAlt, FaLock, FaUserEdit, FaTags, FaShoppingCart, FaTools, FaCalendarAlt, FaUtensils } from 'react-icons/fa'; // Added more specific icons
import { mockCurrentUser } from '@/lib/mockData'; // Adjust path

// Helper function to map discount type to an icon
const getIconForDiscountType = (type) => {
    switch (type?.toLowerCase()) {
        case 'food & beverage': return FaUtensils;
        case 'retail': return FaShoppingCart;
        case 'services': return FaTools;
        case 'events': return FaCalendarAlt;
        default: return FaTags; // Default tag icon
    }
};

export default function DashboardPage() {
  const router = useRouter();
  // Use the imported mock user data
  const currentUserData = mockCurrentUser;

  // State for preferences (can still be local if needed)
  const [emailNotifications, setEmailNotifications] = useState(currentUserData.userInfo.prefs?.emailNotifications ?? true); // Use optional chaining and default

  // Process benefits from the user data
  const userDiscounts = currentUserData.packageInfo?.discounts || [];
  const userBenefits = userDiscounts.map((discount, index) => ({
      id: `d-${currentUserData.id}-${index}`, // More unique ID
      name: `${discount.discountAmount}% Off ${discount.discountType}`,
      description: `Enjoy a ${discount.discountAmount}% discount on ${discount.discountType}.`,
      icon: getIconForDiscountType(discount.discountType) // Use helper function
  }));

  // --- Handlers remain the same ---
  const handleLogout = () => { /* ... */ };
  const handleToggleNotifications = () => { /* ... */ };

  return (
    <AppLayout userData={currentUserData}> {/* Pass data to layout */}
      <div className="w-full max-w-3xl mx-auto pt-6 pb-12 space-y-8">

        {/* Page Header (remains similar) */}
        {/* ... */}

        {/* Membership Benefits Section - Use processed data */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
             <h2 className="text-xl font-semibold text-gray-200">Your Membership Benefits</h2>
             {/* Display membershipType */}
             {currentUserData.membershipType && (
                 <span className="text-sm font-bold px-3 py-1 rounded-full bg-cyan-900/70 text-cyan-300 uppercase tracking-wider">
                    {currentUserData.membershipType} Tier
                </span>
             )}
          </div>
          {userBenefits.length > 0 ? (
            <ul className="space-y-4">
              {userBenefits.map((benefit) => ( // Use the processed userBenefits array
                <li key={benefit.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-slate-700 mt-1">
                     <benefit.icon className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-200">{benefit.name}</h3>
                    <p className="text-xs text-gray-400">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
             /* ... no benefits message ... */
             <p>No benefits found for your current membership.</p>
          )}
        </section>

        {/* Account Information Section - Use data */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <FaUserEdit className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
              <span className="text-slate-400 mr-2 font-medium">Name:</span>
              {/* Use fullName */}
              <span className="text-gray-200">{currentUserData.userInfo.fullName}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
              <span className="text-slate-400 mr-2 font-medium">Email:</span>
               {/* Use email */}
              <span className="text-gray-200">{currentUserData.userInfo.email}</span>
            </div>
             {/* Optionally add subscription dates */}
             <div className="flex items-center">
                <FaCalendarAlt className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0"/>
                <span className="text-slate-400 mr-2 font-medium">Member Since:</span>
                <span className="text-gray-200">{new Date(currentUserData.userInfo.subscriptionStartDate).toLocaleDateString()}</span>
            </div>
             <div className="flex items-center">
                <FaCalendarAlt className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0"/>
                <span className="text-slate-400 mr-2 font-medium">Renewal Date:</span>
                <span className="text-gray-200">{new Date(currentUserData.userInfo.subscriptionEndDate).toLocaleDateString()}</span>
            </div>
          </div>
        </section>

        {/* Settings Section (remains similar, uses local state) */}
        {/* ... */}

        {/* Account Actions Section (remains similar) */}
        {/* ... */}

      </div>
    </AppLayout>
  );
}