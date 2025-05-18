import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onDelete }) => {
  // Company logos based on company name
  const getLogoForCompany = (companyName) => {
    if (companyName?.toLowerCase().includes('amazon')) {
      return (
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center overflow-hidden">
          <span className="text-white text-3xl">a</span>
        </div>
      );
    } else if (companyName?.toLowerCase().includes('tesla') || companyName?.toLowerCase().includes('node')) {
      return (
        <div className="w-16 h-16 bg-white flex items-center justify-center overflow-hidden">
          <svg className="w-12 h-12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="#000" />
          </svg>
        </div>
      );
    } else if (companyName?.toLowerCase().includes('ux') || companyName?.toLowerCase().includes('ui')) {
      return (
        <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
          <span className="text-white text-3xl">⚡</span>
        </div>
      );
    } else {
      // Default logo with first letter
      const letter = companyName ? companyName.charAt(0).toUpperCase() : 'A';
      return (
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-700 text-3xl font-bold">{letter}</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded shadow relative">
      <div className="absolute top-2 right-2 bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded">
        24h Ago
      </div>

      <div className="p-4 flex flex-col items-center">
        {getLogoForCompany(job.companyName)}

        <h3 className="text-lg font-semibold mt-4 text-center">{job.title || "Full Stack Developer"}</h3>
        <p className="text-gray-600 mb-4">{job.companyName || "Amazon"}</p>

        <div className="flex items-center text-sm text-gray-500 mt-1 mb-3 space-x-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>1-3 yr Exp</span>
          </div>

          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{job.isRemote ? 'Remote' : 'Onsite'}</span>
          </div>
        </div>

        <ul className="text-sm text-gray-600 mb-6">
          <li className="mb-1 flex items-start">
            <span className="text-gray-400 mr-2">•</span>
            <span>A user-friendly interface lets you browse stunning photos and videos</span>
          </li>
          <li className="mb-1 flex items-start">
            <span className="text-gray-400 mr-2">•</span>
            <span>Filter destinations based on interests and travel style, and create personalized</span>
          </li>
        </ul>

        <Link
          to="#"
          className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-medium"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobCard;