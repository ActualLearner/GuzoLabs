// app/Memberships/page.js
"use client";

import React from 'react';
import AppLayout from '../../components/AppLayout'; // Adjust path if needed
import { FaCheckCircle, FaStar, FaBed, FaConciergeBell, FaSpa, FaGlassMartiniAlt, FaCalendarCheck, FaGift } from 'react-icons/fa';

// --- Resort/Hotel Membership Plan Data ---
// Trimmed feature lists for card display, keep full list available if needed for a details view
const membershipPlans = [
  {
    id: 'explorer',
    level: 1,
    name: 'Explorer',
    priceYearly: '$199',
    description: 'Begin your journey with exclusive member rates.',
    features: [ // Show top 3-4
      'Member-only room rates (up to 10% off)',
      'Complimentary Wi-Fi',
      'Dedicated check-in line',
      'Earn points on stays', // Example: Keep 4 for lowest tier
    ],
    allFeaturesCount: 4, // Indicate total number of features
    accentColor: 'border-teal-500',
    icon: FaBed,
  },
  {
    id: 'voyager',
    level: 2,
    name: 'Voyager',
    priceYearly: '$499',
    description: 'Enhanced comfort and rewarding stays.',
    features: [ // Show top 3
      'Enhanced room rates (up to 15% off)',
      'Space-available room upgrade',
      'Late check-out (2 PM, based on availability)',
    ],
    allFeaturesCount: 5,
    accentColor: 'border-blue-500',
    icon: FaCalendarCheck,
  },
  {
    id: 'ambassador',
    level: 3,
    name: 'Ambassador',
    priceYearly: '$999',
    description: 'Experience the best with premium perks.',
    features: [ // Show top 3
      'Preferred room rates (up to 20% off)',
      'Guaranteed room upgrade (one category)',
      'Complimentary daily breakfast for two',
      //'$100 Annual Resort Credit (Dining/Spa)', // Moved down
    ],
    allFeaturesCount: 7,
    accentColor: 'border-yellow-500',
    icon: FaConciergeBell,
  },
    {
    id: 'presidential',
    level: 4,
    name: 'Presidential Circle',
    priceYearly: '$2499',
    description: 'Unparalleled service & exclusive access.',
    features: [ // Show top 3
      'Best available room rates (up to 25% off)',
      'Suite upgrade (based on availability)',
      'Personal concierge service',
      //'Complimentary airport transfers', // Moved down
    ],
    allFeaturesCount: 8,
    accentColor: 'border-purple-500',
    icon: FaGift,
  },
];

// --- Mock User Data ---
const currentUser = {
  isLoggedIn: true,
  membershipLevel: 'voyager',
};

export default function MembershipsPage() {

  const handleSubscribeClick = (plan) => {
    console.log(`Attempting to subscribe/upgrade to ${plan.name} (ID: ${plan.id})`);
    alert(`Joining ${plan.name} - Payment integration needed!`);
  };

  return (
    <AppLayout>
      {/* Adjusted max-width and padding */}
      <div className="w-full max-w-6xl mx-auto pt-8 pb-16">

        {/* Page Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-4xl font-bold text-gray-100 tracking-tight mb-3">
            Resort Membership Tiers
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Elevate your stays with exclusive access, discounts, and personalized perks. Find the perfect tier.
          </p>
        </div>

        {/* Membership Plans Grid - Updated grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"> {/* CHANGED lg:grid-cols-3 */}
          {membershipPlans.map((plan) => {
            const isCurrentPlan = currentUser.isLoggedIn && currentUser.membershipLevel === plan.id;
            const currentLevel = membershipPlans.find(p => p.id === currentUser.membershipLevel)?.level || 0;
            const isLowerTier = plan.level < currentLevel;

            let buttonText = 'Join Now';
            let buttonDisabled = false;
            let buttonAction = () => handleSubscribeClick(plan);

            if (isCurrentPlan) {
              buttonText = 'Your Current Tier';
              buttonDisabled = true;
              buttonAction = () => {};
            } else if (currentUser.isLoggedIn && !isLowerTier) {
                 buttonText = currentLevel > 0 ? 'Upgrade Tier' : 'Join Now';
            } else if (currentUser.isLoggedIn && isLowerTier){
                buttonText = 'Select Tier';
            }

            return (
              // Card - Reduced internal padding slightly, added min-height for consistency
              <div
                key={plan.id}
                className={`flex flex-col bg-slate-800 rounded-lg shadow-lg p-5 border-t-4 ${plan.accentColor} transition-transform hover:scale-[1.02] min-h-[450px]`} // Adjusted padding, added min-height
              >
                {/* Plan Name & Icon */}
                <div className="mb-3 text-center"> {/* Reduced mb */}
                  <plan.icon className={`w-7 h-7 mx-auto mb-2 ${plan.accentColor.replace('border-', 'text-')}`} /> {/* Slightly smaller icon */}
                  <h3 className={`text-xl font-semibold ${plan.accentColor.replace('border-', 'text-')}`}>{plan.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 h-10 line-clamp-2">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-4 text-center"> {/* Reduced mb */}
                  <span className="text-4xl font-bold text-gray-100">{plan.priceYearly}</span> {/* Made price larger */}
                  <span className="text-base text-gray-400"> / year</span> {/* Adjusted size */}
                </div>

                {/* Divider */}
                <hr className="border-slate-700 my-3"/>

                {/* Features List - Limited features shown */}
                <div className="flex-grow mb-4"> {/* flex-grow pushes button down */}
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Benefits:</h4>
                    <ul className="space-y-1.5 text-sm text-gray-300"> {/* Reduced space-y */}
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                        <FaCheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                        </li>
                    ))}
                    {/* Indicate more features exist */}
                    {plan.features.length < plan.allFeaturesCount && (
                         <li className="flex items-start text-xs text-gray-500">
                            <span className="w-4 mr-2 mt-0.5 flex-shrink-0 text-center">+</span>
                            <span>{plan.allFeaturesCount - plan.features.length} more benefits</span>
                            {/* Optional: Add a link/button here to view all */}
                        </li>
                    )}
                    </ul>
                </div>

                {/* Subscribe Button - increased vertical padding */}
                <button
                  onClick={buttonAction}
                  disabled={buttonDisabled}
                  className={`w-full mt-auto py-3 px-4 rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
                    ${
                      isCurrentPlan
                        ? 'bg-slate-600 text-gray-400 cursor-not-allowed'
                        : `bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500`
                    }
                    ${buttonDisabled && !isCurrentPlan ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}