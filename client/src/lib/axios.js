/**
 * @module axios.js
 * @description Configuration for axios instance
 */

import axios from 'axios';
import { store } from '../store/store.js';
import { updateUser } from '../store/reducers/userReducer.js';

const axiosInstance = axios.create({
  // Set base url to backend api
  baseURL: import.meta.mode === 'development' ? 'http://localhost:5000/api' : '/api',
  // Send cookies to the server
  withCredentials: true,
});

// Axios interceptor for auth token refresh
axiosInstance.interceptors.response.use(
  function (response) {
    // If status code is 2xx, return response like normal
    return response;
  },
  async function (error) {
    // If something goes wrong, refresh the auth before completely rejecting the request
    // Grab the original request
    const originalRequest = error.config;
    // Check if 401 (Unauthorized) response and did not already retry request
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Retry the request
      originalRequest._retry = true;
      // Attempt to refresh the auth token
      try {
        const res = await axiosInstance.post('/auth/renew-access');
        console.log(res.data);
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, update user state to null
        console.log(refreshError.response.data);
        // Note: accessing store directly instead of from Provider seems not best practice. Try to refactor with better solution?
        store.dispatch(updateUser(null));
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
