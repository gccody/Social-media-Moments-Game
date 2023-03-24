import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, ViewStyle, Keyboard, View } from "react-native"
import styles from '../styles';

interface Props {
  children: React.ReactNode
  style?: ViewStyle
}

const SafeView: React.FC<Props> = ({children, style}) => {
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}} style={styles.background}>
      <SafeAreaView style={style}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SafeView;