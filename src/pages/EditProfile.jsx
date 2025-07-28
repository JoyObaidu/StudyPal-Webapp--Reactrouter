import React, { useState } from 'react';
import Button from '../components/Button';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
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
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await import('firebase/firestore').then(({ getDoc }) => getDoc(userDocRef));
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

  const handleSave = () => {
  const updatedProfile = { name, email, bio };
  localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  console.log('Profile saved:', updatedProfile);
  alert('Profile saved successfully!');
  navigate('/profile');
};

  const handleUpdate = async () => {
  try {
    if (!auth.currentUser) {
  alert("Please log in to update your profile.");
  return;
}
const user = auth.currentUser;

  if (user) {
    try {
      const photoURL = "https://example.com/photo.jpg"; // Optional: Replace with actual logic if you implement image upload
      await updateProfile(user, { displayName: name, photoURL: photoURL });

      // ✅ Save bio to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        bio: bio,
      }, { merge: true });

      alert('Profile updated!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: "https://example.com/photo.jpg", // Optional: Replace with actual logic if you implement image upload
    });
    alert('Profile updated!');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Error updating profile. Please try again.');
  }
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
           <img
  src={userProfile.photoURL || 'https://via.placeholder.com/150'}
  alt="User"
  className="w-28 h-28 object-cover rounded-full"
/>

        </div>
        <button className="text-purple-600 text-sm hover:underline mb-4">
          Change Photo
        </button>

        {/* Form */}
        <div className="w-full space-y-4">
          <div>
            <label className="block text-black font-semibold mb-1">Name</label>
             <input
  type="text"
  className="w-full px-4 py-2 border text-black border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

          </div>

          <div>
            <label className="block text-black font-semibold mb-1">Email</label>
           <input
  type="email"
  className="w-full px-4 py-2 border text-black border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>

          </div>

          <div>
            <label className="block text-black font-semibold mb-1">Bio</label>
            <textarea
  className="w-full text-black p-3 rounded-lg border border-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
  rows="3"
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  placeholder="Tell us about yourself"
/>
          </div>

          <button
        onClick={() => {
        handleSave(); // Local save
        handleUpdate(); // Firebase update
        }}
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
