import React, { useEffect, useState } from "react"
import { Text, StyleSheet, View } from "react-native";
import SafeView from "../utils/components/SafeView";
import { darkGrey, light } from "../utils/styles";
import Bar from "../utils/components/Bar";
import { getAuth, User } from "firebase/auth/react-native";


const Home = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const user = getAuth().currentUser;
    if (!user) return navigation.navigate('login');
    setUser(user);
    setLoading(false);
  }, []);

  // const pages = ['packs', 'profile', 'collection', 'shop', 'trading', 'about', 'settings', 'higher/lower', 'inventory', 'achievements'];

  if (loading) {
    return (
      <SafeView>
        <Text>
          Loading...
        </Text>
      </SafeView>
    );
  }

  return (
    <SafeView style={styles.container}>
      <Bar username={user!.displayName!} />
      <View style={styles.container}>
        <View style={styles.mainCards}>
          <Text style={styles.text}>
            Packs
          </Text>
        </View>
        <View style={styles.mainCards}>
          <Text style={styles.text}>
            Trading
          </Text>
        </View>
      </View>
    </SafeView>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkGrey,
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
    width: '100%'
  },
  mainCards: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#00FF00',
    marginTop: 20,
  },
  text: {
    color: light
  }
})


export default Home;