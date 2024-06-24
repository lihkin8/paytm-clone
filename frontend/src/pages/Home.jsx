import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to Paytm Clone</h1>
          <div className="flex space-x-4 w-full">
            <button
              className="bg-blue-500 h-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="bg-green-500 h-12 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
