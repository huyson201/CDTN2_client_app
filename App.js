
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import HomeScreen from "./screens/HomeScreen";
import RoomListScreen from "./screens/RoomListScreen";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_KEY } from "./src/values/constains";
import HotelList from "./src/components/HotelList"

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import RootStackScreens from './screens/RootStackScreens';
import 'react-native-gesture-handler';

import GGMap from './screens/GGMap';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (

    // <SafeAreaView style={{ flex: 1 }}>
    //   <HotelList />
    //   {/* <HomeScreen /> */}
    // </SafeAreaView>

  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home 1', headerShown: false}}
        />
        <Stack.Screen
          name="GoogleMap"
          component={GGMap}
          options={{title: 'Google Map'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
