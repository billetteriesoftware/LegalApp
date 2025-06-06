import React from 'react';
import * as Screens from '../../screens/Index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationString from '../NavigationString';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationString.HomeScreen}
      screenOptions={{
        headerShown: false,
      }}>
      {/* {AllStack(Stack)} */}
      <Stack.Screen
        name={NavigationString.DashboardScreen}
        component={Screens.Dashboard}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={NavigationString.HomeScreen}
        component={Screens.Dashboard}
      />

      <Stack.Screen
        name={NavigationString.PatentScreen}
        component={Screens.Patent}
      />

      <Stack.Screen
        name={NavigationString.DesignScreen}
        component={Screens.Design}
      />

      <Stack.Screen
        name={NavigationString.CopyRightScreen}
        component={Screens.CopyRight}
      />

      <Stack.Screen
        name={NavigationString.TrademarkScreen}
        component={Screens.Trademark}
      />

      <Stack.Screen
        name={NavigationString.TrademarkSearchScreen}
        component={Screens.TrademarkSearch}
      />

      <Stack.Screen
        name={NavigationString.SavedSearchScreen}
        component={Screens.SavedSearch}
      />
      <Stack.Screen
        name={NavigationString.ApplicationdetailScreen}
        component={Screens.Applicationdetail}
      />

      {/* <Stack.Screen
        name={NavigationString.NiceClassesDescriptionScreen}
        component={Screens.NiceClassesDescription}
      /> */}

      {/* <Stack.Screen
        name={NavigationString.MyTrademarksScreen}
        component={Screens.MyTrademarks}
      /> */}

      <Stack.Screen
        name={NavigationString.SaveSeachDetailsScreen}
        component={Screens.SaveSeachDetails}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
