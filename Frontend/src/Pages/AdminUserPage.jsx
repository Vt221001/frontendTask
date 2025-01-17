import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/get-all-user"
      );
      setUsers(response.data.data);
    } catch (err) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    console.log("123", userId);
    try {
      await axios.delete(`http://localhost:8080/api/delete-user`, {
        data: { id: userId },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError("Error deleting user");
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/update-user`,
        {
          userId: editUser._id,
          name: editUser.name,
          email: editUser.email,
          description: editUser.description,
        }
      );
      setUsers(
        users.map((user) =>
          user._id === editUser._id ? response.data.data : user
        )
      );
      setIsEditing(false);
      setEditUser(null);
    } catch (err) {
      setError("Error updating user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-r h-screen from-blue-500 to-purple-600">
      <button
        onClick={() => navigate("/user-register")}
        className="absolute right-44 w-32 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
      >
        Add User
      </button>
      <button
        onClick={() => logout()}
        className="absolute right-8 w-32 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
      >
        Logout
      </button>
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Admin User Management
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b px-6 py-3 text-lg font-medium text-gray-700">
                  Name
                </th>
                <th className="border-b px-6 py-3 text-lg font-medium text-gray-700">
                  Email
                </th>
                <th className="border-b px-6 py-3 text-lg font-medium text-gray-700">
                  Description
                </th>
                <th className="border-b px-6 py-3 text-lg font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="border-b px-6 py-3 text-lg text-gray-800">
                    {user.name}
                  </td>
                  <td className="border-b px-6 py-3 text-lg text-gray-800">
                    {user.email}
                  </td>
                  <td className="border-b px-6 py-3 text-lg text-gray-800">
                    {user.description}
                  </td>
                  <td className="border-b px-6 py-3 text-lg text-gray-800">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                value={editUser.description}
                onChange={(e) =>
                  setEditUser({ ...editUser, description: e.target.value })
                }
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserPage;
