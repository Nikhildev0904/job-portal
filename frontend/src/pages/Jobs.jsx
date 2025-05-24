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

  return (
    <MainLayout>

        <FilterSection onFilterChange={handleFilterChange} />
        <JobList
          filters={filters}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />

    </MainLayout>
  );
};

export default Jobs;