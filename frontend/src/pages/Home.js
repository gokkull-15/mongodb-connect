import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-blue-600">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">mongo-connect</h1>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <button
          onClick={() => navigate("/form")}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Form Page
        </button>

        <button
          onClick={() => navigate("/list")}
          className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
        >
          List Page
        </button>
      </div>
    </div>
  );
};

export default HomePage;
