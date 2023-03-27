import React, { useEffect } from 'react';
import { Image, View } from "react-native";
import Images from "../utils/images";
import styles from "../utils/styles";
import { getItem } from "../utils/storage";
import { UID } from "../utils/types";
import axios from 'axios';
const Init = ({navigation}: {navigation: any}) => {
  
  useEffect(() => {
    
    axios.get('https://google.com')
    .catch((err) => {navigation.navigate('connection')})
    
    getItem('uid')
    .then((uid: UID | undefined) => {
      if (uid) navigation.navigate('profile');
      else setTimeout(() => navigation.navigate('login'), 500);
    })
    .catch((err) => {
      console.log("Error", err);
      setTimeout(() => navigation.navigate('error'), 500);
    })
  })

  return (
    <View style={styles.splash}>
      <Image source={Images.splash} style={styles.splash}/>
    </View>
  );
}

export default Init;