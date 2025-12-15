import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const PostInternship = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
    stipend: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const companies = [
    "Talentrix",
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.role !== "admin") {
        navigate("/"); 
      }
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const res = await axiosInstance.post("/internships", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ Internship posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        duration: "",
        stipend: "",
        description: "",
      });
      console.log("Response:", res.data);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "❌ Failed to post internship."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl min-w-[1000px] mx-auto bg-white  rounded-2xl p-8 mt-10 min-h-[750px]">
      <h1 className="!text-[25px] font-semibold mb-6 text-center">
        Post a New Internship
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-[70%] mx-auto border border-gray-100 p-4 rounded-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Internship Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Frontend Developer Intern"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none border-gray-300"
          >
            <option value="">Select a Company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Bengaluru, India / Remote"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none border-gray-300"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              placeholder="e.g. 3 Months"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none border-gray-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stipend
          </label>
          <input
            type="text"
            name="stipend"
            placeholder="e.g. ₹10,000/month"
            value={formData.stipend}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none border-gray-300"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Describe the role, responsibilities, and requirements..."
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none border-gray-300"
          />
        </div>

   
        <button
          type="submit"
          disabled={loading}
          className="w-full !bg-black text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {loading ? "Posting..." : "Post Internship"}
        </button>

        {message && (
          <p
            className={`text-center mt-2 text-sm ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default PostInternship;
