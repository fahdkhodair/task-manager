// client/src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AuthLayout Component
 * Provides a split-screen container frame layout for public-facing onboarding forms.
 * Automatically bounces signed-in users out to prevent accessing login endpoints.
 */
export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // Block route builds if global authorization hydration validation loops are running
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Pre-emptive Route Redirection Guard for active user sessions
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Left Form View Panels Chamber Container */}
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-gray-900 z-10 shadow-xl">
        <div className="w-full max-w-sm mx-auto lg:w-96 flex flex-col items-center">
          
          {/* Dynamic Nested Child Route Form Projection Site */}
          <Outlet />
          
        </div>
      </div>

      {/* Right Side Decorative Branding Layout Section (Hidden on Mobile) */}
      <div className="relative flex-1 hidden w-0 lg:block bg-indigo-900 overflow-hidden">
        
        {/* Geometric Abstract Overlay Layer */}
        <div className="absolute inset-0 opacity-20 mixing-blend-overlay pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-400 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-500 blur-3xl" />
        </div>

        {/* Framing Content Centered Block */}
        <div className="flex flex-col justify-center h-full px-16 text-white max-w-2xl relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <svg className="w-10 h-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="text-3xl font-extrabold tracking-tight">TaskFlow</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
            Organize your daily workflows, instantly.
          </h1>
          <p className="text-lg text-indigo-200 font-medium leading-relaxed">
            A high-performance workspace engineered with a Node.js API ecosystem backstopped by reliable PostgreSQL data tracking constraints.
          </p>
        </div>
        
      </div>

    </div>
  );
}


