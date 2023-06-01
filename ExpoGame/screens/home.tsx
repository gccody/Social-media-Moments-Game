import React, { useEffect, useState } from "react"
import { Text, StyleSheet, View, ScrollView } from "react-native";
import SafeView from "../utils/components/SafeView";
import { darkGrey } from "../utils/styles";
import Bar from "../utils/components/Bar";
import { getAuth, User } from "firebase/auth/react-native";
import { FUser } from "../utils/types";
import { getUser } from "../utils/utils";
import Carousel from "../utils/components/Carousel";

const Home = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState<FUser | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function run() {
      setLoading(true);
      const user = getAuth().currentUser;
      if (!user) return navigation.navigate('login');
      const data = await getUser(user.uid);
      setUserData(data);
      setUser(user);
      setLoading(false);
    })();
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
      <Bar user={user!} data={userData!} />
      <View style={styles.cards}>
        <Carousel />
      </View>
    </SafeView>
  );

  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkGrey,
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
    width: '100%',
  },
  cards: {
    marginTop: 10,
    marginBottom: 10,
  },
  boxAndSecondary: {
    flexDirection: 'row',
    marginTop: 10
  },
  footer: {
    color: 'white',
    textAlign: 'center',
  }
})


export default Home;