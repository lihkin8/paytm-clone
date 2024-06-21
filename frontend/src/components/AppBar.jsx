import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = ({ userName, setAuthenticated }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setAuthenticated(false);
    // Redirect to login page
    navigate("/signin");
  };

  const handleEditProfile = () => {
    // Navigate to edit profile page
    navigate("/edit-profile");
  };

  return (
    <div className="shadow h-14 flex justify-between items-center w-full bg-white px-4 rounded-lg">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="relative">
        <div
          className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2 cursor-pointer"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <div className="text-xl">{userName ? userName[0] : "U"}</div>
        </div>
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <button
              className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <button
              className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
