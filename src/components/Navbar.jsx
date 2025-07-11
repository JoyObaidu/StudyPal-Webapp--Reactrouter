import React from 'react';
import { FaHome, FaStickyNote, FaClock, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Home' },
    { path: '/notes', icon: <FaStickyNote />, label: 'Notes' },
    { path: '/pomodoro', icon: <FaClock />, label: 'Pomodoro' },
    { path: '/profile', icon: <FaUser />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-purple-500 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="flex flex-col items-center text-white hover:text-purple-100">
              <div className={`${active ? 'text-yellow-300' : ''} text-xl`}>
                {item.icon}
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
