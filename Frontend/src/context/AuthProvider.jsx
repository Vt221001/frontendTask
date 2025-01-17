import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState(() => localStorage.getItem("name"));
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
  );
  const [userRole, setUserRole] = useState(() => {
    const token = localStorage.getItem("authToken");
    return token ? jwtDecode(token).role : null;
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = (authToken, refreshToken, user) => {
    setLoading(true);
    setAuthToken(authToken);
    setName(user.name);

    localStorage.setItem("authToken", authToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("name", user.name);

    setLoading(false);
    navigate("/user-edit-delete");
  };

  const logout = () => {
    setLoading(true);

    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("name");

    setAuthToken(null);
    setUserRole(null);
    setName(null);

    setLoading(false);
    navigate("/admin-login");
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        name,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
