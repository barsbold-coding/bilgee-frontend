import { CreateInternshipType, CredentialsType, RegisterUserType, UpdateInternshipType, UpdateUserType } from '@/types/api.types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication
export const authAPI = {
  register: (userData: RegisterUserType) => api.post('/api/auth/register', userData),
  login: (credentials: CredentialsType) => api.post('/api/auth/login', credentials),
};

// Users
export const usersAPI = {
  getAll: () => api.get('/api/users'),
  getProfile: () => api.get('/api/users/profile'),
  getById: (id: number) => api.get(`/api/users/${id}`),
  update: (id: number, userData: UpdateUserType) => api.patch(`/api/users/${id}`, userData),
  delete: (id: string) => api.delete(`/api/users/${id}`),
  getStudentDashboard: () => api.get('/api/users/student/dashboard'),
  getOrganisationDashboard: () => api.get('/api/users/organisation/dashboard'),
  getAdminDashboard: () => api.get('/api/users/admin/dashboard'),
};

// Internships
export const internshipsAPI = {
  create: (internshipData: CreateInternshipType) => api.post('/api/internships', internshipData),
  getAll: () => api.get('/api/internships'),
  getById: (id: number) => api.get(`/api/internships/${id}`),
  update: (id: number, internshipData: UpdateInternshipType) => api.patch(`/api/internships/${id}`, internshipData),
  delete: (id: number) => api.delete(`/api/internships/${id}`),
  getOwnInternships: () => api.get('/api/internships/organisation/own'),
};

// Favorites
export const favoritesAPI = {
  add: (internshipId: number) => api.post('/api/favourites', { internshipId }),
  remove: (internshipId: number) => api.delete(`/api/favourites/${internshipId}`),
  getAll: () => api.get('/api/favourites'),
  check: (internshipId: number) => api.get(`/api/favourites/check/${internshipId}`),
};

export default api;
