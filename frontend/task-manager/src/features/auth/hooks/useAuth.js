import { useContext, useCallback, useMemo } from "react";
import { useAuth as useAuthContext } from "../../../context/AuthContext";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export default function useAuth() {
  const auth = useAuthContext();

  const register = useCallback(async (userData) => {
    const response = await axios.post(
      `${API_URL}/register`,
      userData
    );

    return response.data;
  }, []);

  const login = useCallback(async (userData) => {
    const response = await axios.post(
      `${API_URL}/login`,
      userData
    );

    return response.data;
  }, []);

  return useMemo(() => ({
    ...auth,
    register,
    login,
  }), [auth, register, login]);
};


