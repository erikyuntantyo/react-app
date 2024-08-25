import axios from 'axios';
import store from '../redux/store';
import { logout } from '../redux/authSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token && config.url !== '/account/token/refresh') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    if (!(error instanceof Error)) {
      return Promise.reject(new Error(error));
    }

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/account/token/refresh', { refreshToken, });
        const { token } = response.data;

        localStorage.setItem('token', token);

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (error) {
        store.dispatch(logout());

        console.error('Error', error.message);
        console.error('Refresh token is invalid or expired.');

        if (!(error instanceof Error)) {
          return Promise.reject(new Error(error));
        }

        return Promise.reject(error);
      }
    }

    if (!(error instanceof Error)) {
      return Promise.reject(new Error(error));
    }

    return Promise.reject(error);
  }
);

export default api;
