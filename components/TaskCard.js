// components/TaskCard.js
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Example icon for redeemed

// Helper to format points - consistent with previous usage
const formatPoints = (points) => `+${points} pts`;

export default function TaskCard({ task, onJoinMission }) {
  // Status flags remain the same
  const isJoinable = task.status === 'not-started';
  const isInProgress = task.status === 'in-progress';
  const isCompleted = task.status === 'completed';
  const isRedeemed = task.status === 'redeemed';

  // Progress calculation remains the same
  const progressPercentage = (isInProgress && task.maxProgress > 0)
    ? (task.progress / task.maxProgress) * 100
    : 0;

  const progressText = isInProgress ? `${task.progress} of ${task.maxProgress}` : '';

  // Click handlers remain the same
  const handleJoinClick = () => {
    if (onJoinMission) {
      onJoinMission(task.id);
    } else {
      console.warn(`No onJoinMission handler provided for task: ${task.title}`);
    }
  };

  const handleRedeemClick = () => {
    // In a real app, this would likely trigger an API call and update task state
    console.log(`Simulating redeeming reward for: ${task.title} (ID: ${task.id})`);
    alert(`Redeeming reward for "${task.title}"!`);
    // Potentially update task state here to 'redeemed' visually, though backend should confirm
  };


  return (
    // Base card: Dark background, rounded, subtle shadow/border, padding, flex column
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700/50 flex flex-col justify-between min-h-[180px]">

      {/* Top Content Area - Takes available space */}
      <div className="flex-grow">
        {/* Points Badge - Dark theme with Cyan accent */}
        <span className="bg-cyan-900/70 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-md inline-block mb-3">
          {formatPoints(task.points)}
        </span>

        {/* Title - Light text */}
        <h3 className="text-base font-semibold text-gray-100 mb-1 truncate">
          {task.title}
        </h3>

        {/* Description - Dimmer text */}
        {(isJoinable || isCompleted || isRedeemed) && task.description && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Progress Bar & Text (Only for In-Progress) - Dark theme */}
        {isInProgress && (
          <div className="mt-2 mb-3"> {/* Added margin-bottom */}
            <div className="flex items-center justify-between gap-2">
              {/* Progress Bar Track - Darker gray */}
              <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                {/* Progress Bar Fill - Cyan */}
                <div
                  className="bg-cyan-500 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                  aria-valuenow={progressPercentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
              {/* Progress Text - Dimmer text */}
              <span className="text-[11px] text-gray-400 flex-shrink-0">
                {progressText}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --- Bottom Section (Timestamp & Button) --- */}
      <div className="mt-auto"> {/* Ensures this stays at the bottom */}

         {/* Timestamp/Status Text - Dimmest text */}
         {(isInProgress || isCompleted || isRedeemed) && task.completedDate && (
          <p className="text-[11px] text-slate-500 mb-2 text-center sm:text-left">
            {task.completedDate}
          </p>
        )}

        {/* Conditional Action Buttons - Dark theme styles */}
        {isJoinable && (
          <button
            onClick={handleJoinClick}
            className="w-full border border-cyan-600 text-cyan-400 bg-transparent hover:bg-slate-700 py-1.5 px-4 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Join Mission
          </button>
        )}

        {isCompleted && (
          <button
            onClick={handleRedeemClick}
            // Solid cyan button, consider text color based on contrast
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-1.5 px-4 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Redeem Reward {/* You might want a Gift icon here later */}
          </button>
        )}

        {isRedeemed && (
           <button
            className="w-full flex items-center justify-center gap-2 bg-slate-700 text-slate-400 py-1.5 px-4 rounded-full text-sm font-medium cursor-not-allowed"
            disabled
          >
            <FaCheckCircle className="w-4 h-4" /> {/* Added icon */}
            Redeemed
          </button>
        )}
      </div>
    </div>
  );
}