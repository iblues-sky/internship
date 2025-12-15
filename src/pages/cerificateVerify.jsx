import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const CertificateVerify = () => {
  const [certSlug, setCertSlug] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setData(null);

    try {
      // ✅ Call your backend API
      const res = await axiosInstance.get(`/certs/verify-certificate?certSlug=${certSlug}`);

      console.log("Certificate verified:", res.data);
      setData(res.data.data);
      setMessage("✅ Certificate Verified Successfully!");
    } catch (error) {
      console.error("Verification error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "❌ Invalid or Not Found Certificate ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl min-w-[1000px] min-h-[750px]">
      <h2 className="text-2xl font-semibold text-center mb-6">
        🎓 Verify Internship Certificate
      </h2>

      <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4 mb-6 w-[70%] mx-auto">
        <input
          type="text"
          placeholder="Enter Certificate ID (e.g., ABC123)"
          value={certSlug}
          onChange={(e) => setCertSlug(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 !bg-black text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {message && (
        <div
          className={`text-center mb-4 font-medium ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}

      {/* Verified Certificate Details */}
      {data && (
        <div className="mt-6 border border-gray-200 rounded-lg p-6 bg-gray-50 min-w-[1000px]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            ✅ Certificate Verified
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-semibold">Student Name:</p>
              <p>{data.user?.name}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{data.user?.email}</p>
            </div>
            <div>
              <p className="font-semibold">Internship Title:</p>
              <p>{data.internship?.title}</p>
            </div>
            <div>
              <p className="font-semibold">Company:</p>
              <p>{data.internship?.companyName || "TalentrIx"}</p>
            </div>
            <div>
              <p className="font-semibold">Duration:</p>
              <p>{data.application?.duration} months</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p className="capitalize">{data.application?.status}</p>
            </div>
            <div>
              <p className="font-semibold">Issued On:</p>
              <p>{new Date(data.certificate?.issuedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateVerify;
