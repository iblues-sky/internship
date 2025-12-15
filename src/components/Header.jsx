import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [initial, setInitial] = useState("?");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      const firstLetter = parsedUser?.name?.charAt(0)?.toUpperCase() || "?";
      setInitial(firstLetter);
    } else {
      setUser(null);
      setInitial("?");
    }
  }, []);

  const handleProfileClick = () => {
    if (!user) {
      navigate("/signin");
    } else {
      navigate("/profile"); 
    }
  };

  return (
    <div className="header w-full">
      <div className="container py-3 border-b border-gray-200 flex items-center justify-between">
<a href="/" className="text-xl font-bold uppercase" style={{ letterSpacing: '3px' }}>
  Talentrix
</a>

        <div className="flex items-center gap-4">
          {user?.role === "admin" && (
            <div className="flex gap-4">
              <a
                href="/application"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Applications
              </a>
              <a
                href="/post-job"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Post Job
              </a>
            </div>
          )}
              <a
                href="/certificate-verify"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
            Verify Certificate 
              </a>

          <button
            onClick={handleProfileClick}
            className="h-8 w-8 !rounded-full !border !border-gray-300 flex items-center justify-center text-gray-800 font-semibold bg-gray-100 hover:bg-gray-200 transition"
          >
            {initial}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
