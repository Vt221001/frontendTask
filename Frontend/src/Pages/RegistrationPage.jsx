import React, { useState } from 'react';
import axios from 'axios';

const RegistrationPage = () => {
  // State to hold form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [hobby, setHobby] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  const [image, setImage] = useState(null); // State to hold the image file
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if an image is selected
    if (!image) {
      setError('Please select an image');
      return;
    }

    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    userData.append('description', description);
    userData.append('address', address);
    userData.append('hobby', hobby);
    userData.append('location[lat]', locationLat);
    userData.append('location[lng]', locationLng);
    userData.append('img', image); // Append the selected image

    try {
      // Send the form data to the backend, including the image
      const response = await axios.post('http://localhost:8080/api/create-user', userData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      // Handle successful response
      setSuccess('User created successfully!');
      setError(null);
    } catch (error) {
      // Handle error response
      setError('Error creating user');
      setSuccess(null);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the selected image file to state
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center py-12 px-6">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">User Registration</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="description">Short Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Describe yourself"
              required
            />
          </div>

          {/* Address Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Hobby Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="hobby">Hobby</label>
            <input
              type="text"
              id="hobby"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="What are your hobbies?"
              required
            />
          </div>

          {/* Location Latitude Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="locationLat">Location Latitude</label>
            <input
              type="number"
              id="locationLat"
              value={locationLat}
              onChange={(e) => setLocationLat(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Location Longitude Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="locationLng">Location Longitude</label>
            <input
              type="number"
              id="locationLng"
              value={locationLng}
              onChange={(e) => setLocationLng(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* File Input for Image */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="photo">Profile Picture</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Success/Error Message */}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default RegistrationPage;
