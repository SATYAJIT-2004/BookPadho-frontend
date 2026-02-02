import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await API.post("/auth/login", formData);

    login(data); 

    toast.success("Login successful");

    // Role-based navigation
    const role = data.user.role;

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "seller") {
      navigate("/seller/dashboard");
    } else {
      navigate("/");
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};



  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-600">
      <form
        className="bg-indigo-100 w-full max-w-md p-8 rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600">📚 BookPadho</h2>
          <p className="text-gray-500 mt-1">Login to your account</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@gmail.com"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-5"></div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
