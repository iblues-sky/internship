import React from "react";
import Header from "../Header";


const Home = () => {
    return (
        <div className="flex min-h-screen w-screen flex-col">

            {/* Hero Section */}
            <main className="flex flex-1 items-center justify-center px-6">
                <div className="text-center max-w-2xl">
                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl font-medium text-gray-900 leading-tight">
                        Find Your <span className="text-blue-600">Dream Internship</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="mt-4 text-gray-600 text">
                        Explore opportunities that match your passion and skills.
                        Start your career journey with JobHunt today 🚀
                    </p>

                    {/* Button */}
                    <div className="mt-8">
                        <button className="px-6 py-3 !bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                            See Internships
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
