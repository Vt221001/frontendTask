import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/get-all-user")
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching users");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.address.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const openModal2 = (user) => {
    setSelectedUser(user);
    setIsModalOpen2(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="relative mx-auto px-6 py-10 h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <button
        onClick={() => navigate("/admin-login")}
        className="absolute right-16 w-32 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
      >
        Login as Admin
      </button>
      <h1 className="text-4xl font-extralight text-center text-white mb-8">
        All Users Profile
      </h1>
      <div className="flex justify-center items-center ">
        <input
          type="text"
          placeholder="Search by name or address..."
          value={search}
          onChange={handleSearch}
          className="w-1/3 p-3 mb-6 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:-translate-y-2"
          >
            <div className="flex justify-center">
              <img
                src={user.photo}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-600"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => openModal2(user)}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
              >
                View Details
              </button>
              <button
                onClick={() => openModal(user)}
                className="w-full mt-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
              >
                Show Location
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Location"
        className="modal-content bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="modal-overlay bg-opacity-50 bg-black"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Location of {selectedUser?.name}
        </h2>
        {selectedUser && (
          <MapContainer
            center={[selectedUser.location.lat, selectedUser.location.lng]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[selectedUser.location.lat, selectedUser.location.lng]}
            >
              <Popup>{selectedUser?.address}</Popup>
            </Marker>
          </MapContainer>
        )}
        <button
          onClick={closeModal}
          className="mt-6 py-2 px-6 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
        >
          Close
        </button>
      </Modal>

      <Modal
        isOpen={isModalOpen2}
        onRequestClose={closeModal}
        contentLabel="User Details"
        className="modal-content bg-gradient-to-r from-white via-gray-100 to-gray-200 p-8 rounded-2xl shadow-2xl transform scale-105"
        overlayClassName="modal-overlay bg-opacity-60 bg-black flex justify-center items-center"
      >
        {selectedUser && (
          <>
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
              <span className="text-green-600">Details</span> of{" "}
              {selectedUser.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center">
                <img
                  src={selectedUser.photo}
                  alt={selectedUser.name}
                  className="w-52 h-52 rounded-full object-cover border-4 border-green-600 shadow-lg hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center text-gray-700 space-y-4">
                <p className="text-lg font-medium">
                  <span className="font-semibold text-gray-800">Name: </span>
                  {selectedUser.name}
                </p>
                <p className="text-lg font-medium">
                  <span className="font-semibold text-gray-800">Email: </span>
                  {selectedUser.email}
                </p>
                <p className="text-lg font-medium">
                  <span className="font-semibold text-gray-800">Address: </span>
                  {selectedUser.address}
                </p>
                <p className="text-lg font-medium">
                  <span className="font-semibold text-gray-800">About: </span>
                  {selectedUser.description || "N/A"}
                </p>
                <p className="text-lg font-medium">
                  <span className="font-semibold text-gray-800">Hobbies: </span>
                  {selectedUser.hobby || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={closeModal}
                className="py-3 px-8 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-transform duration-300 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AllUser;
