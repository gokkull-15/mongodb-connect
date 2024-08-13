import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl font-bold">mongo-connect</h1>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center mt-20 space-y-4">
        <button
          onClick={() => navigate("/form")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Form Page
        </button>

        <button
          onClick={() => navigate("/list")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          List Page
        </button>
      </div>
    </div>
  );
};

export default HomePage;
