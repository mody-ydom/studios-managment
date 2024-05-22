// services/apiClient.ts
import axios from 'axios';
import { refreshToken } from './apiServices';

// Environment variables can be set in a .env file and accessed via process.env
const API_BASE_URL = process.env.NEXT_PUBLIC_STUDIOS_APP_API_URL || 'http://localhost:8000';
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
  });
  
  // Adding an interceptor for request logging and attaching tokens
  apiClient.interceptors.request.use(
    config => {
      // Access tokens from localStorage
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
  
      console.log('Request:', config);
      return config;
    },
    error => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );
  
  // Response interceptor for logging and error handling
  apiClient.interceptors.response.use(
    response => {
      console.log('Response:', response);
      return response;
    },
    error => {
      console.error('Response error:', error);
  
      // Handling unauthorized access (e.g., token expired)
      if (error.response && error.response.status === 401) {
        // Here you can add logic to refresh the token using refreshToken or redirect to login
        const refresh = localStorage.getItem("refreshToken");
        const access = localStorage.getItem("accessToken") as string;

        // Assuming you have a function to handle token refresh
        if (refresh) {
          return refreshToken({body:{refresh,access}}).then(newAccessToken => {
            // Save the new access token and retry the failed request

            console.log('New Access Token', newAccessToken);
            
            localStorage.setItem("accessToken", newAccessToken.data.access);
            error.config.headers.Authorization = `Bearer ${newAccessToken.data.access}`;
            return axios(error.config); // Retry the original request with the new token
          }).catch(() => {
            // Redirect to login if refresh fails
            redirectToLogin();
            return Promise.reject(error);
          });
        } else {
          // No refresh token available, redirect to login
          redirectToLogin();
          return Promise.reject(error);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  function redirectToLogin() {
    // Redirect user to the login page
    if (global?.location?.href) {
      global.location.href = '/login';
  
    }
  }
  
  export default apiClient;

