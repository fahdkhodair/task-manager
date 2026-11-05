// Quick structural sample inside TaskDashboard.jsx
import React, { useState, useEffect } from 'react';
import useTasks from '../features/tasks/hooks/useTasks';
import useDebounce from '../hooks/useDebounce';
import TaskFilters from '../features/tasks/components/TaskFilters';

export default function TaskDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const { handleFilterChange, tasks } = useTasks();
  
  // Stabilize the rapid keyboard entry string
  const debouncedSearch = useDebounce(searchTerm, 350);

  // Trigger your backend API route call ONLY when the debounced output changes
  useEffect(() => {
    handleFilterChange('search', debouncedSearch);
  }, [debouncedSearch, handleFilterChange]);

  return (
    <div>
      <input 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Type to search database..." 
      />
    </div>
  );
}

