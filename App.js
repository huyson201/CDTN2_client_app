import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BLUE1 } from './src/values/color';
import "react-native-gesture-handler";
import TaskHome from "./src/components/TaskScreen/TaskHome"
// import NotificationScreen from "./screens/NotificationScreen"
// import ProfileScreen from './screens/ProfileScreen';
import { View } from 'react-native';
// import Icon from "react-native-vector-icons/FontAwesome5"

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <TaskHome />
      </NavigationContainer>
    </View>
  );
};

export default App;

