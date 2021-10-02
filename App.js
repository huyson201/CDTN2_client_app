import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BLUE1 } from './src/values/color';
import "react-native-gesture-handler";
import TaskHome from "./src/components/TaskScreen/TaskHome"
// import NotificationScreen from "./screens/NotificationScreen"
// import ProfileScreen from './screens/ProfileScreen';
import { View, SafeAreaView } from 'react-native';
// import Icon from "react-native-vector-icons/FontAwesome5"
import HotelList from './screens/HotelList';
import DetailRoomScreen from './screens/DetailRoomScreen';
import DetailHotelScreen from './screens/DetailHotelScreen';
import Utilities from './src/components/hotel/Utilities';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DetailHotelScreen />
      {/* <Utilities /> */}
    </SafeAreaView>

    // <View style={{ flex: 1 }}>
    //   <NavigationContainer>
    //     <TaskHome />
    //     {/* <TaskHome /> */}
    //   </NavigationContainer>
    // </View>
  );
};

export default App;

