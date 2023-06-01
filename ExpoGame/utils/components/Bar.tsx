import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { blue, darkGrey, light, lightGrey } from "../styles";
import { User } from "firebase/auth/react-native";
import { FUser } from "../types";
import { StatusBar } from "expo-status-bar";

interface Props {
  user: User,
  data: FUser,
}

const Bar: React.FC<Props> = ({user, data}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        Level: {data.xp}
      </Text>
      <Text style={styles.text}>
        {user.displayName}
      </Text>
      <Text style={styles.text}>
        Currency: {data.coins}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    backgroundColor: lightGrey,
  },
  text: {
    color: light
  }
})

export default Bar;