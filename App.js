import React from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <SafeAreaView >
      <LoginScreen />
      {/* <HomeScreen /> */}
    </SafeAreaView>
  );
};

export default App;
