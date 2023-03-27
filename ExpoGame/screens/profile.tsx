import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native'
import LoginButton from '../utils/components/LoginButton';
import SafeView from '../utils/components/SafeView';
import { getItem, removeItem } from '../utils/storage';
import { UID } from '../utils/types';


const Profile = ({navigation}: {navigation: any}) => {
  const [userId, setUid] = useState('');
  const handleClick = async () => {
    await removeItem('uid');
    navigation.navigate('login');
  }

  useEffect(() => {
    getItem('uid')
    .then((uid: UID | undefined) => {
      if (uid) setUid(uid.uid);
      else navigation.navigate('error');
    })
    .catch((err) => {
      console.log("Error", err);
    })
  })

  return (
    <SafeView>
      <Text>UID: {userId}</Text>
      <Button title='return' onPress={handleClick} />
    </SafeView>
  );
}

export default Profile;