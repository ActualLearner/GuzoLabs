// app/Reward/page.js
"use client"; // Keep if page-specific interactions or client-side fetching is needed

import React from 'react'; // No useState/useEffect needed here if timer is in Card
import { FaGem } from 'react-icons/fa';
import AppLayout from '../../components/AppLayout'; // Import the layout
import RewardCard from '../../components/RewardCard'; // Import the card

// --- Sample Data (can be fetched here or passed as props) ---
const rewardCardsData = [
    {
      id: 1,
      logoText: "Skulldugger",
      title: "Skulldugger",
      description: "Earn 2200 points",
      prize: 12000,
      endDate: null,
    },
    {
      id: 2,
      logoText: "Klaxxon",
      title: "Klaxxon",
      description: "Earn 2500 points",
      prize: 15000,
      endDate: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000 + 0 * 60 * 60 * 1000 + 43 * 60 * 1000 + 51 * 1000).toISOString(),
    },
    {
      id: 3,
      logoText: "Ultralex",
      title: "Ultralex",
      description: "Earn 2000 points",
      prize: 10000,
      endDate: null,
    },
  ];

const rankingsData = [
    // Example data
    // { place: 1, username: 'PlayerOne', points: 15000, prize: '500 Gems' },
];

export default function RewardPage() {
  // Potential data fetching logic here

  return (
    <AppLayout> {/* Wrap content with the AppLayout */}
      {/* Reward Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {rewardCardsData.map((card) => (
          // Pass data to the reusable RewardCard component
          <RewardCard key={card.id} cardData={card} />
        ))}
      </div>

      {/* Status Line */}
      <div className="text-center text-gray-400 text-sm mb-12">
        You earned <FaGem className="inline text-cyan-400 mx-1" /> 50 today and are ranked — out of 13868 users
      </div>

      {/* Your Rankings Section */}
      <div className="bg-slate-800/50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Your Rankings</h2>
        <div className="grid grid-cols-4 gap-4 pb-3 border-b border-gray-700 mb-4">
          {/* Table Header */}
          <div className="text-sm font-semibold text-gray-400">Place</div>
          <div className="text-sm font-semibold text-gray-400">Username</div>
          <div className="text-sm font-semibold text-gray-400">Points</div>
          <div className="text-sm font-semibold text-gray-400">Prize</div>
        </div>
        <div className="space-y-3">
          {/* Table Body */}
          {rankingsData.length > 0 ? (
            rankingsData.map((rank, index) => (
              // Consider a RankRow component if row logic gets complex
              <div key={index} className="grid grid-cols-4 gap-4 text-sm items-center">
                <div className="font-medium">{rank.place}</div>
                <div>{rank.username}</div>
                <div>{rank.points.toLocaleString()}</div>
                <div>{rank.prize}</div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No ranking data available yet.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}