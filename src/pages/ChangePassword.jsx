import React, { useState } from 'react';
import Button from '../components/Button';
import BottomNav from '../components/Navbar';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('New password must be at least 6 characters.');
      return;
    }

    // Simulate password change success
    setMessage('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center px-4 pb-20">
      <Button />

      <h1 className="text-2xl font-bold text-purple-800 my-6">Change Password</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-4"
      >
        {message && <div className="text-center text-sm text-red-500">{message}</div>}

        <div>
          <label className="block text-sm font-bold text-purple-700 mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-purple-700 mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-purple-700 mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-800 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition"
        >
          Change Password
        </button>
      </form>

      <BottomNav />
    </div>
  );
};

export default ChangePassword;
