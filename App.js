import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import GGMap from './screens/GGMap';
import HomeScreen from './screens/HomeScreen';
import Invoice from './screens/Invoice';
import ListRestaurants from "./screens/ListRestaurants"
import { BLUE1 } from './src/values/color';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home 1", headerShown: false }} />
        <Stack.Screen name="ListRestaurants" component={ListRestaurants} options={{ headerShown: false }} />
        <Stack.Screen name="GoogleMap" component={GGMap} options={{ title: "Google Map" }} />
        <Stack.Screen name="Invoice" component={Invoice} options={{ title: "Thông tin đặt phòng", headerTintColor: "#fff", headerStyle: { backgroundColor: BLUE1 }, headerShadowVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
