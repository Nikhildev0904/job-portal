import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import FilterSection from '../components/job/FilterSection';
import JobList from '../components/job/JobList';

const Jobs = () => {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleJobCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <MainLayout onJobCreated={handleJobCreated}>
        <FilterSection onFilterChange={handleFilterChange} />
        <JobList
          filters={filters}
          sortBy={sortBy}
          sortDirection={sortDirection}
          refreshTrigger={refreshTrigger}
        />
      </MainLayout>
  );
};

export default Jobs;