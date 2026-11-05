// client/src/features/tasks/components/TaskList.jsx
import React from 'react';
import TaskCard from './TaskCard';

/**
 * TaskList Component
 * Orchestrates iteration cycles across filter-matched task object records arrays.
 * 
 * @param {Array} tasks - Collection array consisting of active task entities
 * @param {boolean} isLoading - Global API processing state check indicator
 * @param {function} onToggleComplete - Pipeline bubble up mapping to status check updates
 * @param {function} onEditClick - Bubble dispatcher sending target values to form modals
 * @param {function} onDeleteClick - Dispatches item deletion targeting identifiers
 */
export default function TaskList({ 
  tasks = [], 
  isLoading = false, 
  onToggleComplete, 
  onEditClick, 
  onDeleteClick 
}) {
  
  // Render loading skeleton layout boxes if state is active
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-28 bg-gray-100 rounded-xl dark:bg-gray-800 w-full" />
        ))}
      </div>
    );
  }

  // Render an empty layout view if no tasks match current filters
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl p-6 dark:border-gray-800">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Get started by creating a new task configuration or adjust your filter selection rules.
        </p>
      </div>
    );
  }

  return (
     <div className="grid grid-cols-1 gap-4">
    {Array.isArray(tasks) && tasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onToggleComplete={onToggleComplete}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    ))}
  </div>
  );
}
