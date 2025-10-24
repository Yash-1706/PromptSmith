import { create } from 'zustand';
import { register, login, getMe, logout } from '../api/authAPI';

const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const user = await register(userData);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  login: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const user = await login(userData);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  loadUser: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ isLoading: true });
      try {
        const user = await getMe();
        set({ user, isLoading: false });
      } catch (error) {
        localStorage.removeItem('token');
        set({ user: null, isLoading: false });
      }
    }
  },

  logout: () => {
    logout();
    set({ user: null });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;