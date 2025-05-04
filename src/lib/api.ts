import {
  ApplicationUpdate,
  CreateInternshipType,
  CreateResume,
  CredentialsType,
  InternshipQueryType,
  RegisterUserType,
  Resume,
  UpdateInternshipType,
  UpdateUserType,
  UserQueryType
} from '@/types/api.types';
import axios from 'axios';
import { qs } from './utils';

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
  getOrgs: (query: UserQueryType) => api.get(`/api/users/organisations${qs(query)}`),
  update: (id: number, userData: UpdateUserType) => api.patch(`/api/users/${id}`, userData),
  delete: (id: string) => api.delete(`/api/users/${id}`),
};

// Internships
export const internshipsAPI = {
  create: (internshipData: CreateInternshipType) => api.post('/api/internships', internshipData),
  getAll: (query?: InternshipQueryType) => {
    if (!query) return api.get(`/api/internships`);
    return api.get(`/api/internships${qs(query)}`);
  },
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

export const resumeAPI = {
  create: (resumeData: CreateResume) => 
    api.post<Resume>('/api/resumes', resumeData),
  
  getById: (id: number) => 
    api.get<Resume>(`/api/resumes/${id}`),
  
  getMyResume: () => 
    api.get<Resume>('/api/resumes/student/my-resume'),
  
  update: (id: number, resumeData: CreateResume) => 
    api.patch<Resume>(`/api/resumes/${id}`, resumeData),
};

export const applicationsAPI = {
  create: (internshipId: number) => 
    api.post('/api/applications', { internshipId }),

  getAll: (query?: any) => {
    if (!query) {
      return api.get(`/api/applications`);
    }
    return api.get(`/api/applications?${qs(query)}`);
  },
  
  update: (id: number, data: ApplicationUpdate) =>
    api.patch(`/api/applications/${id}`, data),
  
  getByInternship: (internshipId: number) => 
    api.get(`/api/applications?internshipId=${internshipId}`),
  
  getOwn: () => 
    api.get('/api/applications/student/own'),
  getApplicationResume: (id: number) => api.get(`/api/applications/${id}/resume`)
};

export default api;
