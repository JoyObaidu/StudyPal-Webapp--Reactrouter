import React, { useState, useEffect } from 'react';
import BottomNav from '../components/Navbar';
import Button from '../components/Button';
import { FaArrowRight, FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../firebaseConfig';
import { signOut, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({ name: '', email: '', bio: '' });
  const [userPhoto, setUserPhoto] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  // Removed unused user state
  const [isNewUser, setIsNewUser] = useState(true);
  const [showUploadControls, setShowUploadControls] = useState(false);

  // Load auth user + profile info
  useEffect(() => {
  // Load cached photo for faster UI
  const cachedPhoto = localStorage.getItem('userProfileImage');
  if (cachedPhoto) setUserPhoto(cachedPhoto);

  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (!user) {
      navigate('/signup');
      return;
    }

    // Get custom fields from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    // Always use auth photo first (most up-to-date after upload)
    const latestPhoto = user.photoURL || userData.photoURL || cachedPhoto || '';
    if (latestPhoto) {
      setUserPhoto(latestPhoto);
      localStorage.setItem('userProfileImage', latestPhoto);
    }

    // Set other profile data
    setUserProfile({
      name: user.displayName || '',
      email: user.email || '',
      bio: userData.bio || ''
    });

    // Determine if this is a new user (no photo yet)
    setIsNewUser(!latestPhoto);
  });

  return () => unsubscribe();
}, [navigate]);



  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setUserPhoto(URL.createObjectURL(file)); // Preview
    }
  };

  // Upload image to Firebase Storage
  const handleUpload = async () => {
  if (!image) return;

  const currentUser = auth.currentUser;
  if (!currentUser) {
    alert("You must be logged in to upload an image.");
    return;
  }

  try {
    setUploading(true);

    const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
    await uploadBytes(storageRef, image);
    const photoURL = await getDownloadURL(storageRef);

    // Update auth profile
    await updateProfile(currentUser, { photoURL });

    // 🔥 Save photoURL to Firestore
    await setDoc(doc(db, 'users', currentUser.uid), {
      photoURL,
    }, { merge: true });

    // Fetch updated user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};
    const photo = userData.photoURL || currentUser.photoURL;
    if (photo) {
     // already set from Firestore logic above, so just:
setShowUploadControls(false);
alert("Image uploaded and profile updated!");

      setIsNewUser(false);
    }

    // Update local state + storage
    setUserPhoto(photoURL);
    setIsNewUser(false);
    localStorage.setItem('userProfileImage', photoURL);
    setShowUploadControls(false);
    alert("Image uploaded and profile updated!");
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Upload failed. Try again.");
  } finally {
    setUploading(false);
  }
};


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signup');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-b from-purple-50 to-purple-200 pb-24 flex flex-col items-center px-4">
      <Button />
      <h1 className="text-3xl font-bold text-purple-950 mt-8 mb-4">My Profile</h1>

      <div className="w-full max-w-md p-6 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden shadow border-4 border-purple-300 mb-4">
          <img
            src={userPhoto || 'https://via.placeholder.com/150'}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Toggle Upload Controls */}
        <button
          onClick={() => setShowUploadControls(!showUploadControls)}
          className="text-purple-600 mb-4 underline"
        >
          {showUploadControls
            ? 'Cancel'
            : isNewUser
            ? 'Upload Image'
            : 'Change Image'}
        </button>

        {/* Upload Controls */}
        {showUploadControls && (
          <>
            <input type="file" onChange={handleImageChange} className="mb-3" />
            {image && (
              <button
        onClick={handleUpload}
        className="bg-purple-700 text-black px-4 py-2 rounded-lg"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Save Image'}
      </button>
            )}
          </>
        )}

        <h2 className="text-2xl font-bold text-black mb-1">{userProfile.name}</h2>
        <p className="text-black mb-6">{userProfile.email}</p>
        <p className="text-black mb-6">{userProfile.bio}</p>

        <div className="w-full space-y-3">
          <Link
            to="/editprofile"
            className="flex justify-between w-full text-center hover:bg-purple-800 text-black font-semibold px-4 py-3 rounded-lg shadow transition"
          >
            <FaUser className="inline mr-2 text-black" />
            Edit Profile
            <FaArrowRight className="inline ml-1 text-black" />
          </Link>

          <Link
            to="/changepassword"
            className="flex justify-between w-full text-center text-black font-semibold px-4 py-3 rounded-lg shadow hover:bg-purple-300 transition"
          >
            <FaLock className="inline mr-2 text-black" />
            Change Password
            <FaArrowRight className="inline ml-1 text-black" />
          </Link>

          <button
            onClick={handleLogout}
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
