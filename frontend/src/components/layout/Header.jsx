import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  // Only allow real navigation for these paths:
  const enabledPaths = ['/', '/jobs', '/jobs/create', '/jobs/edit/:id'];

  // click handler for “unimplemented” links
  const handleNavClick = (e, to) => {
    if (!enabledPaths.includes(to)) {
      e.preventDefault();
      setShowModal(true);
    }
    // otherwise Link does its normal navigation
  };

  return (
    <>
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
              {/* All others now use our click‐handler */}
              <Link
                to="/talents"
                onClick={e => handleNavClick(e, '/talents')}
                className="text-gray-700 hover:text-[#780eca] font-medium"
              >
                Find Talents
              </Link>
              <Link
                to="/about"
                onClick={e => handleNavClick(e, '/about')}
                className="text-gray-700 hover:text-[#780eca] font-medium"
              >
                About us
              </Link>
              <Link
                to="/testimonials"
                onClick={e => handleNavClick(e, '/testimonials')}
                className="text-gray-700 hover:text-[#780eca] font-medium"
              >
                Testimonials
              </Link>
            </nav>
          </div>

          <Link
            to="/jobs/create"
            onClick={e => handleNavClick(e, '/jobs/create')}
            className="
              bg-gradient-to-b
              from-[#9333ea]
              to-[#780eca]
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

      {/* Simple modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Coming Soon!</h2>
            <p className="mb-6">This feature is yet to be implemented.</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-[#780eca] text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
