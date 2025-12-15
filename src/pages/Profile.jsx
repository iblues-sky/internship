import React, { useEffect, useState } from "react";
import {
  Star,
  Trophy,
  BadgeCheck,
  Home,
  Briefcase,
  Calendar,
  MapPin,
  Download,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [location, setLocation] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [completedInternships, setCompletedInternships] = useState([]);

  const randomLocations = [
    "Pune, India",
    "Bengaluru, India",
    "Mumbai, India",
    "Hyderabad, India",
    "Delhi, India",
    "Kolkata, India",
    "Remote",
  ];

  const randomJoinDates = [
    "Jan 2024",
    "Mar 2023",
    "Jun 2022",
    "Sep 2021",
    "Nov 2020",
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    setLocation(
      randomLocations[Math.floor(Math.random() * randomLocations.length)]
    );
    setJoinDate(
      randomJoinDates[Math.floor(Math.random() * randomJoinDates.length)]
    );

    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axiosInstance.get("/applications/users/me/applications");
      const apps = res.data.applications;
      const applied = apps
        .filter((a) => a.status !== "completed")
        .map((a) => ({
          id: a._id,
          title: a.internship?.title || "Untitled Internship",
          company: a.internship?.company || "Unknown Company",
          location: randomLocations[Math.floor(Math.random() * randomLocations.length)],
          duration: "3 Months",
          appliedOn: new Date(a.createdAt).toLocaleDateString(),
          status: a.status === "applied" ? "Under Review" : a.status,
        }));

      const completed = apps
        .filter((a) => a.status === "completed")
        .map((a) => ({
          id: a._id,
          title: a.internship?.title || "Untitled Internship",
          company: a.internship?.company || "Unknown Company",
          location: randomLocations[Math.floor(Math.random() * randomLocations.length)],
          duration: "3 Months",
          completedOn: new Date(a.updatedAt).toLocaleDateString(),
          certificateUrl: a.resume || "#",
        }));


      setAppliedInternships(applied);
      setCompletedInternships(completed);
    } catch (err) {
      console.error("Failed to fetch internships:", err);
    }
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "?";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser({ name: "", email: "", role: "" });
        window.location.href = "/signin";
  };

  return (
    <div className="mx-auto bg-white p-6 mt-10 flex flex-col md:flex-row gap-10">
      <div className="rounded-2xl border border-gray-100 p-6 w-[40%] h-fit">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-blue-200 flex justify-center items-center text-[30px] font-semibold text-white">
            {firstLetter}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user.name || "User"}
            </h2>
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.9 (120)</span>
              <span>•</span>
              <span>40 listings</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 text-gray-700">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-blue-500" />
            <span>Top Intern</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-green-500" />
            <span>2+ years</span>
          </div>
        </div>
        <div className="mt-6 space-y-3 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Joined on {joinDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>Role: {user.role || "User"}</span>
          </div>
        </div>
        <div className="w-full mt-3">
          <button className="!bg-black text-white px-2 !py-1 !rounded-full"  onClick={handleLogout}>Logout</button>
        </div>
      </div>


      <div className="flex-1 border-l border-gray-100 pl-6 w-[500px]">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Applied Internships
        </h3>

        {appliedInternships.length > 0 ? (
          appliedInternships.map((job) => (
            <div
              key={job.id}
              className="border border-gray-100 rounded-xl p-4 mb-4 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium text-gray-900">
                    {job.title}
                  </h4>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${job.status === "Interview Scheduled"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Applied: {job.appliedOn}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mb-4">
            You haven’t applied to any internships yet.
          </p>
        )}

        <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          Completed Internships
        </h3>

        {completedInternships.length > 0 ? (
          completedInternships.map((job) => (
            <div
              key={job.id}
              className="border border-gray-100 rounded-xl p-4 mb-4 transition flex justify-between items-center"
            >
              <div>
                <h4 className="text-base font-medium text-gray-900">
                  {job.title}
                </h4>
                <p className="text-sm text-gray-500">{job.company}</p>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Completed: {job.completedOn}</span>
                  </div>
                </div>
              </div>

           
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-4">
            You haven’t completed any internships yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
