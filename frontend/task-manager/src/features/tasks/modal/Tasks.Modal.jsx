import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import TaskForm from '../../tasks/components/TaskForm';

export default function TaskDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 flex justify-center items-center h-screen bg-gray-100">
      <Button variant="primary size-lg " onClick={() => setIsModalOpen(true)}>
        + Add New Task
      </Button>

      {/* Controlled modal lifecycle execution injection handling state */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New Task Workspace"
      >
        <TaskForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
