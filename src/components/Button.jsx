import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';

const Button = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 text-purple-500"
    >
      <FaArrowCircleLeft className="text-2xl" />
    </button>
  );
}

export default Button;
