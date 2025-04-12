// app/components/RewardCard.js
"use client";

import React, { useState, useEffect } from 'react';
import { FaGem } from 'react-icons/fa';
import Image from 'next/image';

// Helper function (keep it here or move to utils)
const calculateTimeLeft = (endDateString) => {
    // ... (keep the existing calculateTimeLeft function)
    if (!endDateString) return null;
    const difference = +new Date(endDateString) - +new Date();
    if (difference <= 0) return null;

    const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };

    Object.keys(timeLeft).forEach(interval => {
        timeLeft[interval] = timeLeft[interval].toString().padStart(2, '0');
    });
    return timeLeft;
};

export default function RewardCard({ cardData }) {
  const { logoText, imageUrl, title, description, prize, endDate } = cardData;

  // State for the calculated time left
  const [timeLeft, setTimeLeft] = useState(null); // Initialize as null

  // State to track client-side mounting
  const [hasMounted, setHasMounted] = useState(false);

  // Effect to set mount status and initialize timer ONLY on client
  useEffect(() => {
    setHasMounted(true); // Mark as mounted

    // Initial calculation after mount
    const initialTimeLeft = calculateTimeLeft(endDate);
    setTimeLeft(initialTimeLeft);

    if (!endDate || initialTimeLeft === null) return; // No timer needed if no end date or time is up

    const timerId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endDate);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === null) {
        clearInterval(timerId); // Stop interval when time runs out
      }
    }, 1000);

    // Cleanup interval on component unmount or if endDate changes
    return () => clearInterval(timerId);
  }, [endDate]); // Rerun effect if endDate changes

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-5 flex flex-col text-center items-center transition-transform hover:scale-105 duration-300 ease-in-out h-full">
       <div className="mb-4 h-10 w-auto flex items-center justify-center flex-shrink-0">
        {imageUrl ? (
            <Image src={imageUrl} alt={`${title} logo`} width={80} height={40} style={{ objectFit: "contain" }} />
        ) : (
             <span className="text-lg font-semibold text-gray-400 italic">{logoText || title}</span>
        )}
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <div className="flex items-center justify-center space-x-2 text-cyan-400 font-semibold mb-4">
            <FaGem />
            <span>{prize.toLocaleString()} Prize</span>
        </div>
      </div>
       <div className="h-5 mt-auto flex-shrink-0"> {/* Keep fixed height */}
            {/* Only render the timer or 'Ended' text if mounted */}
            {hasMounted ? (
                 <>
                    {timeLeft && endDate && (
                        <p className="text-xs text-yellow-500">
                            Ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                        </p>
                    )}
                    {!timeLeft && endDate && (
                        <p className="text-xs text-red-500">Ended</p>
                    )}
                    {/* Render nothing if no endDate */}
                 </>
            ) : (
                 // Optional: Render a placeholder during SSR and initial hydration
                 endDate ? <p className="text-xs text-gray-500 invisible">...</p> : null // Invisible placeholder maintains height
            )}
       </div>
    </div>
  );
}