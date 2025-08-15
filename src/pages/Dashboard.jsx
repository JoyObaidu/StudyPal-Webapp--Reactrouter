import React from 'react'
import DashboardCard from '../components/DashboardCard'
import { FaBookOpen, FaClock, FaUser, FaRobot } from 'react-icons/fa'
import BottomNav from '../components/Navbar'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'
import Featuredimg from '../assets/featured book img.jpg'
// import { updateProfile } from 'firebase/auth'


const Dashboard = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-purple-500 pb-20 flex flex-col">
      
      {/* Header */}
      <header className="px-4 py-2 flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-sm text-purple-100">Welcome,</h2>
          <h1 className="text-xl font-bold text-white">Name</h1>
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
              src={Featuredimg} 
              alt="Featured Book" 
              className="object-cover w-full h-48 md:h-64" 
            />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default Dashboard
