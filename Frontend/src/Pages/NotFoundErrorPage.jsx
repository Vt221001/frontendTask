import React from 'react';

const NotFoundErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
      <div className="text-center p-10 bg-white rounded-xl shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 animate__animated animate__fadeIn animate__delay-1s">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-500 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <button 
          className="px-6 py-2 bg-indigo-500 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundErrorPage;
