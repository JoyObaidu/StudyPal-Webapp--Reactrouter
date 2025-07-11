import React, { useState } from 'react';
import Button from '../components/Button';

const EditProfile = () => {
  const [name, setName] = useState('User Name');
  const [email, setEmail] = useState('user@example.com');
  const [bio, setBio] = useState('Write a little about yourself...');

  const handleSave = () => {
    // Here you'd save to your backend or localStorage
    console.log('Profile saved:', { name, email, bio });
    alert('Profile saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-200 pb-24 flex flex-col items-center px-4">
      {/* Back Button */}
      <Button />

      {/* Header */}
      <h1 className="text-3xl font-bold text-purple-800 mt-8 mb-4">Edit Profile</h1>

      {/* Profile Card */}
      <div className="w-full max-w-md p-6 flex flex-col items-center">
        {/* Avatar Placeholder */}
        <div className="w-28 h-28 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 text-4xl font-bold shadow border-4 border-purple-300 mb-2">
          U
        </div>
        <button className="text-purple-600 text-sm hover:underline mb-4">
          Change Photo
        </button>

        {/* Form */}
        <div className="w-full space-y-4">
          <div>
            <label className="block text-purple-800 font-semibold mb-1">Name</label>
            <input
              type="text"
              className="w-full text-purple-300 p-3 rounded-lg border border-purple-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full text-purple-300 p-3 rounded-lg border border-purple-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold mb-1">Bio</label>
            <textarea
              className="w-full text-shadow-purple-800 p-3 rounded-lg border border-purple-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-2 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold shadow transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
