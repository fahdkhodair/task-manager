// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './features/auth/hooks/useAuth';
import AppRoutes from './routes/AppRoutes';
import { TaskDashboard } from './features/tasks/components/TaskDashboard';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <Router> {/* الـ Router الأصلي مكانه هنا ومغطي كل حاجة */}
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}






