// client/src/features/tasks/services/taskApi.js
import axios from 'axios';

// 1. إنشاء نسخة مخصصة من Axios تشير للباك إند
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true // لتأمين إرسال الكوكيز وجلسات العمل إذا لزم الأمر
});

// 2. 🔴 الـ Interceptor السحري: بيقش التوكن الحي ويحقنه في الهيدر فوراً
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // تأكد إن التوكن سليم ومش مخرّف كـ نص فاضي أو كلمة null
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. تصدير دوال التعامل مع المهام باسم مسمى وصحيح
export const taskApi = {
  // جلب المهام
  getAll: async (params = {}) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },
  
  // 🟢 دالة إنشاء المهمة التي يستدعيها زرار الـ Create Task
  create: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  }
};




