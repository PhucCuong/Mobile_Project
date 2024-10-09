import { Image, StyleSheet, Platform, View } from 'react-native';
import {useState} from 'react'

import WelcomeScreen from '../../src/components/WelcomeScreen.js'


///   link font
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const loadFonts = async () => {
  await Font.loadAsync({
    'OpenSans-Semibold': require('../../assets/fonts/OpenSans-Semibold.ttf'), // Đường dẫn đúng tới font
  });
};
//////////////////////////

export default function HomeScreen() {

  // load font
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
  ///////////////
  return (
      <WelcomeScreen/>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
