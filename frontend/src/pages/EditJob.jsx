import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import JobForm from '../components/job/JobForm';
import JobService from '../services/job.service';

const EditJob = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await JobService.getJobById(id);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
        alert('Failed to load job details.');
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      setSubmitting(true);
      await JobService.updateJob(id, data);
      navigate('/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Job Opening</h1>
        <JobForm job={job} onSubmit={handleSubmit} isLoading={submitting} />
      </div>
    </MainLayout>
  );
};

export default EditJob;