// app/components/Header.js
// This component CAN remain a Server Component if currentPathname is passed correctly.
// If you switch to using usePathname() hook *inside* this component, then add "use client".

import React from 'react';
import Link from 'next/link';
import { FaGem, FaBell, FaUserCircle } from 'react-icons/fa';

// Default user data if none is provided
const defaultUserData = {
  points: 0,
};

// Add scrollbar-hide plugin if needed: npm install -D tailwind-scrollbar-hide
// and add require('tailwind-scrollbar-hide') to plugins in tailwind.config.js

export default function Header({ navItems, userData = defaultUserData, currentPathname }) {

   // Basic validation for props
   if (!navItems || !Array.isArray(navItems)) {
    console.warn("Header component requires 'navItems' array prop.");
    navItems = []; // Prevent map error
  }
   // Ensure currentPathname is provided for safety, though it should be
   const path = currentPathname || '';

  return (
    <header className="bg-slate-800 shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Navigation Links */}
        <div className="flex items-center space-x-3 md:space-x-5 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {navItems.map((item) => {
            // Check active state for main nav items
            const isNavItemActive = path === item.href || (path === '/' && item.href === '/');

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 flex-shrink-0 whitespace-nowrap py-1 px-2 rounded-md ${
                  isNavItemActive
                    ? 'text-cyan-400' // Active style for main nav
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
            {/* Use points from userData */}
            {/* Accessing nested userInfo if that's where points reside */}
            <span>{userData?.points?.toLocaleString() || '0'}</span>
          </div>

          {/* Notifications Button */}
          <button
            aria-label="View Notifications"
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-full p-1"
          >
            <FaBell className="h-5 w-5 text-yellow-400" />
            {/* Add notification indicator logic here */}
          </button>

          {/* User Icon & Dashboard Link */}
          {(() => {
             // Check active state specifically for the Dashboard link
             // Ensure case consistency with your actual route ('/Dashboard' or '/dashboard')
             const isDashboardActive = path === '/Dashboard'; // Or path.toLowerCase() === '/dashboard'

             return (
                <Link
                    href="/dashboard" // Ensure this matches the case of your route
                    aria-label="View User Dashboard"
                    className={`flex items-center space-x-2 text-sm rounded-md px-1 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200 ${
                        isDashboardActive
                        ? 'text-cyan-400 cursor-default' // Active style for Dashboard link (maybe no hover needed?)
                        : 'text-gray-300 hover:text-white cursor-pointer' // Default style for Dashboard link
                    }`}
                >
                    <FaUserCircle className="h-6 w-6 flex-shrink-0" />
                    <span className="hidden sm:inline">Dashboard</span>
                </Link>
             );
          })()}
        </div>
      </nav>
    </header>
  );
}