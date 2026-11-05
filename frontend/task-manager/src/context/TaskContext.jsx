
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

const TaskContext = createContext(null);

const API_URL = "/api/tasks";

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/all`);
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/create`, taskData);
      setTasks((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, taskData);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data : task))
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      fetchTasks,
      createTask,
      updateTask,
      deleteTask,
    }),
    [tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}
