import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import TaskHome from './src/components/TaskScreen/TaskHome';
import DetailInvoice from './src/components/invoices/DetailInvoice';
import {View} from 'react-native';
import {isJwtExpired} from 'jwt-check-expiration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskLogin from './src/components/TaskScreen/TaskLogin';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUser, setRememberMe} from './action_creators/user';
import jwtDecode from 'jwt-decode';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
const Stack = createNativeStackNavigator();
const App = () => {
  const dispatch = useDispatch();
  const rememberMe = useSelector(state => state.user.isRemembered);
  const [firstLoading, setFirstLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const refresh_token = await AsyncStorage.getItem('refresh_token');
        if (refresh_token != null && isJwtExpired(refresh_token) == false) {
          const token = await AsyncStorage.getItem('token');
          const user = jwtDecode(token);
          console.log(user);
          dispatch(setRememberMe(true));
          dispatch(setCurrentUser(user));
        } else if (
          refresh_token != null &&
          isJwtExpired(refresh_token) == true
        ) {
          dispatch(setRememberMe(false));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  //set loading
  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 3000);
  }, []);
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {firstLoading ? (
          <Stack.Navigator>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        ) : rememberMe === true ? (
          <TaskHome />
        ) : (
          <TaskLogin />
        )}
      </NavigationContainer>
    </View>
  );
};

export default App;
