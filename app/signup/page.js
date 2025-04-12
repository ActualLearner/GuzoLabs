// app/signup/page.js
"use client";

import React, { useState } from 'react';
import AppLayout from '../../components/AppLayout'; // Adjust path if needed
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa'; // Icons for inputs

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing again
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(false);

    // Basic Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) { // Example minimum length
        setError('Password must be at least 6 characters long.');
        return;
    }

    setLoading(true);

    // --- TODO: Replace with your actual API call ---
    try {
      console.log('Submitting signup data:', {
          name: formData.name,
          email: formData.email,
          // DO NOT log the password in production!
      });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock success response (replace with actual response check)
      const mockApiSuccess = true; // Assume success for now

      if (mockApiSuccess) {
        setSuccess(true);
        // Optionally clear form or redirect after a short delay
        setTimeout(() => {
            // Maybe redirect to login or dashboard after successful signup
            // router.push('/login');
            router.push('/Dashboard'); // Redirect to dashboard
        }, 2000);
      } else {
        // Handle specific API errors if provided by backend
        setError('Signup failed. Please try again.');
      }

    } catch (err) {
      console.error("Signup error:", err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
    // --- End TODO ---
  };

  return (
    <AppLayout>
      {/* Center the content */}
      <div className="flex flex-col items-center justify-center pt-10 pb-16 px-4">
        <div className="w-full max-w-md">

          {/* Form Container */}
          <div className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700/50">
            <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
              Create Your Account
            </h1>

            {/* Display Success Message */}
             {success && (
                <div className="bg-green-900/80 border border-green-700 text-green-200 px-4 py-3 rounded-md mb-6 text-sm text-center flex items-center justify-center gap-2">
                   <FaCheckCircle /> Account created successfully! Redirecting...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-4 w-4 text-slate-400" />
                    </span>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        placeholder="John Doe"
                        disabled={loading || success}
                    />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email Address
                </label>
                 <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-4 w-4 text-slate-400" />
                    </span>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        placeholder="you@example.com"
                        disabled={loading || success}
                    />
                 </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-4 w-4 text-slate-400" />
                    </span>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                        className="block w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        placeholder="••••••••"
                        disabled={loading || success}
                    />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                 <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-4 w-4 text-slate-400" />
                    </span>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        placeholder="••••••••"
                        disabled={loading || success}
                    />
                </div>
              </div>

              {/* Display Error Messages */}
               {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
               )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors duration-150 ease-in-out ${
                    loading || success
                      ? 'bg-slate-600 cursor-not-allowed'
                      : 'bg-cyan-600 hover:bg-cyan-700'
                  }`}
                >
                  {loading ? 'Creating Account...' : (success ? 'Account Created!' : 'Sign Up')}
                </button>
              </div>
            </form>

             {/* Link to Login */}
            <p className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
                    Log In
                </Link>
            </p>

          </div> {/* End Form Container */}
        </div>
      </div>
    </AppLayout>
  );
}