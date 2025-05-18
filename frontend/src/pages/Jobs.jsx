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
      <h1 className="text-2xl font-bold mb-6">Find Jobs</h1>

      <FilterSection onFilterChange={handleFilterChange} />

      <div className="flex justify-end mb-4">
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
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
      </div>

      <JobList
        filters={filters}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </MainLayout>
  );
};

export default Jobs;