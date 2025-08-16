import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { FaBookOpen, FaClock, FaUser, FaRobot } from 'react-icons/fa';
import BottomNav from '../components/Navbar';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import Featuredimg from '../assets/featured book img.jpg';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [featuredContent] = useState({
    title: 'Study Tips for Success',
    description: 'Discover effective study techniques to improve your learning experience.',
    image: Featuredimg
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        
        if (user) {
          setUserName(user.displayName || 'User');
        } else {
          setUserName('Guest');
        }
      } catch (error) {
        toast.error('Failed to load user data');
        console.error('Error loading user data:', error);
        setUserName('Guest');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-purple-500 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-purple-500 pb-20 flex flex-col">
      
      {/* Header */}
      <header className="px-4 py-2 flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-sm text-purple-100">Welcome,</h2>
          <h1 className="text-xl font-bold text-white">{userName}</h1>
        </div>
        <Logo />
      </header>

      {/* Main */}
      <main className="flex-1 p-4">
        <section className="grid grid-cols-2 gap-4 mt-4">
          <DashboardCard 
            icon={<FaBookOpen className="text-2xl text-purple-800" />} 
            label="Study Notes" 
            to="/notes" 
            className="backdrop-blur-md bg-white/30 border border-white/20 hover:bg-white/40 transition rounded-xl shadow" 
          />
          <DashboardCard 
            icon={<FaRobot className="text-2xl text-purple-800" />} 
            label="Chatbot" 
            to="/chatbot" 
            className="backdrop-blur-md bg-white/30 border border-white/20 hover:bg-white/40 transition rounded-xl shadow" 
          />
          <DashboardCard 
            icon={<FaClock className="text-2xl text-purple-800" />} 
            label="Pomodoro Timer" 
            to="/pomodoro" 
            className="backdrop-blur-md bg-white/30 border border-white/20 hover:bg-white/40 transition rounded-xl shadow" 
          />
          <DashboardCard 
            icon={<FaUser className="text-2xl text-purple-800" />} 
            label="Profile" 
            to="/profile" 
            className="backdrop-blur-md bg-white/30 border border-white/20 hover:bg-white/40 transition rounded-xl shadow" 
          />
        </section>

        {/* Featured Section */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-white mb-3">Featured</h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-purple-200">
            <img 
              src={featuredContent.image} 
              alt="Featured Content" 
              className="object-cover w-full h-48 md:h-64" 
            />
            <div className="p-4 bg-white/90 backdrop-blur-sm">
              <h3 className="font-bold text-purple-900 text-lg">{featuredContent.title}</h3>
              <p className="text-purple-700 mt-2">{featuredContent.description}</p>
              <Link 
                to="/featured" 
                className="inline-block mt-3 text-purple-600 font-medium hover:text-purple-800"
              >
                Read More →
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-white mb-3">Your Progress</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-900">5</p>
              <p className="text-xs text-purple-700">Study Sessions</p>
            </div>
            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-900">12</p>
              <p className="text-xs text-purple-700">Notes Created</p>
            </div>
            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-900">3h</p>
              <p className="text-xs text-purple-700">Focus Time</p>
            </div>
          </div>
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Dashboard;