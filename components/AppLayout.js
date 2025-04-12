// app/components/AppLayout.js
"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import { mockCurrentUser } from '@/lib/mockData';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Memberships', href: '/memberships' },
    { name: 'Earn', href: '/earn' },
    { name: 'Rewards', href: '/rewards' },
];

const fallbackUserData = {
    points: 0,
};

export default function AppLayout({ children, userData }) {
  const pathname = usePathname();
  const actualUserData = userData || mockCurrentUser || fallbackUserData;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Header
        navItems={navItems}
        userData={actualUserData}
        currentPathname={pathname}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 md:pt-6 md:pb-12">
        {children}
      </main>
    </div>
  );
}