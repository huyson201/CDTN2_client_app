import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import DetailRoomScreen from './screens/DetailRoomScreen';

import GGMap from './screens/GGMap';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="DetailRoomScreen" component={DetailRoomScreen}  options={{headerShown: false}}/> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: true, headerTransparent:true,headerShadowVisible:false,title:''}}/>
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
