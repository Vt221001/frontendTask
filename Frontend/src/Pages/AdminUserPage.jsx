import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "react-toastify";

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
        `${import.meta.env.VITE_BASE_URL}/api/get-all-user`
      );
      setUsers(response.data.data);
    } catch (err) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/delete-user`, {
        data: { id: userId },
      });
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully!");
    } catch (err) {
      setError("Error deleting user");
      toast.error("Error deleting user");
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/update-user`,
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
      toast.success("User updated successfully!");
      setIsEditing(false);
      setEditUser(null);
    } catch (err) {
      setError("Error updating user");
      toast.error("Error updating user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-r h-screen from-[#865D36] to-[#A69080]">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={() => navigate("/user-register")}
          className="w-24 sm:w-32 py-2 bg-[#3E362E] text-white rounded-md hover:bg-[#8d551d] transition-all duration-300"
        >
          Add User
        </button>
        <button
          onClick={() => logout()}
          className="w-24 sm:w-32 py-2 bg-[#3E362E] text-white rounded-md hover:bg-[#8d551d] transition-all duration-300"
        >
          Logout
        </button>
      </div>
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-8 text-center text-[#3e362e]">
        Admin User Management
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <SyncLoader size={30} color="#865D36" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-[#a09a96] shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b px-2 sm:px-6 py-2 text-sm sm:text-lg font-medium text-[#2b231a]">
                  Name
                </th>
                <th className="border-b px-2 sm:px-6 py-2 text-sm sm:text-lg font-medium text-[#2b231a]">
                  Email
                </th>
                <th className="border-b px-2 sm:px-6 py-2 text-sm sm:text-lg font-medium text-[#2b231a]">
                  Description
                </th>
                <th className="border-b px-2 sm:px-6 py-2 text-sm sm:text-lg font-medium text-[#2b231a]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-[#b99d88]">
                  <td className="border-b px-2 sm:px-6 py-2 text-sm sm:text-lg text-[#1d140c]">
                    {user.name}
                  </td>
                  <td className="border-b px-2 sm:px-6 py-2 text-sm sm:text-lg text-[#1d140c]">
                    {user.email}
                  </td>
                  <td className="border-b px-2 sm:px-6 py-2 text-sm sm:text-lg text-[#1d140c]">
                    {user.description}
                  </td>
                  <td className="border-b px-2 sm:px-6 py-2 text-sm sm:text-lg text-[#1d140c]">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="mr-2 sm:mr-4 bg-[#3E362E] text-white px-2 py-1 text-xs sm:text-sm rounded shadow-sm hover:bg-[#8d551d] transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-600 text-white px-2 py-1 text-xs sm:text-sm rounded shadow-sm hover:bg-red-800 transition duration-300"
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

      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#ac8968] p-4 sm:p-6 rounded shadow-lg w-11/12 sm:w-96">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-[#2b231a] text-sm">Name</label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#2b231a] text-sm">Email</label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#2b231a] text-sm">
                Description
              </label>
              <input
                type="text"
                value={editUser.description}
                onChange={(e) =>
                  setEditUser({ ...editUser, description: e.target.value })
                }
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-[#865D36] text-white px-3 py-2 text-sm rounded hover:bg-[#3e362e] mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="bg-[#865D36] hover:bg-[#3e362e] text-white px-3 py-2 text-sm rounded"
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
