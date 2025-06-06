import axios from 'axios';
import {LocalStorage} from './LocalStorage';
import {Alert} from 'react-native';
import {logouthandler, saveUserData} from '../store/slices/auth';
import store from '../store';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  baseURL: Config.Swagger_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Function to handle user logout
const handleLogout = () => {
  Alert.alert(
    'Session Expired',
    'Your session has expired. Please log in again.',
    [
      {
        text: 'OK',
        onPress: () => {
          LocalStorage.clearAll();
          store.dispatch(logouthandler(true));
          store.dispatch(saveUserData());
        },
      },
    ],
  );
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const token = LocalStorage.getString('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      handleLogout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

// import axios from 'axios';
// import {RefreshToken_API} from '../config/Url';
// import {LocalStorage} from './LocalStorage';
// import {Alert} from 'react-native';
// import {logouthandler, saveUserData} from '../store/slices/auth';
// import store from '../store';
// import Config from 'react-native-config';

// const axiosInstance = axios.create({
//   baseURL: Config.API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (token) {
//       prom.resolve(token);
//     } else {
//       prom.reject(error);
//     }
//   });

//   failedQueue = [];
// };

// // Function to handle user logout
// const handleLogout = () => {
//   // Show an alert
//   Alert.alert(
//     'Session Expired',
//     'Your session has expired. Please log in again.',
//     [
//       {
//         text: 'OK',
//         onPress: () => {
//           LocalStorage.clearAll();
//           store.dispatch(logouthandler(true));
//           store.dispatch(saveUserData());
//         },
//       },
//     ], // Adjust based on your navigation setup
//   );
// };

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//   async config => {
//     const token = LocalStorage.getString('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     // If access token is expired (401) and request is not retried yet
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({resolve, reject});
//         })
//           .then(token => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return axiosInstance(originalRequest);
//           })
//           .catch(err => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = LocalStorage.getString('refresh_token');

//         if (!refreshToken) {
//           throw new Error('No refresh token available');
//         }

//         const response = await axios.post(`${RefreshToken_API}`, {
//           refresh_token: refreshToken,
//         });

//         const newAccessToken = response.data.data.access_token.token;
//         // const newRefreshToken = response.data.refresh_token;

//         // console.log(
//         //   "newRefreshToken token api ---",
//         //   JSON.stringify(newRefreshToken)
//         // );

//         // Save new tokens
//         LocalStorage.set('token', newAccessToken);
//         // LocalStorage.set("refresh_token", newRefreshToken);

//         axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
//         processQueue(null, newAccessToken);

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.log('Refresh Token Expired:', refreshError);

//         // If refresh token is also expired, log out the user
//         handleLogout();

//         processQueue(refreshError, null);
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default axiosInstance;
