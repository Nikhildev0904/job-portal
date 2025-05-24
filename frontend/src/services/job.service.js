import axios from 'axios';

const API_URL = 'https://jobadminportal-b2ee96473d89.herokuapp.com';
//const API_URL = 'http://localhost:5000';
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

    // Add filters only if they have meaningful values
    if (title && title.trim()) {
      url += `&title=${encodeURIComponent(title.trim())}`;
    }

    if (location && location.trim()) {
      url += `&location=${encodeURIComponent(location.trim())}`;
    }

    if (jobType && jobType.trim()) {
      url += `&jobType=${encodeURIComponent(jobType)}`;
    }


    if (salary) {
      if (salary.min > 0) {
        url += `&minSalary=${salary.min}`;
      }
      if (salary.max < 2000000) {
        url += `&maxSalary=${salary.max}`;
      }
    }

    if (cursor) {
      url += `&cursor=${cursor}`;
    }

    console.log('API URL:', url); // Debug log to check the URL
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