"use client"; // Layout needs pathname for Header, making it client-side

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header'; // Import the Header component

// Define navigation items once, can be passed down or imported
const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Memberships', href: '/memberships' },
    { name: 'Earn', href: '/earn' },
    { name: 'Withdraw', href: '/withdraw' },
    { name: 'QrCode', href: '/qr_code' },
  ];

// Define user data - ideally fetched or from context/session
const userData = {
    points: 8000,
    username: "User Avatar" // Or actual username
}

export default function AppLayout({ children }) {
  const pathname = usePathname(); // Get pathname here to pass to Header

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Header
        navItems={navItems}
        userData={userData}
        currentPathname={pathname}
      />
      {/* Render the specific page content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      {/* Optional Shared Footer could go here */}
       {/* <footer className="bg-slate-800 p-4 text-center text-sm text-gray-400">
         © {new Date().getFullYear()} Your App Name
       </footer> */}
    </div>
  );
}