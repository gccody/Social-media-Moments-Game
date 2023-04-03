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
      const user: User | undefined = await getItem('user');
      
      if (!user) return navigation.navigate('login');
      let res;
      try {
        res = await getProfile(user.uid);
      } catch (err) {
        return console.log(JSON.stringify(err, null, 4));
      }
      if (!res) return navigation.navigate('error');
      if (res.data == 'error') {
        console.log('error');
        
        await removeItem('user');
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