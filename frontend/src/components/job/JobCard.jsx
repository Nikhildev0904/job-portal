import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
              {/* Company Logo */}
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                {job.companyName.charAt(0)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.companyName}</p>
            </div>
          </div>
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            {job.jobType === 'FullTime' ? 'Full Time' : job.jobType}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-4">
            <i className="fas fa-map-marker-alt mr-1"></i> {job.location}
          </span>
          <span className="mr-4">
            <i className="fas fa-briefcase mr-1"></i> {job.experienceYears} yr Exp
          </span>
          <span>
            <i className="fas fa-building mr-1"></i> {job.isRemote ? 'Remote' : 'Onsite'}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
            {job.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-gray-700">
              <span className="font-semibold">{`₹${job.minSalary} - ₹${job.maxSalary}`}</span>
              <span className="text-sm ml-1">per month</span>
            </div>

            <div className="flex space-x-2">
              <Link
                to={`/jobs/edit/${job.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(job.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
              <Link
                to={`/jobs/${job.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 px-4 py-1 text-xs text-blue-500">
        24h Ago
      </div>
    </div>
  );
};

export default JobCard;