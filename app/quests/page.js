// app/Missions/page.js
"use client";

import React, { useState, useEffect } from "react";
import AppLayout from '../../components/AppLayout'; // VERIFY THIS PATH
import TaskCard from '../../components/TaskCard'; // VERIFY THIS PATH
import Tier from '../../components/Tier';       // VERIFY THIS PATH
import calculateTierInfo from '@/lib/utils/calculateTiers'; // VERIFY THIS PATH

// --- Tier Data ---
const tiers = [
  { name: "Bronze", minPoints: 0, icon: "🥉" },
  { name: "Silver", minPoints: 500, icon: "🥈" },
  { name: "Gold", minPoints: 1500, icon: "🥇" },
  { name: "Platinum", minPoints: 3000, icon: "💎" },
];

// --- Initial Task Data (Used as fallback or initial state) ---
const initialTasks = [
    { id: 1, title: "Daily check-in", status: "in-progress", points: 100, progress: 3, maxProgress: 7, completedDate: "Expires 28/02/24" },
    { id: 2, title: "Weekly loyalty streak", status: "in-progress", points: 250, progress: 1, maxProgress: 2, completedDate: "Expires 29/02/24" },
    { id: 3, title: "Refer 3 Friends", description: "Get friends to sign up and book.", status: "completed", points: 500, completedDate: "Completed 15/02/24" },
    { id: 4, title: "Write a Review", description: "Share your thoughts on your last stay.", status: "redeemed", points: 50, completedDate: "Redeemed 10/02/24" },
    { id: 5, title: "Complete daily quiz", description: "Complete 5 different quizzes everyday.", status: "not-started", points: 500 },
    { id: 6, title: "App engagement", description: "Log in to the loyalty app every day for a week.", status: "not-started", points: 150 },
    { id: 7, title: "Special event attendance", description: "Attend a store event or virtual workshop.", status: "not-started", points: 300 },
    { id: 8, title: "Purchase challenge", description: "Make three purchases within the next two weeks.", status: "not-started", points: 400 },
];

// --- Mock User Data (Replace with actual user data) ---
const currentUser = { points: 750 };

// --- The Page Component ---
export default function MissionsPage() {
  const [tasks, setTasks] = useState([]); // Start empty
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // **FIXED: Reinstated useEffect to load tasks**
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Option 1: Fetch from API (Preferred) - Uncomment and adjust URL
    /*
    fetch("/api/tasks") // Example API route
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setTasks(Array.isArray(data) ? data : initialTasks); // Validate data
      })
      .catch(err => {
        console.error("Failed to fetch tasks:", err);
        setError(err.message);
        setTasks(initialTasks); // Fallback to initial data on error
      })
      .finally(() => {
        setIsLoading(false);
      });
    */

    // Option 2: Use static initialTasks (Simpler for now) - Comment out if using fetch
    // Simulate fetch delay for loading state demonstration
    const timer = setTimeout(() => {
        setTasks(initialTasks);
        setIsLoading(false);
    }, 500); // Simulate 0.5 second load

    return () => clearTimeout(timer); // Cleanup timer

  }, []); // Empty dependency array = runs once on mount

  // Calculate tier info
  const tierInfo = calculateTierInfo(currentUser.points, tiers);

  // Filter tasks (this part was likely okay)
  const currentTasks = tasks.filter(
    (t) => t.status === "in-progress" || t.status === "completed" || t.status === "redeemed"
  );
  const joinableTasks = tasks.filter((t) => t.status === "not-started");

  // Handler to update task status
  const handleJoinMission = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: "in-progress", progress: 0, maxProgress: task.maxProgress || 1 }
          : task
      )
    );
    // TODO: Add API call to persist change
  };

  return (
    // Use the AppLayout for consistent header/background
    <AppLayout>
      {/* Main Content Container - REMOVED light gradient, uses AppLayout's dark bg */}
      {/* Added padding-top to give space below the sticky header */}
      <div className="w-full max-w-4xl mx-auto pt-6 pb-12">

        {/* Page Header */}
        <div className="mb-8 px-4 sm:px-0"> {/* Add padding for smaller screens if needed */}
            <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-2">
                Loyalty Missions
            </h1>
            <p className="text-md text-gray-300">
                Complete missions, earn points, and track your progress!
            </p>
        </div>

        {/* Tier Progression - Ensure Tier component is styled for dark bg */}
        <div className="mb-10 px-4 sm:px-0">
            <Tier tierData={tierInfo} />
        </div>

        {/* Loading State */}
        {isLoading && (
            <div className="flex justify-center items-center py-10">
                 {/* You can replace this with a spinner component */}
                <p className="text-center text-gray-400">Loading missions...</p>
            </div>
        )}

        {/* Error State */}
        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-8 mx-4 sm:mx-0">
                <p className="text-center font-medium">Error loading missions: {error}</p>
            </div>
        )}

        {/* Task Sections - Render only if not loading and no critical error */}
        {!isLoading && !error && (
             <div className="space-y-12"> {/* Added space between sections */}
                 {/* Current Missions Section */}
                <section>
                    <div className="flex justify-between items-center mb-4 px-4 sm:px-0">
                        <h2 className="text-xl font-semibold text-gray-200">
                            Current Missions ({currentTasks.length})
                        </h2>
                        {/* Adjusted link style for dark theme */}
                        <a href="#" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">
                            History
                        </a>
                    </div>
                    {/* Grid for Task Cards - Ensure TaskCard has appropriate dark theme styling */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4 sm:px-0">
                        {currentTasks.length > 0 ? (
                            currentTasks.map((task) => <TaskCard key={task.id} task={task} />)
                        ) : (
                            <p className="text-gray-400 text-sm md:col-span-2 text-center py-6">
                                You haven't started any missions yet.
                            </p>
                        )}
                    </div>
                </section>

                {/* Join Missions Section */}
                <section>
                    <div className="flex justify-between items-center mb-4 px-4 sm:px-0">
                        <h2 className="text-xl font-semibold text-gray-200">
                            Join Missions
                        </h2>
                        {/* Optional: Add filter/sort controls here */}
                    </div>
                     {/* Grid for Task Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4 sm:px-0">
                        {joinableTasks.length > 0 ? (
                            joinableTasks.map((task) => (
                            <TaskCard key={task.id} task={task} onJoinMission={handleJoinMission} />
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm md:col-span-2 text-center py-6">
                                No new missions available right now. Check back later!
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