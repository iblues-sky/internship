import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, Briefcase, User, FileText, PlayCircle } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

const Application = () => {
  const [applications, setApplications] = useState([]);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await axiosInstance.get("/applications");
      setApplications(res.data);
      console.log("Successfully fetched data", res.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  };

  // ✅ Start Internship
  const handleStartInternship = async (id) => {
    try {
      await axiosInstance.put(`/applications/${id}/start`);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: "accepted", startTime: new Date() } : app
        )
      );
      console.log("Internship started:", id);
    } catch (err) {
      console.error("Error starting internship:", err);
    }
  };

  // ✅ Mark Completed
  const handleMarkCompleted = async (id, duration) => {
    console.log(duration);
    try {
      await axiosInstance.put(`/applications/${id}/status`, {
        status: "completed",
        duration: duration,
      });

      // Update UI optimistically
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, status: "completed", completedTime: new Date() }
            : app
        )
      );

      console.log("Application marked as completed:", id);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDownloadCertificate = async (app) => {
    console.log("Download Certificate", app);
    try {
      const params = new URLSearchParams({
        name: app.user?.name || "Unknown",
        email: app.user?.email || "NoEmail",
        course: app.internship?.title || "Internship",
        duration: app.duration || "8",
        certSlug: app.certificate?.certSlug,
        courseId: app.internship?._id,
      });

      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }api/certs/generate-certificate?${params.toString()}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Separate applications by status
  const completedApps = applications.filter((app) => app.status === "completed");
  const inProgressApps = applications.filter((app) => app.status !== "completed");

  return (
    <div className="p-8 max-w-7xl mx-auto min-w-[1000px]  min-h-screen  mt-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Internship <span className="text-blue-600">Applications</span>
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT: In Progress */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
              <Clock size={20} /> In Progress
            </h3>
            {inProgressApps.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                No in-progress applications
              </p>
            ) : (
              <div className="space-y-6">
                {inProgressApps.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white rounded-2xl p-6  border border-gray-100 "
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {app.internship?.title || "Untitled Internship"}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        {app.status}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                      <p className="flex items-center gap-2">
                        <User size={16} className="text-blue-500" />
                        <span>
                          <strong>Applicant:</strong> {app.user?.name}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Briefcase size={16} className="text-blue-500" />
                        <span>
                          <strong>Email:</strong> {app.user?.email}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-500" />
                        <span>
                          <strong>Cover Letter:</strong>{" "}
                          {app.coverLetter || "N/A"}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-500" />
                        <span>
                          <strong>Applied On:</strong>{" "}
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                 

                      {/* ✅ Show correct action button */}
                      {!app.startTime ? (
                        <p
                          onClick={() => handleStartInternship(app._id)}
                          className="flex items-center gap-2 text-sm cursor-pointer !text-black hover:!text-blue-700 text-white py-1.5  rounded-lg transition"
                        >
                          <PlayCircle size={16} />
                          Start Internship
                        </p>
                      ) : (
                        <p
                          onClick={() => handleMarkCompleted(app._id, app.duration)}
                          className="flex items-center gap-2 text-sm cursor-pointer !text-black hover:!text-blue-700 text-white py-1.5 px-3 rounded-lg transition"
                        >
                          <CheckCircle size={16} />
                          Mark as Completed
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Completed */}
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
              <CheckCircle size={20} /> Completed
            </h3>
            {completedApps.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                No completed applications
              </p>
            ) : (
              <div className="space-y-6">
                {completedApps.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white rounded-2xl p-6  border border-gray-100 "
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {app.internship?.title || "Untitled Internship"}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Completed
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                      <p className="flex items-center gap-2">
                        <User size={16} className="text-green-500" />
                        <span>
                          <strong>Applicant:</strong> {app.user?.name}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Briefcase size={16} className="text-green-500" />
                        <span>
                          <strong>Email:</strong> {app.user?.email}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FileText size={16} className="text-green-500" />
                        <span>
                          <strong>Cover Letter:</strong>{" "}
                          {app.coverLetter || "N/A"}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={16} className="text-green-500" />
                        <span>
                          <strong>Applied On:</strong>{" "}
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                      
                      {app.certificate?.certUrl && (
                        <p
                          onClick={() => handleDownloadCertificate(app)}
                          className="text-sm text-green-600 hover:underline font-medium"
                        >
                          View Certificate
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;
