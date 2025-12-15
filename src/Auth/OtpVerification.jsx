import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // ✅ your axios setup
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  
  useEffect(() => {
    // Prefill email from tempEmail in localStorage
    const tempEmail = localStorage.getItem("tempEmail");
    if (tempEmail) setEmail(tempEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    

    try {
      // ✅ Adjust API endpoint as per your backend route
      const res = await axiosInstance.post("/auth/verify-otp", { email, otp });
      console.log("OTP verified:", res.data);
      setMessage("✅ OTP Verified Successfully! You can now login.");
      setOtp("");
      setEmail("");
          setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.error("OTP verification error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "❌ Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-[100vw]">
      {/* Left Illustration */}
      <div
        className="hidden md:flex w-1/2 text-white flex-col justify-center items-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1604147495798-57beb5d6af73?q=80&w=987&auto=format&fit=crop")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-10 text-gray-400 text-sm">02/03</div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8"
        >
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
            Verify Your Email 🔒
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Enter the 6-digit OTP sent to your email address
          </p>

      
          {/* OTP Input */}
          <div className="mb-6">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none border-[#e4e4e4] tracking-widest text-center text-lg font-medium"
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full !bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
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

          {/* Resend OTP */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={() => alert("Resend OTP triggered!")}
              className="text-blue-600 font-medium hover:underline"
            >
              Resend OTP
            </button>
          </p>

          {/* Go Back */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Back to{" "}
            <a href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
