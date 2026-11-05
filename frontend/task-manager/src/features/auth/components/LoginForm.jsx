// client/src/features/auth/components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth'; // تأكد إن المسار ده واصل لملف useAuth.js بتاعك صح

/**
 * مكون فورم تسجيل الدخول (Login)
 * منسق بالكامل بـ Tailwind ومحمي ضد مشاكل فقدان التوكن
 */
export default function LoginForm() {
  const { login } = useAuth(); // سحب دالة تسجيل الدخول من الهوك المحسن
  const navigate = useNavigate(); // أداة التوجيه السريع للأقسام المحمية

  // تجميع مدخلات تسجيل الدخول في الـ State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // دالة مراقبة الكتابة وتحديث الحقول تلقائياً
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null); // امسح رسائل الخطأ القديمة أول ما المستخدم يبدأ يكتب تاني
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { email, password } = formData;

    // 1. حماية الفرونت إند - تأكد إن مفيش حقل فاضي
    if (!email || !password) {
      setError('يا فنان، لازم تملأ البريد الإلكتروني وكلمة المرور الأول.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. إرسال بيانات الدخول للـ هوك ومنه لـ API الباك إند
      await login({ email, password });

      // 3. التوجيه الفوري للداش بورد طالما التوكن اتسيف في الـ localStorage جوه الهوك
      console.log("تم تسجيل الدخول بنجاح، جاري فتح لوحة التحكم...");
      navigate('/dashboard', { replace: true }); // replace: true عشان يمسح صفحة اللوجن من تاريخ المتصفح
      
    } catch (err) {
      console.error('Login submit error:', err);
      // التقاط رسالة الخطأ الحقيقية اللي راجعة من السيرفر (زي إن الباسورد غلط أو الحساب مش موجود)
      setError(err.response?.data?.message || err.message || 'خطأ في البريد الإلكتروني أو كلمة المرور، جرب تاني.');
      setIsSubmitting(false);
    }
  };

    return (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
    <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-xl dark:bg-gray-900 dark:border-gray-800">
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          تسجيل الدخول إلى حسابك
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          معندكش حساب لسه؟{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            إنشاء حساب جديد من هنا
          </Link>
        </p>
      </div>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md flex items-center justify-end text-right">
          <span className="mr-2">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-right" dir="rtl">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            disabled={isSubmitting}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left dark:bg-gray-800"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            كلمة المرور
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            disabled={isSubmitting}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left dark:bg-gray-800"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            {isSubmitting ? 'جاري التحقق...' : 'دخول إلى لوحة التحكم'}
          </button>
        </div>
      </form>

    </div>
  </div>
);
}




