import React, { useState, useEffect, useCallback } from 'react';
//import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import JobService from '../../services/job.service';

const JobList = ({ filters, sortBy, sortDirection, refreshTrigger}) => {
  //const navigate = useNavigate();
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
        8,
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
  }, [filters, sortBy, sortDirection]);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const response = await JobService.getAllJobs(
        filters,
        cursor,
        8,
        sortBy,
        sortDirection
      );

      const { data, nextCursor, hasMore: moreJobs } = response.data;

      setJobs(prevJobs => [...prevJobs, ...data]);
      setCursor(nextCursor);
      setHasMore(moreJobs);
    } catch (err) {
      setError('Failed to fetch more jobs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchJobs(true);
    }
  }, [refreshTrigger, fetchJobs]);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {jobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>

          {hasMore && (
            <div className="text-center my-8">
              <button
                className="px-6 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
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