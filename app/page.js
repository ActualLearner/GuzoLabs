"use client"; // <--- Add this directive at the top

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // Import hooks for client-side logic
import { FaGem, FaBell, FaUserCircle } from 'react-icons/fa';
import AppLayout from '@/components/AppLayout';

export default function HomePage() {
  const router = useRouter(); // Hook to handle navigation
  const pathname = usePathname(); // Hook to get the current path for active link styling

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Reward', href: '/reward' },
    { name: 'Earn', href: '/earn' },
    { name: 'Withdraw', href: '/withdraw' },
    { name: 'Quests', href: '/quests' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Free', href: '/free' },
  ];

  const handleExploreClick = () => {
    console.log("Explore Rewards clicked!");
    // Navigate to the rewards page, for example:
    router.push('/Reward');
  };

  return (
    <AppLayout>
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">
          Welcome Home!
        </h1>
        <p className="text-gray-300 max-w-lg mb-8">
          This is the home page content. You can add information, announcements, or anything you want to display here.
        </p>
        <button
          className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={handleExploreClick} // Use the handler function
        >
          Explore Rewards
        </button>
      </main>

      {/* Optional Footer */}
      {/* <footer className="bg-slate-800 p-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Your App Name
      </footer> */}
    </div>
    </AppLayout>
  );
}