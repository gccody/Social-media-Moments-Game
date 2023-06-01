import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, ViewStyle, Keyboard, StyleSheet, Platform } from "react-native"
import { lightGrey } from '../styles';
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
      <SafeAreaView style={[styles.safe, style]}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: lightGrey,
  },
  safe: {
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  }
});

export default SafeView;