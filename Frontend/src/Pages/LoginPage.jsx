import React, { useState } from "react";
import Input from "../Common/Input";
import FormButton from "../Common/Button";
import postApi from "../Utility/API/postApi";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      toast.success("Please fill all the fields");
      return;
    }
    setLoading(true);

    try {
      console.log("FormData being sent:", formData);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/admin-login`,
        formData
      );

      console.log("API Response received:", response);
      console.log("API Response data:", response.data.data);

      const { accessToken, refreshToken, admin } = response.data.data;

      if (!accessToken || !refreshToken || !admin || !admin.name) {
        throw new Error("Invalid user data received.");
      }

      login(accessToken, refreshToken, admin);
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
      console.log("API call finished.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#865D36] to-[#A69080] bg-gray-100">
      <ToastContainer />
      <div className="bg-[#A69080] p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form>
          <div className="mb-4 ">
            <Input
              labelName="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <Input
              labelName="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <FormButton name="Login" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
