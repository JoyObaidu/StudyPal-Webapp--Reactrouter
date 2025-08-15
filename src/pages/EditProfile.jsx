import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { uploadImageToCloudinary } from '../lib/cloudinaryUpload';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    bio: '',
    photoURL: '',
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      setUserProfile({
        name: user.displayName || '',
        email: user.email || '',
        bio: userData.bio || '',
        photoURL: userData.photoURL || user.photoURL || '',
      });

      setName(user.displayName || '');
      setEmail(user.email || '');
      setBio(userData.bio || '');
    };

    fetchUserProfile();
  }, []);

  // Upload image to Cloudinary
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to change your photo.');
      return;
    }

    try {
      setUploading(true);

      // 1) Upload to Cloudinary
      const photoURL = await uploadImageToCloudinary(file);

      // 2) Update Firebase Auth profile
      await updateProfile(user, { photoURL });

      // 3) Save to Firestore
      await setDoc(doc(db, 'users', user.uid), { photoURL }, { merge: true });

      // 4) Update UI/cache
      setUserProfile((prev) => ({ ...prev, photoURL }));
      localStorage.setItem('userProfileImage', photoURL);

      alert('Profile photo updated!');
    } catch (err) {
      console.error('Error updating photo:', err);
      alert('Failed to update photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Save changes for name, bio, etc.
  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to update your profile.');
      return;
    }

    try {
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, 'users', user.uid), {
        bio,
        name,
        email,
        photoURL: user.photoURL,
      }, { merge: true });

      alert('Profile updated!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-200 pb-24 flex flex-col items-center px-4">
      <Button />
      <h1 className="text-3xl font-bold text-purple-800 mt-8 mb-4">Edit Profile</h1>

      <div className="w-full max-w-md p-6 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full overflow-hidden shadow border-4 border-purple-300 mb-2">
          <img
            src={userProfile.photoURL || '/default-avatar.png'}
            onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Change Photo Button */}
        <label className="text-purple-600 text-sm hover:underline mb-4 cursor-pointer">
          {uploading ? 'Uploading...' : 'Change Photo'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </label>

        {/* Form */}
        <div className="w-full space-y-4">
          <div>
            <label className="block text-black font-semibold mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border text-black border-black rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border text-black border-black rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-1">Bio</label>
            <textarea
              className="w-full text-black p-3 rounded-lg border border-black"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full mt-2 cursor-pointer bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
