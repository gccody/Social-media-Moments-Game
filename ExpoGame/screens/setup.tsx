import React, { useEffect, useState } from "react";
import { Text, TextInput, Keyboard, View , Image} from 'react-native';
import { updateUsername } from "../utils/api";
import LoginButton from "../utils/components/LoginButton";
import SafeView from "../utils/components/SafeView";
import Images from "../utils/images";
import { getItem, setItem } from "../utils/storage";
import styles from "../utils/styles";
import { User } from "../utils/types";

const usernameMinLen = 4;
const usernameMaxLen = 16;

const Setup = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    (async function run() {
      const user = await getItem('user');
      if (!user) return navigation.navigate('login');
      setUser(user);
    })();
  }, [])

  const handleClick = async () => {
    if (username.length < usernameMinLen) return setError(' - Too Short')
    else if (username.length > usernameMaxLen) return setError(' - Too Long')
    setDisabled(true);
    let res;
    try {
      res = await updateUsername(username, user!.uid);
      setDisabled(false);
    } catch (err) {
      return setError(' - Error setting username')
    }
    if (res.data === 'exists') {
      return setError(' - Username already exists')
    }
    else if (res.data === 'error') {
      return setError(' - Error setting username')
    }
    await  setItem('user', res.data as User);
    navigation.navigate('profile');
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