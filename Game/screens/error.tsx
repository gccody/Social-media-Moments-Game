import { Text, View, Image } from "react-native";
import SafeView from "../utils/components/SafeView";
import Images from "../utils/images";
import styles from "../utils/styles";

const Errorr = ({navigation}: {navigation: any}) => {
  return (
    <SafeView style={styles.container}>
      <View style={styles.circleBlack}>
        <Image source={Images.iconLarge} style={styles.tinyLogo}/>
      </View>
      <Text style={[styles.text, styles.paddingTop10]}>Something went wrong...</Text>
    </SafeView>
  );
}

export default Errorr;