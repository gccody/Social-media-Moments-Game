import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native'
import LoginButton from '../utils/components/LoginButton';
import SafeView from '../utils/components/SafeView';
import { getItem, removeItem } from '../utils/storage';
import styles from '../utils/styles';
import { User } from '../utils/types';


const Profile = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  
  const handleClick = async () => {
    await removeItem('user');
    setData('Restart app now');
  }

  useEffect(() => {
    (async function run() {
      const user = await getItem('user');
      if (!user) return navigation.navigate('login');
      setUser(user);
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
        <Text style={styles.text}>Email: {user!.email}</Text>
        <Text style={styles.text}>Username: {user!.username}</Text>
        <Text style={styles.text}>Uid: {user!.uid}</Text>
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