// client/src/hooks/useTask.js
import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '../services/taskApi';

export const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. جلب كل المهام بأمان مع فحص التوكن
  const fetchTasks = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (!token || token === 'null' || token === 'undefined') {
      setError('برجاء تسجيل الدخول أولاً.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await taskApi.getAll();
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (err) {
      console.error('Task fetch engine failure:', err);
      setError(err.response?.data?.message || 'فشل في جلب المهام.');
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. إنشاء مهمة جديدة - 🟢 تم تغليفها بـ useCallback صح وحذف السنتاكس المكسور
  // جوه ملف useTasks.js أو useTask.js الخاص بك

const createTask = async (taskData) => {
  setLoading(true);
  setError(null);
  try {
    // استدعاء دالة الـ create من ملف الـ api اللي لسه مصلحينه فوق
    const newTask = await taskApi.create(taskData);
    
    // تحديث المصفوفة المحلية فوراً (Optimistic UI) عشان المهمة تظهر في الشاشة علطول
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    return { success: true, data: newTask };
  } catch (err) {
    console.error('فشل في إرسال وكتابة المهمة الجديدة:', err);
    setError(err.response?.data?.message || 'فشل في إنشاء المهمة، تأكد من اتصال السيرفر.');
    return { success: false, error: err.message };
  } finally {
    setLoading(false);
  }
};

  // تشغيل الجلب تلقائياً أول ما الصفحة تفتح
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask
  };
};


