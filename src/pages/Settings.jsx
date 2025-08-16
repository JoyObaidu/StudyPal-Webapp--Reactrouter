import React, { useState, useEffect } from "react";
import BottomNav from "../components/Navbar";
import Button from "../components/Button";
import { FaArrowRight, FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadImageToCloudinary } from "../lib/cloudinaryUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({ name: "", email: "", bio: "" });
  const [userPhoto, setUserPhoto] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [isNewUser, setIsNewUser] = useState(true);
  const [showUploadControls, setShowUploadControls] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/signup");
      return;
    }

    // Show auth info immediately
    setUserProfile({
      name: user.displayName || "",
      email: user.email || "",
      bio: "",
    });
    setUserPhoto(user.photoURL || "");

    // Fetch Firestore bio in background
    getDoc(doc(db, "users", user.uid))
      .then((userDoc) => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfile((prev) => ({
            ...prev,
            bio: userData.bio || "",
          }));
          if (userData.photoURL && !user.photoURL) {
            setUserPhoto(userData.photoURL);
          }
        }
        setIsNewUser(!user.photoURL && !userDoc.data()?.photoURL);
      })
      .catch((error) => {
        toast.error("Failed to fetch user profile");
        console.error("Error fetching user profile:", error);
      });
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
    if (!user) return toast.error("You must be logged in to upload an image.");

    setUploading(true);
    try {
      const photoURL = await uploadImageToCloudinary(image);
      await updateProfile(user, { photoURL });
      await updateDoc(doc(db, "users", user.uid), { photoURL });
      setUserPhoto(photoURL);
      setShowUploadControls(false);
      setIsNewUser(false);
      toast.success("Profile photo updated!");
    } catch (err) {
      toast.error("Upload failed. Try again.");
      console.error("Upload Error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/signup");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-b from-purple-50 to-purple-200 pb-24 flex flex-col items-center px-4">
      <Button />
      <h1 className="text-3xl font-bold text-purple-950 mt-8 mb-4">My Profile</h1>

      <div className="w-full max-w-md p-6 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden shadow border-4 border-purple-300 mb-4">
          <img
            src={userPhoto || "/default-avatar.png"}
            onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={() => setShowUploadControls(!showUploadControls)}
          className="text-purple-600 mb-4 underline"
        >
          {showUploadControls ? "Cancel" : isNewUser ? "Upload Image" : "Change Image"}
        </button>

        {showUploadControls && (
          <>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3" />
            {image && (
              <button
                onClick={onSaveImage}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg mb-3"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Save Image"}
              </button>
            )}
          </>
        )}

        <h2 className="text-2xl font-bold text-black mb-1">{userProfile.name}</h2>
        <p className="text-black mb-2">{userProfile.email}</p>
        <p className="text-black mb-6 text-center">{userProfile.bio || "No bio available"}</p>

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
