**# All Users Profile

A React application that displays a list of users fetched from a backend API and allows you to view their details and location on a map.

## Features

- Displays a list of users with their name, email, and profile photo.
- Provides a search functionality to filter users by name or address.
- Clicking on a user allows you to view additional details and location on a map.
- Users' locations are displayed on a map using **React-Leaflet**.

## Tech Stack

- **Frontend**: React, React Router, Axios, React-Leaflet, Tailwind CSS
- **Backend**: Node.js, Express (for the backend API)
- **Map**: OpenStreetMap (via React-Leaflet)

## Requirements

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/HemantMedhsia/BynryProject.git
cd BynryProject

2. Install dependencies
Run the following command to install the required dependencies:
npm install

3. Backend Setup
Ensure that the backend API is running on http://localhost:8080. If the backend is not set up yet, make sure to create the necessary endpoints or follow the instructions in your backend repository.

4. Run the Application
After installing dependencies and ensuring the backend is running, start the frontend:
npm run dev
(This will start the development server on http://localhost:3000.)

6. View User Details and Location
Click on any user to open a modal displaying more detailed information, including their address and a map showing their location.

Folder Structure --

/src
  /assets
    /react.svg
  /components
    AllUser.jsx          
    Modal.jsx      
  /assets
    /images 
  /Common
    /Button.jsx
    /Input.jsx
  /context
    /AuthProvider.jsx
    /PrivateRoute.jsx
  /Pages
    /AdminUserPage.jsx
    /AllUser.jsx
    /LoginPage.jsx
    /NotFoundErrorPage.jsx
    /RegistrationPage.jsx
  /Utility
    /API
      /getApi.js
      /postApi.js
    /APIEndPoints
      /getApiConfig.js
      /postApiConfig.js 
    /Headers
      /getHeader.jsx

# API Endpoints
GET /api/get-all-user: Fetches all users from the database.
Ensure your backend API is configured correctly to respond to this endpoint.



### Steps to Use:
1. **Cloning the Repository**: Replace the `git clone` URL with your actual repository URL.
2. **Backend Setup**: If your backend is not already set up, ensure the API is running, or provide instructions for backend setup.
3. **Running the Application**: The instructions specify how to install dependencies and start the app.
4. **Contributing and License**: Adjust the license and contributing guidelines as necessary.

Let me know if you need any adjustments!
