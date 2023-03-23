import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Keyboard, Image } from 'react-native';
import LoginButton from '../utils/components/LoginButton';
import styles from '../utils/styles';
import { setItem } from '../utils/storage';
import SafeView from '../utils/components/SafeView';
import Images from '../utils/images';

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm
const NUMBERS = "1234567890";
const SPECIAL = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const minPassLen = 8;
const maxPassLen = 100;

const Login = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    setError('');
    const res = await fetch(`http://192.168.0.6:3000/login/${email}/${password}`, {method: 'GET'})
    const uid = await res.text();
    if (uid) {await setItem('uid', { uid: uid }); navigation.navigate('profile')} // User Exists
    else {setError(' - Something went wrong :(')} // User Does Not Exist
  }

  const validEmail = (email: string) => {
    return emailRegex.test(email);
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
    if (!email || !password) return;
    if (!validEmail(email)) setError(' - Invalid Email');
    if (!validPass(password)) return;
    setError('');
    const res = await fetch(`http://192.168.0.6:3000/register/${email}/${password}`, {method: 'POST'})
    const uid = await res.text();
    if (!uid) return setError(' - Something went wrong :(')
    switch(uid) {
      case 'exists':
        setError(' - This user already exists.')
        break;
      default:
        await setItem('uid', { uid: uid })
        navigation.navigate('register');
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
          <LoginButton title='Login' onPress={handleLogin}/>
        </View>
        <View style={styles.paddingTop10}>
          <LoginButton title='Register' onPress={handleRegister} />
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