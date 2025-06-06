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
import AllNavigationStack from './AllNavigationStack';
import {useSelector} from 'react-redux';

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// App Component with Navigation
const BottomTab = () => {
  const hiddenRoutes = [NavigationString?.NotificationScreen];
  const currentRouteName = useSelector(state => state.auth.hideBottomScreen);

  console.log('currentRouteName---', currentRouteName);

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
          marginTop: Platform.OS === 'android' ? 10 : -5, // Adjust the margin to vertically center the icon
        },
      }}>
      <Tab.Screen
        name={NavigationString.HomeScreen}
        // component={Dashboard}
        component={AllNavigationStack}
        options={{
          tabBarIcon: ({tintColor, size, focused}) => (
            <BottomHomeIconSVG
              circleColor={focused ? Colors.TealBlue : '#E5F2F3'}
              pathColor={focused ? Colors.White : '#666666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationString.ApplicationScreen}
        component={MYApplication}
        options={{
          tabBarIcon: ({tintColor, size, focused}) => (
            <BottomPolicyIconSVG
              circleColor={focused ? Colors.TealBlue : '#E5F2F3'}
              pathColor={focused ? Colors.White : '#666666'}
            />
          ),
        }}
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
      />
      <Tab.Screen
        name={NavigationString.ChatsScreen}
        component={Chat}
        options={{
          tabBarIcon: ({tintColor, size, focused}) => (
            <BottomMessageIconSVG
              circleColor={focused ? Colors.TealBlue : '#E5F2F3'}
              pathColor={focused ? Colors.White : '#666666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationString.ProfilesScreen}
        component={Profile}
        options={{
          tabBarIcon: ({tintColor, size, focused}) => (
            <BottomProfileIconSVG
              circleColor={focused ? Colors.TealBlue : '#E5F2F3'}
              pathColor={focused ? Colors.White : '#666666'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

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
