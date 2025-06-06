import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationString from '../NavigationString';
import * as Screens from '../../screens/Index';

const Stack = createNativeStackNavigator();

const ApplicationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationString.ApplicationScreen}
      screenOptions={{
        headerShown: false,
      }}>
      {/* {AllStack(Stack)} */}
      <Stack.Screen
        name={NavigationString.ApplicationScreen}
        component={Screens.MYApplication}
      />

      <Stack.Screen
        name={NavigationString.ApplicationdetailScreen}
        component={Screens.Applicationdetail}
      />
    </Stack.Navigator>
  );
};

export default ApplicationStack;

const styles = StyleSheet.create({});
