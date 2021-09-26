import React from 'react';
import {SafeAreaView} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RootStackScreens from './screens/RootStackScreens';
import SignUpScreen from './screens/SignUpScreen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer >
        <RootStackScreens ></RootStackScreens>
      </NavigationContainer>
     
    </SafeAreaView>
  );
};

export default App;
