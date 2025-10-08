import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <div className="flex min-h-screen w-[100vw]">
            {/* Left Side - Illustration */}
            <div className="hidden md:flex w-1/2  text-white flex-col justify-center items-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598717665776-95ba0b6647da?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute bottom-10 text-gray-500 text-sm">
                    01/03
                </div>
            </div>

            {/* Right Side - SignUp Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md p-8"
                >
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">W</div>
                            <span className="font-semibold text-lg">Wealth Wave</span>
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-center mb-2">
                        Hi! Welcome to Wealth Wave dude 👋
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
                            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:none border border-[#e4e4e4]"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:none border border-[#e4e4e4]"
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
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:none border border-[#e4e4e4]"
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
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:none border border-[#e4e4e4]"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full !bg-blue-600 text-white py-2 rounded-lg font-medium "
                    >
                        Sign Up
                    </button>

                    {/* Sign In link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 font-medium hover:underline">
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
                            className="flex items-center justify-center w-1/2 border  py-2 rounded-lg hover:bg-gray-100 transition"
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
