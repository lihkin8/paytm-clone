import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create an object with the optional fields
    const updateData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
    };

    try {
      const response = await axios.put(
        "http://localhost:3002/api/v1/user/",
        updateData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
      setSuccess("Profile updated successfully.");
      setError("");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
      setSuccess("");
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          )}
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-left mb-1">First Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left mb-1">Last Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
