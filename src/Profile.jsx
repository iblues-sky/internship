import React from 'react';
import { CgProfile } from 'react-icons/cg';

const Profile = () => {
  // Dummy user data for now
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Frontend Developer',
    avatar: '', // leave empty for default icon
  };

  return (
    <div className="max-w-md w-full bg-white  rounded-lg h-[90vh] p-6 mx-auto mt-10">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <CgProfile size={80} className="text-gray-400" />
        )}

        {/* Name */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h2>

        {/* Role */}
        <p className="text-gray-500">{user.role}</p>

        {/* Email */}
        <p className="mt-2 text-gray-600">{user.email}</p>
      </div>

      {/* Additional Info */}
      <div className="mt-6">
        <h3 className="text-gray-700 font-medium mb-2">About</h3>
        <p className="text-gray-600 text-sm">
          This is a brief description about the user. You can add more details here
          like skills, experience, or bio.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button className="px-4 py-2 !bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
