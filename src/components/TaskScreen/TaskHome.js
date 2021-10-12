import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfileScreen from "../../../screens/EditProfileScreen";
import ProfileScreen from "../../../screens/ProfileScreen";
import RoomListScreen from "../../../screens/RoomListScreen";
import DetailRoomScreen from "../../../screens/DetailRoomScreen";
import DetailHotelScreen from "../../../screens/DetailHotelScreen";
import SignUpScreen from "../../../screens/SignUpScreen";
import LoginScreen from "../../../screens/LoginScreen";
import HotelList from "../../../screens/HotelList";
import Invoice from "../../../screens/Invoice";
import SplashScreen from "../../../screens/SplashScreen";
import { BLUE1 } from "../../values/color";
import TabBar from "../home/TabBar";
const Stack = createNativeStackNavigator();

const TaskHome = () => {
  
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />  */}
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
          headerStyle: {backgroundColor: BLUE1},
        }}
      />
      <Stack.Screen
        name="DetailHotelScreen"
        component={DetailHotelScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#fff",
          headerShadowVisible:false
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
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: true , headerStyle: {backgroundColor: BLUE1}, headerTintColor: "#fff",}}
        
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: true, headerStyle: {backgroundColor: BLUE1},  headerTintColor: "#fff", }}
      />
    </Stack.Navigator>
  );
};

export default TaskHome;
