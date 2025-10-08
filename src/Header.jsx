import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border border-[#e4e4e4] my-4 rounded-lg sticky top-0 bg-white z-10 w-[90%] mx-auto">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="font-bold text-blue-600 text-xl">
          <Link to="/">
            Job<span className="text-gray-900">Hunt</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-8 text-gray-700 text-sm">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/internship" className="hover:text-blue-600 transition">
            Internship
          </Link>
          <Link to="/signup" className="hover:text-blue-600 transition">
            Signup
          </Link>
          <Link to="/signin" className="hover:text-blue-600 transition">
            Signin
          </Link>
        </nav>

        {/* Profile Icon */}
        <div className="flex items-center bg-gray-100 p-1 rounded-full">
          <Link to="/profile">
            <CgProfile size={22} className="text-gray-600 cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
