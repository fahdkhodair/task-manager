// client/src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // أداة التوجيه

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. إرسال طلب إنشاء الحساب للباك إند
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password
      });

      // 🔍 تأكد من هيكلة رد السيرفر في الكونسول
      console.log("Register Response:", response.data);

      // 2. استخراج التوكن القادم من رد الباك إند
      const token = response.data?.token || response.data?.data?.token;

      if (token) {
        // 3. حفظ التوكن فوراً لتفادي مشكلة الـ 401 في الـ Dashboard
        localStorage.setItem('token', token);
        console.log('Registered & Authenticated Successfully!');
        
        // 4. الانتقال فوراً للـ Dashboard
        navigate('/dashboard'); 
      } else {
        // إذا كان الباك إند لا يرسل توكن عند التسجيل، نرسله لصفحة اللوجن أولاً
        console.warn("No token returned on register. Redirecting to login.");
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'فشل في عملية إنشاء الحساب، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">إنشاء حساب جديد</h2>
        
        {error && (
          <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600 border border-red-200 text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-right focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-left focus:border-blue-500 focus:outline-none"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-left focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-green-600 py-2 font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? 'جاري إنشاء الحساب...' : 'تسجيل ودخول'}
          </button>
        </form>
      </div>
    </div>
  );
};






