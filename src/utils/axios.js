/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import Cookies from 'js-cookie';
// config
import { HOST_API } from 'src/config-global';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API,withCredentials: true });

axiosInstance.interceptors.request.use((config) => { 
const storedAuthToken = Cookies.get('authToken');
console.log(storedAuthToken);
if (storedAuthToken) {config.headers.Authorization = storedAuthToken} ;
return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/user/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
