// app/Missions/page.js
"use client";

import React, { useState, useEffect } from "react";
import AppLayout from '../../components/AppLayout';         // VERIFY THIS PATH
import TaskCard from '../../components/TaskCard';           // VERIFY THIS PATH
import TierProgress from '../../components/Tier'; // VERIFY THIS PATH & Filename (using TierProgress based on its code)
import calculateTierInfo from '@/lib/utils/calculateTiers'; // VERIFY THIS PATH
import { mockCurrentUser } from '@/lib/mockData';         // VERIFY THIS PATH
import { FaTasks, FaSpinner, FaExclamationTriangle } from 'react-icons/fa'; // Icons

// --- Tier Data (Same as before) ---
const tiers = [
  { name: "Standard", minPoints: 0, icon: "🥉" },   // Aligning names with mockData example
  { name: "Premium", minPoints: 800, icon: "🥈" }, // Adjusted points thresholds maybe?
  { name: "Lifetime", minPoints: 2000, icon: "🥇" },
  { name: "Elite", minPoints: 5000, icon: "💎" },   // Added Elite based on mockData packageInfo
];

// --- Task Data (Same initial tasks) ---
const initialTasks = [
    { id: 1, title: "Daily Resort Check-in", status: "in-progress", points: 100, progress: 3, maxProgress: 7, completedDate: "Expires 28/02/24", description: "Check-in via the app each day during your stay." }, // Added descriptions
    { id: 2, title: "Weekly Stay Streak", status: "in-progress", points: 250, progress: 1, maxProgress: 2, completedDate: "Expires 29/02/24", description: "Complete stays in consecutive weeks." },
    { id: 3, title: "Refer 3 Friends", description: "Get friends to sign up and book their first stay.", status: "completed", points: 500, completedDate: "Completed 15/02/24" },
    { id: 4, title: "Write a Stay Review", description: "Share your thoughts on your last stay.", status: "redeemed", points: 50, completedDate: "Redeemed 10/02/24" },
    { id: 5, title: "Complete Daily Trivia", description: "Answer trivia about our resorts.", status: "not-started", points: 20 },
    { id: 6, title: "Engage with App Features", description: "Log in and explore different app sections daily.", status: "not-started", points: 150 },
    { id: 7, title: "Attend a Resort Event", description: "Join a workshop, dining event, or activity.", status: "not-started", points: 300 },
    { id: 8, title: "Dining Challenge", description: "Dine at 3 different resort restaurants.", status: "not-started", points: 400 },
];


export default function EarningOpportunitiesPage() { // Renamed component export for clarity
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch/Load tasks logic (same as before)
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Simulate loading for now
    const timer = setTimeout(() => {
        setTasks(initialTasks);
        setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Use mock data for tier calculation - replace with fetched user data
  const currentUser = mockCurrentUser;
  const tierInfo = calculateTierInfo(currentUser?.points ?? 0, tiers);

  // Filter tasks
  const activeOpportunities = tasks.filter(
    (t) => t.status === "in-progress" || t.status === "completed" || t.status === "redeemed"
  );
  const availableOpportunities = tasks.filter((t) => t.status === "not-started");

  // Handler to update task status (needs API call)
  const handleJoinOpportunity = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: "in-progress", progress: 0, maxProgress: task.maxProgress || 1 }
          : task
      )
    );
    console.log(`Joining opportunity ID: ${taskId} - TODO: API Call`);
  };

  return (
    <AppLayout userData={currentUser}>
      {/* Adjusted max-width and padding */}
      <div className="w-full max-w-5xl mx-auto pt-8 pb-16 px-4 space-y-10 md:space-y-12">

        {/* Page Header */}
        <section className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-2">
                Earning Opportunities {/* Changed Title */}
            </h1>
            <p className="text-md text-gray-400">
                Engage with activities, complete stays, and refer friends to earn more points towards rewards.
            </p>
        </section>

        {/* Tier Progression - Using TierProgress component */}
        {/* Ensure TierProgress uses dark theme styling */}
        {tierInfo && <TierProgress tierData={tierInfo} />}

        {/* Loading State */}
        {isLoading && (
            <div className="flex justify-center items-center py-10">
                <FaSpinner className="animate-spin h-8 w-8 text-cyan-400 mr-3" />
                <p className="text-center text-gray-400">Loading opportunities...</p>
            </div>
        )}

        {/* Error State */}
        {error && (
             <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-sm flex items-center justify-center gap-2">
                 <FaExclamationTriangle /> Error loading opportunities: {error}
             </div>
        )}

        {/* Task Sections - Added styled wrappers */}
        {!isLoading && !error && (
             <div className="space-y-10 md:space-y-12">
                 {/* Active Opportunities Section */}
                <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
                    <div className="flex justify-between items-center mb-5 border-b border-slate-700 pb-3">
                        <h2 className="text-xl font-semibold text-gray-200">
                            Active Opportunities ({activeOpportunities.length})
                        </h2>
                        <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300"> {/* Changed to button for potential action */}
                            View History
                        </button>
                    </div>
                    {/* Grid for Task Cards */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${activeOpportunities.length === 0 ? 'min-h-[100px] flex items-center justify-center' : ''}`}>
                        {activeOpportunities.length > 0 ? (
                            activeOpportunities.map((task) => <TaskCard key={task.id} task={task} />)
                        ) : (
                            <p className="text-gray-400 text-sm text-center">
                                You have no active earning opportunities right now. Explore below!
                            </p>
                        )}
                    </div>
                </section>

                {/* Available Opportunities Section */}
                <section className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700/50">
                    <div className="flex justify-between items-center mb-5 border-b border-slate-700 pb-3">
                        <h2 className="text-xl font-semibold text-gray-200">
                            Available Opportunities ({availableOpportunities.length})
                        </h2>
                         {/* Optional: Add filter/sort here */}
                    </div>
                     {/* Grid for Task Cards */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${availableOpportunities.length === 0 ? 'min-h-[100px] flex items-center justify-center' : ''}`}>
                        {availableOpportunities.length > 0 ? (
                            availableOpportunities.map((task) => (
                                // Pass the renamed handler
                                <TaskCard key={task.id} task={task} onJoinMission={handleJoinOpportunity} />
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm text-center">
                                No new opportunities available at the moment.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        )}
      </div>
    </AppLayout>
  );
}