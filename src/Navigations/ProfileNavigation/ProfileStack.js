import React from 'react';
import * as Screens from '../../screens/Index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationString from '../NavigationString';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationString.ProfilesScreen}
      screenOptions={{
        headerShown: false,
      }}>
      {/* {AllStack(Stack)} */}
      <Stack.Screen
        name={NavigationString.ProfilesScreen}
        component={Screens.Profile}
      />

      <Stack.Screen
        name={NavigationString.AccountInfoScreen}
        component={Screens.AccountInfo}
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
        name={NavigationString.ApplicationScreen}
        component={Screens.MYApplication}
      />

      <Stack.Screen
        name={NavigationString.ApplicationdetailScreen}
        component={Screens.Applicationdetail}
      />
      <Stack.Screen
        name={NavigationString.NiceClassesDescriptionScreen}
        component={Screens.NiceClassesDescription}
      />

      {/* <Stack.Screen
        name={NavigationString.MyTrademarksScreen}
        component={Screens.MyTrademarks}
      /> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
