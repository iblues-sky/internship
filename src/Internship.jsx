import React, { useState } from "react";
import {
  FaLaptopCode,
  FaServer,
  FaChartLine,
  FaPencilRuler,
} from "react-icons/fa";

const Internship = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechSoft Pvt Ltd",
      description:
        "Work with React, TailwindCSS, and modern UI frameworks to build user-friendly interfaces.",
      icon: <FaLaptopCode className="text-blue-500 text-xl" />,
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      company: "CodeWorks Solutions",
      description:
        "Assist in building REST APIs with Node.js and Express. Gain hands-on database experience.",
      icon: <FaServer className="text-green-500 text-xl" />,
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      company: "Insight Analytics",
      description:
        "Analyze datasets, create reports, and visualize insights using Python and Tableau.",
      icon: <FaChartLine className="text-purple-500 text-xl" />,
    },
    {
      id: 4,
      title: "UI/UX Designer Intern",
      company: "Creative Minds Studio",
      description:
        "Design wireframes, prototypes, and user flows for web and mobile applications.",
      icon: <FaPencilRuler className="text-pink-500 text-xl" />,
    },
  ];

  const openModal = (internship) => {
    setSelectedInternship(internship);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedInternship(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // collect form data here
    const formData = new FormData(e.target);
    console.log("Form submitted:", Object.fromEntries(formData));
    closeModal();
  };

  return (
    <div className="min-h-screen w-[100vw] py-12 px-6">
      <div className="container mx-auto">
        {/* Page Heading */}
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-10">
          Latest <span className="text-blue-600">Internships</span>
        </h1>

        {/* Internship Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship) => (
            <div
              key={internship.id}
              onClick={() => openModal(internship)}
              className="bg-white cursor-pointer rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition"
            >
              {/* Title with Icon */}
              <div className="flex items-center gap-3 mb-2">
                {internship.icon}
                <h2 className="text-lg font-semibold text-gray-800">
                  {internship.title}
                </h2>
              </div>

              {/* Company */}
              <p className="text-sm text-gray-500 mb-2">{internship.company}</p>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
                {internship.description}
              </p>

              {/* Apply Button */}
              <button className="px-3 py-2 !bg-blue-600 text-white rounded-lg !text-sm font-medium hover:bg-blue-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && selectedInternship && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Apply for {selectedInternship.title}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {selectedInternship.company}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Education Stream
                </label>
                <input
                  type="text"
                  name="education"
                  required
                  placeholder="e.g. B.Tech CSE"
                  className="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marks / CGPA
                </label>
                <input
                  type="text"
                  name="marks"
                  required
                  placeholder="e.g. 8.5 CGPA"
                  className="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Resume
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  className="mt-1 block w-full text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-lg !text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 !bg-blue-600 text-white rounded-lg !text-sm font-medium hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internship;
