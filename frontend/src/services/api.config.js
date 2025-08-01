import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Don't show toast for authentication errors - let the login component handle those
    const isAuthEndpoint = error.config.url?.includes('/auth/');
    
    if (!isAuthEndpoint) {
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        'An error occurred';
        
      toast.error(errorMessage);
    }
    
    // Automatically log out on 401 errors (except during login/register)
    if (error.response?.status === 401 && 
        !error.config.url?.includes('/auth/login') && 
        !error.config.url?.includes('/auth/register')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;