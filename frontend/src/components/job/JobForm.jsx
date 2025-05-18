import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const jobTypeOptions = [
  { value: 'FullTime', label: 'Full Time' },
  { value: 'PartTime', label: 'Part Time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
];

const JobForm = ({ job, onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: job || {
      title: '',
      companyName: '',
      location: '',
      jobType: 'FullTime',
      minSalary: '',
      maxSalary: '',
      description: '',
      requirements: '',
      responsibilities: '',
      applicationDeadline: '',
      isRemote: false,
      experienceYears: 1,
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Job Title"
          {...register('title', { required: 'Job title is required' })}
          error={errors.title?.message}
        />

        <Input
          label="Company Name"
          {...register('companyName', { required: 'Company name is required' })}
          error={errors.companyName?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Location"
          {...register('location', { required: 'Location is required' })}
          error={errors.location?.message}
        />

        <Select
          label="Job Type"
          options={jobTypeOptions}
          {...register('jobType', { required: 'Job type is required' })}
          error={errors.jobType?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Minimum Salary (₹)"
          type="number"
          {...register('minSalary', {
            required: 'Minimum salary is required',
            min: { value: 0, message: 'Salary cannot be negative' }
          })}
          error={errors.minSalary?.message}
        />

        <Input
          label="Maximum Salary (₹)"
          type="number"
          {...register('maxSalary', {
            required: 'Maximum salary is required',
            min: {
              value: parseInt(watch('minSalary') || 0),
              message: 'Maximum salary must be greater than minimum salary'
            }
          })}
          error={errors.maxSalary?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Experience Years"
          type="number"
          {...register('experienceYears', {
            required: 'Experience is required',
            min: { value: 0, message: 'Experience cannot be negative' }
          })}
          error={errors.experienceYears?.message}
        />

        <Input
          label="Application Deadline"
          type="date"
          {...register('applicationDeadline', { required: 'Deadline is required' })}
          error={errors.applicationDeadline?.message}
        />
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('isRemote')}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">Remote Position</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Description
        </label>
        <textarea
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          {...register('description', { required: 'Description is required' })}
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Requirements
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          {...register('requirements')}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Responsibilities
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          {...register('responsibilities')}
        ></textarea>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : job ? 'Update Job' : 'Publish'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;