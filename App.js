import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import GGMap from './screens/GGMap';
import HomeScreen from './screens/HomeScreen';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home 1", headerShown: false }} />
        <Stack.Screen name="GoogleMap" component={GGMap} options={{ title: "Google Map" }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
