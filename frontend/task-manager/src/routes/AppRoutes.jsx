// client/src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // 🟢 شلنا الـ BrowserRouter من هنا
import LoginForm  from '../features/auth/components/LoginForm';
import { TaskDashboard } from '../features/tasks/components/TaskDashboard';
import { RegisterForm } from '../features/auth/components/RegisterForm';

// مكون حماية المسارات (Protected Route)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token || token === 'null') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function AppRoutes() {
  return (
    // 🟢 تم إزالة تاغ الـ <Router> الخارجي لمنع التكرار والكراش
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      
      {/* حماية صفحة الداش بورد */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <TaskDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* تحويل أي مسار عشوائي للوجن */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}



