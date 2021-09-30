import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import SplashScreen from './screens/SplashScreen';
import GGMap from './screens/GGMap';
import HomeScreen from './screens/HomeScreen';
import Invoice from './screens/Invoice';
import ListRestaurants from './screens/ListRestaurants';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HotelList from './screens/HotelList';
import {BLUE1, DARK_GRAY} from './src/values/color';
import 'react-native-gesture-handler';
import RoomListScreen from './screens/RoomListScreen';
import TaskHome from './src/components/TaskScreen/TaskHome';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    // <View style={{ flex: 1 }}>
    //   <NavigationContainer>
    //     <Tab.Navigator
    //       screenOptions={({ route }) => ({
    //         tabBarIcon: ({ focused, color, size }) => {
    //           let iconName = ""
    //           let iconColor = "rgba(0,0,0,.5)"
    //           switch (route.name) {
    //             case "HomeTask":
    //               iconColor = focused ?? BLUE1
    //               iconName = "home"
    //               break;
    //             case "Notify":
    //               iconColor = focused ?? BLUE1
    //               iconName = "bell"
    //               break;
    //             case "Profile":
    //               iconColor = focused ?? BLUE1
    //               iconName = "user-alt"
    //               break;
    //           }

    //           return (<Icon name={iconName} color={color} size={size} />)
    //         }
    //       })}
    //     >
    //       <Tab.Screen name="HomeTask" component={TaskHome} options={{ headerShown: false }} />
    //       <Tab.Screen name="Notify" component={NotificationScreen} />
    //       <Tab.Screen name="Profile" component={ProfileScreen} />
    //     </Tab.Navigator>
    //   </NavigationContainer>
    // </View>

    // <SafeAreaView style={{ flex: 1 }}>
    //   <HotelList />
    //   {/* <HomeScreen /> */}
    // </SafeAreaView>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HotelList"
          component={HotelList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
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

{
  /* <Stack.Navigator initialRouteName="RoomListScreen">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "", headerShown: true, headerTransparent: true, headerShadowVisible: false, headerTintColor: "#fff" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HotelList" component={HotelList} options={{ headerShown: false }} />
        <Stack.Screen name="RoomListScreen" component={RoomListScreen} options={{ headerShown: false, }} />
        <Stack.Screen name="ListRestaurants" component={ListRestaurants} options={{ headerShown: false }} />
        <Stack.Screen name="GoogleMap" component={GGMap} options={{ title: "Google Map" }} />
        <Stack.Screen name="Invoice" component={Invoice} options={{ title: "Thông tin đặt phòng", headerTintColor: "#fff", headerStyle: { backgroundColor: BLUE1 }, headerShadowVisible: false }} />
</Stack.Navigator> */
}
