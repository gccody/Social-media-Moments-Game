import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Profile from './screens/profile';
import Init from './screens/init';
import Errorr from './screens/error';
import Connection from './screens/connection';
import { setItem } from './utils/storage';

const Stack = createNativeStackNavigator();


const DEVELOPMENT = true;


export default function App() {

  useEffect(() => {
    if(DEVELOPMENT) setItem('url', 'http://localhost:3000')
    else setItem('url', 'https://app.gccody.com')
  })

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'init'}>
        <Stack.Screen name="init" component={Init} options={{ gestureEnabled: false }} />
        <Stack.Screen name="login" component={Login} options={{ gestureEnabled: false }} />
        <Stack.Screen name="profile" component={Profile} options={{ gestureEnabled: false }} />
        <Stack.Screen name="error" component={Errorr} options={{ gestureEnabled: false }} />
        <Stack.Screen name="connection" component={Connection} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
