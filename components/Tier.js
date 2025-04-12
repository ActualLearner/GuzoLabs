// components/Tier.js
import React from 'react';

function Tier({ tierData }) {

  // Check if data is provided - Skeleton Loader adapted for dark theme
  if (!tierData || !tierData.currentTier) {
    console.warn("Tier component received no or invalid tierData prop:", tierData);
    return (
      // Dark theme skeleton
      <div className="w-full p-6 border border-slate-700/50 rounded-xl shadow-lg bg-slate-800 mb-8 animate-pulse">
        <div className="h-5 bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-slate-600 rounded-full w-full mb-3"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
      </div>
    );
  }

  // Destructure the pre-calculated data
  const {
    currentTier,
    nextTier,
    pointsNeededForNext, // This seems incorrect based on calculation below, should be nextTier.minPoints?
    progressPercentage,
    isMaxTier,
    totalUserPoints,
  } = tierData;

  // Recalculate pointsRemaining for clarity, ensure nextTier exists
  const pointsRemaining = !isMaxTier && nextTier ? nextTier.minPoints - totalUserPoints : 0;
  // Determine denominator for display (using nextTier.minPoints seems more standard)
  const tierMaxPointsDisplay = !isMaxTier && nextTier ? nextTier.minPoints : totalUserPoints;


  // --- Dark Theme Version ---
  return (
    // Main container: Dark background, subtle border, consistent shadow
    <div className="w-full p-6 rounded-xl shadow-lg bg-slate-800 border border-slate-700/50 text-gray-100 mb-8 transition-shadow hover:shadow-xl">

        {/* Header Part */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4"> {/* Added flex-wrap and gap */}
            <h2 className="text-xl font-semibold tracking-tight text-gray-100">
              Your Progress {currentTier.icon}
            </h2>
            {/* Badge: Dark theme */}
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-900/70 text-cyan-300 uppercase tracking-wider">
              {currentTier.name} Tier
            </span>
        </div>

        {/* Progress Bar Part */}
        <div className="mb-1">
            {/* Text above progress bar: Light text */}
            <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
              <span>{isMaxTier ? `Total Points:` : `Points to ${nextTier?.name || 'Next Tier'}`}</span>
              {/* Display format: current / target */}
              <span>{isMaxTier ? `${totalUserPoints.toLocaleString()} pts` : `${totalUserPoints.toLocaleString()} / ${tierMaxPointsDisplay.toLocaleString()} pts`}</span>
            </div>

            {/* Progress Bar: Dark track, cyan fill */}
            <div
                className="w-full bg-slate-600 rounded-full h-2.5 overflow-hidden"
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`Tier progress: ${currentTier.name}`}
            >
              <div
                className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
               />
            </div>

            {/* Text below progress bar: Dimmer text */}
            {!isMaxTier && nextTier && pointsRemaining > 0 && (
                <p className="text-xs text-gray-400 mt-2 text-right">
                    {pointsRemaining.toLocaleString()} more points for {nextTier.name}
                </p>
            )}
            {isMaxTier && (
                <p className="text-xs text-cyan-300 font-medium mt-2 text-right">
                    You've reached the highest tier! ✨
                </p>
            )}
        </div>
    </div>
  );
}

export default Tier;