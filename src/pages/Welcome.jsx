import React, {useEffect} from 'react'
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="relative h-screen w-full bg-opacity-25 bg-cover bg-center flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50 z-0" />

      
      <div className="relative top-50 z-10 flex items-center h-full text-white px-4">
        <img
          src={logo}
          alt="STUDYPAL Logo"
          className="w-20 h-20 mb-4 rounded-full object-cover"
        />
        <h2 className="text-3xl font-bold">STUDYPAL</h2>
      </div>
    </div>
  );
};

export default Welcome;
