import React, { useState, useEffect } from 'react';

const List = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Data:', data); // Debugging line
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Data format is incorrect');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
      } else {
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      age: user.age,
      gender: user.gender,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id } = editingUser;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => user._id === _id ? updatedUser : user));
        setEditingUser(null);
      } else {
        console.error('Error updating user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {error && <p className="text-red-500 text-lg">{error}</p>}
      {users.length === 0 && !error ? (
        <p className="text-gray-700 text-lg">No users found.</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {users.map((user) => (
            <div key={user._id} className="max-w-xs w-full lg:max-w-sm m-4">
              <div className="border border-gray-300 bg-white rounded-lg p-4 shadow-lg">
                <div className="mb-4">
                  <div className="text-gray-900 font-bold text-xl mb-2">{user.name}</div>
                  <p className="text-gray-700 text-base">Age: {user.age}</p>
                  <p className="text-gray-700 text-base">Gender: {user.gender}</p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

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
                  checked={formData.gender === 'male'}
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
                  checked={formData.gender === 'female'}
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
                  checked={formData.gender === 'other'}
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
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default List;
