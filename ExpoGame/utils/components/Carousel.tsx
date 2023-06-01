import React from 'react';
import { Text, View, StyleSheet, ScrollView } from "react-native";


const Carousel = () => {
  return (
    <ScrollView 
      horizontal={true}
      contentContainerStyle={{ width: `${100 * 4}%` }}
      // showsHorizontalScrollIndicator={false}
      scrollEventThrottle={200}
      decelerationRate="fast">
      <View style={styles.card}>
        <Text style={styles.text}>1</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>2</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>3</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>4</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: 200,
    backgroundColor: 'red',
  },
  card: {
    width: 100,
    height: 50,
    backgroundColor: 'blue',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  }
})

export default Carousel;