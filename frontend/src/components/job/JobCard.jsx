import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const JobCard = ({ job, onDelete, onEdit }) => {
  // Format the time from createdAt
  const getTimeAgo = (createdAt) => {
    if (!createdAt) return '24h Ago';
    const created = moment(createdAt);
    const now = moment();

    const hoursAgo = now.diff(created, 'hours');
    if (hoursAgo < 1) {
      return `${now.diff(created, 'minutes')}m Ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo}h Ago`;
    } else {
      const daysAgo = now.diff(created, 'days');
      return `${daysAgo}d Ago`;
    }
  };

  // Get company logo
  const getCompanyLogo = () => {
    if (!job.companyName) return null;

    const name = job.companyName.toLowerCase();
    if (name.includes('amazon')) {
      return (
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center bg-white rounded-xl overflow-hidden p-2">
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center relative">
            <span className="text-white text-2xl md:text-3xl font-bold mt-1">a</span>
            <div className="absolute w-8 md:w-10 h-1.5 bg-yellow-500 mt-10 md:mt-12 rounded-full"></div>
          </div>
        </div>
      );
    } else if (name.includes('tesla') || name.includes('node')) {
      return (
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center bg-white rounded-xl overflow-hidden p-4">
          <svg viewBox="0 0 100 13" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0c.3 1.1 1.3 2.3 2.6 2.6h4.1l.2 2.8h7.1l.2-2.8h4.1c1.4-.3 2.4-1.5 2.6-2.6v-.1H0v.1zM77.8 13c1.3-.5 2-1.5 2.2-2.6H68.7c.2 1.2.9 2.1 2.2 2.6h6.9zm-36.2-3.7h62.7v-.1c-.3-1.1-1.4-2.3-2.6-2.6h-36.2V0c-.3 1.1-1.3 2.3-2.6 2.6h-4.6v6.1z" fill="currentColor"/>
          </svg>
        </div>
      );
    } else {
      // For any other company, just use first letter
      const letter = job.companyName.charAt(0).toUpperCase();
      return (
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center bg-white rounded-xl overflow-hidden p-3">
          <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-gray-700 text-3xl md:text-4xl font-bold">{letter}</span>
          </div>
        </div>
      );
    }
  };

  // Format salary display
  const formatSalary = () => {
    if (!job.minSalary) return '';

    // Format to LPA (Lakhs Per Annum)
    const minLPA = (job.minSalary / 100000).toFixed(1);

    if (job.maxSalary) {
      const maxLPA = (job.maxSalary / 100000).toFixed(1);
      return `${minLPA} - ${maxLPA} LPA`;
    } else {
      return `${minLPA} LPA`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
      <div className="relative flex flex-col items-center">
        <div className="absolute top-0 right-0">
          <div className="bg-blue-100 text-blue-500 text-xs px-3 py-1 md:text-sm md:px-4 md:py-2 rounded-full">
            {getTimeAgo(job.createdAt)}
          </div>
        </div>

        {getCompanyLogo()}

        <h3 className="text-xl md:text-2xl font-bold mt-4 mb-2 text-center line-clamp-1">{job.title}</h3>
        <p className="text-gray-600 mb-2 text-center line-clamp-1">{job.companyName}</p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-3 text-gray-500 text-sm md:text-base">
          <div className="flex items-center">
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{job.experienceYears || 1}yr Exp</span>
          </div>

          <div className="flex items-center">
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span>{job.isRemote ? 'Remote' : 'Onsite'}</span>
          </div>

          <div className="flex items-center">
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{formatSalary()}</span>
          </div>
        </div>

        <div className="w-full px-1 md:px-3 mb-4">
          <p className="text-sm text-gray-700 line-clamp-2 text-center">
            {job.description || 'No description provided'}
          </p>
        </div>

        {/* Edit and Delete buttons */}
        <div className="w-full flex justify-end space-x-2 mb-3">
          <button
            onClick={() => onEdit(job.id)}
            className="p-1.5 text-blue-500 hover:text-blue-700 transition-colors"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 md:py-4 rounded-lg font-medium transition-colors"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;