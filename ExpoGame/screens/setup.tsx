import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, TextInput, Keyboard, View , Image} from 'react-native';
import LoginButton from "../utils/components/LoginButton";
import SafeView from "../utils/components/SafeView";
import Images from "../utils/images";
import { getItem } from "../utils/storage";
import styles from "../utils/styles";
import { UID } from "../utils/types";

const usernameMinLen = 4;
const usernameMaxLen = 16;

const Setup = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [uid, setUID] = useState('');
  const [url, setURL] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    (async function run() {
      const uid: UID | undefined = await getItem('uid');
      const url = await getItem('url')
      if (!uid || !url) return navigation.navigate('error')
      setUID(uid.uid);
      setURL(url);
    })();
  }, [])

  // useEffect(() => {
  //   getItem('uid')
  //   .then((uid) => {
  //     setUID(uid.uid);
  //   })
  //   .catch(() => navigation.navigate('error') )

  //   getItem('url')
  //   .then((url) => {
  //     setURL(url);
  //   })
  //   .catch(() => navigation.navigate('error'))
  // })

  const handleClick = async () => {
    setDisabled(true);
    if (username.length < usernameMinLen) return setError(' - Too Short')
    else if (username.length > usernameMaxLen) return setError(' - Too Long')
    let res;
    try {
      res = await axios.patch(`${url}/username/${uid}/${username}`)
    } catch (err) {
      setDisabled(false);
      return setError(' - Error setting username')
    }
    console.log(res.status);
    
    if (res.status == 400) {
      setDisabled(false);
      if (res.data === 'exists') {
        return setError(' - Username already exists')
      }
      else {
        return setError(' - Error setting username')
      }
    }
    navigation.navigate('profile')
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
        <Text style={styles.header}>Username</Text>
        <Text style={[styles.text, { color: 'red' }]}>{error}</Text>
        </View>
        <TextInput 
          style={styles.input} 
          placeholder='Username'
          value={username}
          onChangeText={(text: string) => setUsername(text.toLowerCase())}
          autoCapitalize='none'
          accessibilityLabel='Username'
          keyboardType='default'
          returnKeyType='done'
          keyboardAppearance='dark'
          blurOnSubmit={true}
          onSubmitEditing={() => {Keyboard.dismiss()}}
        />
        <View style={styles.paddingTop10}>
          <LoginButton title="Enter" onPress={handleClick} disabled={disabled} />
        </View>
      </View>
      <Text style={styles.text}>Created by Gccody (gccody#0001 on discord)</Text>
    </SafeView>
  );
}

export default Setup;