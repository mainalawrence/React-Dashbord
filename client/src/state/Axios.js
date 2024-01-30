// axios.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:"http://localhost:9000/", // Set your base URL here
  timeout: 5000, // Set a timeout (optional)
  headers: {
    'Content-Type': 'application/json', // Set default headers
    // Add any other default headers as needed
  },
});

// Add request interceptor to inject JWT token
axiosInstance.interceptors.request.use((config) => {
    // Get token from local storage
    const token = localStorage.getItem('DCPOS');
    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    // Handle request errors
    return Promise.reject(error);
  });

axiosInstance.interceptors.response.use((response) => {
  // Handle successful responses
  return response;
}, (error) => {
  // Handle response errors
  return Promise.reject(error);
});

export default axiosInstance;
