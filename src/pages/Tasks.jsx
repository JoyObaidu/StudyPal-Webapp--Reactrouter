import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const Tasks = () => {
  return (
     <div className="p-4 bg-purple-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-purple-800">My Tasks</h1>
      <ul className="space-y-2">
        {['Write blog post', 'Read chapter', '30 min focus'].map((task, i) => (
          <li key={i} className="bg-white p-3 rounded shadow">
            <input type="checkbox" className="mr-2" />
            {task}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tasks