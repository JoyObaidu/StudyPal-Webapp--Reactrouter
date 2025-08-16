// ✅ Updated Profile.jsx
import React, { useState, useEffect } from 'react';
import BottomNav from '../components/Navbar';
import Button from '../components/Button';
import { FaArrowRight, FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { signOut, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../lib/cloudinaryUpload';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({ name: 'Loading...', email: '', bio: '' });
  const [userPhoto, setUserPhoto] = useState('/default-avatar.png');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [isNewUser, setIsNewUser] = useState(true);
  const [showUploadControls, setShowUploadControls] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/signup');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        const latestPhoto = user.photoURL || userData.photoURL || '/default-avatar.png';
        setUserPhoto(latestPhoto);

        setUserProfile({
          name: user.displayName || 'Anonymous',
          email: user.email || '',
          bio: userData.bio || ''
        });

        setIsNewUser(latestPhoto === '/default-avatar.png');
      } catch (error) {
        toast.error('Failed to fetch user profile');
        console.error('Error fetching user profile:', error);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // ✅ handle image change (preview)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setUserPhoto(URL.createObjectURL(file)); // preview
    }
  };

  // ✅ upload to Cloudinary and update Firestore/Auth
  const onSaveImage = async () => {
    if (!image) return;

    const user = auth.currentUser;
    if (!user) {
      toast.error('You must be logged in to upload an image.');
      return;
    }

    setUploading(true);
    try {
      // Upload to Cloudinary
      const photoURL = await uploadImageToCloudinary(image);

      // Update Firebase Auth profile
      await updateProfile(user, { photoURL });

      // ✅ FIX: merge instead of overwrite
      await setDoc(
        doc(db, 'users', user.uid),
        {
          photoURL,
          email: user.email,
          displayName: user.displayName || 'Anonymous',
        },
        { merge: true }
      );

      // Update local state
      setUserPhoto(photoURL);
      setShowUploadControls(false);
      setIsNewUser(false);

      toast.success('Image uploaded and profile updated!');
    } catch (err) {
      toast.error('Upload failed. Try again.');
      console.error('Upload Error:', err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/signup');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout Error:', error);
      console.log(import.meta.env.MODE); 
    }
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-b from-purple-50 to-purple-200 pb-24 flex flex-col items-center px-4">
      <Button />
      <h1 className="text-3xl font-bold text-purple-950 mt-8 mb-4">My Profile</h1>

      <div className="w-full max-w-md p-6 flex flex-col items-center">
        {/* Profile Photo */}
        <div className="w-28 h-28 rounded-full overflow-hidden shadow border-4 border-purple-300 mb-4">
          <img
            src={userPhoto}
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
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-3"
            />
            {image && (
              <button
                onClick={onSaveImage}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg mb-3"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Save Image'}
              </button>
            )}
          </>
        )}

        {/* User info */}
        <h2 className="text-2xl font-bold text-black mb-1">{userProfile.name}</h2>
        <p className="text-black mb-2">{userProfile.email}</p>
        <p className="text-black mb-6 text-center">{userProfile.bio || 'No bio available'}</p>

        {/* Actions */}
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
