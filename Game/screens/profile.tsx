import { Text } from 'react-native'
import SafeView from '../utils/components/SafeView';
import { getItem, removeItem } from '../utils/storage';
import { UID } from '../utils/types';


const Profile = ({navigation}: {navigation: any}) => {
  const handleClick = async () => {
    await removeItem('uid');
    navigation.navigate('login');
  }
  
  let userId;
  getItem('uid')
  .then((uid: UID | undefined) => {
    if (uid) userId = uid.uid;
    else navigation.navigate('error');
  })
  .catch((err) => {
    console.log("Error", err);
  })

  return (
    <SafeView>
      <Text>Hello World!</Text>
    </SafeView>
  );
}

export default Profile;