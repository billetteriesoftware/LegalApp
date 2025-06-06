import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import {LocalStorage} from '../utils/LocalStorage';
import selfAxiosInstance from '../utils/selfAxiosInstance';

export const Call_PostServices = (url, payload) => {
  return axios
    .post(url, payload)
    .then(res => res.data)
    .catch(err => err.response);
};

export const Call_PostServices2 = (onSuccess, onError, url, payload) => {
  axios
    .post(url, payload)
    .then(res => onSuccess(res.data))
    .catch(err => onError(err.response));
};

export const Call_ResetPassServices = (url, payload) => {
  return axios
    .put(url, payload)
    .then(res => res.data)
    .catch(err => err);
};

export const Call_GetListServices = url => {
  return axiosInstance
    .get(url)
    .then(res => res.data)
    .catch(err => err.config);
};

export const Call_GetServices = url => {
  return selfAxiosInstance
    .get(url)
    .then(res => res.data)
    .catch(err => err.config);
};

export const Call_DeleteServices = url => {
  return selfAxiosInstance
    .delete(url)
    .then(res => res.data)
    .catch(err => err.response);
};

export const Call_InstancePostServices = (url, payload) => {
  return selfAxiosInstance
    .post(url, payload)
    .then(res => res.data)
    .catch(err => err.response);
};

export const Call_NewApplicationServices = (url, payload) => {
  return axiosInstance
    .post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res)
    .catch(err => err.response);
};

export const Call_MediaUploadServices = (url, payload) => {
  const token = LocalStorage.getString('token');

  return selfAxiosInstance
    .post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data)
    .catch(err => err.response);
};

export const Call_InstancePutServices = (url, payload) => {
  return selfAxiosInstance
    .put(url, payload)
    .then(res => res.data)
    .catch(err => err.config);
};

export const Call_GetSwaggerListServices = async (url, token) => {
  try {
    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// import axios from 'axios';
// import axiosInstance from '../utils/axiosInstance';
// import {LocalStorage} from '../utils/LocalStorage';

// export const Call_PostServices = (url, payload) => {
//   return axios
//     .post(url, payload)
//     .then(res => res.data)
//     .catch(err => err.response);
// };

// export const Call_ResetPassServices = (url, payload) => {
//   return axios
//     .put(url, payload)
//     .then(res => res.data)
//     .catch(err => err);
// };

// export const Call_GetListServices = url => {
//   return axiosInstance
//     .get(url)
//     .then(res => res.data)
//     .catch(err => err.config);
// };

// export const Call_GetServices = url => {
//   const token = LocalStorage.getString('token');

//   return axios
//     .get(url, {
//       headers: {
//         Authorization: `Bearer-App ${token}`, // static token here
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     })
//     .then(res => res.data)
//     .catch(err => err.config);
// };

// export const Call_DeleteServices = url => {
//   return axiosInstance
//     .delete(url)
//     .then(res => res.data)
//     .catch(err => err.response);
// };

// export const Call_InstancePostServices = (url, payload) => {
//   return axiosInstance
//     .post(url, payload)
//     .then(res => res.data)
//     .catch(err => err.response);
// };

// export const Call_MediaUploadServices = (url, payload) => {
//   return axiosInstance
//     .post(url, payload, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then(res => res.data)
//     .catch(err => err.response);
// };

// export const Call_InstancePutServices = (url, payload) => {
//   return axiosInstance
//     .put(url, payload)
//     .then(res => res.data)
//     .catch(err => err.config);
// };

// export const Call_GetSwaggerListServices = async (url, token) => {
//   try {
//     const response = await axios.get(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`, // Adding custom token
//       },
//     });
//     return response;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// };
