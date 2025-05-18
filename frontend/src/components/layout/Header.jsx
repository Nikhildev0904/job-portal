import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Job Portal Logo" className="h-8 w-8" />
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-purple-600">
                Home
              </Link>
              <Link to="/jobs" className="text-gray-700 hover:text-purple-600">
                Find Jobs
              </Link>
              <Link to="/talents" className="text-gray-700 hover:text-purple-600">
                Find Talents
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-600">
                About us
              </Link>
              <Link to="/testimonials" className="text-gray-700 hover:text-purple-600">
                Testimonials
              </Link>
            </nav>
          </div>

          <div>
            <Link
              to="/jobs/create"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Create Jobs
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;