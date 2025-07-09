import React from 'react'
import logo from '../assets/logo.png' 

const Logo = () => {
  return (
    <div className="flex flex-col items-center mb-2">
            <img src={logo} alt="STUDYPAL Logo" className="w-14 h-14 rounded-full mb-2" />
            <h3 className="text-xl font-bold text-purple-800">STUDYPAL</h3>
          </div>
  )
}

export default Logo