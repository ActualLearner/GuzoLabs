// app/components/AppLayout.js
"use client";

import React, { useState, useEffect } from 'react'; // Import useEffect
import { usePathname } from 'next/navigation';
import Header from './Header'; // VERIFY path
import { mockCurrentUser } from '@/lib/mockData'; // VERIFY path
import { FaCommentDots, FaTimes } from 'react-icons/fa';

// Navigation items...
const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Memberships', href: '/memberships' },
    { name: 'Earn', href: '/earn' },
    { name: 'Rewards', href: '/rewards' },
];

// Fallback user data...
const fallbackUserData = { points: 0 };

export default function AppLayout({ children, userData }) {
    const pathname = usePathname();
    const actualUserData = userData || mockCurrentUser || fallbackUserData;

    // Chatbot State remains the same
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Function to toggle state
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // --- Zendesk API Interaction ---
    useEffect(() => {
        // Check if the Zendesk API object (zE) is available on the window
        if (window.zE) {
            if (isChatOpen) {
                // Use the Zendesk API to open the widget
                window.zE('webWidget', 'open');
            } else {
                // Use the Zendesk API to close the widget
                window.zE('webWidget', 'close');
            }
        } else {
            // Handle cases where the API might not be ready yet
            // This might happen on initial load or if the script fails
             console.warn("Zendesk Web Widget API (zE) not available yet.");
        }

        // Add event listener to sync state if user closes widget manually
        const handleZendeskClose = () => setIsChatOpen(false);
        window.zE?.('webWidget:on', 'close', handleZendeskClose);

        // Cleanup listener on component unmount or state change
        return () => {
             window.zE?.('webWidget:off', 'close', handleZendeskClose);
        };

    }, [isChatOpen]); // Re-run this effect when isChatOpen changes

    // Effect to hide the widget initially when the component mounts
    // This prevents the default Zendesk launcher from showing if you only want your button
    useEffect(() => {
        const hideWidget = () => {
             if (window.zE) {
                window.zE('webWidget', 'hide');
                console.log("Zendesk Widget hidden initially.");
             } else {
                 // API might not be ready, try again shortly
                 setTimeout(hideWidget, 500);
             }
        };
        // Wait a moment for the script to potentially load before trying to hide
        const initialHideTimeout = setTimeout(hideWidget, 500);

        // Cleanup timeout if component unmounts quickly
        return () => clearTimeout(initialHideTimeout);
    }, []); // Run only once on mount

    // --- End Zendesk API Interaction ---

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            <Header
                navItems={navItems}
                userData={actualUserData}
                currentPathname={pathname}
            />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 md:pt-6 md:pb-12">
                {children}
            </main>

            {/* --- Chat Toggle Button (Remains the same) --- */}
            <button
                onClick={toggleChat}
                aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
                title={isChatOpen ? "Close Chat" : "Open Chat"}
                className={`fixed bottom-5 right-5 z-40 p-3 rounded-full shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                    ${isChatOpen
                        ? 'bg-slate-600 hover:bg-slate-500 focus:ring-slate-400'
                        : 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 transform hover:scale-110'
                    }
                `}
            >
                {isChatOpen ? <FaTimes className="w-6 h-6 text-white" /> : <FaCommentDots className="w-6 h-6 text-white" />}
            </button>

            {/* --- REMOVED the placeholder chat window div --- */}
            {/* Zendesk widget will render its own UI */}

            {/* Optional Footer */}
            {/* <footer className="...">...</footer> */}
        </div>
    );
}