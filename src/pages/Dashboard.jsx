import React from 'react'
import DashboardCard from '../components/DashboardCard'
import { FaBookOpen, FaClock, FaUser, FaRobot, FaBell } from 'react-icons/fa'
import BottomNav from '../components/Navbar'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'
import Featuredimg from '../assets/featured book img.jpg'

const Dashboard = () => {
  return (
    <div className="min-h-screen p-4 bg-purple-400 pb-16 flex flex-col">
      
      <header>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-sm'>Good Afternoon, User</h2>
          <Logo/>
          <FaBell className="text-white size-4" />
        </div>
        <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
      </header>

      <main className='flex flex-col flex-1 p-4'>
       <div className="grid grid-cols-2 gap-4 mt-4 cursor-pointer mb-4">
        <DashboardCard icon={<FaBookOpen />} label="Notes" to="/notes" />
        <DashboardCard icon={<FaRobot />} label="Chatbot" to="/chatbot" />
        <DashboardCard icon={<FaClock />} label="Timer" to="/pomodoro" />
        <DashboardCard icon={<FaUser />} label="Profile" to="/profile" />
      </div>

      <div className='mb-4'>
        <h2 className='mb-2'>Featured</h2>
        <img src={Featuredimg} alt="featured bookimage" />
      </div>
      </main>
      
      <BottomNav />
    </div>
  )
}

export default Dashboard