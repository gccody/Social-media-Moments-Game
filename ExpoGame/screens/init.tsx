import React, { useEffect } from "react";
import { ImageBackground, Platform, StyleSheet } from "react-native";
import Images from "../utils/images";
import { getAuth } from "firebase/auth/react-native";
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { DefaultFUser, FUser } from "../utils/types";

const Init = ({ navigation }: { navigation: any }) => {

  useEffect(() => {
    (async function run() {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const db = getFirestore();
          const col = collection(db, 'users');
          const docRef = doc(col, user.uid);
          getDoc(docRef).then((doc) => {
            if (doc.exists()) {
              const data = doc.data();
              const userDataKeys = Object.keys(data);
              const defaultKeys = Object.keys(DefaultFUser);
              const missingKeys = defaultKeys.filter(key => !userDataKeys.includes(key));
              missingKeys.forEach(key => {
                data[key] = DefaultFUser[key];
              });
              setDoc(docRef, data);
            } else {
              setDoc(docRef, DefaultFUser);
            }
          });
          navigation.navigate(user.displayName ? 'home' : 'setup');
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