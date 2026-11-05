// client/src/features/tasks/components/TaskDashboard.jsx
import React, { useState } from 'react';

// 🔴 CHANGE THIS LINE (Line 4) to match the exact filename:
import { useTask } from '../hooks/useTask'; 

import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
/**
 * TaskDashboard Component
 * Central workspace dashboard view aggregating layout pipelines, sidebars, mutations, and search flows.
 */
 export function TaskDashboard() {
  // Mount the master custom state engine hook orchestrator
  const {
    tasks,
    isLoading,
    workspaceFilter,
    setWorkspaceFilter,
    filters,
    handleFilterChange,
    createTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    counts,
  } = useTask(); // Line 27 is now fully operational!

  // Local states for managing structural form interaction modal toggles
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Trigger modal display in creation configuration mode
  const handleCreateClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Trigger modal display in refinement modification mode
  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Close the popup window layer safely and wipe active edit targets
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Submits form operations back up to database mutations based on configuration modes
  const handleFormSubmit = async (formData) => {
    if (editingTask) {
      await updateTask(editingTask.id, formData);
    } else {
      await createTask(formData);
    }
    handleModalClose(); // Wipe UI layers upon completion
  };
  
  return (
    <div className="space-y-6">
      
      {/* Workspace Header Panel Block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-gray-200 dark:border-gray-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-right sm:text-left">
            Workspace Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-right sm:text-left">
            Reviewing your <span className="font-semibold text-indigo-600 dark:text-indigo-400">{workspaceFilter}</span> task streams.
          </p>
        </div>

        {/* Global Modal Insertion Call Action Trigger */}
        <Button
          type="button"
          variant="primary"
          onClick={handleCreateClick}
          className="sm:w-auto shadow-sm self-start sm:self-center"
        >
          Add New Task
        </Button>
      </div>

      {/* Component Mobile / Inline Sidebar Quick Filtering Tray */}
      <div className="flex items-center space-x-2 md:hidden overflow-x-auto pb-2 -mx-4 px-4">
        {['all', 'today', 'completed'].map((fId) => {
          const isActive = workspaceFilter === fId;
          const displayLabel = fId.charAt(0).toUpperCase() + fId.slice(1) + ' Tasks';
          return (
            <button
              key={fId}
              onClick={() => setWorkspaceFilter(fId)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-200 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300'
              }`}
            >
              {displayLabel} ({counts?.[fId] || 0})
            </button>
          );
        })}
      </div>

      {/* Search Bar & Dropdown Select Sorting Panel Layer */}
      <TaskFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Primary Multi-Row Grid Core Iteration Output Platform */}
      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        onToggleComplete={toggleTaskCompletion}
        onEditClick={handleEditClick}
        onDeleteClick={deleteTask}
      />

      {/* Unified Overlay Form Window Wrapper Context Interceptor */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingTask ? 'Edit Existing Task Portfolio' : 'Create New Task Parameter Workspace'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>

    </div>
  );
}



