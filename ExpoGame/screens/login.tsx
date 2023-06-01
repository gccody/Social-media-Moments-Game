import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Keyboard, Image } from 'react-native';
import LoginButton from '../utils/components/LoginButton';
import styles from '../utils/styles';
import SafeView from '../utils/components/SafeView';
import Images from '../utils/images';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth/react-native';
import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { DefaultFUser } from '../utils/types';

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm
const NUMBERS = "1234567890";
const SPECIAL = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const minPassLen = 8;
const maxPassLen = 100;

const Login = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return setError(' - All fields required');
    setDisabled(true);
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const db = getFirestore();
        const col = collection(db, 'users');
        const docRef = doc(col, user.uid);
        getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const userDataKeys = Object.keys(data);
            const defaultKeys = Object.keys(DefaultFUser);
            const missingKeys = defaultKeys.filter(key => !userDataKeys.includes(key));
            console.log(missingKeys);
            missingKeys.forEach(key => {
              data[key] = DefaultFUser[key];
            });
            setDoc(docRef, data);
          } else {
            setDoc(docRef, DefaultFUser);
          }
        });
        return navigation.navigate(user.displayName ? 'home': 'setup');
      }
    });
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch(err) {
      setError(' - Invalid credentials');
    }
    setDisabled(false);
    return unsubscribe;
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
      return false;
    }
    else if (!lower) {
      setError(' - Must contain one lowercase')
      return false;
    }
    else if (!special) {
      setError(` - Must contain one special`)
      return false;
    }
    else if (!numbers) {
      setError(' - Must contain one number')
      return false;
    }
    else return true;

  }

  const handleRegister = async () => {
    setDisabled(true);
    
    if (!email || !password) {setDisabled(false); return setError(' - All fields required');}
    if (!validEmail(email)) {setDisabled(false); return setError(' - Invalid Email');}
    if (!validPass(password)) {setDisabled(false); return setError(' - The password is invalid');}

    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const db = getFirestore();
        const col = collection(db, 'users');
        const docRef = doc(col, user.uid);
        getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const userDataKeys = Object.keys(data);
            const defaultKeys = Object.keys(DefaultFUser);
            const missingKeys = defaultKeys.filter(key => !userDataKeys.includes(key));
            console.log(missingKeys);
            missingKeys.forEach(key => {
              data[key] = DefaultFUser[key];
            });
            setDoc(docRef, data);
          } else {
            setDoc(docRef, DefaultFUser);
          }
        });
        navigation.navigate(user.displayName ? 'home' : 'setup');
      } else {
        navigation.navigate('login');
      }
    });
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      return setError(` - ${(err as Error).message}`)
    }
    setDisabled(false);

    return unsubscribe;
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