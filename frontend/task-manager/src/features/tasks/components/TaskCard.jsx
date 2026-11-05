// client/src/features/tasks/components/TaskCard.jsx
import React, { useState } from 'react';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';

/**
 * TaskCard Component - Displays a single task item row/grid element
 * 
 * @param {Object} task - The task record entity objects
 * @param {function} onToggleComplete - Async status handler for task status toggles
 * @param {function} onEditClick - Action trigger exposing target data to edit forms
 * @param {function} onDeleteClick - Async delete event routing dispatch handler
 */
export default function TaskCard({ 
  task, 
  onToggleComplete, 
  onEditClick, 
  onDeleteClick 
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Formats human-readable ISO target calendar days cleanly
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Maps backend database priority string metrics to design badge themes
  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'primary';
      default: return 'default';
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDeleteClick(task.id);
    } catch (err) {
      setIsDeleting(false); // Restore interactable state if backend deletion crashes
    }
  };

  return (
    <div className={`p-5 bg-white border rounded-xl shadow-sm transition-all duration-200 hover:shadow-md dark:bg-gray-900 ${
      task.is_completed ? 'border-gray-200 opacity-65 dark:border-gray-800' : 'border-gray-200 dark:border-gray-800'
    }`}>
      <div className="flex items-start space-x-4">
        
        {/* Custom Circular Status Checkbox Tracker */}
        <div className="flex items-center h-6">
          <input
            id={`task-complete-${task.id}`}
            type="checkbox"
            checked={task.is_completed || false}
            onChange={() => onToggleComplete && onToggleComplete(task.id, !task.is_completed)}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-500 cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Core Narrative Information Body Segment */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 gap-2">
            <h4 className={`text-base font-semibold leading-6 truncate text-gray-900 dark:text-white ${
              task.is_completed ? 'line-through text-gray-400 dark:text-gray-500' : ''
            }`}>
              {task.title}
            </h4>
            
            {/* Dynamic visual category tag integration */}
            <Badge variant={getPriorityVariant(task.priority)} className="flex-shrink-0">
              {task.priority}
            </Badge>
          </div>

          <p className={`text-sm mb-4 line-clamp-2 text-gray-500 dark:text-gray-400 ${
            task.is_completed ? 'line-through' : ''
          }`}>
            {task.description || 'No descriptive context added.'}
          </p>

          {/* Metadata Footer Blocks info row */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
              <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={new Date(task.due_date) < new Date() && !task.is_completed ? 'text-red-500 font-medium' : ''}>
                {formatDate(task.due_date)}
              </span>
            </div>

            {/* Action Operations Tray Panels Control Buttons */}
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEditClick && onEditClick(task)}
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 !py-1 !px-2"
                disabled={isDeleting}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDelete}
                isLoading={isDeleting}
                className="text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 !py-1 !px-2"
              >
                {!isDeleting && 'Delete'}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

