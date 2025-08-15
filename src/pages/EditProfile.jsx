import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/Navbar';
import { auth, db } from '../firebaseConfig';
import { updateProfile, updateEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      setFullName(user.displayName || '');
      setEmail(user.email || '');
      setBio(userData.bio || '');
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Not logged in.');
      return;
    }

    try {
      // Update Auth name & email
      await updateProfile(user, { displayName: fullName });
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      // Update Firestore with bio
      await setDoc(doc(db, 'users', user.uid), { bio }, { merge: true });

      alert('Profile updated successfully!');
      navigate('/profile'); // Redirect after saving
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-200 text-black flex flex-col justify-between">
      <div className="p-5">
        <h1 className="text-xl font-bold mb-4">Edit Profile</h1>

        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 rounded bg-white border border-gray-300 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-white border border-gray-300 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 rounded bg-white border border-gray-300 text-black"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold"
        >
          Save Changes
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default EditProfile;
