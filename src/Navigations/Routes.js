import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';
import {LocalStorage} from '../utils/LocalStorage';
const Stack = createNativeStackNavigator();

export default function Routes() {
  const {userData, isLogout} = useSelector(state => state.auth);

  const user = LocalStorage.getString('token');

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {userData?.access_token?.token ? <>{MainStack(Stack)}</> : <>{AuthStack(Stack)}</>} */}

        {userData?.token || user ? (
          <>{MainStack(Stack, user)}</>
        ) : (
          <>{AuthStack(Stack, isLogout)}</>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
