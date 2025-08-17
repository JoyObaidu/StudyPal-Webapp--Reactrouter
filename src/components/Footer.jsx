// Footer.jsx
import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white py-4 mt-8 max-w-full">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* App name */}
        <p className="text-sm">
          © {new Date().getFullYear()} StudyPal. All rights reserved.
          <hr className="border-gray-700" />
        </p>
        
        {/* Credits with LinkedIn links */}
        <p className="text-sm mt-3 md:mt-0 flex flex-col md:flex-row items-center gap-2">
          UI/UX Design by{"Olamide Adenuga"}
          <a
            href="https://www.linkedin.com/in/lamideadenuga"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 cursor-pointer text-black hover:text-purple-400 transition"
          >
            <FaLinkedin /> Olamide Adenuga
          </a>
          |
          Developed by{"Joy Obaidu"}
          <a
            href="https://www.linkedin.com/in/joy-obaidu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-black cursor-pointer hover:text-purple-400 transition"
          >
            <FaLinkedin /> Joy Obaidu
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
