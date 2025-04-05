
import axios from 'axios';

// Base API URL
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth Services
export const authService = {
  register: async (userData: any) => {
    return await api.post('/auth/register', userData);
  },
  login: async (credentials: { email: string; password: string }) => {
    return await api.post('/auth/login', credentials);
  }
};

// Blood Request Services
export const bloodRequestService = {
  getAllRequests: async () => {
    return await api.get('/blood-requests');
  },
  getBloodBankRequests: async (bloodBankId: string) => {
    return await api.get(`/blood-requests/bloodbank/${bloodBankId}`);
  },
  createRequest: async (requestData: any) => {
    return await api.post('/blood-requests', requestData);
  }
};

// Donation Services
export const donationService = {
  scheduleDonation: async (donationData: any) => {
    return await api.post('/donations', donationData);
  },
  getDonorAppointments: async (donorId: string) => {
    return await api.get(`/donations/donor/${donorId}`);
  },
  getAllAppointments: async () => {
    return await api.get('/donations');
  }
};

export default api;
