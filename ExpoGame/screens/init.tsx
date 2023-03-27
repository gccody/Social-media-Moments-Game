import React, { useEffect } from 'react';
import { Image, View } from "react-native";
import Images from "../utils/images";
import styles from "../utils/styles";
import { getItem, removeItem } from "../utils/storage";
import { UID, User } from "../utils/types";
import axios from 'axios';
const Init = ({navigation}: {navigation: any}) => {
  
  useEffect(() => {
    (async function run() {
      const uid: UID | undefined = await getItem('uid');
      const url = await getItem('url');
      if (!url) return navigation.navigate('error');
      if (!uid) return navigation.navigate('login')
      let res;
      try {
        res = await axios.get(`${url}/profile/${uid.uid}`)
      } catch(err) { console.log("Hi", JSON.stringify(err, null, 4)); navigation.navigate('error') }
      if (!res) return navigation.navigate('error')
      if (!res.data) {
        await removeItem('uid');
        return navigation.navigate('login');
      }
      return navigation.navigate((res.data as User).username ? 'profile' : 'setup')
    })();
  }, []);

  return (
    <View style={styles.splash}>
      <Image source={Images.splash} style={styles.splash}/>
    </View>
  );
}

export default Init;