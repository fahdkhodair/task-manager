// client/src/components/Sidebar.jsx
import React from 'react';

/**
 * Sidebar Navigation Component
 * Provides quick-link workspace filters for filtering current task collections.
 * 
 * @param {string} currentFilter - Active filtering criteria state passed down from the dashboard parent
 * @param {function} onFilterChange - Call execution callback to update active filtering conditions
 */
export default function Sidebar({ currentFilter = 'all', onFilterChange }) {
  
  // Navigation structural menu mapping definitions
  const menuItems = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      id: 'today',
      label: 'Today',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 p-4 sticky top-16 hidden md:block dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col h-full justify-between">
        
        {/* Navigation Link Lists Section */}
        <div className="space-y-6">
          <div>
            <p className="px-3 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
              Workspace Filters
            </p>
            <nav className="mt-2 space-y-1">
              {menuItems.map((item) => {
                const isActive = currentFilter === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onFilterChange && onFilterChange(item.id)}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    <span className={`mr-3 ${isActive ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500'}`}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Optional Categories / Project Sub-Tier Workspace Section */}
          <div>
            <p className="px-3 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
              Tags & Priorities
            </p>
            <div className="mt-2 px-3 text-xs text-gray-500 dark:text-gray-400 space-y-2">
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2" /> High Priority</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2" /> Medium Priority</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2" /> Low Priority</div>
            </div>
          </div>
        </div>

        {/* Footer App Metadata Version Tracker */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-400 dark:text-gray-500">
          TaskFlow v1.0.0
        </div>
        
      </div>
    </aside>
  );
}


