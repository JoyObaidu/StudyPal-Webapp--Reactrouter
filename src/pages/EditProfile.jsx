import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/Navbar';
import { auth, db } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          toast.error('No user logged in');
          navigate('/signup');
          return;
        }
        
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        
        setFullName(user.displayName || '');
        setEmail(user.email || '');
        setBio(userData.bio || '');
      } catch (error) {
        toast.error('Failed to fetch user data');
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error('No signed-in user.');
        return;
      }

      // 更新 Firebase Auth 中的显示名称
      await updateProfile(user, {
        displayName: fullName,
      });

      // 更新 Firestore 中的用户数据
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: fullName,
        bio: bio,
      });

      toast.success('Profile updated successfully');
      navigate("/profile");
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
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
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled // Email is not editable
            className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-black"
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed here</p>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 rounded bg-white border border-gray-300 text-black"
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div>
        
        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full py-2 rounded text-white font-bold ${
            loading ? 'bg-purple-400' : 'bg-purple-800 hover:bg-purple-600'
          }`}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default EditProfile;