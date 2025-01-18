import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [hobby, setHobby] = useState("");
  const [locationLat, setLocationLat] = useState("");
  const [locationLng, setLocationLng] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image");
      return;
    }

    const userData = new FormData();
    userData.append("name", name);
    userData.append("email", email);
    userData.append("description", description);
    userData.append("address", address);
    userData.append("hobby", hobby);
    userData.append("location[lat]", locationLat);
    userData.append("location[lng]", locationLng);
    userData.append("img", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/create-user`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("User created successfully!");
      setError(null);
    } catch (error) {
      setError("Error creating user");
      setSuccess(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#865D36] to-[#A69080] min-h-screen flex items-center justify-center py-6 px-4">
      <div className="bg-[#a69080] rounded-md shadow-md max-w-3xl w-full p-4">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Input Fields */}
          {[
            {
              id: "name",
              label: "Full Name",
              type: "text",
              value: name,
              onChange: setName,
              placeholder: "Enter name",
            },
            {
              id: "email",
              label: "Email",
              type: "email",
              value: email,
              onChange: setEmail,
              placeholder: "Enter email",
            },
            {
              id: "description",
              label: "Description",
              type: "text",
              value: description,
              onChange: setDescription,
              placeholder: "About you",
            },
            {
              id: "address",
              label: "Address",
              type: "text",
              value: address,
              onChange: setAddress,
              placeholder: "Enter address",
            },
            {
              id: "hobby",
              label: "Hobby",
              type: "text",
              value: hobby,
              onChange: setHobby,
              placeholder: "Your hobbies",
            },
            {
              id: "locationLat",
              label: "Latitude",
              type: "number",
              value: locationLat,
              onChange: setLocationLat,
            },
            {
              id: "locationLng",
              label: "Longitude",
              type: "number",
              value: locationLng,
              onChange: setLocationLng,
            },
          ].map(({ id, label, type, value, onChange, placeholder }) => (
            <div key={id} className="flex flex-col">
              <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder={placeholder}
                required
              />
            </div>
          ))}

          {/* File Input */}
          <div className="flex flex-col">
            <label
              htmlFor="photo"
              className="text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="w-20 py-2  bg-gradient-to-r from-[#A69080] to-[#AC8968] text-white rounded-full shadow-lg hover:from-[#8d551d] hover:to-[#3E362E] transition-transform duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-20 py-2 hover:bg-[#724d2a] text-white text-sm font-medium rounded bg-[#3f2e1d] transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Success/Error Messages */}
        {success && (
          <p className="text-green-600 text-sm text-center mt-2">{success}</p>
        )}
        {error && (
          <p className="text-red-600 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
