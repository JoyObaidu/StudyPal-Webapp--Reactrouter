import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-purple-600 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/login" className="text-white hover:underline">Login</Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
        </li>
        <li>
          <Link to="/editor" className="text-white hover:underline">Editor</Link>
        </li>
        <li>
          <Link to="/pomodoro" className="text-white hover:underline">Pomodoro</Link>
        </li>
        <li>
          <Link to="/profile" className="text-white hover:underline">Profile</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar