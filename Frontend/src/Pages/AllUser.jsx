import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";

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
      .get(`${import.meta.env.VITE_BASE_URL}/api/get-all-user`)
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
    return (
      <div className="text-center text-xl flex justify-center items-center h-screen">
        <BounceLoader color="#8d551d" size={80} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="relative mx-auto px-4 md:px-6 py-10 min-h-screen bg-gradient-to-r from-[#865D36] to-[#A69080]">
      <button
        onClick={() => navigate("/admin-login")}
        className="absolute right-4 md:right-16 top-4 w-24 md:w-32 py-2 bg-[#3E362E] text-white rounded-md hover:bg-[#8d551d] transition-all duration-300"
      >
        Login as Admin
      </button>
      <h1 className="text-2xl md:text-3xl font-bold text-center text-[#3E362E] mb-8">
        All Users Profile
      </h1>
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Search by name or address..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/3 p-3 border bg-gray-200 border-[#A69080] rounded-full shadow-sm focus:ring-2 focus:ring-[#3E362E] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-[#AC896B] p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:-translate-y-2"
          >
            <div className="flex justify-center">
              <img
                src={user.photo}
                alt={user.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-[#3E362E]"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-lg md:text-2xl font-bold text-[#3E362E]">
                {user.name}
              </h2>
              <p className="text-sm text-[#301e11]">{user.email}</p>
            </div>
            <div className="mt-4 md:mt-6">
              <button
                onClick={() => openModal2(user)}
                className="w-full py-2 bg-[#3E362E] text-white rounded-md hover:bg-[#8d551d] transition-all duration-300"
              >
                View Details
              </button>
              <button
                onClick={() => openModal(user)}
                className="w-full mt-2 py-2 bg-[#3E362E] text-white rounded-md hover:bg-[#8d551d] transition-all duration-300"
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
        className="modal-content w-full max-w-[90%] md:max-w-2xl bg-[#AC8968] p-8 rounded-lg shadow-lg"
        overlayClassName="modal-overlay bg-opacity-50 bg-black flex justify-center items-center"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-[#3E362E] mb-4 text-center">
          Location of {selectedUser?.name}
        </h2>
        {selectedUser && (
          <MapContainer
            center={[selectedUser.location.lat, selectedUser.location.lng]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
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
          className="mt-6 py-2 px-6 bg-[#3E362E] text-white rounded-md hover:bg-[#8d551d] transition duration-300"
        >

        
          Close
        </button>
      </Modal>

      <Modal
        isOpen={isModalOpen2}
        onRequestClose={closeModal}
        contentLabel="User Details"
        className="modal-content w-full max-w-[90%] md:max-w-2xl bg-gradient-to-r from-[#93785B] to-[#A69080] p-8 rounded-2xl shadow-2xl"
        overlayClassName="modal-overlay bg-opacity-60 bg-black flex justify-center items-center"
      >
        {selectedUser && (
          <>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              <span className="text-[#AC8968]">Details</span> of{" "}
              {selectedUser.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center">
                <img
                  src={selectedUser.photo}
                  alt={selectedUser.name}
                  className="w-32 h-32 md:w-52 md:h-52 rounded-full object-cover border-4 border-[#865D36] shadow-lg hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center text-gray-700 space-y-4">
                <p className="text-sm md:text-lg font-medium">
                  <span className="font-semibold text-gray-800">Name: </span>
                  {selectedUser.name}
                </p>
                <p className="text-sm md:text-lg font-medium">
                  <span className="font-semibold text-gray-800">Email: </span>
                  {selectedUser.email}
                </p>
                <p className="text-sm md:text-lg font-medium">
                  <span className="font-semibold text-gray-800">Address: </span>
                  {selectedUser.address}
                </p>
                <p className="text-sm md:text-lg font-medium">
                  <span className="font-semibold text-gray-800">About: </span>
                  {selectedUser.description || "N/A"}
                </p>
                <p className="text-sm md:text-lg font-medium">
                  <span className="font-semibold text-gray-800">Hobbies: </span>
                  {selectedUser.hobby || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={closeModal}
                className="py-3 px-8 bg-gradient-to-r from-[#A69080] to-[#AC8968] text-white rounded-full shadow-lg hover:from-[#8d551d] hover:to-[#3E362E] transition-transform duration-300 transform hover:scale-105"
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
