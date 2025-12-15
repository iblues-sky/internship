import React from "react";
import {
  FaCertificate,
  FaChalkboardTeacher,
  FaBuilding,
  FaClipboardCheck,
  FaEnvelopeOpenText,
  FaAward,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCertificate className="text-blue-500 text-3xl mb-3" />,
    title: "Certified Programs",
    desc: "Industry-recognized certifications that add value to your resume",
  },
  {
    icon: <FaChalkboardTeacher className="text-blue-500 text-3xl mb-3" />,
    title: "Professional Certification",
    desc: "Structured curriculum following AICTE guidelines and standards",
  },
  {
    icon: <FaBuilding className="text-blue-500 text-3xl mb-3" />,
    title: "Industry Connect",
    desc: "Direct exposure to real-world projects and industry experts",
  },
  {
    icon: <FaClipboardCheck className="text-blue-500 text-3xl mb-3" />,
    title: "Apply",
    desc: "Submit your application online.",
  },
  {
    icon: <FaEnvelopeOpenText className="text-blue-500 text-3xl mb-3" />,
    title: "Get Offer Letter & Tasks/Projects",
    desc: "Receive your offer letter and assigned tasks or projects.",
  },
  {
    icon: <FaAward className="text-blue-500 text-3xl mb-3" />,
    title: "Get Certificate",
    desc: "Earn a certificate of completion.",
  },
];

const AICTEInternshipSection = () => {
  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-5xl mx-auto px-2">
        <div className="flex flex-wrap justify-center gap-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-sm hover:shadow-lg space-y-4  transition rounded-xl max-w-[250px] p-6 text-center border border-gray-100 w-[280px]"
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mt-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AICTEInternshipSection;
