import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowCircleLeft } from 'react-icons/fa'

const Button = () => {
  return (
    <Link to="/dashboard" className="absolute top-4 left-4 text-purple-500">
       <FaArrowCircleLeft className="text-2xl" />
      </Link>
  )
}

export default Button