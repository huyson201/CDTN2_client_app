import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import 'react-native-gesture-handler';
import TaskHome from './src/components/TaskScreen/TaskHome';
import { View } from 'react-native';
import DetailInvoice from './src/components/invoices/DetailInvoice';
import HotelList from './screens/HotelList';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <NavigationContainer>
        <TaskHome />
      </NavigationContainer> */}
      <HotelList />
    </View>
  );
};

export default App;
