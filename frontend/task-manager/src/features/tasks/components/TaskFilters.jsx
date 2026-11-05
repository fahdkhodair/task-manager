// client/src/features/tasks/components/TaskFilters.jsx
import React from 'react';
import Input from '../../../components/Input';

/**
 * TaskFilters Component
 * Manages search inputs, priority dropdown metrics, and due-date layout sorting trees.
 * 
 * @param {Object} filters - Core operational state configuration dictionary matching parent hooks
 * @param {function} onFilterChange - Dispatch updater routing value pairs back to parent states
 */
export default function TaskFilters({ filters = {}, onFilterChange }) {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (onFilterChange) {
      onFilterChange(name, value);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm dark:bg-gray-900 dark:border-gray-800 mb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 items-end">
        
        {/* حقل البحث المحمي بالـ Fallback */}
        <div className="sm:col-span-1 lg:col-span-2">
          <label htmlFor="search" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 dark:text-gray-400">
            Search Tasks
          </label>
          <div className="relative">
            <input
              type="text"
              name="search"
              id="search"
              // 🟢 استخدام حماية الاختيار الشرطي عشان لو الـ search ممسوح
              value={filters?.search || ''} 
              onChange={handleInputChange}
              placeholder="Filter by title or description..."
              className="w-full pl-4 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* باقي حقول الفلترة (البريروتي والترتيب) */}
        {/* ... */}

      </div>
    </div>
  );
}

