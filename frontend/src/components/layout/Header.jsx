import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <div className="py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center bg-white rounded-full shadow py-3">
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Job Portal Logo" className="h-10 w-10" />
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-purple-600 font-medium">
              Find Jobs
            </Link>
            <Link to="/talents" className="text-gray-700 hover:text-purple-600 font-medium">
              Find Talents
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium">
              About us
            </Link>
            <Link to="/testimonials" className="text-gray-700 hover:text-purple-600 font-medium">
              Testimonials
            </Link>
          </nav>
        </div>

        <div>
          <Link
            to="/jobs/create"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Create Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;