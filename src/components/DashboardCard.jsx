import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ icon, label, to, className }) => {
  return (
    <Link to={to} className="no-underline">
      <div className={`bg-purple-300 rounded-xl flex flex-col items-center justify-center p-4 shadow hover:bg-purple-400 transition-all ${className}`}>
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-base font-medium text-purple-900">{label}</div>
      </div>
    </Link>
  );
};

export default DashboardCard;
