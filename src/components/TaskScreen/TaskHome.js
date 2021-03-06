import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfileScreen from '../../../screens/EditProfileScreen';
import ProfileScreen from '../../../screens/ProfileScreen';
import ListRoomsOrderedScreen from '../../../screens/ListRoomsOrderedScreen';
import RoomListScreen from '../../../screens/RoomListScreen';
import DetailRoomScreen from '../../../screens/DetailRoomScreen';
import DetailHotelScreen from '../../../screens/DetailHotelScreen';
import HotelList from '../../../screens/HotelList';
import Invoice from '../../../screens/Invoice';
import { BLUE1 } from '../../values/color';
import TabBar from '../home/TabBar';
import RatingScreen from '../../../screens/RatingScreen'
import ListRatingScreen from '../../../screens/ListRatingScreen'
const Stack = createNativeStackNavigator();

const TaskHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTab"
        component={TabBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListHotels"
        component={HotelList}
        options={{
          headerShown: true,
          title: 'Kết quả tìm kiếm',
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: BLUE1 },
        }}
      />

      <Stack.Screen
        name="DetailHotelScreen"
        component={DetailHotelScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#fff',
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="RatingScreen"
        component={RatingScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#fff',
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="ListRatingScreen"
        component={ListRatingScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#fff',
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="RoomListScreen"
        component={RoomListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailRoomScreen"
        component={DetailRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: BLUE1 },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          // headerTitle: false,
          headerStyle: { backgroundColor: BLUE1 },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="My Ordered Room"
        component={ListRoomsOrderedScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: BLUE1 },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default TaskHome;
