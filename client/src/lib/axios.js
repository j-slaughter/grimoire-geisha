/**
 * @module axios.js
 * @description Configuration for axios instance
 */

import axios from 'axios';

const axiosInstance = axios.create({
  // Set base url to backend api
  baseURL: import.meta.mode === 'development' ? 'http://localhost:5000/api' : '/api',
  // Send cookies to the server
  withCredentials: true,
});

export default axiosInstance;
