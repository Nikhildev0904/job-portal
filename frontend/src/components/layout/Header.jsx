import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <div className="flex justify-center py-4">
      <div className="inline-flex justify-between items-center bg-white rounded-full shadow py-3 px-6 space-x-8">
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Job Portal Logo" className="h-8 w-8" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#780eca] font-medium">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-[#780eca] font-medium">
              Find Jobs
            </Link>
            <Link to="/talents" className="text-gray-700 hover:text-[#780eca] font-medium">
              Find Talents
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#780eca] font-medium">
              About us
            </Link>
            <Link to="/testimonials" className="text-gray-700 hover:text-[#780eca] font-medium">
              Testimonials
            </Link>
          </nav>
        </div>

        <Link
          to="/jobs/create"
          className="
            bg-[#780eca]
            hover:bg-[#650cb3]
            text-white
            px-6
            py-1.5
            rounded-full
            border-2
            border-[#780eca]
            hover:border-[#650cb3]
            font-medium
          "
        >
          Create Jobs
        </Link>
      </div>
    </div>
  );
};

export default Header;
