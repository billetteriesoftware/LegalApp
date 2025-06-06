import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Colors from '../styles/Colors';
import {responsiveHeight} from 'react-native-responsive-dimensions';

import {
  BottomHomeIconSVG,
  BottomMessageIconSVG,
  BottomPolicyIconSVG,
  BottomProfileIconSVG,
  BottomPublicationsIconSVG,
} from '../assets/svgIcons/Index';
import {
  Chat,
  Dashboard,
  MYApplication,
  Profile,
  Publication,
} from '../screens/Index';
import NavigationString from './NavigationString';
import {useSelector} from 'react-redux';
import HomeStack from './HomeNavigation/Home';
import {useRouteNameContext} from '../context/RouteNameContext';
import ApplicationStack from './ApplicationNavigation/Application';
import ProfileStack from './ProfileNavigation/ProfileStack';
import store from '../store';

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// App Component with Navigation
const BottomTabs = () => {
  const hiddenRoutes = [NavigationString?.NotificationScreen];
  // const currentRouteName = useSelector(state => state.auth.hideBottomScreen);
  const {currentRouteName} = useRouteNameContext();
  console.log('currentRouteName---', currentRouteName);

  // const badgeStatus = store.getState().auth?.badgeIcon;
  const {badgeIcon} = useSelector(state => state.auth);
  console.log('badgeIcon---', badgeIcon);
  return (
    <Tab.Navigator
      labeled={false}
      tabBar={props => (
        <BottomTabBar
          {...props}
          state={{
            ...props.state,
            // routes: props.state.routes.slice(0, 4),
          }}></BottomTabBar>
      )}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      initialRouteName={NavigationString.HomeScreen}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'green',
        tabBarStyle: [
          {
            display: hiddenRoutes.includes(currentRouteName) ? 'none' : 'flex',
            height: Platform.OS === 'android' ? 60 : responsiveHeight(9),
          },
        ],
        tabBarShowLabel: false, // Hide labels
        tabBarIconStyle: {
          marginTop: Platform.OS === 'android' ? 0 : -5, // Adjust the margin to vertically center the icon
        },
      }}>
      <Tab.Screen
        name={NavigationString.HomeScreen}
        // component={Dashboard}
        component={HomeStack}
        options={{
          tabBarIcon: ({tintColor, size, focused}) => (
            <BottomHomeIconSVG
              circleColor={focused ? Colors.TealBlue : '#E5F2F3'}
              pathColor={focused ? Colors.White : '#666666'}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default behavior
            navigation.navigate(NavigationString.HomeScreen, {
              screen: NavigationString.HomeScreen,
            }); // Reset to initial screen
          },
        })}
      />
      <Tab.Screen
        name={NavigationString.ApplicationScreen}
        component={ApplicationStack}
        options={{
          // title: NavigationString.ApplicationScreen ,
          tabBarIcon: ({tintColor, size, focused}) => (
            <BottomPolicyIconSVG
              circleColor={focused ? Colors.TealBlue : '#E5F2F3'}
              pathColor={focused ? Colors.White : '#666666'}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default behavior
            navigation.navigate(NavigationString.ApplicationScreen, {
              screen: NavigationString.ApplicationScreen,
            }); // Reset to initial screen
          },
        })}
      />
      <Tab.Screen
        name={NavigationString.PublicationScreen}
        component={Publication}
        options={{
          tabBarIcon: ({tintColor, size, focused}) => (
            <BottomPublicationsIconSVG
              circleColor={focused ? Colors.TealBlue : '#E5F2F3'}
              pathColor={focused ? Colors.White : '#666666'}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default behavior
            navigation.navigate(NavigationString.PublicationScreen, {
              screen: NavigationString.PublicationScreen,
            }); // Reset to initial screen
          },
        })}
      />
      <Tab.Screen
        name={NavigationString.ChatsScreen}
        component={Chat}
        options={{
          // tabBarBadge: 2,
          tabBarBadge: badgeIcon > 0 ? true : null,
          tabBarBadgeStyle: {
            backgroundColor: Colors.LightGreen, // Customize color (optional)
            minWidth: 10, // Reduce width
            height: 10, // Reduce height
            borderRadius: 5, // Make it a small dot
          },
          tabBarIcon: ({tintColor, size, focused}) => (
            <BottomMessageIconSVG
              circleColor={focused ? Colors.TealBlue : '#E5F2F3'}
              pathColor={focused ? Colors.White : '#666666'}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default behavior
            navigation.navigate(NavigationString.ChatsScreen, {
              screen: NavigationString.ChatsScreen,
            }); // Reset to initial screen
          },
        })}
      />
      <Tab.Screen
        name={NavigationString.ProfilesScreen}
        component={ProfileStack}
        options={{
          tabBarIcon: ({tintColor, size, focused}) => (
            <BottomProfileIconSVG
              circleColor={focused ? Colors.TealBlue : '#E5F2F3'}
              pathColor={focused ? Colors.White : '#666666'}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default behavior
            navigation.navigate(NavigationString.ProfilesScreen, {
              screen: NavigationString.ProfilesScreen,
            }); // Reset to initial screen
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
