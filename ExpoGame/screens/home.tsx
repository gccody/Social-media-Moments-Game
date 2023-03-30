import { useEffect, useState } from "react"
import { View , Text} from "react-native";
import SafeView from "../utils/components/SafeView";
import { getItem } from "../utils/storage";
import { User } from "../utils/types";

const Home = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function run() {
      const user = await getItem('user');
      if (!user) return navigation.navigate('login');
      setUser(user)
      setLoading(false);
    })();
  }, []);

  return (
    <SafeView>
      <Text>
        Hello Bitch
      </Text>
    </SafeView>
  );

  
}

export default Home;