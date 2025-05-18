import React, { useState, useEffect, useCallback } from 'react';
import JobCard from './JobCard';
import JobService from '../../services/job.service';
import Button from '../ui/Button';

const JobList = ({ filters, sortBy, sortDirection }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async (reset = true) => {
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

      setJobs(prevJobs => reset ? data : [...prevJobs, ...data]);
      setCursor(nextCursor);
      setHasMore(hasMore);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, sortDirection, cursor]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <JobCard
                  key={job.id || Math.random()}
                  job={job}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              // Sample placeholder cards when no data is available
              Array.from({ length: 8 }).map((_, index) => (
                <JobCard
                  key={index}
                  job={{
                    title: index % 2 === 0 ? 'Full Stack Developer' : index % 3 === 0 ? 'UX/UI Designer' : 'Node.js Developer',
                    companyName: index % 2 === 0 ? 'Amazon' : index % 3 === 0 ? 'UX/UI Co' : 'Tech Corp',
                    isRemote: index % 2 === 0
                  }}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>

          {hasMore && (
            <div className="text-center my-8">
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