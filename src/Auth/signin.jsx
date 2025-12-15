import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance"; // ✅ import your axios setup

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ Send login request
      const res = await axiosInstance.post("/auth/login", formData);

      console.log("Login success:", res.data);

      // ✅ Save user data + token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      // ✅ Optional: redirect user (customize this path)
      window.location.href = "/";

      setMessage("✅ Login successful!");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message ||
          "❌ Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[100vh] w-[100vw]">
      {/* Left Side - Illustration */}
      <div
        className="hidden md:flex w-1/2 text-white flex-col justify-center items-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1598717665776-95ba0b6647da?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-10 text-gray-300 text-sm">02/03</div>
      </div>

      {/* Right Side - SignIn Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
          {/* Logo */}
        <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                J
              </div>
              <span className="font-semibold text-lg">Job Hunt</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Please sign in to continue
          </p>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none border-[#e4e4e4]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none border-[#e4e4e4]"
            />
            <div className="flex justify-end mt-2">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full !bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center mt-4 text-sm ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Sign Up link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-400">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="flex gap-4">
            <button
              type="button"
              className="flex items-center justify-center w-1/2 border py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-xl mr-2" /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-1/2 border py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FaApple className="text-xl mr-2" /> Apple
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
