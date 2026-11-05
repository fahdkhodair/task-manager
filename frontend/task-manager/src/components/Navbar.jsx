import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b">
      <span className="font-semibold text-gray-700">
        Welcome back, <b className="text-indigo-600">{user?.name || 'User'}</b>!
      </span>
      <Button variant="outline" size="sm" onClick={logout}>
        Sign Out
      </Button>
    </nav>
  );
}



