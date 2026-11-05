// client/src/layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1 relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🔴 تأكد من تمرير قيم افتراضية للـ counts حتى لا يعطي التطبيق خطأ قراءة null أو undefined */}
        <Sidebar currentFilter="all" counts={{ all: 0, today: 0, completed: 0 }} />

        <main className="flex-1 min-w-0 py-6 md:pl-8 overflow-y-auto">
          <div className="w-full max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


