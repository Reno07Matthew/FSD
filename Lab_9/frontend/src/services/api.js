import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// User API endpoints
export const userAPI = {
  // Register a new user
  register: async (userData) => {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(userData).forEach(key => {
      if (key !== 'profile_picture') {
        formData.append(key, userData[key]);
      }
    });
    
    // Append file if exists
    if (userData.profile_picture) {
      formData.append('profile_picture', userData.profile_picture);
    }
    
    const response = await api.post('/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(userData).forEach(key => {
      if (key !== 'profile_picture') {
        formData.append(key, userData[key]);
      }
    });
    
    // Append file if exists
    if (userData.profile_picture && userData.profile_picture instanceof File) {
      formData.append('profile_picture', userData.profile_picture);
    }
    
    const response = await api.put(`/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Confirm email
  confirmEmail: async (id) => {
    const response = await api.put(`/users/${id}/confirm-email`);
    return response.data;
  },

  // Get user statistics
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },
};

export default api;
