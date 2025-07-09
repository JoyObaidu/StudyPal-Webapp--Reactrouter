import React from 'react'
import DashboardCard from '../components/DashboardCard'
import { FaBookOpen, FaRegCalendarAlt, FaClock, FaUser } from 'react-icons/fa'
import BottomNav from '../components/Navbar'
import Logo from '../components/Logo'

const Dashboard = () => {
  return (
    <div className="h-screen p-4 bg-purple-400 pb-16 flex flex-col">
      
      <header>
        <div className='flex items-center justify-between mb-4'>
          <h2>Good Afternoon, User</h2>
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </header>

      <main className='flex-1 p-4'>
       <div className="grid grid-cols-2 gap-4 mt-4">
        <DashboardCard icon={<FaBookOpen />} label="Notes" to="/notes" />
        <DashboardCard icon={<FaRegCalendarAlt />} label="Calendar" to="/calendar" />
        <DashboardCard icon={<FaClock />} label="Timer" to="/pomodoro" />
        <DashboardCard icon={<FaUser />} label="Profile" to="/profile" />
      </div>
      </main>
      
      <BottomNav />
    </div>
  )
}

export default Dashboard