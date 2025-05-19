import axios from 'axios';

const API_URL = 'https://jobadminportal-b2ee96473d89.herokuapp.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const JobService = {
  getAllJobs: async (filters = {}, cursor = null, limit = 12, sortBy = 'createdAt', sortDirection = 'desc') => {
    const { title, location, jobType, salary } = filters;

    let url = `/jobs?limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}`;

    // Title search (now includes company name)
    if (title) url += `&title=${encodeURIComponent(title)}`;

    // Location search
    if (location) url += `&location=${encodeURIComponent(location)}`;

    // Job type filter
    if (jobType) url += `&jobType=${encodeURIComponent(jobType)}`;

    // Salary range filter
    if (salary && salary.min > 0) url += `&minSalary=${salary.min}`;
    if (salary && salary.max < 2000000) url += `&maxSalary=${salary.max}`;

    // Cursor for pagination
    if (cursor) url += `&cursor=${cursor}`;

    return api.get(url);
  },

  getJobById: async (id) => {
    return api.get(`/jobs/${id}`);
  },

  createJob: async (jobData) => {
    return api.post('/jobs', jobData);
  },

  updateJob: async (id, jobData) => {
    return api.put(`/jobs/${id}`, jobData);
  },

  deleteJob: async (id) => {
    return api.delete(`/jobs/${id}`);
  },
};

export default JobService;