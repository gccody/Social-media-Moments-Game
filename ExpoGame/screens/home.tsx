import { useEffect, useState } from "react"
import { getItem } from "../utils/storage";
import { User } from "../utils/types";

const Home = ({ navigation }: { navigation: any }) => {
  const [uid, setUid] = useState('');
  const [profile, setProfile] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function run() {
      const uid = await getItem('uid');
      const p = await getItem('profile');
      if (!uid || !p) return navigation.navigate('login');
      setUid(uid);
      setProfile(p);
      setLoading(false);
    })();
  }, []);

  
}

export default Home;