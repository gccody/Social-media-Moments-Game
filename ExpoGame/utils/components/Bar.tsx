import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { light } from "../styles";

interface Props {
  username: string,
}

const Bar: React.FC<Props> = ({username}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        Level
      </Text>
      <Text style={styles.text}>
        {username}
      </Text>
      <Text style={styles.text}>
        Currency
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
    height: 20,
    padding: 0,
    margin: 0,
    backgroundColor: 'red',
  },
  text: {
    color: light
  }
})

export default Bar;