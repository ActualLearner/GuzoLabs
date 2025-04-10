// components/TierProgress.js (or Tier.js - ensure filename matches import)
import React from 'react';

function TierProgress({ tierData }) {

  // Check if data is provided
  if (!tierData || !tierData.currentTier) {
    console.warn("TierProgress component received no or invalid tierData prop:", tierData);
    // --- FIX IS HERE: Put the actual skeleton JSX inside the return() ---
    return (
      <div className="w-full p-6 border rounded-xl shadow-lg bg-gray-200 mb-8 animate-pulse">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-300 rounded-full w-full mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
    // --- END FIX ---
  }

  // Destructure the pre-calculated data FROM THE tierData PROP
  const {
    currentTier,
    nextTier,
    pointsNeededForNext,
    progressPercentage,
    isMaxTier,
    totalUserPoints,
  } = tierData;

  const pointsRemaining = nextTier ? nextTier.minPoints - totalUserPoints : 0;

  // The rest of your component's return statement for the actual progress bar
  return (
    <div className="w-full p-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white mb-8 transition-shadow hover:shadow-xl">
        {/* Header Part */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Your Progress {currentTier.icon}
            </h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-blue-800 uppercase tracking-wider">
              {currentTier.name} Tier
            </span>
        </div>
        {/* Progress Bar Part */}
        <div className="mb-1">
            <div className="flex justify-between text-sm font-medium text-blue-100 mb-1">
              <span>{isMaxTier ? `Total Points: ${totalUserPoints}` : `Points to ${nextTier?.name || 'Next Tier'}`}</span>
              <span>{isMaxTier ? "Max Tier!" : `${totalUserPoints} / ${pointsNeededForNext} pts`}</span>
            </div>
            <div className="w-full bg-blue-200/30 rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100" aria-label={`Tier progress: ${currentTier.name}`}>
              <div className="bg-white h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }} />
            </div>
            {!isMaxTier && nextTier && pointsRemaining > 0 && (<p className="text-xs text-blue-200 mt-2 text-right">{pointsRemaining} more points for {nextTier.name}</p>)}
            {isMaxTier && (<p className="text-xs text-white font-medium mt-2 text-right">You've reached the highest tier! ✨</p>)}
        </div>
    </div>
  );
}

export default TierProgress;
