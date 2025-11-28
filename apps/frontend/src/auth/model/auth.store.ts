import { makeAutoObservable, runInAction } from 'mobx';
import { api } from '../../infrastructure/api/axios.instance';

export interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
  // Add other fields as needed
}

class AuthStore {
  isAuthenticated = false;
  isLoading = true;
  user: UserProfile | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async checkAuth() {
    this.isLoading = true;
    try {
      const response = await api.get<UserProfile>('/auth/me');

      runInAction(() => {
        this.user = response.data;
        this.isAuthenticated = true;
      });
    } catch (error) {
      console.error('Auth check failed', error);
      runInAction(() => {
        this.isAuthenticated = false;
        this.user = null;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async logout() {
    try {
      await api.get('/auth/logout');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      runInAction(() => {
        this.user = null;
        this.isAuthenticated = false;
      });
    }
  }
}

export const authStore = new AuthStore();
