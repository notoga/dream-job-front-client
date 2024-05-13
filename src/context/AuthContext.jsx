import { createContext, useContext, useEffect, useState } from "react";
import { ApiClient } from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // CSRF保護の初期化
  const csrf = () => ApiClient.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await ApiClient.get("/user");
    setUser(data);
  };

  const login = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await ApiClient.post("/login", data);
      await getUser();
      navigate("/");
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const register = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await ApiClient.post("/register", data);
      await getUser();
      navigate("/");
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const logout = () => {
    ApiClient.post("/logout").then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, errors, getUser, login, register, logout, csrf }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default function useAuthContext() {
  return useContext(AuthContext);
}
