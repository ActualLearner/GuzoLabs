// app/page.js (or app/Home/page.js)
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaGem, FaTasks, FaStar, FaGift, FaTicketAlt } from 'react-icons/fa'; // Added more icons
import AppLayout from '@/components/AppLayout';
import { mockCurrentUser } from '@/lib/mockData'; // Adjust path if needed

// Example Featured Item (replace with dynamic data later)
const featuredReward = {
    id: 'wd3', // Matches an ID from withdrawal options example
    title: 'Late Check-out Pass',
    pointsRequired: 1500,
    icon: FaTicketAlt,
    description: 'Enjoy your room a little longer on your next stay.'
};

export default function HomePage() {
    const router = useRouter();
    const currentUser = mockCurrentUser;

    const handleNavigate = (path) => {
        router.push(path);
    };

    // Basic loading/error check
    if (!currentUser) {
        return (
            <AppLayout>
                <div className="flex flex-col items-center justify-center text-center px-4 pt-10 pb-16">
                    <p className="text-gray-400">Loading user data...</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout userData={currentUser}>
            {/* Increased max-width, added vertical spacing */}
            <div className="w-full max-w-5xl mx-auto pt-8 pb-16 px-4 space-y-10 md:space-y-12">

                {/* Welcome Section */}
                <section className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
                        Welcome back, <span className="text-cyan-400">{currentUser.userInfo?.fullName?.split(' ')[0] || 'Member'}!</span>
                    </h1>
                    <p className="text-md text-gray-400">
                        Your loyalty dashboard at a glance.
                    </p>
                </section>

                {/* Quick Stats Section - Improved Styling */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Points Card */}
                    <div className="bg-slate-800 p-5 rounded-lg shadow-md border border-slate-700/50 flex items-center gap-4">
                        <FaGem className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                        <div>
                            <div className="text-sm text-gray-400 mb-0.5">Points Balance</div>
                            <div className="text-2xl font-semibold text-white">{currentUser.points?.toLocaleString() || 0}</div>
                        </div>
                    </div>
                    {/* Membership Tier Card */}
                    {currentUser.membershipType && (
                        <div className="bg-slate-800 p-5 rounded-lg shadow-md border border-slate-700/50 flex items-center gap-4">
                            <FaStar className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                            <div>
                                <div className="text-sm text-gray-400 mb-0.5">Membership Tier</div>
                                <div className="text-2xl font-semibold text-white">{currentUser.membershipType}</div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Featured Item Section */}
                 <section className="bg-gradient-to-r from-cyan-900 via-slate-800 to-slate-800 p-6 rounded-lg shadow-lg border border-cyan-700/50 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-4">
                     <div>
                        <h2 className="text-xl font-semibold text-gray-100 mb-1">Featured Reward</h2>
                        <p className="text-sm text-gray-300 mb-3 sm:mb-0">
                             <span className='font-medium'>{featuredReward.title}</span> - {featuredReward.description} Only {featuredReward.pointsRequired.toLocaleString()} points!
                        </p>
                     </div>
                    <button
                        onClick={() => handleNavigate('/Withdraw')} // Link to main withdraw/rewards page
                        className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors duration-150 ease-in-out"
                    >
                        <FaGift />
                        View Reward
                    </button>
                </section>

                {/* Call to Action Section - Improved Card Styling */}
                <section>
                     <h2 className="text-2xl font-semibold text-gray-100 mb-5 text-center sm:text-left">Quick Actions</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Explore Rewards Card */}
                        <div className="flex flex-col bg-slate-800 hover:bg-slate-700/70 border border-slate-700/50 p-5 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
                           <FaGift className="w-7 h-7 text-cyan-400 mb-3" />
                           <h3 className="text-lg font-semibold text-gray-200 mb-1">Explore Rewards</h3>
                           <p className="text-xs text-gray-400 mb-4 flex-grow">See what you can redeem your points for.</p>
                           <button onClick={() => handleNavigate('/Withdraw')} className="mt-auto text-sm font-medium text-cyan-400 hover:text-cyan-300 self-start">View Options →</button>
                        </div>

                        {/* View Missions Card */}
                         <div className="flex flex-col bg-slate-800 hover:bg-slate-700/70 border border-slate-700/50 p-5 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
                           <FaTasks className="w-7 h-7 text-cyan-400 mb-3" />
                           <h3 className="text-lg font-semibold text-gray-200 mb-1">Loyalty Missions</h3>
                           <p className="text-xs text-gray-400 mb-4 flex-grow">Complete tasks to earn bonus points.</p>
                           <button onClick={() => handleNavigate('/Missions')} className="mt-auto text-sm font-medium text-cyan-400 hover:text-cyan-300 self-start">See Missions →</button>
                        </div>

                        {/* View Membership Card */}
                        <div className="flex flex-col bg-slate-800 hover:bg-slate-700/70 border border-slate-700/50 p-5 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
                           <FaStar className="w-7 h-7 text-cyan-400 mb-3" />
                           <h3 className="text-lg font-semibold text-gray-200 mb-1">Your Membership</h3>
                           <p className="text-xs text-gray-400 mb-4 flex-grow">View your tier benefits and options.</p>
                           <button onClick={() => handleNavigate('/Memberships')} className="mt-auto text-sm font-medium text-cyan-400 hover:text-cyan-300 self-start">Manage Membership →</button>
                        </div>
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}