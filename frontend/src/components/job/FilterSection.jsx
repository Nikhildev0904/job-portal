import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import RangeSlider from '../ui/RangeSlider';
import Button from '../ui/Button';

const jobTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'FullTime', label: 'Full Time' },
  { value: 'PartTime', label: 'Part Time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
];

const FilterSection = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salary: { min: 50000, max: 180000 },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (value) => {
    setFilters(prev => ({ ...prev, salary: value }));
  };

  const applyFilters = () => {
    onFilterChange({
      title: filters.title,
      location: filters.location,
      jobType: filters.jobType,
      minSalary: filters.salary.min,
      maxSalary: filters.salary.max,
    });
  };

  const resetFilters = () => {
    setFilters({
      title: '',
      location: '',
      jobType: '',
      salary: { min: 50000, max: 180000 },
    });

    onFilterChange({});
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          name="title"
          placeholder="Search By Job Title, Role"
          value={filters.title}
          onChange={handleInputChange}
        />

        <Input
          name="location"
          placeholder="Preferred Location"
          value={filters.location}
          onChange={handleInputChange}
        />

        <Select
          name="jobType"
          options={jobTypeOptions}
          value={filters.jobType}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Salary Per Month</span>
          <span className="text-sm text-gray-600">₹{filters.salary.min} - ₹{filters.salary.max}</span>
        </div>

        <RangeSlider
          min={0}
          max={200000}
          step={5000}
          value={filters.salary}
          onChange={handleSalaryChange}
          formatLabel={(value) => `₹${value}`}
        />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="secondary" onClick={resetFilters}>
          Reset
        </Button>
        <Button onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;