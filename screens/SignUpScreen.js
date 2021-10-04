import React, {useState} from 'react';
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
import {Button} from 'react-native-elements';
import {auth} from '../cf_firebase/ConfigFireBase';
import {createUserWithEmailAndPassword} from '@firebase/auth';
const SignUpScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    checkTextInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  const textInputChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        checkTextInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        checkTextInputChange: false,
      });
    }
  };

  const handlePressPassword = val => {
    setData({
      ...data,
      password: val,
    });
  };
  const handlePressConfirmPassword = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateSecureConfirmTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const handleSignUp = () => {
    console.log(data['email']);
    console.log(data['password']);
    if (data['password'] === data['confirm_password']) {
      createUserWithEmailAndPassword(
        auth,
        data['email'],
        data['password'],
      ).then(navigation.navigate('HomeTab'));
    } else {
      console.log('sai');
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textLogo}>Sign up</Text>
        </View>
        {/* <Text>{currentUser && currentUser.email}</Text> */}
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
              onChangeText={val => textInputChange(val)}
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
              secureTextEntry={data.secureTextEntry ? true : false}
              placeholder="Your Password"
              autoCapitalize="none"
              onChangeText={val => handlePressPassword(val)}
              style={styles.textInput}></TextInput>
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Icon
                  style={styles.icon}
                  name="eye-slash"
                  size={18}
                  color="#05375a"></Icon>
              ) : (
                <Icon
                  style={styles.icon}
                  name="eye"
                  size={18}
                  color="#05375a"></Icon>
              )}
            </TouchableOpacity>
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
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              placeholder="Confirm password"
              onChangeText={val => handlePressConfirmPassword(val)}
              autoCapitalize="none"
              style={styles.textInput}></TextInput>
            <TouchableOpacity onPress={updateSecureConfirmTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Icon
                  style={styles.icon}
                  name="eye-slash"
                  size={18}
                  color="#05375a"></Icon>
              ) : (
                <Icon
                  style={styles.icon}
                  name="eye"
                  size={18}
                  color="#05375a"></Icon>
              )}
            </TouchableOpacity>
          </View>
          <Button
            disabled={isLoading}
            onPress={handleSignUp}
            buttonStyle={styles.buttonStyle}
            title="Sign Up"></Button>
        </View>
        <View style={styles.footer}></View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: BLUE1,
    borderRadius: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },

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
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    marginVertical: -50,
    alignContent: 'flex-start',
  },
  footer: {
    flex: 0.3,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 50,
    paddingHorizontal: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: '#05375a',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  icon: {
    paddingTop: 13,
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
