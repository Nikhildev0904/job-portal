import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import JobForm from '../components/job/JobForm';
import JobService from '../services/job.service';

const CreateJob = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await JobService.createJob(data);
      navigate('/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Create Job Opening</h1>
        <JobForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </MainLayout>
  );
};

export default CreateJob;