// app/components/AppLayout.js (Assuming this is the location)
"use client"; // Layout needs pathname for Header, making it client-side

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header'; // VERIFY this path is correct (e.g., './Header' or '../components/Header')
import { mockCurrentUser } from '@/lib/mockData'; // Import mock data as a fallback - VERIFY PATH

// Define navigation items consistent with built pages
// Make sure href matches your actual folder/route structure (case-sensitive)
const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Memberships', href: '/memberships' }, // Capitalized M based on previous examples
    { name: 'Earn', href: '/earn' },       // Capitalized M
    { name: 'Rewards', href: '/withdraw' },          // Example: Or Withdraw? Choose one primary link.
    // { name: 'Withdraw', href: '/Withdraw' },    // Capitalized W
    // { name: 'Earn', href: '/Earn' },            // Capitalized E
    // Add other relevant top-level links
  ];

// Fallback user data if none is passed via props
const fallbackUserData = {
    points: 0,
    // No default username needed here as Header handles the "Dashboard" text
};

// Modified to accept userData prop
export default function AppLayout({ children, userData }) {
  const pathname = usePathname(); // Get pathname here to pass to Header

  // Use the passed userData, or the mock user, or the basic fallback
  // Prioritize prop > mock > fallback. Adjust priority as needed.
  const actualUserData = userData || mockCurrentUser || fallbackUserData;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Header
        navItems={navItems}
        // Pass the determined user data down to the Header
        userData={actualUserData}
        currentPathname={pathname}
      />
      {/* Render the specific page content */}
      {/* Adjusted padding for consistency */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 md:pt-6 md:pb-12">
        {children}
      </main>
      {/* Optional Shared Footer could go here */}
       {/* <footer className="bg-slate-800 p-4 text-center text-sm text-gray-400">
         © {new Date().getFullYear()} Your Resort/Hotel Name
       </footer> */}
    </div>
  );
}