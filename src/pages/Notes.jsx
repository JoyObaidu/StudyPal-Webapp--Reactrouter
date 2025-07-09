import React from 'react'
import DashboardCard from '../components/DashboardCard'
import { FaSearch, FaUser, FaStickyNote } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import BottomNav from '../components/Navbar'
import Button from '../components/Button'
const Notes = () => {
  return (
    <div className="p-10 bg-purple-100 min-h-screen flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4 text-purple-800">My Notes</h1>
      
      {/* Search Bar */}
      <div className='mb-4 border border-gray-300 flex gap-2 items-center rounded w-full'>
        <FaSearch className="text-gray-500 ml-2" />
        <input type="text" placeholder="Search notes..." className="p-2  text-black " />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 bg-white rounded shadow hover:shadow-md">
            <h2 className="font-semibold text-lg text-black mb-2">Note {i}</h2>
            <p className="text-sm text-gray-600">This is a short preview of the note content...</p>
          </div>
        ))}
      </div>

       <Link to="/editor" className="px-3 py-1 relative top-20 bg-purple-950 text-white rounded-4xl">
          +
        </Link>
      <Button />
      <BottomNav />
    
      
    </div>
  )
}

export default Notes