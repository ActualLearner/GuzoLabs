// app/Dashboard/page.js
"use client";

import React, { useState } from 'react';
import AppLayout from '../../components/AppLayout'; // Adjust path if needed
import { useRouter } from 'next/navigation';
// Added FaQrcode and FaIdCard icons
import {
    FaEnvelope, FaBell, FaSignOutAlt, FaLock, FaUserEdit, FaTags, FaShoppingCart,
    FaTools, FaCalendarAlt, FaUtensils, FaQrcode, FaIdCard, FaStar, FaGem
} from 'react-icons/fa';
import { mockCurrentUser } from '@/lib/mockData'; // Adjust path if needed

// Helper function (assuming it exists or copy/paste from previous steps)
const getIconForDiscountType = (type) => {
    switch (type?.toLowerCase()) {
        case 'food & beverage': return FaUtensils;
        case 'retail': return FaShoppingCart;
        case 'services': return FaTools;
        case 'events': return FaCalendarAlt;
        default: return FaTags;
    }
};

export default function DashboardPage() {
  const router = useRouter();
  const currentUserData = mockCurrentUser;

  // --- FIX 1: Moved useState call to the top level ---
  // Initialize state here, before any conditional returns. Use optional chaining for safety.
  const [emailNotifications, setEmailNotifications] = useState(
    currentUserData?.userInfo?.prefs?.emailNotifications ?? true // Default to true if prefs/data missing
  );
  // --- END FIX 1 ---

  // Check if currentUser exists *after* hooks have been called
  if (!currentUserData) {
    return (
      <AppLayout>
        <div className="text-center py-10 text-gray-400">Loading user data...</div>
      </AppLayout>
    );
  }

  // Process benefits (can stay here)
  const userDiscounts = currentUserData.packageInfo?.discounts || [];
  const userBenefits = userDiscounts.map((discount, index) => ({
      id: `d-${currentUserData.id}-${index}`,
      name: `${discount.discountAmount}% Off ${discount.discountType}`,
      description: `Enjoy a ${discount.discountAmount}% discount on ${discount.discountType}.`, // Assuming description exists
      icon: getIconForDiscountType(discount.discountType)
  }));

  // --- Handlers (can stay here) ---
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

   // Navigation handler for the QR code button
   const handleGoToQrCode = () => {
       router.push('/qr_code'); // Navigate to the QR code page
   };

  return (
    <AppLayout userData={currentUserData}>
      {/* Increased max-width for slightly wider dashboard */}
      <div className="w-full max-w-4xl mx-auto pt-6 pb-12 space-y-8">

        {/* Page Header */}
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-2">
             Welcome, {currentUserData.userInfo.fullName?.split(' ')[0] || 'Member'}! {/* Personalized Greeting */}
          </h1>
          {/* --- FIX 2: Corrected apostrophe --- */}
          <p className="text-md text-gray-400">
            Heres your dashboard overview. Manage your benefits, settings, and points.
          </p>
          {/* --- END FIX 2 --- */}
        </div>

        {/* Quick Stats (Improvement from previous step) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700/50 flex items-center gap-3">
                 <FaGem className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                 <div>
                    <div className="text-sm text-gray-400">Points Balance</div>
                    <div className="text-xl font-semibold text-white">{currentUserData.points.toLocaleString()}</div>
                 </div>
            </div>
             <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700/50 flex items-center gap-3">
                 <FaStar className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">Membership Tier</div>
                    <div className="text-xl font-semibold text-white">{currentUserData.membershipType}</div>
                 </div>
            </div>
        </section>

        {/* Account Information Section - Added Member ID and QR Button */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Account Information</h2>
          <div className="space-y-3 text-sm mb-5"> {/* Added margin-bottom */}
             {/* Member ID Display */}
             <div className="flex items-center">
              <FaIdCard className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
              <span className="text-slate-400 mr-2 font-medium">Member ID:</span>
              <span className="text-gray-200 font-mono">{currentUserData.id}</span> {/* Use ID */}
            </div>
            <div className="flex items-center">
              <FaUserEdit className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
              <span className="text-slate-400 mr-2 font-medium">Name:</span>
              <span className="text-gray-200">{currentUserData.userInfo.fullName}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
              <span className="text-slate-400 mr-2 font-medium">Email:</span>
              <span className="text-gray-200">{currentUserData.userInfo.email}</span>
            </div>
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
           {/* Added QR Code Button */}
           <button
                onClick={handleGoToQrCode}
                className="w-full flex items-center justify-center gap-2 border border-cyan-600 text-cyan-400 bg-transparent hover:bg-slate-700 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
             <FaQrcode className="w-4 h-4" />
             Show Member QR Code
           </button>
        </section>

         {/* Membership Benefits Section */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
             <h2 className="text-xl font-semibold text-gray-200">Membership Benefits</h2>
             {currentUserData.membershipType && (
                 <span className="text-sm font-bold px-3 py-1 rounded-full bg-cyan-900/70 text-cyan-300 uppercase tracking-wider">
                    {currentUserData.membershipType} Tier
                </span>
             )}
          </div>
          {userBenefits.length > 0 ? (
            <ul className="space-y-4">
              {userBenefits.map((benefit) => (
                <li key={benefit.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-slate-700 mt-1">
                     <benefit.icon className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-200">{benefit.name}</h3>
                    {/* Removed description for brevity unless needed */}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
             <p className="text-sm text-gray-500 text-center py-3">No specific discounts listed for your package.</p>
          )}
        </section>

        {/* Settings Section */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Preferences</h2>
          <div className="space-y-4">
             {/* Email Notifications Toggle */}
             <div className="flex items-center justify-between">
               <label htmlFor="emailNotifications" className="flex items-center text-sm cursor-pointer gap-3">
                  <FaBell className="w-4 h-4 text-slate-400 flex-shrink-0" />
                 <span className="text-gray-200">Email Notifications</span>
               </label>
               <button id="emailNotifications" role="switch" aria-checked={emailNotifications} onClick={handleToggleNotifications} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${emailNotifications ? 'bg-cyan-600' : 'bg-slate-600'}`}> <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}/> </button>
             </div>
             {/* Password Change */}
             <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                 <div className="flex items-center text-sm gap-3">
                    <FaLock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-gray-200">Password</span>
                 </div>
                  <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"> Change Password </button>
             </div>
          </div>
        </section>

        {/* Account Actions Section */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
           <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Account Actions</h2>
           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-800/80 hover:bg-red-700 text-red-100 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"> <FaSignOutAlt className="w-4 h-4" /> Log Out </button>
        </section>

      </div>
    </AppLayout>
  );
}