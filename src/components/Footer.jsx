import React from "react";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 text-white py-4 mt-12 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Talentrix. All rights reserved.
        </p>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 md:mt-0 !text-gray-400 hover:text-pink-500 transition"
        >
          <Instagram size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
