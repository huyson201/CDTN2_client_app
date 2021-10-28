import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import TaskHome from './src/components/TaskScreen/TaskHome';
import { View } from 'react-native';
import Invoice from './screens/Invoice';
import DetailInvoice from './src/components/invoices/DetailInvoice';
import { isJwtExpired } from 'jwt-check-expiration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskLogin from './src/components/TaskScreen/TaskLogin';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setRememberMe } from './action_creators/user';
import jwtDecode from 'jwt-decode';
const App = () => {
  const dispatch = useDispatch();
  const rememberMe = useSelector(state => state.user.isRemembered);
  useEffect(() => {
    const getData = async () => {
      try {
        await AsyncStorage.getItem('refresh_token').then(value => {

          if (value != null && isJwtExpired(value) == false) {
            const user = jwtDecode(value);
            dispatch(setCurrentUser(user));
            dispatch(setRememberMe(true));
          } else if (value != null && isJwtExpired(value) == true) {
            dispatch(setRememberMe(false));
          }
        });
        // await AsyncStorage.getItem('token').then(value => {
        //   console.log(value);
        //   // if (value != null && isJwtExpired(value) == false) {
        //   //   const user = jwtDecode(value);
        //   //   dispatch(setCurrentUser(user));
        //   //   dispatch(setRememberMe(true));
        //   // } else if (value != null && isJwtExpired(value) == true) {
        //   //   dispatch(setRememberMe(false));
        //   // }
        // });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <TaskHome /> */}
        {rememberMe == false ? <TaskLogin /> : <TaskHome />}
      </NavigationContainer>
    </View>
  );
};

export default App;
