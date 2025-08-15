import React, { useEffect, useState } from 'react';
import BottomNav from '../components/Navbar';
import { auth, db } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFullName(user.displayName || data.fullName || '');
        setEmail(user.email || '');
        setBio(data.bio || '');
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in.');
      return;
    }

    try {
      // Update Firebase Auth display name
      await updateProfile(user, { displayName: fullName });

      // Save extra data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        bio
      }, { merge: true });

      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating profile.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <div className="p-5">
        <h1 className="text-xl font-bold mb-4">Edit Profile</h1>

        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email (change requires re-auth)</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 font-bold"
        >
          Save Changes
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default EditProfile;
