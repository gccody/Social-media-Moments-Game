import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../NativeGame/screens/login';
import Profile from '../NativeGame/screens/profile';
import Init from '../NativeGame/screens/init';
import Errorr from '../NativeGame/screens/error';
import Connection from '../NativeGame/screens/connection';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'login'}>
        <Stack.Screen name="init" component={Init} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="error" component={Errorr} />
        <Stack.Screen name="connection" component={Connection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
