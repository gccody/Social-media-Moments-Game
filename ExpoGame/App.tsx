import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Profile from './screens/profile';
import Errorr from './screens/error';
import Connection from './screens/connection';
import Setup from './screens/setup';
import Home from './screens/home';
import { getItem, removeItem } from './utils/storage';
import { getProfile } from './utils/api';
import { User } from './utils/types';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initalPage, setInitialPage] = useState('');

  useEffect(() => {
    (async function run() {
      const user: User | undefined = await getItem('user'); // Gets the user saved to local storage
      if (!user) return setInitialPage('login'); // If the user DNE go to login page
      let res;
      try {
        res = await getProfile(user.uid); // Make sure the user data matches with the server
      } catch (err) { console.log(JSON.stringify(err, null, 4)); setInitialPage('error') }

      if (!res) return setInitialPage('error'); // Error making request?
      if (res.data == 'error') { await removeItem('user'); return setInitialPage('login'); } // User DNE on server to reset and login
      
      setInitialPage((res.data as User).username ? 'profile' : 'setup') // If username exists then send to profile else setup
      if (!initalPage) setInitialPage('error'); // If somehow nothing happened (which this should never happen) go to error screen
    })();
  }, []); // Only run on app startup


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 100 }} initialRouteName={initalPage}>
        <Stack.Screen name="login" component={Login} options={{ gestureEnabled: false }} />
        <Stack.Screen name="profile" component={Profile} options={{ gestureEnabled: false }} />
        <Stack.Screen name="home" component={Home} options={{ gestureEnabled: false }} />
        <Stack.Screen name="error" component={Errorr} options={{ gestureEnabled: false }} />
        <Stack.Screen name="connection" component={Connection} options={{ gestureEnabled: false }} />
        <Stack.Screen name="setup" component={Setup} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
