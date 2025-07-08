import React from 'react'
import DashboardCard from '../components/DashboardCard'
import { FaBookOpen, FaRegCalendarAlt } from 'react-icons/fa'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
     
     <header className="bg-purple-500 text-white text-center py-4 shadow-md">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header><DashboardCard icon={<FaBookOpen />} label="My Courses" />
      <DashboardCard icon={<FaRegCalendarAlt />} label="Upcoming Events" />
    </div>
  )
}

export default Dashboard