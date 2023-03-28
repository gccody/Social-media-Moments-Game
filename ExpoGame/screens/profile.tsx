import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native'
import LoginButton from '../utils/components/LoginButton';
import SafeView from '../utils/components/SafeView';
import { getItem, removeItem } from '../utils/storage';
import styles from '../utils/styles';
import { User } from '../utils/types';
import { getProfile } from '../utils/api';


const Profile = ({navigation}: {navigation: any}) => {
  const [userid, setUid] = useState('');
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  
  const handleClick = async () => {
    await removeItem('uid');
    setData('Restart app now');
  }

  useEffect(() => {
    (async function run() {
      const uid = await getItem('uid');
      if (!uid) return navigation.navigate('login');
      setUid(uid);
      const p = await getProfile(uid);
      if (!p.data) return navigation.navigate('error');
      setProfile(p.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <SafeView style={styles.login}>
        <View />
        <Text style={styles.header}>
          loading...
        </Text>
        <View />
      </SafeView>
    );
  }
  return (
    <SafeView style={styles.login}>
      <View />
      <View>
        <Text style={styles.text}>Email: {profile!.email}</Text>
        <Text style={styles.text}>Username: {profile!.username}</Text>
        <Text style={styles.text}>Uid: {profile!.uid}</Text>
        <View style={styles.paddingTop10} >
          <LoginButton title='Reset' onPress={handleClick} />
          <Text style={styles.text}>{data}</Text>
        </View>
      </View>
      <View />
    </SafeView>
  )
}

export default Profile;