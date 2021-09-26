import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import {BLUE1} from '../src/values/color';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../src/values/size';
import CustomButton from '../src/components/CustomButton';
const SignUpScreen =  () => {
    return(
  <SafeAreaView style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.textLogo}>SIGN UP</Text>
      </View>
      <View style={styles.form}>
      <Text style={styles.text_footer}>Họ tên</Text>
          <View style={styles.action}>
            <Icon
              style={styles.icon}
              name="user-alt"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"></Icon>
            <TextInput
              placeholder="Your Name"
              autoCapitalize="none"
              style={styles.textInput}></TextInput>
          </View>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <Icon2
              style={styles.icon}
              name="envelope"
              size={18}
              color="#05375a"></Icon2>
            <TextInput
              placeholder="Your Email"
              autoCapitalize="none"
              style={styles.textInput}></TextInput>
            <Icon
              style={styles.icon}
              name="check"
              size={18}
              color="#05375a"></Icon>
          </View>
          <Text style={styles.text_footer}>Số điện thoại</Text>
          <View style={styles.action}>
            <Icon
              style={styles.icon}
              name="phone-alt"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"></Icon>
            <TextInput
              placeholder="Your Phone Number"
              autoCapitalize="none"
              style={styles.textInput}></TextInput>
            <Icon
              style={styles.icon}
              name="check"
              size={18}
              color="#05375a"></Icon>
          </View>
          <Text style={styles.text_footer}>Mật khẩu</Text>
          <View style={styles.action}>
            <Icon
              style={styles.icon}
              name="key"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"></Icon>
            <TextInput
              placeholder="Your Password"
              autoCapitalize="none"
              style={styles.textInput}></TextInput>
            <Icon
              style={styles.icon}
              name="eye"
              size={18}
              color="#05375a"></Icon>
          </View>
          <Text style={styles.text_footer}>Xác nhận mật khẩu</Text>
          <View style={styles.action}>
            <Icon
              style={styles.icon}
              name="key"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"></Icon>
            <TextInput
              placeholder="Confirm password"
              autoCapitalize="none"
              style={styles.textInput}></TextInput>
            <Icon
              style={styles.icon}
              name="eye"
              size={18}
              color="#05375a"></Icon>
          </View>
          <CustomButton
            text="Sign up"
            bgColor={BLUE1}
            color={'#FFF'}></CustomButton>
      </View>
        <View style={styles.footer}></View>
    </View>
  </SafeAreaView>
    )
};
const styles = StyleSheet.create({
  wrapper: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    backgroundColor: BLUE1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textLogo: {
    marginTop: 10,
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  form: {
    flex: 2,
    elevation: 2,
    shadowColor: '#000',
    borderRadius: 20,
    backgroundColor: '#FFF',
    paddingTop:20,
    paddingBottom:20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    marginVertical: -50,
    alignContent: 'flex-start',
  },
  footer:{
    flex: 0.3,
    flexDirection:'row',
    backgroundColor: '#FFF',
    paddingVertical: 50,
    paddingHorizontal: 50,
    textAlign: 'center',
    justifyContent:'center',
    alignItems: 'flex-start',
    color: '#05375a',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  icon: {
    paddingTop: 13,
    tintColor:'black',
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
export default SignUpScreen;
