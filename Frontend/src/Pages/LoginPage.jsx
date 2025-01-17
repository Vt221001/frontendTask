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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(""); // Reset error state
  //   const res = await postApi("adminLogin", formData, "", setResponse);
  //   console.log("jbqdwkj", response);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("FormData being sent:", formData); // Logs the input data

      const response = await axios.post(
        "http://localhost:8080/api/admin-login",
        formData
      );

      console.log("API Response received:", response);
      console.log("API Response data:", response.data.data); // Logs only the `data` property

      const { accessToken, refreshToken, admin } = response.data.data;

      // Validate that the required fields are present in the response
      if (!accessToken || !refreshToken || !admin || !admin.name) {
        throw new Error("Invalid user data received.");
      }

      // Use the login function from AuthProvider
      login(accessToken, refreshToken, admin);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error details:", error); // Logs the error details
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      console.log("API call finished."); // Indicates the API call process is done
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form>
          <div className="mb-4">
            <Input
              labelName="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your username"
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
            />
          </div>
          <FormButton name="Login" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
