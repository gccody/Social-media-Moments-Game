import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const LoginButton: React.FC<Props> = ({title, onPress, disabled}) => {

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
      accessibilityLabel={title}
      disabled={disabled ?? false}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default LoginButton;