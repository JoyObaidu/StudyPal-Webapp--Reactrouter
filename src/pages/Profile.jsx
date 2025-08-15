import React, { useState, useEffect } from 'react';
import BottomNav from '../components/Navbar';
import Button from '../components/Button';
import { FaArrowRight, FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../lib/cloudinaryUpload';

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({ name: '', email: '', bio: '' });
  const [userPhoto, setUserPhoto] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [isNewUser, setIsNewUser] = useState(true);
  const [showUploadControls, setShowUploadControls] = useState(false);

  useEffect(() => {
    const cachedPhoto = localStorage.getItem('userProfileImage');
    if (cachedPhoto) setUserPhoto(cachedPhoto);

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate('/signup');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      const latestPhoto = user.photoURL || userData.photoURL || cachedPhoto || '';
      if (latestPhoto) {
        setUserPhoto(latestPhoto);
        localStorage.setItem('userProfileImage', latestPhoto);
      }

      setUserProfile({
        name: user.displayName || '',
        email: user.email || '',
        bio: userData.bio || ''
      });

      setIsNewUser(!latestPhoto);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setUserPhoto(URL.createObjectURL(file)); // local preview
    }
  };

  const onSaveImage = async () => {
    if (!image) return;

    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to upload an image.');
      return;
    }

    try {
      setUploading(true);

      // 1) Upload to Cloudinary
      const photoURL = await uploadImageToCloudinary(image);

      // 2) Update Firebase Auth + Firestore
      await updateProfile(user, { photoURL });
      await setDoc(doc(db, 'users', user.uid), { photoURL }, { merge: true });

      // 3) Update UI/cache
      setUserPhoto(photoURL);
      localStorage.setItem('userProfileImage', photoURL);
      setShowUploadControls(false);
      setIsNewUser(false);
      alert('Image uploaded and profile updated!');
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Upload failed. Try again.');
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
            src={userPhoto || userProfile.photoURL || '/default-avatar.png'}
            onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={() => setShowUploadControls(!showUploadControls)}
          className="text-purple-600 mb-4 underline"
        >
          {showUploadControls ? 'Cancel' : isNewUser ? 'Upload Image' : 'Change Image'}
        </button>

        {showUploadControls && (
          <>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3" />
            {image && (
              <button
                onClick={onSaveImage}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg"
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
            className="flex justify-between w-full text-center hover:bg-purple-200 text-black font-semibold px-4 py-3 rounded-lg shadow transition"
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
