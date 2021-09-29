// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import React from 'react';
// import {SafeAreaView} from 'react-native';
// import RootStackScreens from './screens/RootStackScreens';
// import 'react-native-gesture-handler';

// import GGMap from './screens/GGMap';
// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import SignUpScreen from './screens/SignUpScreen';
// import CRUDRoomsScreen from './screens/CRUDRoomsScreen';
// import EditProfileScreen from './screens/EditProfileScreen';
// import ListRoomsOrderedScreen from './screens/ListRoomsOrderedScreen';
// const App = () => {
//   const Stack = createNativeStackNavigator();
//   return (

//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{headerShown: false}}/>
//         <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{title: 'Home 1', headerShown: false}}
//         />
//         <Stack.Screen
//           name="GoogleMap"
//           component={GGMap}
//           options={{title: 'Google Map'}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CreateRoomScreen from './screens/CreateRoomScreen';
import DetailRoomScreen from './screens/DetailRoomScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListRoomsScreen from './screens/ListRoomsScreen';
import ListRoomsOrderedScreen from './screens/ListRoomsOrderedScreen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_KEY} from './src/values/constains';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <ListRoomsOrderedScreen /> */}
      {/* <ListRoomsScreen /> */}
      {/* <EditProfileScreen /> */}
      <ProfileScreen />
      {/* <HomeScreen/> */}
      {/* <CreateRoomScreen/> */}
      {/* <DetailRoomScreen/> */}
    </SafeAreaView>
  );
};

export default App;
