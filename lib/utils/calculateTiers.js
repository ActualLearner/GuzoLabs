// --- Tier Calculation Logic ---
export default function calculateTierInfo(currentPoints) {
  let currentTier = tiers[0];
  let nextTier = null;
  let pointsForNextTier = Infinity;
  let progressPercentage = 0;
  let pointsProgress = currentPoints;

  for (let i = tiers.length - 1; i >= 0; i--) {
    if (currentPoints >= tiers[i].minPoints) {
      currentTier = tiers[i];
      pointsProgress = currentPoints - tiers[i].minPoints;

      if (i < tiers.length - 1) {
        nextTier = tiers[i + 1];
        pointsForNextTier = nextTier.minPoints - tiers[i].minPoints;
        progressPercentage = Math.min(
          100,
          (pointsProgress / pointsForNextTier) * 100
        );
      } else {
        nextTier = null;
        pointsForNextTier = 0;
        progressPercentage = 100;
      }
      break;
    }
  }

  // Handle edge case for lowest tier
  if (!nextTier && tiers.length > 1 && currentTier.name === tiers[0].name) {
    nextTier = tiers[1];
    pointsForNextTier = nextTier.minPoints - currentTier.minPoints;
    progressPercentage = Math.min(
      100,
      (pointsProgress / pointsForNextTier) * 100
    );
  }

  return {
    currentTier,
    nextTier,
    pointsProgress,
    pointsNeededForNext: nextTier ? nextTier.minPoints : currentPoints,
    pointsForNextTierLevelSpan: pointsForNextTier,
    progressPercentage: Math.round(progressPercentage),
    isMaxTier: !nextTier && currentTier.name === tiers[tiers.length - 1].name,
    totalUserPoints: currentPoints,
  };
}