import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URI || 'http://localhost:3001',
  credentials: 'include',
});