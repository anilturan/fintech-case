import axios from 'axios';
import { storageKey } from '../store/authStore';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getStoredToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed?.token || null;
  } catch (error) {
    return null;
  }
};

const clearStoredAuth = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(
    storageKey,
    JSON.stringify({ token: null, user: null })
  );
};

http.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token && !config.headers?.Authorization) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Unexpected API error.';
    if (error?.response?.data?.message) {
      message = error.response.data.message;
    }
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      clearStoredAuth();
      if (window.location.pathname !== '/signin') {
        window.location.assign('/signin');
      }
    }
    return Promise.reject(new Error(message));
  }
);
