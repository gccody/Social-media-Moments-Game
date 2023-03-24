import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const light = '#F3EFE0';
const lightGrey = '#434242';
const darkGrey = '#222222'
const blue = '#22A39F'
const splash = '#323638'

const styles = StyleSheet.create({
  background: {
    backgroundColor: lightGrey
  },
  container: {
    flex: 1,
    backgroundColor: lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stack: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  circleBlack: {
    backgroundColor: darkGrey,
    borderRadius: 50,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    flex: 1,
    backgroundColor: lightGrey,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Number(getStatusBarHeight().toFixed(0)),
  },
  splash: {
    backgroundColor: splash,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
  text: {
    color: light,
  },
  title: {
    color: light,
    fontSize: 70,
    fontWeight: 'bold',
  },
  header: {
    color: light,
    fontSize: 30,
  },
  input: {
    backgroundColor: darkGrey,
    width: 300,
    height: 50,
    padding: 5,
    fontSize: 25,
    color: light,
    borderRadius: 5,
  },
  padding10: {
    padding: 10,
  },
  paddingTop10: {
    paddingTop: 10,
  },
  button: {
    backgroundColor: blue,
    color: light,
    borderRadius: 5,
    height: 40,
    maxHeight: 40,
    width: 300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: light,
  }
});

export default styles;