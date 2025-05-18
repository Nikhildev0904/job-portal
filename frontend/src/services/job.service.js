import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const JobService = {
  getAllJobs: async (filters = {}, cursor = null, limit = 10, sortBy = 'createdAt', sortDirection = 'desc') => {
    const { title, location, jobType, minSalary, maxSalary } = filters;

    let url = `/jobs?limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}`;

    if (title) url += `&title=${encodeURIComponent(title)}`;
    if (location) url += `&location=${encodeURIComponent(location)}`;
    if (jobType) url += `&jobType=${encodeURIComponent(jobType)}`;
    if (minSalary) url += `&minSalary=${minSalary}`;
    if (maxSalary) url += `&maxSalary=${maxSalary}`;
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