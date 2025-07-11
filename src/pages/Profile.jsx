import React from 'react';
import BottomNav from '../components/Navbar';
import Button from '../components/Button';
import welcomeImage from '../assets/welcome img.png';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-200 pb-24 flex flex-col items-center px-4">
      {/* Back Button */}
      <Button />

      {/* Header */}
      <h1 className="text-3xl font-bold text-purple-800 mt-8 mb-4">My Profile</h1>

      {/* Profile Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-purple-200 p-6 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden shadow border-4 border-purple-300 mb-4">
          <img
            src={welcomeImage}
            alt="Profile avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-2xl font-bold text-purple-800 mb-1">User Name</h2>
        <p className="text-purple-600 mb-6">user@example.com</p>

        <div className="w-full space-y-3">
          <Link
            to="/editprofile"
            className="block w-full text-center bg-purple-700 hover:bg-purple-800 text-white font-semibold px-4 py-3 rounded-lg shadow transition"
          >
            Edit Profile
          </Link>

          <Link
            to="/changepassword"
            className="block w-full text-center bg-purple-50 border border-purple-300 text-purple-800 font-semibold px-4 py-3 rounded-lg shadow hover:bg-purple-100 transition"
          >
            Change Password
          </Link>

          <button
            onClick={() => {
              // Add your logout logic here
              console.log('Logged out!');
            }}
            className="block w-full text-center bg-red-100 border border-red-300 text-red-600 font-semibold px-4 py-3 rounded-lg shadow hover:bg-red-200 transition"
          >
            Log Out
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
