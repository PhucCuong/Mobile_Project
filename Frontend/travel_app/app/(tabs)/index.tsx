import { Image, StyleSheet, Platform, View } from 'react-native';
import { useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../../src/components/WelcomeScreen.js'
import LoginScreen from '../../src/components/LoginScreen.js'
import RegisterScreen from '../../src/components/RegisterScreen.js'
import LoginFail from '../../src/components/LoginFail.js'
import DashboardScreen from '../../src/components/DashboardScreen.js'
import DetailScreen from '../../src/components/DetailScreen.js'
import CategoriesList from '../../src/components/CategoriesList.js'
import UserInfoScreen from '../../src/components/UserInfoScreen.js'
import BookingRestaurant from '../../src/components/BookingRestaurant.js'
import BookingHotel from '../../src/components/BookingHotel.js'
import BookingCoffee from '../../src/components/BookingCoffee.js'
import ModalBookedScreen from '../../src/components/ModalBookedScreen.js'


///   link font
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

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
    <Stack.Navigator initialRouteName='WelcomeScreen'>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="LoginFail"
        component={LoginFail}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="CategoriesList"
        component={CategoriesList}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="UserInfoScreen"
        component={UserInfoScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="BookingRestaurant"
        component={BookingRestaurant}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="BookingHotel"
        component={BookingHotel}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="BookingCoffee"
        component={BookingCoffee}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ModalBookedScreen"
        component={ModalBookedScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
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
