import React, { useState } from 'react';
import { ReactComponent as ResetIcon } from '../../assets/images/reset.svg';
import RangeSlider from '../ui/RangeSlider';

const FilterSection = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salary: { min: 0, max: 166666 }, // Monthly values
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);

    // Convert salary to yearly for backend, keep others as is
    const backendFilters = {
      ...updated,
      salary: {
        min: updated.salary.min * 12,
        max: updated.salary.max * 12
      }
    };
    onFilterChange(backendFilters);
  };

  const handleSliderChange = (monthlySalary) => {
    const updated = { ...filters, salary: monthlySalary };
    setFilters(updated);

    // Convert to yearly for backend
    const backendFilters = {
      ...updated,
      salary: {
        min: monthlySalary.min * 12,
        max: monthlySalary.max * 12
      }
    };
    onFilterChange(backendFilters);
  };

  const resetFilters = () => {
    const resetState = {
      title: '',
      location: '',
      jobType: '',
      salary: { min: 0, max: 166666 } // Monthly
    };
    setFilters(resetState);

    // Send yearly values to backend
    onFilterChange({
      title: '',
      location: '',
      jobType: '',
      salary: { min: 0, max: 2000000 } // Yearly
    });
  };

  const formatSalaryDisplay = () => {
    const minK = Math.round(filters.salary.min / 1000);
    const maxK = Math.round(filters.salary.max / 1000);

    if (filters.salary.max >= 166666) {
      return `₹${minK}k - ₹${maxK}k+`;
    }
    return `₹${minK}k - ₹${maxK}k`;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow px-6 py-4 -mt-4 mb-6">
      <div className="flex items-center divide-x divide-gray-200">

        <div className="flex-1 flex items-center px-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Search By Job, Company "
              value={filters.title}
              onChange={handleInputChange}
              className="w-full pl-8 pr-2 py-2 border-0 focus:ring-0 text-gray-700"
            />
          </div>
        </div>

        <div className="flex-1 flex items-center px-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="location"
              placeholder="Preferred Location"
              value={filters.location}
              onChange={handleInputChange}
              className="w-full pl-8 pr-2 py-2 border-0 focus:ring-0 text-gray-700"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center px-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleInputChange}
              className="w-full pl-8 pr-8 py-2 border-0 focus:ring-0 text-gray-700 appearance-none bg-none"
            >
              <option value="">Job type</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-[1.5] flex-col px-4">
          <div className="flex justify-between text-sm text-gray-700 mb-1">
            <span>Salary Per Month</span>
            <span>{formatSalaryDisplay()}</span>
          </div>
          <RangeSlider
            min={0}
            max={166666}
            step={1000}
            value={filters.salary}
            onChange={handleSliderChange}
          />
        </div>

        <div className="flex items-center pl-4">
          <button onClick={resetFilters} className="p-2 hover:bg-gray-100 rounded-full">
            <ResetIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;