// client/src/features/tasks/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

/**
 * TaskForm Component
 * Manages controlled states for capturing user fields when adding or revising tasks.
 * 
 * @param {Object} task - Optional task entity layout parameters if configuring an edit flow
 * @param {function} onSubmit - Submit mutation dispatcher (create or update action)
 * @param {function} onCancel - Trigger event handling component closure callbacks
 */
export default function TaskForm({ task = null, onSubmit, onCancel }) {
  const isEditing = !!task;

  // Initialize unified controlled input dictionary form keys
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Pre-populate structural inputs on boot if an editing task configuration is target active
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        due_date: task.due_date ? task.due_date.split('T')[0] : '', // Formats ISO string into YYYY-MM-DD
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Pass the form values back up to your parent hook data orchestrator
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'An error occurred while saving the task configuration.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <Input
        label="Task Title"
        type="text"
        name="title"
        id="title"
        required
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g., Review project documentation"
        disabled={isSubmitting}
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide additional details or sub-steps about this item..."
          disabled={isSubmitting}
          className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority Tier
          </label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white cursor-pointer"
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🔵 Low</option>
          </select>
        </div>

        <Input
          label="Due Date"
          type="date"
          name="due_date"
          id="due_date"
          value={formData.due_date}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Trigger Control Footer Layout Panels */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          {isEditing ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}


