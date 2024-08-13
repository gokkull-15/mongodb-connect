import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, gender } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, gender }),
      });

      if (response.ok) {
        console.log('User added successfully');
        alert('Submitted successfully'); // Show alert on successful submission
        navigate('/'); // Navigate to the home page
      } else {
        console.log('Error adding user');
        alert('Error adding user'); // Show alert on error
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding user'); // Show alert on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">User Information</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your age"
            required
          />
        </div>

        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">Gender</span>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleChange}
              className="mr-2 leading-tight"
              required
            />
            <label className="text-gray-700" htmlFor="male">
              Male
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChange}
              className="mr-2 leading-tight"
              required
            />
            <label className="text-gray-700" htmlFor="female">
              Female
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChange}
              className="mr-2 leading-tight"
              required
            />
            <label className="text-gray-700" htmlFor="other">
              Other
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
