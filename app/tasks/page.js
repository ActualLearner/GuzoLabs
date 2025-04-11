"use client";

import React, { useState } from "react";
import TaskCard from "../../components/TaskCard";
import Tier from "../../components/Tier";
import calculateTierInfo from "@/lib/utils/calculateTiers";

// --- Tier Data ---
const tiers = [
  { name: "Bronze", minPoints: 0, icon: "🥉" },
  { name: "Silver", minPoints: 500, icon: "🥈" },
  { name: "Gold", minPoints: 1500, icon: "🥇" },
  { name: "Platinum", minPoints: 3000, icon: "💎" },
];

// --- Initial Task Data ---
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

// --- Mock User Data ---
const currentUser = { points: 750 };

// --- The Page Component ---
export default function Page() {
  const [tasks, setTasks] = useState(initialTasks);
  const [tiers, setTiers] = useState([
    { name: "Bronze", minPoints: 0, icon: "🥉" },
    { name: "Silver", minPoints: 500, icon: "🥈" },
    { name: "Gold", minPoints: 1500, icon: "🥇" },
    { name: "Platinum", minPoints: 3000, icon: "💎" },
  ]);

  const tierInfo = calculateTierInfo(currentUser.points);

  const currentTasks = tasks.filter(
    (t) => t.status === "in-progress" || t.status === "completed" || t.status === "redeemed"
  );
  const joinableTasks = tasks.filter((t) => t.status === "not-started");

  const handleJoinMission = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: "in-progress", progress: 0, maxProgress: task.maxProgress || 1 }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-[family-name:var(--font-geist-sans)] pb-24">
      {/* Header Section */}
      <header className="p-6 sm:p-8 mb-6 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
          Loyalty Missions
        </h1>
        <p className="mt-1 text-md text-blue-700">
          Complete missions, earn points, track progress!
        </p>
      </header>

      {/* Main Content Area */}
      <main className="px-4 sm:px-6">
        <div className="w-full max-w-3xl mx-auto">
          {/* Tier Progression */}
          <Tier tierData={tierInfo} />

          {/* Current Missions Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-800">
                Current Missions ({currentTasks.length})
              </h2>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                History
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentTasks.length > 0 ? (
                currentTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <p className="text-gray-500 text-sm col-span-1 sm:col-span-2 text-center py-4">
                  No active missions right now.
                </p>
              )}
            </div>
          </section>

          {/* Join Missions Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-800">
                Join Missions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {joinableTasks.length > 0 ? (
                joinableTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onJoinMission={handleJoinMission} />
                ))
              ) : (
                <p className="text-gray-500 text-sm col-span-1 sm:col-span-2 text-center py-4">
                  No new missions to join.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-sm text-blue-600">
        <p>© {new Date().getFullYear()} Your Company Name</p>
      </footer>
    </div>
  );
}
