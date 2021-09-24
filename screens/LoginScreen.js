import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {Input} from 'react-native-elements';
import styled from 'styled-components';
import {BLUE1} from '../src/values/color';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const LoginScreen = () => {
  return (
    <SafeAreaView style={loginStyles.wrapper}>
      <View style={loginStyles.container}>
        <View style={loginStyles.header}>
          <Text>Welcome</Text>
        </View>
        <View style={loginStyles.inner}>
          <Text style={loginStyles.text_footer}>Email</Text>
          <View style={loginStyles.action}>
            <Icon
              style={loginStyles.icon}
              name="user-alt"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"></Icon>
            <TextInput
              placeholder="Your Email"
              autoCapitalize="none"
              style={loginStyles.textInput}></TextInput>
            <Icon
              style={loginStyles.icon}
              name="check"
              size={18}
              color="#05375a"></Icon>
          </View>
          <Text style={loginStyles.text_footer}>Password</Text>
          <View style={loginStyles.action}>
            <Icon
              style={loginStyles.icon}
              name="key"
              size={18}
              color="#05375a"></Icon>
            <TextInput
              placeholder="Your Password"
              autoCapitalize="none"
              style={loginStyles.textInput}></TextInput>
            <Icon
              style={loginStyles.icon}
              name="eye"
              size={18}
              color="#05375a"></Icon>
          </View>

          <Button title="Login"></Button>
        </View>
        <View style={loginStyles.footer}></View>
      </View>
    </SafeAreaView>
  );
};
const loginStyles = StyleSheet.create({
  wrapper: {
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flex: 2,
    backgroundColor: BLUE1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inner: {
    flex: 1,
    elevation: 2,
    shadowColor: '#000',
    borderRadius: 20,
    backgroundColor: '#FFF',
    paddingVertical: 50,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginTop: -30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  icon: {
    paddingTop: 13,
  },
  footer: {
    backgroundColor: '#FFF',
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
});
export default LoginScreen;
