import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {BLUE1} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../src/values/size';
import CustomButton from '../src/components/CustomButton';
import {auth} from '../cf_firebase/ConfigFireBase';
import { signInWithEmailAndPassword} from '@firebase/auth';
const LoginScreen = ({navigation}) => {

 
  const [data, setData] = React.useState({
    email: '',
    password: '',
    checkTextInputChange: false,
    secureTextEntry: true,
  });
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
  const handlePressSignUp = () => {
    navigation.navigate('SignUpScreen');
  };
  const handlePressPassword = val => {
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const handleLogin = () => {
    try {
      signInWithEmailAndPassword(auth, data['email'], data['password']).then(navigation.navigate('HomeTab'),ToastAndroid.show("Dang nhap thanh cong", ToastAndroid.SHORT))
    } catch (error) {
      console.log(error);
    }
   
  };
  // useEffect(() => {
  //   onAuthStateChanged(auth, user => {
  //     if (user) {
  //       navigation.navigate('HomeTab');
  //     } 
  //   })
  // }, []);
  return (
    <SafeAreaView style={loginStyles.wrapper}>
      <View style={loginStyles.container}>
        <View style={loginStyles.header}>
          <ImageBackground
            style={loginStyles.img}
            source={require('../src/images/logo.png')}></ImageBackground>
          <Text style={loginStyles.textLogo}>THE BOOKING</Text>
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
              onChangeText={val => textInputChange(val)}
              style={loginStyles.textInput}></TextInput>
            {data.checkTextInputChange ? (
              <Icon
                style={loginStyles.icon}
                name="check"
                size={18}
                color="#05375a"></Icon>
            ) : null}
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
              secureTextEntry={data.secureTextEntry ? true : false}
              autoCapitalize="none"
              style={loginStyles.textInput}
              onChangeText={val => handlePressPassword(val)}></TextInput>
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Icon
                  style={loginStyles.icon}
                  name="eye-slash"
                  size={18}
                  color="#05375a"></Icon>
              ) : (
                <Icon
                  style={loginStyles.icon}
                  name="eye"
                  size={18}
                  color="#05375a"></Icon>
              )}
            </TouchableOpacity>
          </View>
          <CustomButton
            onPress={handleLogin}
            text="login"
            bgColor={BLUE1}
            color={'#FFF'}></CustomButton>
        </View>
        <View style={loginStyles.footer}>
          <Text>Don't have an Account ? </Text>
          <TouchableOpacity onPress={handlePressSignUp}>
            <Text style={{color: BLUE1}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const loginStyles = StyleSheet.create({
  wrapper: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flex: 2,
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
    marginVertical: -30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  icon: {
    paddingTop: 13,
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
  img: {
    height: DEVICE_HEIGHT / 4,
    width: DEVICE_HEIGHT / 4,
  },
});
export default LoginScreen;
