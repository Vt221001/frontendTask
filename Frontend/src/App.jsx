import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./Pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllUser from "./Pages/AllUser";
import RegistrationPage from "./Pages/RegistrationPage";
import AdminUserPage from "./Pages/AdminUserPage";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./context/PrivateRoute";
import NotFoundErrorPage from "./Pages/NotFoundErrorPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <ToastContainer />
          <Routes>
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route
              path="/"
              element={
                  <AllUser />
              }
            />
            <Route
              path="/user-register"
              element={
                <PrivateRoute>
                  <RegistrationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-edit-delete"
              element={
                <PrivateRoute>
                  <AdminUserPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundErrorPage/>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
