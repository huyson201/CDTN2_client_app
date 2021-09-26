import React from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RootStackScreens from './screens/RootStackScreens';
import SignUpScreen from './screens/SignUpScreen';

const App = () => {
  return (
    <SafeAreaView >
      {/* <LoginScreen /> */}
      {/* <SignUpScreen></SignUpScreen> */}
      {/* <RootStackScreens></RootStackScreens> */}
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
