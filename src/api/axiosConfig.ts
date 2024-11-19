import axios from 'axios';
import { environmentVariables } from '../utils/appConfig';
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../utils/localStorageOperations';
import constants from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: `${environmentVariables.baseUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = getItemFromLocalStorage(constants.ACCESS_TOKEN);
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      !window.location.href.includes('auth') &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = getItemFromLocalStorage(constants.REFRESH_TOKEN); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axios.post(
          `${environmentVariables.baseUrl}/refresh`,
          {
            refreshToken,
          },
        );
        const { token: accessToken, refreshToken: newRefreshToken } =
          response.data;
        // Store the new access and refresh tokens.
        setItemInLocalStorage(constants.ACCESS_TOKEN, accessToken);
        setItemInLocalStorage(constants.REFRESH_TOKEN, newRefreshToken);
        // localStorage.setItem('refreshToken', newRefreshToken);
        // Update the authorization header with the new access token.
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        removeItemFromLocalStorage(constants.ACCESS_TOKEN);
        removeItemFromLocalStorage(constants.REFRESH_TOKEN);
        window.location.href = 'auth/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
