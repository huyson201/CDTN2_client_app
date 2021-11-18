import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import TaskHome from './src/components/TaskScreen/TaskHome';
import { View } from 'react-native';
import { isJwtExpired } from 'jwt-check-expiration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskLogin from './src/components/TaskScreen/TaskLogin';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setRememberMe, setToken } from './action_creators/user';
import jwtDecode from 'jwt-decode';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
const Stack = createNativeStackNavigator();
import userApi from './api/userApi';
import NetInfo from "@react-native-community/netinfo";
import { ToastProvider } from 'react-native-toast-notifications'
import { BLUE2 } from './src/values/color';
import SuccessIcon from 'react-native-vector-icons/FontAwesome'


const App = () => {
  const dispatch = useDispatch();
  const rememberMe = useSelector(state => state.user.isRemembered);
  const { token, currentUser } = useSelector(state => state.user)
  const [firstLoading, setFirstLoading] = useState(true);
  const getUser = async (token) => {
    if (token && isJwtExpired(token) === false) {
      const user = jwtDecode(token)
      try {
        const res = await userApi.getUserById(token, user.user_uuid)
        if (res.data.data) {
          dispatch(setCurrentUser(res.data.data))
        }
      } catch (error) {
        console.log(error, "error luc get user");
      }
    } else {
      refresh()
    }
  }

  const refresh = async (value) => {
    try {
      const res = await userApi.refreshToken(value)
      if (res.data && res.data.token) {
        console.log("da refresh thanh cong");
        dispatch(setToken(res.data.token));
        await AsyncStorage.setItem('token', res.data.token)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
    const getData = async () => {
      try {
        const refresh_token = await AsyncStorage.getItem('refresh_token');
        if (refresh_token != null && isJwtExpired(refresh_token) == false) {
          refresh(refresh_token)
          getUser(token)
          dispatch(setRememberMe(true));
          console.log(token);
        } else if (
          refresh_token != null &&
          isJwtExpired(refresh_token) == true
        ) {
          dispatch(setRememberMe(false));
          dispatch(setCurrentUser(null));
          dispatch(setToken(null));
        }
      } catch (error) {
        console.log(error);
      }

    };
    getData();
  }, [token]);

  //set loading
  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 3000);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ToastProvider
        // successColor={BLUE2}
        successIcon={<SuccessIcon />}
        textStyle={{ fontSize: 20,paddingHorizontal:10,paddingVertical:7 }}
        // dangerIcon={<DangerIcon />}
        // warningIcon={<WarningIcon />}
      >
        <NavigationContainer>
          {firstLoading ? (
            <Stack.Navigator>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : rememberMe === true && currentUser !== null ? (
            <TaskHome />
          ) : (
            <TaskLogin />
          )}
        </NavigationContainer>
      </ToastProvider>
    </View>
  );
};

export default App;
