// app/Dashboard/page.js
"use client";

import React, { useState } from 'react';
import AppLayout from '../components/AppLayout'; // Adjust path if needed
import { useRouter } from 'next/navigation'; // For logout navigation
import { FaEnvelope, FaBell, FaSignOutAlt, FaLock, FaUserEdit } from 'react-icons/fa'; // Example icons

// --- Mock User Data (Replace with actual fetched data/context/session) ---
const currentUserData = {
  name: "User Name", // Should match header potentially
  email: "user@example.com",
  points: 8000, // Consistent with header example
  joinDate: "2023-10-26",
  prefs: {
    emailNotifications: true,
  }
};

export default function DashboardPage() {
  const router = useRouter();
  // Example state for a setting toggle
  const [emailNotifications, setEmailNotifications] = useState(currentUserData.prefs.emailNotifications);

  const handleLogout = () => {
    console.log("Logging out...");
    // --- Add your actual logout logic here ---
    // This might involve:
    // - Clearing authentication tokens/cookies
    // - Calling a logout endpoint on your backend
    // - Clearing user state in your context/store
    alert("Logout functionality not fully implemented yet.");
    // Redirect to login or home page after logout
    // router.push('/login'); // Or router.push('/');
  };

  const handleToggleNotifications = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    // TODO: Add API call here to save the preference change to the backend
    console.log("Email notifications toggled to:", newValue);
  };


  return (
    <AppLayout>
      {/* Main Content Container for Dashboard */}
      {/* Added padding-top to clear the sticky header */}
      <div className="w-full max-w-3xl mx-auto pt-6 pb-12 space-y-8">

        {/* Page Header */}
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-2">
            User Dashboard
          </h1>
          <p className="text-md text-gray-400">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Account Information Section */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Account Information</h2>
          <div className="space-y-3 text-sm">
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
            {/* Add more fields like Join Date if needed */}
            {/* <div className="flex items-center">
                <FaCalendarAlt className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0"/>
                <span className="text-slate-400 mr-2 font-medium">Member Since:</span>
                <span className="text-gray-200">{new Date(currentUserData.joinDate).toLocaleDateString()}</span>
            </div> */}
          </div>
        </section>

        {/* Settings Section */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
          <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Preferences</h2>
          <div className="space-y-4">
            {/* Email Notifications Toggle Example */}
            <div className="flex items-center justify-between">
              <label htmlFor="emailNotifications" className="flex items-center text-sm cursor-pointer">
                 <FaBell className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                <span className="text-gray-200">Email Notifications</span>
              </label>
              {/* Simple Toggle Switch */}
              <button
                id="emailNotifications"
                role="switch"
                aria-checked={emailNotifications}
                onClick={handleToggleNotifications}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                  emailNotifications ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

             {/* Password Change Link/Button Example */}
             <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                <div className="flex items-center text-sm">
                    <FaLock className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                    <span className="text-gray-200">Password</span>
                </div>
                 <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Change Password
                 </button>
            </div>
            {/* Add more settings here */}
          </div>
        </section>

        {/* Account Actions Section */}
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
           <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">Account Actions</h2>
           <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-800/80 hover:bg-red-700 text-red-100 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
             <FaSignOutAlt className="w-4 h-4" />
            Log Out
          </button>
          {/* Add other actions like "Delete Account" if needed */}
        </section>

      </div>
    </AppLayout>
  );
}