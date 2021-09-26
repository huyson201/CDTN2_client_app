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

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RoomListScreen />
      {/* <HomeScreen /> */}
    </SafeAreaView>
  );
};

export default App;
