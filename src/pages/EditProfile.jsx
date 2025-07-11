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
    <div className="min-h-screen bg-purple-100 pb-20 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full flex items-center justify-between px-4 py-4 bg-purple-800 text-white">
        <h1 className="text-xl font-bold">Edit Profile</h1>
        <Button />
      </div>

      {/* Avatar Placeholder */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-24 h-24 rounded-full bg-purple-300 flex items-center justify-center text-purple-800 text-4xl font-bold">
          U
        </div>
        <button className="mt-2 text-purple-600 text-sm hover:underline">
          Change Photo
        </button>
      </div>

      {/* Form */}
      <div className="mt-8 w-full max-w-md px-4 space-y-4">
        <div>
          <label className="block text-purple-800 font-semibold mb-1">Name</label>
          <input
            type="text"
            className="w-full p-3 rounded border border-purple-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-purple-800 font-semibold mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded border border-purple-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-purple-800 font-semibold mb-1">Bio</label>
          <textarea
            className="w-full p-3 rounded border border-purple-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-4 bg-purple-800 text-white py-3 rounded font-semibold hover:bg-purple-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
