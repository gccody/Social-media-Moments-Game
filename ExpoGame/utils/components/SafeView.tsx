import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, ViewStyle, Keyboard } from "react-native"
import styles from '../styles';
import { StatusBar } from 'expo-status-bar';

interface Props {
  children: React.ReactNode
  style?: ViewStyle
}

const SafeView: React.FC<Props> = ({children, style}) => {
  return (
    <>
    <StatusBar style='light' />
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); } } style={styles.background}>
      <SafeAreaView style={style}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
    </>
  )
}

export default SafeView;