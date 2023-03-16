import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";

interface Props {
  title: string;
  onPress: () => void;
}

const LoginButton: React.FC<Props> = ({title, onPress}) => {

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
      accessibilityLabel={title}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default LoginButton;