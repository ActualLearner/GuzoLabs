// app/qr_code/page.js
"use client";

import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import AppLayout from '../../components/AppLayout'; // Adjust path if needed
import { mockCurrentUser } from '@/lib/mockData'; // Import mock user data - Adjust path if needed
import { FaEnvelope, FaQrcode, FaSpinner, FaExclamationTriangle } from 'react-icons/fa'; // Added loading/error icons

export default function QRCodeGeneratorPage() {
  // State to hold the FULL URL for the QR code
  const [userProfileFullUrl, setUserProfileFullUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Effect to generate the full URL when the component mounts
  useEffect(() => {
    setIsLoading(true);
    setError("");

    if (mockCurrentUser?.id) {
      try {
        // --- Generate Absolute URL ---
        // Get the base URL (protocol + hostname + port) from the current window location
        const baseUrl = window.location.origin;

        // Construct the full URL
        const fullUrl = `${baseUrl}/user/${mockCurrentUser.id}`;
        setUserProfileFullUrl(fullUrl);
         // --- End Generate Absolute URL ---

      } catch (err) {
         console.error("Error constructing URL:", err);
         setError("Could not determine application URL.");
         setUserProfileFullUrl("");
      }

    } else {
      // Handle case where user ID isn't available
      setError("User ID not found for QR Code generation.");
      setUserProfileFullUrl("");
      console.warn("User ID not found for QR Code generation.");
    }
    setIsLoading(false);

  }, []); // Empty dependency array ensures this runs only once on mount

  // Email sending logic remains the same, uses userProfileFullUrl now
  const handleSendEmail = async () => {
    if (!userProfileFullUrl || error) {
        alert("Cannot send email: User profile URL not generated or error occurred.");
        return;
    }
    // ... (rest of email sending logic using userProfileFullUrl) ...
     const canvas = document.getElementById("qrCanvas");
     if (!canvas) { /* ... */ return; }
     const qrCodeData = canvas.toDataURL("image/png");
     if (!qrCodeData || qrCodeData === 'data:,') { /* ... */ return; }

     try {
         const response = await fetch("/api/send-email", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
                 qrCodeDataUri: qrCodeData,
                 profileUrl: userProfileFullUrl, // Send the full URL
                 // userId: mockCurrentUser?.id // Backend might still need this to find email
             }),
         });
         // ... handle response ...
        const data = await response.json();
        if (response.ok) { alert(`Success: ${data.message}`); }
        else { alert(`Error: ${data.message || 'Failed to send email.'}`); }
     } catch (error) { /* ... handle error ... */ }
  };

  return (
    <AppLayout userData={mockCurrentUser}>
      <div className="flex flex-col items-center justify-center pt-10 pb-16 px-4 text-center">
        <FaQrcode className="w-16 h-16 text-cyan-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-100 mb-3">Your Member QR Code</h1>
        <p className="text-gray-400 mb-6 max-w-md">
          Scan this code to quickly access your public member profile.
        </p>

        {/* QR Code Display Area */}
        <div className="bg-white p-4 rounded-lg inline-block shadow-lg mb-6 min-w-[216px] min-h-[216px] flex items-center justify-center">
            {isLoading && <FaSpinner className="animate-spin h-10 w-10 text-slate-500" />}
            {error && <div className="text-center"><FaExclamationTriangle className="mx-auto h-8 w-8 text-red-500 mb-2"/><p className="text-sm text-red-600 px-2">{error}</p></div>}
            {!isLoading && !error && userProfileFullUrl && (
                <QRCodeCanvas
                    id="qrCanvas"
                    value={userProfileFullUrl} // Use the FULL URL
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                />
            )}
        </div>

        {/* Display the FULL URL for debugging/info */}
        {userProfileFullUrl && !error && (
            <p className="text-xs text-slate-500 mb-6 break-all px-4">
                Linked URL: {userProfileFullUrl}
            </p>
        )}

        {/* Email Button */}
        <button
          className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 ${
              !userProfileFullUrl || isLoading || error
                  ? 'bg-slate-600 text-gray-400 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white'
          }`}
          onClick={handleSendEmail}
          disabled={!userProfileFullUrl || isLoading || error}
        >
          <FaEnvelope />
          Send to My Email
        </button>
         <p className="text-xs text-slate-500 mt-3">(Requires backend setup)</p>
      </div>
    </AppLayout>
  );
}