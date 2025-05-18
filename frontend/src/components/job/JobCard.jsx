import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onDelete }) => {
  // Get first letter for the logo placeholder
  const logoLetter = job.companyName ? job.companyName.charAt(0) : 'A';

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      {/* Top timestamp badge */}
      <div className="bg-blue-100 text-blue-500 text-xs py-1 px-4 text-right">
        24h Ago
      </div>

      <div className="p-5">
        {/* Company logo and job title */}
        <div className="flex items-start mb-4">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl mr-4">
            {logoLetter}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.companyName}</p>
          </div>
        </div>

        {/* Job details */}
        <div className="flex items-center text-sm text-gray-500 mt-3 mb-3">
          <div className="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{job.experienceYears || 1}-3 yr Exp</span>
          </div>

          <div className="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{job.isRemote ? 'Remote' : 'Onsite'}</span>
          </div>

          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>12LPA</span>
          </div>
        </div>

        {/* Job description */}
        <div className="mt-3 mb-4">
          <p className="text-sm text-gray-700 line-clamp-2">
            {job.description || 'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized itineraries.'}
          </p>
        </div>

        {/* Salary and actions */}
        <div className="flex justify-between items-center mt-5">
          <div>
            <span className="font-semibold">₹{job.minSalary || 50000} - ₹{job.maxSalary || 90000}</span>
            <span className="text-sm text-gray-500 ml-1">per month</span>
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/jobs/edit/${job.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </Link>

            <button
              onClick={() => onDelete(job.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>

            <Link
              to="#"
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;