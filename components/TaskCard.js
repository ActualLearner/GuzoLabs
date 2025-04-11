// components/TaskCard.js
import React from 'react';
// Optional: Import icons later if needed e.g. CheckCircleIcon, GiftIcon

// Helper to format points
const formatPoints = (points) => `+${points} pts`; // Changed format slightly

function TaskCard({ task, onJoinMission }) { // Added onJoinMission prop placeholder
  const isJoinable = task.status === 'not-started';
  const isInProgress = task.status === 'in-progress';
  const isCompleted = task.status === 'completed';
  const isRedeemed = task.status === 'redeemed';

  const progressPercentage = (isInProgress && task.maxProgress > 0)
    ? (task.progress / task.maxProgress) * 100
    : 0;

  const progressText = isInProgress ? `${task.progress} of ${task.maxProgress}` : '';

  // Basic click handler simulation for Join Mission
  const handleJoinClick = () => {
    if (onJoinMission) {
      onJoinMission(task.id); // Pass task ID to parent handler
    } else {
      // Demo behavior if no handler passed
      console.log(`Simulating joining mission: ${task.title} (ID: ${task.id})`);
      alert(`Joining "${task.title}"! (In a real app, this would update state)`);
    }
  };
   // Placeholder handlers for other actions
   const handleRedeemClick = () => {
    console.log(`Simulating redeeming reward for: ${task.title} (ID: ${task.id})`);
    alert(`Redeeming reward for "${task.title}"!`);
  };


  return (
    // Base card: White background, rounded, shadow, padding, flex column structure
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 flex flex-col justify-between min-h-[180px] sm:min-h-[180px]">
      {/* Top Content Area */}
      <div>
        {/* Points Badge - Blue theme */}
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md inline-block mb-2">
          {formatPoints(task.points)}
        </span>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 truncate">
          {task.title}
        </h3>

        {/* Description (shown for not-started, completed, redeemed for context) */}
        {(isJoinable || isCompleted || isRedeemed) && task.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Progress Bar & Text (Only for In-Progress) */}
        {isInProgress && (
          <div className="mt-2">
            <div className="flex items-center justify-between gap-2">
              {/* Progress Bar Track */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                {/* Progress Bar Fill - Blue */}
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              {/* Progress Text */}
              <span className="text-[10px] sm:text-xs text-gray-500 flex-shrink-0">
                {progressText}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --- Bottom Section (Timestamp & Button) --- */}
      <div className="mt-1"> {/* Pushes content below to the bottom */}

         {/* Timestamp/Status Text (for Current tasks) */}
         {(isInProgress || isCompleted || isRedeemed) && task.completedDate && (
          <p className="text-[10px] sm:text-xs text-gray-400 mb-2 text-center sm:text-left"> {/* Centered on small screens */}
            {task.completedDate}
          </p>
        )}

        {/* Conditional Action Buttons */}
        {isJoinable && (
          <button
            onClick={handleJoinClick}
            className="w-full border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 py-1.5 sm:py-2 px-4 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Join Mission
          </button>
        )}

        {isCompleted && (
          <button
            onClick={handleRedeemClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 sm:py-2 px-4 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Redeem Reward
          </button>
        )}

        {isRedeemed && (
           <button
            className="w-full bg-gray-300 text-gray-500 py-1.5 sm:py-2 px-4 rounded-full text-xs sm:text-sm font-medium cursor-not-allowed"
            disabled
          >
            Redeemed
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
