// app/user/[userId]/page.js
// This can be a Server Component to easily access params and data

import React from 'react';
import { membersData } from '@/lib/mockData'; // Import the full members data - Adjust path
import { FaUser, FaEnvelope, FaStar, FaCheckCircle, FaTags, FaShoppingCart, FaTools, FaCalendarAlt, FaUtensils, FaUserCircle, FaGem } from 'react-icons/fa'; // Import icons
import Head from 'next/head'; // For setting page title

// Helper function to map discount type to an icon (optional, copy from Dashboard if needed)
const getIconForDiscountType = (type) => {
    switch (type?.toLowerCase()) {
        case 'food & beverage': return FaUtensils;
        case 'retail': return FaShoppingCart;
        case 'services': return FaTools;
        case 'events': return FaCalendarAlt;
        default: return FaTags;
    }
};


// This function receives params from the dynamic route
export default function UserDisplayPage({ params }) {
  const { userId } = params; // Get the user ID from the URL

  // Find the user in the mock data
  const user = membersData.members.find(member => member.id === userId);

  // Handle case where user is not found
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">User Not Found</h1>
          <p className="text-gray-400">The requested user profile could not be located.</p>
        </div>
      </div>
    );
  }

  // Prepare benefits data for display
   const userDiscounts = user.packageInfo?.discounts || [];
   const userBenefits = userDiscounts.map((discount, index) => ({
      id: `d-${user.id}-${index}`,
      name: `${discount.discountAmount}% Off ${discount.discountType}`,
      icon: getIconForDiscountType(discount.discountType)
   }));


  // Render user information - using a simple dark theme layout
  return (
    <>
        {/* Set the page title dynamically */}
       {/* Note: Metadata API is preferred in App Router, but Head works in Client/Server components too */}
       <Head>
            <title>{user.userInfo.fullName} - Member Profile</title>
       </Head>

        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 sm:p-6">
            <div className="bg-slate-800 w-full max-w-lg rounded-lg shadow-xl border border-slate-700/50 p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="text-center border-b border-slate-700 pb-4">
                    <FaUserCircle className="w-16 h-16 text-cyan-400 mx-auto mb-3" />
                    <h1 className="text-2xl font-bold text-gray-100">{user.userInfo.fullName}</h1>
                    {/* Email might be sensitive, consider hiding/masking */}
                    <p className="text-sm text-gray-400 mt-1">{user.userInfo.email}</p>
                </div>

                {/* Membership Details */}
                <div className="space-y-3 text-sm">
                     <h2 className="text-lg font-semibold text-gray-200 mb-2">Membership Info</h2>
                     <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-2"><FaStar /> Tier:</span>
                        <span className="font-medium text-gray-100 px-2 py-0.5 bg-slate-700 rounded">{user.membershipType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-2"><FaGem /> Points:</span>
                        <span className="font-medium text-cyan-400">{user.points.toLocaleString()}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-2"><FaCalendarAlt /> Member Since:</span>
                        <span className="font-medium text-gray-300">{new Date(user.userInfo.subscriptionStartDate).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Benefits/Discounts */}
                {userBenefits.length > 0 && (
                    <div className="space-y-3 text-sm pt-4 border-t border-slate-700">
                         <h2 className="text-lg font-semibold text-gray-200 mb-2">Key Discounts</h2>
                         <ul className="space-y-1.5">
                           {userBenefits.map((benefit) => (
                                <li key={benefit.id} className="flex items-center text-gray-300">
                                    <benefit.icon className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                                    <span>{benefit.name}</span>
                                </li>
                           ))}
                         </ul>
                    </div>
                )}

                {/* Footer/Timestamp */}
                <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-700">
                    Profile accessed on: {new Date().toLocaleString()}
                </div>
            </div>
        </div>
     </>
  );
}