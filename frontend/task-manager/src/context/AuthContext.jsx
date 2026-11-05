import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const TOKEN_KEY = "taskflow_token";
const API_BASE_URL = "http://localhost:3000/api/auth";
axios.defaults.timeout = 10000; // 10 ثواني وبعدين يرمي error

const setAuthHeader = (token) => {
  if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete axios.defaults.headers.common.Authorization;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // حط الـ header قبل أول render للأولاد عشان أول request يطلع بالـ token
  if (token) setAuthHeader(token);

  const saveSession = useCallback((data) => {
    const t = data.token;
    if (!t) throw new Error("No token returned from server");
    localStorage.setItem(TOKEN_KEY, t);
    setAuthHeader(t);
    setToken(t);
    setUser(data.user ?? null);
  }, []);

// Inside AuthContext.jsx or LoginForm.jsx
const login = async (email, password) => {
  const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
  
  // Inspect your backend layout and choose the exact matching property:
  const token = response.data?.token || response.data?.data?.token;

  if (token) {
    localStorage.setItem('token', token);
  } else {
    console.error("Auth engine failed to find token inside response layout:", response.data);
  }
};


 const register = async (name, email, password) => {
  setIsLoading(true);
  try {
    // Axios يستقبل الرابط ثم كائن البيانات مباشرة بدون JSON.stringify
    const response = await axios.post('http://localhost:3000/api/auth/register', {
      username: name,
      email,
      password
    });

    // Axios يضع البيانات الراجعة من السيرفر داخل كائن .data تلقائياً
    const data = response.data;

    setToken(data.token);
    setUser(data.user);
    return { success: true };
  } catch (error) {
    // التقاط رسالة الخطأ القادمة من السيرفر بشكل صحيح عبر Axios
    const errorMessage = error.response?.data?.message || 'فشل في إتمام عملية التسجيل';
    return { success: false, error: errorMessage };
  } finally {
    setIsLoading(false);
  }
};

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthHeader(null);
    setToken(null);
    setUser(null);
  }, []);

  // لو أي request رجع 401 (token منتهي) اخرج تلقائي
  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 && !err.config.url?.includes(`${API_BASE_URL}/`)) logout();
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(id);
  }, [logout]);

  const value = useMemo(
    () => ({ user, token, isAuthenticated: !!token, login, register, logout }),
    [user, token, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};



// Inside AuthContext.jsx or LoginForm.jsx
const handleLoginSubmit = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    
    // 🔍 Print the full layout to see exactly where your token lives
    console.log("Full Login Response Data:", response.data);

    // 🟢 Extract safely depending on how your backend is built:
    const token = response.data?.token || response.data?.data?.token;

    if (token) {
      localStorage.setItem('token', token); // This fixes the 'null' readout!
      console.log("Token successfully committed to local storage.");
    } else {
      console.error("The request succeeded, but no token field was found in:", response.data);
    }
  } catch (error) {
    console.error("Login endpoint failed:", error);
  }
};




