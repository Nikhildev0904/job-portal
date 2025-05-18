import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobService from '../../services/job.service';
import Button from '../ui/Button';

const JobList = ({ filters, sortBy, sortDirection }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [filters, sortBy, sortDirection]);

  const fetchJobs = async (reset = true) => {
    try {
      setLoading(true);
      const currentCursor = reset ? null : cursor;

      const response = await JobService.getAllJobs(
        filters,
        currentCursor,
        10,
        sortBy,
        sortDirection
      );

      const { data, nextCursor, hasMore } = response.data;

      setJobs(reset ? data : [...jobs, ...data]);
      setCursor(nextCursor);
      setHasMore(hasMore);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await JobService.deleteJob(id);
        setJobs(jobs.filter(job => job.id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  if (error) {
    return <div className="text-center text-red-500 my-4">{error}</div>;
  }

  return (
    <div>
      {jobs.length === 0 && !loading ? (
        <div className="text-center text-gray-500 my-8">
          No jobs found. Try adjusting your filters.
        </div>
      ) : (
        <>
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={handleDelete}
            />
          ))}

          {hasMore && (
            <div className="text-center my-4">
              <Button
                variant="secondary"
                onClick={() => fetchJobs(false)}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}

      {loading && jobs.length === 0 && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  );
};

export default JobList;