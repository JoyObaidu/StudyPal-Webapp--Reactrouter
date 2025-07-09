import React from 'react'
import DashboardCard from '../components/DashboardCard'
import { FaBookOpen, FaRegCalendarAlt, FaClock, FaUser, FaStickyNote, FaArrowCircleLeft } from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Notes = () => {
  return (
    <div className="p-4 bg-purple-100 min-h-screen">

      <h1 className="text-xl font-bold mb-4 text-purple-800">My Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 bg-white rounded shadow hover:shadow-md">
            <h2 className="font-semibold text-lg mb-2">Note {i}</h2>
            <p className="text-sm text-gray-600">This is a short preview of the note content...</p>
          </div>
        ))}
        <Link to="/editor" className="flex items-center justify-center p-4 border-dashed border-2 border-purple-500 text-purple-500 rounded">
          + Add Note
        </Link>
      </div>
    </div>
  )
}

export default Notes