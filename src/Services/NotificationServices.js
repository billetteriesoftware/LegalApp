import messaging from '@react-native-firebase/messaging';
import { Alert, Platform, PermissionsAndroid } from 'react-native';


// ✅ Request Notification Permission
async function requestUserPermission() {
  console.log('Requesting Push Notification Permission...');
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Push Notification Permission Granted:', authStatus);
  } else {
    console.log('Push Notification Permission Denied');
  }
}

// ✅ Get FCM Token
async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('FCM Token not found. Trying to regenerate...');
      await messaging().deleteToken();
      return await messaging().getToken();
    }
  } catch (error) {
    console.error('Error getting FCM Token:', error);
  }
}

// ✅ Request Permission on Android (For Android 13+)
async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'Allow this app to send you notifications?',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android notification permission granted');
      } else {
        console.log('Android notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting Android notification permission:', error);
    }
  }
}

// ✅ Setup Push Notifications (Main Function)
async function setupPushNotifications(setNotification) {
  console.log('Setting up Push Notifications...');
  
  // Request permissions
  await requestUserPermission();
  await requestNotificationPermission();

  // Get and display FCM token
  const token = await getFCMToken();
  console.log('Your FCM Token:', token);
  global.fcmToken = token;

  // Foreground message handling
  // const unsubscribeOnMessage = handleForegroundNotifications();
  // Handle foreground messages and update notification state
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('Foreground Notification:', remoteMessage);

    // Pass the notification data to state
    setNotification({
      title: remoteMessage.notification?.title || 'New Notification',
      body: remoteMessage.notification?.body || 'You have a new message',
    });
  });

  // ✅ Handle background notification when user taps on it
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background:', remoteMessage);
  });

  // ✅ Handle notification when the app is killed (cold start)
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
      }
    });

  // ✅ Handle background messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in background:', remoteMessage);
  });

  // Return function to unsubscribe listeners when not needed
  return () => {
    unsubscribeOnMessage();
  };
}

export { setupPushNotifications };
