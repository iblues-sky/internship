import React, { useEffect, useState } from "react";
import { Briefcase, MapPin, Clock, Star, X } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

// ✅ Your company logo (replace with your actual logo URL if you have one)
const talentrixLogo =
  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Talent_Icon.svg"; // You can change this to your actual Talentrix logo URL

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchInternships = async () => {
      try {
        const res = await axiosInstance.get("/internships");
        const data = res.data.map((item) => ({
          id: item._id,
          company: "Talentrix", // ✅ Always show your company name
          role: item.title,
          description: item.description,
          location: item.location || "Remote",
          duration: item.duration || "3 months",
          stipend: item.stipend || "₹25,000",
          rating: (Math.random() * 0.5 + 4.5).toFixed(1),
          reviews: Math.floor(Math.random() * 200 + 50),
          logo: talentrixLogo, // ✅ Always show Talentrix logo
        }));
        setInternships(data);
      } catch (err) {
        console.error("Failed to fetch internships:", err);
      }
    };

    fetchInternships();
  }, []);

  const handleApply = async (internship) => {
    try {
      const formDataToSend = {
        coverLetter: "Some text",
        duration: internship.duration,
      };

      const res = await axiosInstance.post(
        `/applications/internships/${internship.id}/apply`,
        formDataToSend
      );

      console.log("Applied Successfully:", res.data);
      alert(`Application submitted for ${internship.role} successfully!`);
    } catch (error) {
      console.error("Error applying:", error);
      alert("Error applying to internship. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?")) return;
    try {
      await axiosInstance.delete(`/internships/${id}`);
      setInternships((prev) => prev.filter((item) => item.id !== id));
      alert("Internship deleted successfully!");
    } catch (error) {
      console.error("Failed to delete internship:", error);
      alert("Error deleting internship. Please try again.");
    }
  };

  return (
    <section className="px-6 md:px-12 py-12 bg-gray-50 h-fit rounded-[50px]">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore <span className="text-blue-600">Talentrix Internships</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Start your career with hands-on experience at Talentrix 🚀
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="relative bg-white rounded-2xl p-6  border border-gray-100 hover:shadow-md transition duration-300"
          >
            {user?.role === "admin" && (
              <button
                onClick={() => handleDelete(internship.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            )}

            <h3 className="text-lg font-semibold text-gray-900 capitalize ">
              {internship.role}
            </h3>
            <p className="text-gray-600 text-sm">{internship.company}</p>

            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="font-medium text-gray-800">{internship.rating}</span>
              <span className="ml-1 text-gray-400">({internship.reviews} reviews)</span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" /> {internship.location}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-blue-500" /> {internship.duration}
              </p>
              <p className="flex items-center gap-2">
                <Briefcase size={16} className="text-blue-500" /> Stipend:{" "}
                <span className="font-semibold text-gray-900">{internship.stipend}/month</span>
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => handleApply(internship)}
                className="w-full py-2 !bg-black text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InternshipList;
