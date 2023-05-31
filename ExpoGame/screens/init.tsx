import React, { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import Images from "../utils/images";
import { getAuth } from "firebase/auth";

const Init = ({ navigation }: { navigation: any }) => {

  useEffect(() => {
    (async function run() {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate(user.displayName ? 'profile' : 'setup');
        } else {
          navigation.navigate('login');
        }
      })

      return unsubscribe;
    })();
  })

  return (
    <ImageBackground source={Images.splash} style={styles.background} />
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default Init;