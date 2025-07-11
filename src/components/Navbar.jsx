import React from 'react';
import { FaBookOpen, FaClock, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', type: 'image', icon: Logo, label: 'Home' },
    { path: '/notes', type: 'icon', icon: FaBookOpen, label: 'Notes' },
    { path: '/pomodoro', type: 'icon', icon: FaClock, label: 'Pomodoro' },
    { path: '/profile', type: 'icon', icon: FaUser, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-purple-500 shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center text-white hover:text-purple-100"
            >
              <div className={`${active ? 'text-yellow-300' : ''} text-xl`}>
                {item.type === 'image' ? (
                  <img src={item.icon} alt={item.label} className="w-6 h-6" />
                ) : (
                  <item.icon />
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
