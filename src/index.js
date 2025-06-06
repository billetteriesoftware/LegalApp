import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./Navigations/Routes";
import { setupPushNotifications } from "./Services/NotificationServices";
import CustomForgroundNotification from "./components/CustomForgroundNotification";

const index = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Initialize Firebase push notifications
    const unsubscribe = setupPushNotifications(setNotification);

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // console.log("notification=======", notification);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {/* <CustomStatusBar backgroundColor={Colors.White} /> */}
        {notification && (
          <CustomForgroundNotification
            notification={notification}
            setNotification={setNotification}
          />
        )}

        <Routes />
        {/* <Counter /> */}
      </Provider>
    </SafeAreaProvider>
  );
};

export default index;
