import { getSecureStorageItem } from 'app/utils/secureStorage';
import axios from 'axios';
import { errorHandler } from 'app/utils/errorHandler';

export const api = axios.create({
  withCredentials: true,
});

api.defaults.timeout = 30000;

api.interceptors.request.use(async config => {
  const tokens = await getSecureStorageItem('tokens');

  if (config.headers && tokens && tokens.token) {
    config.headers.Authorization = `Bearer ${tokens.token}`;
  }
  if (config.headers) {
    if (!config.headers['Accept-Language']) {
      config.headers['Accept-Language'] = 'en';
    }
    if (!config.headers['content-type']) {
      config.headers['content-type'] = 'application/json';
    }
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('request error:', error?.response ? error?.response : error);
    errorHandler(error);
    throw error;
  },
);
