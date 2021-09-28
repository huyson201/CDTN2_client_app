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

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HotelList />
      {/* <HomeScreen /> */}
    </SafeAreaView>
  );
};

export default App;
