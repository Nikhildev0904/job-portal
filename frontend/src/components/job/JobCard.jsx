import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const JobCard = ({ job, onDelete, onEdit }) => {
  const [logoError, setLogoError] = useState(false);

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

  // Helper function to generate a likely domain from company name
  const getDomainFromCompanyName = (name) => {
    if (!name) return "example.com";

    // Handle special cases first
    const specialCases = {
      'reliance industries': 'ril.com',
      'tata consultancy services': 'tcs.com',
      'hdfc bank': 'hdfcbank.com',
      'state bank of india': 'sbi.co.in',
      'bharti airtel': 'airtel.in',
      'infosys technologies': 'infosys.com',
      'larsen & toubro': 'larsentoubro.com',
      'mahindra & mahindra': 'mahindra.com',
      'itc limited': 'itcportal.com',
      'oil and natural gas corporation': 'ongcindia.com',
      'hindustan unilever': 'hul.co.in',
      'icici bank': 'icicibank.com',
      'kotak mahindra bank': 'kotak.com',
      'bharat petroleum': 'bharatpetroleum.com',
      'hindustan petroleum': 'hindustanpetroleum.com',
      'tata motors': 'tatamotors.com',
      'tata steel': 'tatasteel.com',
      'axis bank': 'axisbank.com',
      'wipro limited': 'wipro.com',
      'indian oil': 'iocl.com',
      'sun pharmaceuticals': 'sunpharma.com',
      'tech mahindra': 'techmahindra.com',
      'bajaj auto': 'bajajauto.com',
      'bajaj finance': 'bajajfinserv.in',
      'ultratech cement': 'ultratechcement.com'
    };

    const lowerName = name.toLowerCase();

    // Check if it's a special case
    for (const [key, domain] of Object.entries(specialCases)) {
      if (lowerName.includes(key)) {
        return domain;
      }
    }

    // Try multiple domain formats
    const domains = [];

    // Remove common legal entity suffixes
    let processedName = name.replace(/\s+(Inc\.?|LLC|Ltd\.?|GmbH|Corp\.?|Corporation|Limited)$/i, "");

    // Try with no spaces (reliance.com)
    let noSpaces = processedName.replace(/\s+/g, "").replace(/[^\w\s]/gi, "").toLowerCase();
    domains.push(`${noSpaces}.com`);

    // Try with .in domain (reliance.in)
    domains.push(`${noSpaces}.in`);

    // Try with hyphens (reliance-industries.com)
    let withHyphens = processedName.replace(/\s+/g, "-").replace(/[^\w\s-]/gi, "").toLowerCase();
    domains.push(`${withHyphens}.com`);

    // Try with first word only (reliance.com) if there are multiple words
    if (processedName.includes(' ')) {
      let firstWord = processedName.split(' ')[0].toLowerCase();
      domains.push(`${firstWord}.com`);
    }

    // Return the first option as default, but we'll try them all
    return domains[0];
  };

  // Get possible domains for a company
  const getPossibleDomains = (companyName) => {
    if (!companyName) return [];

    const name = companyName.trim();
    const primaryDomain = getDomainFromCompanyName(name);

    // Generate alternative domains based on company name
    const domains = [primaryDomain];

    // If it's a multi-word name
    if (name.includes(' ')) {
      // Try domain with no spaces
      const noSpaces = name.replace(/\s+/g, '').toLowerCase();
      domains.push(`${noSpaces}.com`);

      // Try domain with hyphens
      const withHyphens = name.replace(/\s+/g, '-').toLowerCase();
      domains.push(`${withHyphens}.com`);

      // Try first word only
      const firstWord = name.split(' ')[0].toLowerCase();
      domains.push(`${firstWord}.com`);

      // Try first letter of each word
      const acronym = name.split(' ').map(word => word[0]).join('').toLowerCase();
      if (acronym.length > 1) {
        domains.push(`${acronym}.com`);
      }
    }

    // Add .in domain for Indian companies
    const nameWithoutSpaces = name.replace(/\s+/g, '').toLowerCase();
    domains.push(`${nameWithoutSpaces}.in`);

    // Filter out duplicates
    return [...new Set(domains)];
  };

 // Get company logo
 const getCompanyLogo = () => {
   if (!job.companyName) return null;

   if (logoError) {
     // Fallback to initial letter
     const letter = job.companyName.charAt(0).toUpperCase();
     return (
       <div className="w-20 h-20 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-100">
         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
           <span className="text-gray-700 text-3xl font-bold">{letter}</span>
         </div>
       </div>
     );
   }

   // Get primary domain for logo
   const companyDomain = getDomainFromCompanyName(job.companyName);

   return (
     <div className="w-20 h-20 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-100">
       <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
         <img
           src={`https://logo.clearbit.com/${companyDomain}`}
           alt={`${job.companyName} logo`}
           className="w-full h-full object-contain"
           onError={(e) => {
             // Try fallback domains before giving up
             const possibleDomains = getPossibleDomains(job.companyName);
             const currentSrc = e.target.src;
             const currentDomain = currentSrc.split('/').pop();

             // Find the next domain to try
             const nextDomainIndex = possibleDomains.findIndex(domain => domain === currentDomain) + 1;

             if (nextDomainIndex > 0 && nextDomainIndex < possibleDomains.length) {
               // Try next domain
               e.target.src = `https://logo.clearbit.com/${possibleDomains[nextDomainIndex]}`;
             } else {
               // We've tried all domains, show fallback
               setLogoError(true);
             }
           }}
         />
       </div>
     </div>
   );
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
      <div className="flex flex-col">
        {/* Top section with logo and timestamp */}
        <div className="flex justify-between items-start mb-4">
          {/* Company logo on the left */}
          {getCompanyLogo()}

          {/* Timestamp on the right */}
          <div className="bg-blue-100 text-blue-500 text-xs px-3 py-1 md:text-sm md:px-4 md:py-2 rounded-full">
            {getTimeAgo(job.createdAt)}
          </div>
        </div>

        {/* Job title and company name - centered */}
        <div className="text-center mb-4">
          <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-1">{job.title}</h3>
          <p className="text-gray-600 mb-2 line-clamp-1">{job.companyName}</p>
        </div>

        {/* Job details */}
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