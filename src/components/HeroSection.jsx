import React from "react";
import InternshipList from "./Internship";
import LOGO from "../assets/Logo.jpeg"

const HeroSection = () => {

  const companyLogos = {
  Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  Microsoft: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  Amazon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  Apple: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
 
};

  return (
    <div className=" hero section h-[800px]  overflow-hidden relative">
      {/* Gradient Blobs */}
      <div className="absolute inset-x-0 md:top-10 xl:top-40 min-h-0 pl-20 py-24 flex overflow-hidden -z-10">
        <span className="block h-72 w-72 rounded-full bg-[#ef233c] opacity-10 mix-blend-multiply blur-3xl filter lg:h-76 lg:w-76"></span>
        <span className="nc-animation-delay-2000 mt-40 -ml-20 block h-72 w-72 rounded-full bg-[#04868b] opacity-10 mix-blend-multiply blur-3xl filter lg:h-76 lg:w-76"></span>
      </div>

      {/* Main Content */}
      <div className="container  px-6 py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side */}
        <div className="max-w-lg space-y-6 text-center md:text-left">
          <p>5k+ People joined</p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Find internship.
          </h1>
          <p className="text-gray-500 text-lg">
            Explore opportunities that match your passion and skills.
          </p>

          <button className="px-6 py-3 !bg-black text-white !rounded-full font-medium hover:bg-gray-800 transition">
            Start your search
          </button>

          {/* Bottom Tabs */}
          <div className="flex justify-center md:justify-start space-x-8 mt-8 text-gray-500 font-medium">
            <span className="text-black font-semibold border-b-2 border-black pb-1 cursor-pointer">
              Frontend
            </span>
            <span className="cursor-pointer hover:text-black">Backend</span>
            <span className="cursor-pointer hover:text-black">Blockchain</span>
            <span className="cursor-pointer hover:text-black">UI/UX</span>
          </div>
        </div>

        {/* Right Side Image Grid */}
        <div className="grid grid-cols-2 gap-4 mt-10 md:mt-0 md:ml-12">
          <img
            src="https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169"
            alt="Job 1"
            className="rounded-xl w-64 h-40 object-cover shadow-md"
          />
          <img
            src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
            alt="Car 2"
            className="rounded-xl w-64 h-40 object-cover shadow-md"
          />
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
            alt="Car 3"
            className="rounded-xl col-span-2 w-[520px] h-56 object-cover shadow-md"
          />
        </div>
      </div>
     <div className="container rounded absolute py-4 shadow-lg bg-white bottom-15 z-10 w-[1050px] rounded-t-[20px] rounded-b-[40px]">
      <h2 className="text-center text-black font-medium">Our  Company</h2>
      <div className="border-b border-gray-200 my-3"></div>
      <div className="flex justify-center gap-12 flex-wrap items-center px-8">
   <img src={LOGO} alt="" className="h-30" />
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
