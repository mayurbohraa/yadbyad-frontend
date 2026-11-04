// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import { clearAccount } from 'src/utils/account';

export const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://yadbyad-backend.vercel.app/api/v1'
    : 'http://localhost:9000/api/v1');

export function getHeaders() {
  return {
    ...(localStorage.getItem('token_status')
      ? { Authorization: `Bearer ${localStorage.getItem('token_status')}` }
      : {}),
    'Content-Type': 'application/json',
  };
}

const Axiosinstance = axios.create({
  baseURL,
  timeout: 20000,
  headers: getHeaders(),
  validateStatus: (status) => status >= 200 && status < 400,
});

export default Axiosinstance;

Axiosinstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token_status');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else delete config.headers.Authorization;
  return config;
});

Axiosinstance.interceptors.response.use(
  (response) => {
    if (['post', 'put', 'patch', 'delete'].includes(response.config.method)) {
      window.dispatchEvent(
        new CustomEvent('yadbyad:data-changed', {
          detail: { url: response.config.url },
        })
      );
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && error.config?.url !== '/auth/login') {
      clearAccount();
    }
    return Promise.reject(error);
  }
);
