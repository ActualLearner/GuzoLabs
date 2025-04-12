// app/Earn/page.js
import React from 'react';
import AppLayout from '../../components/AppLayout'; // Adjust path if necessary

export default function EarnPage() {
  return (
    <AppLayout> {/* Wrap content with the AppLayout */}
      {/* Specific content for the Earn page */}
      <div className="pt-10"> {/* Add some top padding if needed */}
        <h1 className="text-3xl font-semibold text-white mb-3">
          Earn Section Content
        </h1>
        <p className="text-gray-300">
          This is where information about earning points will be displayed.
        </p>
        {/* You can add more components or information related to earning points here */}
      </div>
    </AppLayout>
  );
}