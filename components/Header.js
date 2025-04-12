// app/components/Header.js
// This component CAN remain a Server Component if currentPathname is passed correctly
// and no client-side hooks are used *within* this component itself.

import React from 'react';
import Link from 'next/link'; // Import Link
import { FaGem, FaBell, FaUserCircle } from 'react-icons/fa';

// Default user data if none is provided
const defaultUserData = {
  points: 0,
  username: 'User'
};

// Add scrollbar-hide plugin if needed: npm install -D tailwind-scrollbar-hide
// and add require('tailwind-scrollbar-hide') to plugins in tailwind.config.js

export default function Header({ navItems, userData = defaultUserData, currentPathname }) {

   // Basic validation for props
   if (!navItems || !Array.isArray(navItems)) {
    console.warn("Header component requires 'navItems' array prop.");
    navItems = []; // Prevent map error
  }

  return (
    <header className="bg-slate-800 shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Navigation Links */}
        <div className="flex items-center space-x-3 md:space-x-5 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {navItems.map((item) => {
            // Use the active link logic provided (cyan text color)
            const isActive = currentPathname === item.href || (currentPathname === '/' && item.href === '/');

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 flex-shrink-0 whitespace-nowrap py-1 px-2 rounded-md ${
                  isActive
                    ? 'text-cyan-400' // Active link style from original home page
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right User Info */}
        <div className="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
          {/* Points */}
          <div className="flex items-center space-x-1 text-sm">
            <FaGem className="text-cyan-400 h-4 w-4" />
            <span>{userData?.points?.toLocaleString() || '0'}</span>
          </div>

          {/* Notifications Button */}
          <button
            aria-label="View Notifications"
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-full p-1" // Added focus styles and padding
          >
            <FaBell className="h-5 w-5 text-yellow-400" />
            {/* Add notification indicator logic here */}
          </button>

          {/* User Avatar & Name - Changed to Link */}
          <Link
            href="/dashboard" // Link to the Dashboard page
            aria-label="View User Dashboard"
            // Apply the same styling as the previous button for consistency
            className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-md px-1 py-1" // Added focus styles and padding
          >
            <FaUserCircle className="h-6 w-6 flex-shrink-0" /> {/* Added flex-shrink-0 */}
            <span className="hidden sm:inline">{userData?.username || 'User'}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}