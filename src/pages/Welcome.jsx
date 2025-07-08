import React, { useEffect } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import hero from '../assets/welcome img.png';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
     <div className="absolute w-full inset-0 bg-opacity-10 z-4" />
    <div
      className="relative h-screen w-full bg-cover opacity-45 bg-center z-5"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Dark Overlay */}
      

      {/* Content */}
      <div className="h-screen relative z-10 top-20 flex flex-col items-center justify-center text-white px-4 animate-fadeIn">
        <img
          src={logo}
          alt="STUDYPAL Logo"
          className="w-24 h-24 mb-4 rounded-full object-cover shadow-lg"
        />
        <h2 className="text-4xl font-bold tracking-wide mb-2">Welcome to</h2>
        <h1 className="text-5xl font-extrabold text-white">STUDYPAL</h1>
        <p className="mt-4 text-sm opacity-70">Your personal AI study companion</p>
      </div>
    </div>
    </>
   
  );
};

export default Welcome;
