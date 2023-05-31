import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Profile from './screens/profile';
import Errorr from './screens/error';
import Connection from './screens/connection';
import Setup from './screens/setup';
import Home from './screens/home';
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from "firebase/auth/react-native"
import Init from './screens/init';
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyD7ov2T5_Twm8aMpEy0z0FKyxReQLRcVd8",
  authDomain: "socialmedia-cards.firebaseapp.com",
  projectId: "socialmedia-cards",
  storageBucket: "socialmedia-cards.appspot.com",
  messagingSenderId: "910258415586",
  appId: "1:910258415586:web:582910011415a7455efbbb",
  measurementId: "G-K48ZENPN2X"
};


const Stack = createNativeStackNavigator();
const app = initializeApp(firebaseConfig);
initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export default function App() {
  const [initalPage, setInitialPage] = useState('');

  useEffect(() => {
    setInitialPage('init');
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 100, gestureEnabled: false }} initialRouteName={initalPage}>
        <Stack.Screen name="init" component={Init} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="error" component={Errorr} />
        <Stack.Screen name="connection" component={Connection} />
        <Stack.Screen name="setup" component={Setup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

