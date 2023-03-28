import React, { useEffect } from 'react';
import { Image, View } from "react-native";
import Images from "../utils/images";
import styles from "../utils/styles";
import { getItem, removeItem } from "../utils/storage";
import { User } from "../utils/types";
import { getProfile } from '../utils/api';
const Init = ({navigation}: {navigation: any}) => {
  
  useEffect(() => {
    (async function run() {
      const uid = await getItem('uid');
      if (!uid) return navigation.navigate('login');
      const res = await getProfile(uid);
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