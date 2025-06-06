import {useEffect, useState} from 'react';
import {UploadFile_API, UploadProfileImage_API} from '../config/Url';
import {EnumForStoreImaage} from '../constant/Label';
import {Call_MediaUploadServices} from '../Services/Services';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

import {PermissionsAndroid, Platform} from 'react-native';
import Config from 'react-native-config';
import {socket} from '../screens/SocketServices/Socket';
import store from '../store';
import {handleBadgeIcon} from '../store/slices/auth';

export const CapitalizeFirstLetter = str => {
  if (!str) return ''; // Handle empty or undefined input
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};

export const UploadImage = async imageUri => {
  // image path add in form data

  // Function to extract filename from URI
  const getFileName = uri => {
    if (!uri) return null;

    // Extract last part after the last "/"
    let fileName = uri.split('/').pop();

    // Remove any encoded special characters like `%3A`, `%2F`, etc.
    fileName = fileName.replace(/%[0-9A-F]{2}/gi, '');

    return fileName;
  };
  // const getFileName = (uri) => {
  //   if (!uri) return null;
  //   return uri
  //     .split("/")
  //     .pop()
  //     .replace(/[^a-zA-Z0-9._-]/g, "");
  //   // return uri?.split("/").pop(); // Extracts filename from path
  // };
  // const getFileName = (uri) => {
  //   if (!uri) return null;
  //   const decodedUri = decodeURIComponent(uri); // Decode URI
  //   return decodedUri.split("/").pop(); // Extracts filename
  // };

  // Function to determine file type from extension
  const getFileType = uri => {
    const extension = uri?.split('.').pop().toLowerCase();
    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      txt: 'text/plain',
    };
    return mimeTypes[extension] || 'application/octet-stream'; // Default type if unknown
  };

  console.log('23423874234imageUri', JSON.stringify(imageUri));

  const formData = new FormData();
  formData.append('folder', EnumForStoreImaage.PROFILE);
  if (Array.isArray(imageUri)) {
    imageUri.forEach((imageUris, index) => {
      formData.append('media', {
        uri: imageUris,
        // type: 'image/jpeg', // Adjust the type accordingly if it's not an image
        // // name: `uploaded_image_${index}.jpg`, // Add a unique name for each image
        // name:imageUri
        type: getFileType(imageUris), // Dynamic file type
        name: getFileName(imageUris), // Extracted filename
      });
    });
  } else {
    formData.append('media', {
      uri: imageUri,
      // type: 'image/jpeg', // Change based on image type
      // // name: 'uploaded_image.jpg',
      // name:imageUri
      type: getFileType(imageUri), // Dynamic file type
      name: getFileName(imageUri), // Extracted filename
    });
  }
  console.log('23423874234formData', JSON.stringify(formData));
  // UploadFile_API

  const imgRes = await Call_MediaUploadServices(
    // UploadProfileImage_API,
    UploadFile_API,
    formData,
  );

  console.log(JSON.stringify(imgRes), '=============+++++++');
  // setIsLoading(false);
  if (imgRes?.success) {
    // setSelectedImage(imgRes?.data[0]?.shortPath);
    return Array.isArray(imageUri) ? imgRes?.data : imgRes?.data[0]?.shortPath;
  }
};

export const useDebounceSearch = (
  searchValue,
  callback,
  delay = 2000,
  anotherParameter = {},
) => {
  const serializedParameter = JSON.stringify(anotherParameter);
  useEffect(() => {
    if (!searchValue) {
      callback(searchValue);
    } else {
      const handler = setTimeout(() => {
        callback(searchValue);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [searchValue, serializedParameter]);
};

export const getCurrentLocation = async () => {
  try {
    // Request location permission (only for Android)
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        return null;
      }
    }

    // Get current position
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => {
          console.log(error.code, error.message);
          reject(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};

export const fetchAddress = async () => {
  try {
    const location = await getCurrentLocation();
    if (!location) {
      console.log('Failed to get location');
      return null;
    }

    const {latitude, longitude} = location;

    const url = `${Config.FindAddresApi}?format=json&lat=${latitude}&lon=${longitude}`;

    const response = await axios.get(url);
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};

export async function getSwaggerToken(user, pass) {
  const data = await axios.post(
    'https://mapi.billetteriesoftware.com/api/Auth/login',
    {username: user, password: pass},
  );
  return data?.data?.token;
}

export const emitUnreadCount = async dispatch => {
  // Emit the 'join' event when the component mounts
  // const store = store.auth;

  const userId = store.getState().auth?.profileData?._id;
  let isAdmin = false;
  socket.emit('join', {userId, isAdmin});

  socket.emit('unread-messages-count');
  socket.on('unread-messages-count', data => {
    console.log(userId, 'unread count res---', data?.count);
    dispatch(handleBadgeIcon(data?.count));
  });
};

export const emitreadCount = async dispatch => {
  // Emit the 'join' event when the component mounts
  // const store = store.auth;

  const userId = store.getState().auth?.profileData?._id;
  let isAdmin = false;
  socket.emit('join', {userId, isAdmin});

  socket.emit('read-all-message');
  socket.on('unread-messages-count', data => {
    console.log('read count res---', data?.count);
    dispatch(handleBadgeIcon(data?.count));
  });
};
