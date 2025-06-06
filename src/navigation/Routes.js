import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createStaticNavigation,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IntroPages, Login, Splash} from '../screens/Index';
import Forgotpassword from '../screens/authScreens/Forgotpassword';
import Otp from '../screens/authScreens/Otp';
import {useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomStatusBar} from '../components/CustomStatusBar';
import Colors from '../styles/Colors';
import CustomDrawer from './CustomDrawer';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import BottomTab from './BottomTab';
import NavigationString from './NavigationString';

//create auth section using stack navigation
const RootStack = createNativeStackNavigator({
  screens: {
    Splash: {
      screen: Splash,
      options: {
        headerShown: false,
      },
    },
    IntroScreen: {
      screen: IntroPages,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      options: {
        headerShown: false,
      },
    },
    ForgotScreen: {
      screen: Forgotpassword,
      options: {
        headerShown: false,
      },
    },
    OTPScreen: {
      screen: Otp,
      options: {
        headerShown: false,
      },
    },
    ResetPasswordScreen: {
      screen: ResetPasswordScreen,
      options: {
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

const MyDrawer = createDrawerNavigator();

// const DeawerNavigation = createStaticNavigation(MyDrawer);

const DrawerNavigation = () => (
  <NavigationContainer>
    <MyDrawer.Navigator
      screenOptions={{
        gestureEnabled: false, // Disable gesture slide for opening the drawer
        headerShown: false, // Hide header for all screens
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#fff',
          width: responsiveScreenWidth(80),
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <MyDrawer.Screen
        name={NavigationString.BottomTab}
        component={BottomTab}
      />
    </MyDrawer.Navigator>
  </NavigationContainer>
);

const Routes = () => {
  const {userData} = useSelector(state => state.auth);

  // return userData?.name ? <DeawerNavigation /> : <Navigation />;
  return (
    <>
      {/* Add CustomStatusBar */}
      <CustomStatusBar
        backgroundColor={userData?.name ? Colors.TealBlue : Colors.White}
      />
      {/* Render navigation based on userData */}
      <DrawerNavigation />
      {/* {userData?.name ? <DrawerNavigation /> : <Navigation />} */}
    </>
  );
};

export default Routes;

const styles = StyleSheet.create({});

