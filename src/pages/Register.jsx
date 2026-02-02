import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [showPassword, setShowPassword] = useState(false);


  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/login");
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-600">
      <form 
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600">
            📚 BookPadho
          </h2>
          <p className="text-gray-500 mt-1">
            Create your account
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            name="name"
            placeholder="Enter your name"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
       <div className="mb-5">
  <label className="text-sm text-gray-600">Password</label>

  <div className="relative">
    <input
      name="password"
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      className="w-full mt-1 p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onChange={handleChange}
      required
    />

    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</div>
        {/* Role Selection */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Register as</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={formData.role === "buyer"}
                onChange={handleChange}
              />
              Buyer 📖
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="seller"
                checked={formData.role === "seller"}
                onChange={handleChange}
              />
              Seller 🏷️
            </label>
          </div>
        </div>
        {
          (formData.role == "buyer" &&
             <div className="mb-4">
          <label className="text-sm text-gray-600">Address</label>
          <input
            name="address"
            placeholder="Enter your address"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
            required
          />
        </div>
          )
        }

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
