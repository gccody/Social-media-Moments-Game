import React from 'react';
import {View, Button, Text} from 'react-native'
import SafeView from '../utils/components/SafeView';
import styles from '../utils/styles';


const Connection = ({navigation}: {navigation: any}) => {

  const handleClick = () => {
    navigation.navigate('init');
  }

  return (
    <SafeView>
      <View style={styles.container}>
        <Text style={styles.text}>You are not connected to the internet</Text>
        <Button title='Try again...' onPress={handleClick}/>
      </View>
    </SafeView>
  );
}

export default Connection;