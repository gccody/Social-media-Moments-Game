import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native'
import SafeView from '../utils/components/SafeView';
import { getItem } from '../utils/storage';
import styles from '../utils/styles';
import { UID, User } from '../utils/types';


const Profile = ({navigation}: {navigation: any}) => {
  const [userid, setUid] = useState('');
  const [url, setURL] = useState('');
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  const handleClick = async () => {
    return;
  }

  useEffect(() => {
    (async function run() {
      const uid: UID | undefined = await getItem('uid');
      const url = await getItem('url');
      if (!uid || !url) return navigation.navigate('error');
      setUid(uid.uid);
      setURL(url);
      const res = await axios.get(`${url}/profile/${uid.uid}`)
      if (!res) return navigation.navigate('error');
      setProfile(res.data as User);
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
      </View>
      <View />
    </SafeView>
  )
}

export default Profile;