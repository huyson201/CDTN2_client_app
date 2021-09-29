import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from './screens/SplashScreen';
import GGMap from './screens/GGMap';
import HomeScreen from './screens/HomeScreen';
import Invoice from './screens/Invoice';
import ListRestaurants from "./screens/ListRestaurants"
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import { BLUE1 } from './src/values/color';
import "react-native-gesture-handler";
import RoomListScreen from "./screens/RoomListScreen";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="RoomListScreen">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ title: "Home 1", headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login", headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "", headerShown: true, headerTransparent: true, headerShadowVisible: false, headerTintColor: "#fff" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home 1", headerShown: false }} />
        <Stack.Screen name="RoomListScreen" component={RoomListScreen} options={{ title: "RoomListScreen", headerShown: false, }} />
        <Stack.Screen name="ListRestaurants" component={ListRestaurants} options={{ headerShown: false }} />
        <Stack.Screen name="GoogleMap" component={GGMap} options={{ title: "Google Map" }} />
        <Stack.Screen name="Invoice" component={Invoice} options={{ title: "Thông tin đặt phòng", headerTintColor: "#fff", headerStyle: { backgroundColor: BLUE1 }, headerShadowVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>



  );
};

export default App;
