import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignUpScreen from '../../../screens/SignUpScreen';
import LoginScreen from '../../../screens/LoginScreen';
import SplashScreen from '../../../screens/SplashScreen';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const TaskLogin = () => {
  return (
    <Stack.Navigator>

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
    </Stack.Navigator>
  );
};

export default TaskLogin;
