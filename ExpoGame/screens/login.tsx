import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { View, Text, TextInput, Keyboard, Image } from 'react-native';
import LoginButton from '../utils/components/LoginButton';
import styles from '../utils/styles';
import { getItem, setItem } from '../utils/storage';
import SafeView from '../utils/components/SafeView';
import Images from '../utils/images';
import { User } from '../utils/types';

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm
const NUMBERS = "1234567890";
const SPECIAL = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const minPassLen = 8;
const maxPassLen = 100;
const CONFIG = { withCredentials: true };

const Login = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [url, setURL] = useState('');

  useEffect(() => {
    getItem('url')
    .then((url) => {
      setURL(url);
    })
    .catch(() => navigation.navigate('error'))
  })

  const handleLogin = async () => {
    setDisabled(true);
    
    if (!email || !password) return;
    setError('');
    const res = await axios.get(`${url}/login/${email}/${password}`, CONFIG)
    const user: User = res.data as User;
    if (user) {
      await setItem('uid', { uid: user.uid }); 
      setEmail('');
      setPassword('');
      setDisabled(false);
      navigation.navigate(user.username ? 'profile' : 'setup');
    } // User Exists
    else {setError(' - Something went wrong :(')} // User Does Not Exist
  }

  const validEmail = (email: string) => {
    try {
      return emailRegex.test(email);
    } catch (err) {
      return false
    }
  }

  const validPass = (password: string) => {
    if (password.length < minPassLen || password.length > maxPassLen) {
      setError(' - Must be 8 - 100 characters')
      return false
    }
    let upper = 0;
    let lower = 0;
    let numbers = 0;
    let special = 0;
    for (const char of password) {
      if (NUMBERS.includes(char)) numbers++;
      else if (SPECIAL.includes(char)) special ++;
      else {
        if (char === char.toUpperCase()) upper++;
        else lower++;
      }
    }
    if (!upper) {
      setError(' - Must contain one uppercase')
      return false
    }
    else if (!lower) {
      setError(' - Must contain one lowercase')
      return false
    }
    else if (!special) {
      setError(` - Must contain one special`)
      return false
    }
    else if (!numbers) {
      setError(' - Must contain one number')
      return false
    }
    else return true

  }

  const handleRegister = async () => {
    setDisabled(true);
    
    
    if (!email || !password) {setDisabled(false); return setError(' - Enter and email and password');}
    if (!validEmail(email)) {setDisabled(false); return setError(' - Invalid Email');}
    if (!validPass(password)) {setDisabled(false); return setError(' - The password is invalid');}
    setError('');
    let res;
    try {
      res = await axios.post(`${url}/register/${email}/${password}`, CONFIG)
      setDisabled(false);
    } catch (err) {
      setDisabled(false);
      return setError(' - Try again later');
    }
    const uid = res.data;
    if (!uid) return setError(' - Something went wrong :(')
    switch(uid) {
      case 'exists':
        setError(' - This user already exists.')
        break;
      default:
        await setItem('uid', { uid: (uid as User).uid });
        setEmail('');
        setPassword('');
        setDisabled(false);
        navigation.navigate('setup');
        break;
    }
  }

  return (
    <SafeView style={styles.login}>
      <View style={styles.stack}>
        <View style={styles.circleBlack}>
          <Image style={[styles.tinyLogo]} source={Images.iconLarge}/>
        </View>
        <Text style={styles.title}>Moments</Text>
      </View>
      <View>
        <View style={styles.inline}>
          <Text style={styles.header}>Email</Text>
          <Text style={[styles.text, { color: 'red' }]}>{error}</Text>
        </View>
        <TextInput 
          style={styles.input} 
          placeholder='Email'
          value={email}
          onChangeText={(text: string) => setEmail(text.toLowerCase())}
          autoCapitalize='none'
          accessibilityLabel='Email'
          keyboardType='default'
          returnKeyType='done'
          keyboardAppearance='dark'
          blurOnSubmit={true}
          onSubmitEditing={() => {Keyboard.dismiss()}}
        />
        <Text style={styles.header}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Password' 
          value={password}
          secureTextEntry={true}
          onChangeText={(text: any) => setPassword(text)}
          autoCapitalize='none'
          accessibilityLabel='Password'
          keyboardType='default'
          returnKeyType='done'
          keyboardAppearance='dark'
          blurOnSubmit={true}
          onSubmitEditing={() => {Keyboard.dismiss()}}
        />
        <View style={styles.paddingTop10}>
          <LoginButton title='Login' onPress={handleLogin} disabled={disabled} />
        </View>
        <View style={styles.paddingTop10}>
          <LoginButton title='Register' onPress={handleRegister} disabled={disabled} />
        </View>
      </View>
      <View>
        <Text style={styles.text}>
          Created by Gccody (gccody#0001 on discord)
        </Text>
      </View>
    </SafeView>
  );
};

export default Login;