import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import JobService from '../../services/job.service';

const Header = ({ onJobCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    responsibilities: '',
    applicationDeadline: '',
    experienceYears: '',
  });

  const [errors, setErrors] = useState({});

  // Only allow real navigation for these paths:
  const enabledPaths = ['/', '/jobs'];


  const handleNavClick = (e, to) => {
    if (!enabledPaths.includes(to)) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const handleCreateJobClick = (e) => {
    e.preventDefault();
    setShowCreateJobModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Allow only numbers for salary fields
    if ((name === 'salaryMin' || name === 'salaryMax') && value !== '') {
      if (!/^\d*\.?\d*$/.test(value)) {
        return; // Don't update if invalid
      }
    }

    // Allow only numbers and a hyphen for experienceYears
    if (name === 'experienceYears' && value !== '') {
      if (!/^\d*-?\d*$/.test(value)) {
        return; // Don't update if invalid
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    if (!formData.jobType) {
      newErrors.jobType = 'Job type is required';
    }

    if (!formData.salaryMin.trim()) {
      newErrors.salaryMin = 'Minimum salary is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }

    if (!formData.applicationDeadline) {
      newErrors.applicationDeadline = 'Application deadline is required';
    }

    // Salary validations
    if (formData.salaryMin && isNaN(parseFloat(formData.salaryMin))) {
      newErrors.salaryMin = 'Please enter a valid number';
    }

    if (formData.salaryMax && isNaN(parseFloat(formData.salaryMax))) {
      newErrors.salaryMax = 'Please enter a valid number';
    }

    if (formData.salaryMin && formData.salaryMax) {
      const minSal = parseFloat(formData.salaryMin);
      const maxSal = parseFloat(formData.salaryMax);
      if (maxSal <= minSal) {
        newErrors.salaryMax = 'Maximum salary must be greater than minimum salary';
      }
    }

    // Experience validation
    if (formData.experienceYears && isNaN(parseInt(formData.experienceYears))) {
      newErrors.experienceYears = 'Please enter a valid number';
    }

    // Date validation
    if (formData.applicationDeadline) {
      const selectedDate = new Date(formData.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        newErrors.applicationDeadline = 'Application deadline must be a future date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Clean up data before submitting
    const dataToSubmit = {
      title: formData.title.trim(),
      companyName: formData.companyName.trim(),
      location: formData.location,
      jobType: formData.jobType,
      minSalary: formData.salaryMin ? parseFloat(formData.salaryMin) : null,
      maxSalary: formData.salaryMax ? parseFloat(formData.salaryMax) : null,
      description: formData.description.trim(),
      requirements: formData.requirements.trim(),
      responsibilities: formData.responsibilities.trim(),
      applicationDeadline: formData.applicationDeadline,
      experienceYears: formData.experienceYears === '' ? 0 : parseInt(formData.experienceYears),
    };

    try {
      setLoading(true);
      await JobService.createJob(dataToSubmit);
      setShowCreateJobModal(false);
      // Reset form
      setFormData({
        title: '',
        companyName: '',
        location: '',
        jobType: '',
        salaryMin: '',
        salaryMax: '',
        description: '',
        requirements: '',
        responsibilities: '',
        applicationDeadline: '',
        experienceYears: '',
      });
      setErrors({});
       if (onJobCreated) {
          onJobCreated();
       }
      alert('Job created successfully!');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    setShowModal(true);
  };

  const closeCreateJobModal = () => {
    setShowCreateJobModal(false);
    // Reset form data
    setFormData({
      title: '',
      companyName: '',
      location: '',
      jobType: '',
      salaryMin: '',
      salaryMax: '',
      description: '',
      requirements: '',
      responsibilities: '',
      applicationDeadline: '',
      isRemote: false,
      experienceYears: '0',
    });
    setErrors({});
  };

  return (
    <>
      <div className="flex justify-center py-4">
        <div className="inline-flex justify-between items-center bg-white rounded-full shadow py-3 px-6 space-x-8">
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Job Portal Logo" className="h-8 w-8" />
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#780eca] font-medium">
                Home
              </Link>
              <Link to="/jobs" className="text-gray-700 hover:text-[#780eca] font-medium">
                Find Jobs
              </Link>

              <Link
                to="/talents"
                onClick={e => handleNavClick(e, '/talents')}
                className="text-gray-700 hover:text-[#780eca] font-medium"
              >
                Find Talents
              </Link>
              <Link
                to="/about"
                onClick={e => handleNavClick(e, '/about')}
                className="text-gray-700 hover:text-[#780eca] font-medium"
              >
                About us
              </Link>
              <Link
                to="/testimonials"
                onClick={e => handleNavClick(e, '/testimonials')}
                className="text-gray-700 hover:text-[#780eca] font-medium"
              >
                Testimonials
              </Link>
            </nav>
          </div>

          <button
            onClick={handleCreateJobClick}
            className="
              bg-gradient-to-b
              from-[#9333ea]
              to-[#780eca]
              text-white
              px-6
              py-1.5
              rounded-full
              hover:border-[#650cb3]
              font-medium
            "
          >
            Create Jobs
          </button>
        </div>
      </div>

      {/* Create Job Modal */}
      {showCreateJobModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeCreateJobModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-8 text-center">Create Job Opening</h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm ${
                        errors.title
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-200 focus:ring-blue-500'
                      }`}
                      placeholder="Full Stack Developer"
                    />
                    {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm ${
                        errors.companyName
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-200 focus:ring-blue-500'
                      }`}
                      placeholder="Amazon"
                    />
                    {errors.companyName && <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white text-sm ${
                          errors.location
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200 focus:ring-blue-500'
                        }`}
                      >
                        <option value="">No Selection</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Remote">Remote</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Job Type
                    </label>
                    <div className="relative">
                      <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white text-sm ${
                          errors.jobType
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200 focus:ring-blue-500'
                        }`}
                      >
                        <option value="">No Selection</option>
                        <option value="FullTime">Full Time</option>
                        <option value="PartTime">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.jobType && <p className="mt-1 text-xs text-red-600">{errors.jobType}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Salary Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-xs">₹</span>
                        <input
                          type="text"
                          name="salaryMin"
                          value={formData.salaryMin}
                          onChange={handleChange}
                          className={`w-full pl-6 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm ${
                            errors.salaryMin
                              ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-200 focus:ring-blue-500'
                          }`}
                          placeholder="0"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-xs">₹</span>
                        <input
                          type="text"
                          name="salaryMax"
                          value={formData.salaryMax}
                          onChange={handleChange}
                          className={`w-full pl-6 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm ${
                            errors.salaryMax
                              ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-200 focus:ring-blue-500'
                          }`}
                          placeholder="12,00,000"
                        />
                      </div>
                    </div>
                    {(errors.salaryMin || errors.salaryMax) && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.salaryMin || errors.salaryMax}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Application Deadline
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm ${
                          errors.applicationDeadline
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200 focus:ring-blue-500'
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {errors.applicationDeadline && <p className="mt-1 text-xs text-red-600">{errors.applicationDeadline}</p>}
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Experience (years)
                      </label>
                      <input
                        type="text"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm ${
                          errors.experienceYears
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200 focus:ring-blue-500'
                        }`}
                        placeholder="0"
                      />
                      {errors.experienceYears && <p className="mt-1 text-xs text-red-600">{errors.experienceYears}</p>}
                    </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Job Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent resize-none text-sm ${
                      errors.description
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-blue-500'
                    }`}
                    placeholder="Please share a description to let the candidate know more about the job role"
                  ></textarea>
                  {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Requirements
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    placeholder="List the qualifications and skills required for this role"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Responsibilities
                  </label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    placeholder="Describe the key responsibilities and tasks for this position"
                  ></textarea>
                </div>

                <div className="flex justify-between">
                 <button
                   type="button"
                   onClick={handleSaveDraft}
                   className="flex items-center px-6 py-3 border border-gray-700 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
                 >
                   Save Draft
                   <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>

                 </button>

                 <button
                   type="submit"
                   disabled={loading}
                   className="flex items-center px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm disabled:opacity-50"
                 >
                   {loading ? 'Publishing...' : 'Publish ≫'}
                 </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Simple modal for other features */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Coming Soon!</h2>
            <p className="mb-6">This feature is yet to be implemented.</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-[#780eca] text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;