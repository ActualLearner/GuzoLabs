// app/Memberships/page.js
"use client";

import React from 'react';
import AppLayout from '../../components/AppLayout'; // Adjust path if needed
import { FaCheckCircle, FaStar, FaBed, FaConciergeBell, FaSpa, FaGlassMartiniAlt, FaCalendarCheck, FaGift } from 'react-icons/fa'; // Import relevant icons
import { mockCurrentUser } from '@/lib/mockData'; // Import the mock user data - Adjust path if needed

// --- Resort/Hotel Membership Plan Data ---
// IMPORTANT: Ensure the 'id' field here matches the possible values
// in mockCurrentUser.membershipType (case-insensitive check is used below)
const membershipPlans = [
  {
    id: 'standard', // Matches 'Standard' from mock data (via lowercase comparison)
    level: 1,
    name: 'Standard', // Changed name to match mock data
    priceYearly: '199 birr',
    description: 'Begin your journey with exclusive member rates.',
    features: [
      'Member-only room rates (up to 10% off)',
      'Complimentary Wi-Fi',
      'Dedicated check-in line',
      'Earn points on stays',
    ],
    allFeaturesCount: 4,
    accentColor: 'border-teal-500',
    icon: FaBed,
  },
  {
    id: 'premium', // Matches 'Premium' from mock data
    level: 2,
    name: 'Premium', // Changed name to match mock data
    priceYearly: '499 birr',
    description: 'Enhanced comfort and rewarding stays.',
    features: [
      'Enhanced room rates (up to 15% off)',
      'Space-available room upgrade',
      'Late check-out (2 PM, based on availability)',
    ],
    allFeaturesCount: 5,
    accentColor: 'border-blue-500',
    icon: FaCalendarCheck,
  },
  {
    id: 'lifetime', // Matches 'Lifetime' from mock data
    level: 3,
    name: 'Lifetime', // Changed name to match mock data
    priceYearly: '999 birr', // Example price, could be one-time or different model
    description: 'Experience the best with premium perks for life.',
    features: [
      'Preferred room rates (up to 20% off)',
      'Guaranteed room upgrade (one category)',
      'Complimentary daily breakfast for two',
    ],
    allFeaturesCount: 7, // Example count based on mock data (might include more)
    accentColor: 'border-yellow-500',
    icon: FaConciergeBell,
  },
    {
    id: 'elite', // Corresponds to packageType 'Elite' - add if needed as a separate tier
    level: 4,
    name: 'Elite Circle', // Example Name
    priceYearly: '2499 birr',
    description: 'Unparalleled service & exclusive access.',
    features: [
      'Best available room rates (up to 25% off)',
      'Suite upgrade (based on availability)',
      'Personal concierge service',
    ],
    allFeaturesCount: 8, // Example count based on mock data
    accentColor: 'border-purple-500',
    icon: FaGift,
  },
];


export default function MembershipsPage() {
    // Use the imported mock user data
    // In a real app, fetch this or get from context/session
    const currentUser = mockCurrentUser;

    // Check if currentUser exists before proceeding
    if (!currentUser) {
      // Optionally return a loading state or handle the absence of user data
      return (
          <AppLayout>
              <div className="text-center py-10 text-gray-400">Loading user information...</div>
          </AppLayout>
      );
    }

    const handleSubscribeClick = (plan) => {
        console.log(`Attempting to subscribe/upgrade to ${plan.name} (ID: ${plan.id}) for user ${currentUser.id}`);
        // --- Add Resort Subscription Logic Here ---
        alert(`Joining ${plan.name} - Payment integration needed!`);
    };

    // Determine the current user's membership level ID (lowercase) for reliable comparison
    const currentUserLevelId = currentUser.membershipType?.toLowerCase();

    return (
        <AppLayout userData={currentUser}> {/* Pass user data to layout/header */}
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

                {/* Membership Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {membershipPlans.map((plan) => {
                        // Check if this card represents the user's current plan
                        const isCurrentPlan = currentUserLevelId === plan.id.toLowerCase();

                        // Find the numeric level of the current plan (or 0 if none)
                        const currentNumericLevel = membershipPlans.find(p => p.id.toLowerCase() === currentUserLevelId)?.level || 0;
                        // Check if the displayed plan is a lower tier than the user's current tier
                        const isLowerTier = plan.level < currentNumericLevel;

                        // Determine button text and state
                        let buttonText = 'Join Now';
                        let buttonDisabled = false;
                        let buttonAction = () => handleSubscribeClick(plan);

                        if (isCurrentPlan) {
                            buttonText = 'Your Current Tier';
                            buttonDisabled = true;
                            buttonAction = () => {}; // No action on current plan button
                        } else if (currentUser.userInfo?.isMember && !isLowerTier) { // Use isMember flag
                            buttonText = currentNumericLevel > 0 ? 'Upgrade Tier' : 'Join Now';
                        } else if (currentUser.userInfo?.isMember && isLowerTier){
                            buttonText = 'Select Tier'; // Allow selection but may need confirmation for downgrade
                            // buttonDisabled = true; // Optionally disable downgrade button explicitly
                        }
                        // Add logic here if user is NOT logged in (e.g., redirect to signup)
                        // else if (!currentUser.userInfo?.isMember) { buttonText = 'Sign Up to Join'; buttonAction = () => router.push('/signup'); }


                        return (
                            // Individual Membership Card
                            <div
                                key={plan.id}
                                className={`flex flex-col bg-slate-800 rounded-lg shadow-lg p-5 border-t-4 ${plan.accentColor} transition-transform hover:scale-[1.02] min-h-[450px]`}
                            >
                                {/* Plan Name & Icon */}
                                <div className="mb-3 text-center">
                                    <plan.icon className={`w-7 h-7 mx-auto mb-2 ${plan.accentColor.replace('border-', 'text-')}`} />
                                    <h3 className={`text-xl font-semibold ${plan.accentColor.replace('border-', 'text-')}`}>{plan.name}</h3>
                                    <p className="text-xs text-gray-400 mt-1 h-10 line-clamp-2">{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-4 text-center">
                                    <span className="text-4xl font-bold text-gray-100">{plan.priceYearly}</span>
                                    <span className="text-base text-gray-400"> / year</span>
                                </div>

                                {/* Divider */}
                                <hr className="border-slate-700 my-3"/>

                                {/* Features List */}
                                <div className="flex-grow mb-4">
                                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Benefits:</h4>
                                    <ul className="space-y-1.5 text-sm text-gray-300">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <FaCheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {plan.features.length < plan.allFeaturesCount && (
                                            <li className="flex items-start text-xs text-gray-500">
                                                <span className="w-4 mr-2 mt-0.5 flex-shrink-0 text-center">+</span>
                                                <span>{plan.allFeaturesCount - plan.features.length} more benefits</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* Subscribe Button */}
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