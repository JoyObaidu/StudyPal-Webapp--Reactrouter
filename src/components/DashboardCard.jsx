import React from 'react';

const DashboardCard = ({ icon, label }) => {
  return (
    <div className="bg-purple-300 rounded-xl flex flex-col items-center justify-center p-4 shadow hover:bg-purple-400 transition-all">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-base font-medium text-purple-900">{label}</div>
    </div>
  );
};

export default DashboardCard;
