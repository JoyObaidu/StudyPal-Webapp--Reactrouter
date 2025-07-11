import React from 'react';
import BottomNav from '../components/Navbar';
import Button from '../components/Button';
import welcomeImage from '../assets/welcome img.png'; // Assuming you have an image in assets
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="min-h-screen bg-purple-100 pb-20 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-center p-8 text-purple-800">
        <h1 className="text-xl font-bold">My Profile</h1>
        <Button />
      </div>

      {/* Avatar and Name */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 text-4xl font-bold">
          <img src={welcomeImage} alt="welcome image" className='mt-7' />
        </div>
        <h2 className="mt-10 text-xl font-bold text-purple-800">User Name</h2>
        <p className="text-purple-600">user@example.com</p>
      </div>

      {/* Settings / Actions */}
      <div className="mt-8 w-full max-w-md px-4 space-y-4 text-purple-950">
       <Link
        to="/editprofile"
        className="block w-full bg-white border border-purple-300 rounded-md px-4 py-3 text-left text-purple-800 hover:bg-purple-50 transition"
       >
         Edit Profile
       </Link>

       <Link
        to="/changepassword"
        className="block w-full bg-white border border-purple-300 rounded-md px-4 py-3 text-left text-purple-800 hover:bg-purple-50 transition"
       >
        Change Password
       </Link>

  <button
    onClick={() => {
      // Add your logout logic here
      console.log('Logged out!');
    }}
    className="w-full bg-red-100 border border-red-300 rounded-md px-4 py-3 text-left text-red-600 hover:bg-red-200 transition"
  >
    Log Out
  </button>
</div>

      <BottomNav />
    </div>
  );
};

export default Profile;
