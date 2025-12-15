import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance"; // ✅ import axios instance
import { useNavigate } from "react-router-dom"; // 👈 import at top

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const navigate = useNavigate()

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

    // ✅ Merge firstName + lastName
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    // ✅ Prepare payload
    const payload = {
      name: fullName,
      email: formData.email,
      password: formData.password,
      role: "user",
    };

   try {
      const res = await axiosInstance.post("/auth/register", payload);
      console.log("Signup success:", res.data);
      setMessage("Signup successful! 🎉 Redirecting to Verify otp");
      localStorage.setItem("tempEmail", payload.email);
      setFormData({ firstName: "", lastName: "", email: "", password: "" });

      // ✅ Redirect to SignIn after short delay
      setTimeout(() => {
        navigate("/verify-otp");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-[100vw]">
      {/* Left Side - Illustration */}
      <div
        className="hidden md:flex w-1/2 text-white flex-col justify-center items-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1598717665776-95ba0b6647da?q=80&w=987&auto=format&fit=crop")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-10 text-gray-500 text-sm">01/03</div>
      </div>

      {/* Right Side - Form */}
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

          <h2 className="text-2xl font-bold text-center mb-2">
            Hi! Welcome to Wealth Wave 👋
          </h2>

          {/* First + Last Name */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none border-[#e4e4e4]"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none border-[#e4e4e4]"
            />
          </div>

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
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full !bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {message && (
            <p
              className={`text-center mt-4 text-sm ${
                message.includes("successful") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Sign In link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 font-medium hover:underline">
              Sign In
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-400">Or with email</span>
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

export default SignUp;
