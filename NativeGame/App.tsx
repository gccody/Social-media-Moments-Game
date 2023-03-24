import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Profile from './screens/profile';
import Init from './screens/init';
import Errorr from './screens/error';
import Connection from './screens/connection';

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
