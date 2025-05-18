import React, { useState } from 'react';

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

  const handleSalaryChange = (e, type) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [type]: value
      }
    }));
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
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-6">Find Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            name="title"
            placeholder="Search By Job Title, Role"
            value={filters.title}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <input
            type="text"
            name="location"
            placeholder="Preferred Location"
            value={filters.location}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleInputChange}
            className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none bg-white"
          >
            {jobTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-700">Salary Per Month</p>
          <p className="text-sm">₹{filters.salary.min} - ₹{filters.salary.max}</p>
        </div>

        <div className="relative h-1 bg-gray-200 rounded-full mt-4 mb-4">
          <div
            className="absolute h-1 bg-purple-500 rounded-full"
            style={{
              left: `${(filters.salary.min / 200000) * 100}%`,
              width: `${((filters.salary.max - filters.salary.min) / 200000) * 100}%`,
            }}
          ></div>

          <input
            type="range"
            min={0}
            max={200000}
            step={5000}
            value={filters.salary.min}
            onChange={(e) => handleSalaryChange(e, 'min')}
            className="absolute w-full h-1 opacity-0 z-10 cursor-pointer"
          />

          <input
            type="range"
            min={0}
            max={200000}
            step={5000}
            value={filters.salary.max}
            onChange={(e) => handleSalaryChange(e, 'max')}
            className="absolute w-full h-1 opacity-0 z-10 cursor-pointer"
          />

          <div
            className="absolute w-5 h-5 bg-white border-2 border-purple-500 rounded-full -mt-2"
            style={{ left: `calc(${(filters.salary.min / 200000) * 100}% - 10px)`, top: '0' }}
          ></div>

          <div
            className="absolute w-5 h-5 bg-white border-2 border-purple-500 rounded-full -mt-2"
            style={{ left: `calc(${(filters.salary.max / 200000) * 100}% - 10px)`, top: '0' }}
          ></div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={resetFilters}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium"
        >
          Reset
        </button>
        <button
          onClick={applyFilters}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;