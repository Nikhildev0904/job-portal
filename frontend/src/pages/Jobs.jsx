import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import FilterSection from '../components/job/FilterSection';
import JobList from '../components/job/JobList';

const Jobs = () => {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === 'newest') {
      setSortBy('createdAt');
      setSortDirection('desc');
    } else if (value === 'oldest') {
      setSortBy('createdAt');
      setSortDirection('asc');
    } else if (value === 'salary_high') {
      setSortBy('salary');
      setSortDirection('desc');
    } else if (value === 'salary_low') {
      setSortBy('salary');
      setSortDirection('asc');
    } else if (value === 'experience_high') {
      setSortBy('experience');
      setSortDirection('desc');
    } else if (value === 'experience_low') {
      setSortBy('experience');
      setSortDirection('asc');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FilterSection onFilterChange={handleFilterChange} />

        <div className="flex justify-end mb-6">
          <div className="relative">
            <select
               className="appearance-none pl-4 pr-10 py-2 rounded-md bg-white focus:outline-none focus:ring-0 border border-gray-300 bg-no-repeat"
               onChange={handleSortChange}
               defaultValue="newest"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="salary_high">Highest Salary</option>
              <option value="salary_low">Lowest Salary</option>
              <option value="experience_high">Most Experience</option>
              <option value="experience_low">Least Experience</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <JobList
          filters={filters}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
      </div>
    </MainLayout>
  );
};

export default Jobs;