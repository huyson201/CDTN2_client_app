import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {Button} from 'react-native-elements';
import {BLUE1} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../src/values/size';
import {auth} from '../cf_firebase/ConfigFireBase';
import {onAuthStateChanged, signInWithEmailAndPassword} from '@firebase/auth';
import {
  INVALID_EMAIL,
  LOGIN_SUCCESSFULLY,
  TOO_MANY_REQUEST,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from '../src/values/constants';
import {db} from '../cf_firebase/ConfigFireBase';
import {child, get, onValue, ref} from '@firebase/database';

const LoginScreen = ({navigation}) => {
  const emailInput = useRef();
  const passInput = useRef();
  const [data, setData] = useState({
    email: '',
    password: '',
    checkTextInputChange: false,
    secureTextEntry: true,
  });
  const [isLoading, setisLoading] = useState(false);
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
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      const after = await AsyncStorage.setItem(key, jsonValue);
      setisLoading(false);
      console.log(after);
      navigation.navigate('HomeTab');
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async () => {
    setisLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data['email'],
        data['password'],
      );
      // const getUser = await get(child(ref(db), `users/${res.user.uid}`));
      // const jsonValue = JSON.stringify(getUser);
      // const storeData = await AsyncStorage.setItem('user', jsonValue);
      // console.log(storeData);
      // navigation.navigate('HomeTab');
      if (res) {
        // console.log(res);
        ToastAndroid.show(LOGIN_SUCCESSFULLY, ToastAndroid.SHORT);
        emailInput.current.clear();
        passInput.current.clear();
        setisLoading(false);
        navigation.navigate('HomeTab');
      }
    } catch (error) {
      if (error.code == 'auth/wrong-password') {
        ToastAndroid.show(WRONG_PASSWORD, ToastAndroid.SHORT);
      } else if (error.code == 'auth/user-not-found') {
        ToastAndroid.show(USER_NOT_FOUND, ToastAndroid.SHORT);
      } else if (error.code == 'auth/invalid-email') {
        ToastAndroid.show(INVALID_EMAIL, ToastAndroid.LONG);
      } else {
        ToastAndroid.show(TOO_MANY_REQUEST, ToastAndroid.LONG);
      }
      console.log(error);
      setisLoading(false);
    }

    // if (res) {

    //   setisLoading(false);
    // }

    // await storeData('user', {name: 'Ngoc'});
    // signInWithEmailAndPassword(auth, data['email'], data['password'])
    //   .then(res => {
    //     ToastAndroid.show(LOGIN_SUCCESSFULLY, ToastAndroid.SHORT);

    //     // emailInput.current.clear();
    //     // passInput.current.clear();
    //     console.log(res.user.uid);

    //     onValue(
    //       ref(db, `users/${res.user.uid}`),
    //       snapshot => {
    //         console.log(snapshot.val());
    //         setisLoading(false);
    //         const jsonValue = JSON.stringify(snapshot.val());
    //         AsyncStorage.setItem("user", jsonValue).then(val => {
    //           setisLoading(false);
    //           console.log(val);
    //           navigation.navigate('HomeTab');
    //         });
    //         // const user = JSON.stringify(snapshot.val())
    //         // console.log(user);
    //         // const saveData = JSON.stringify(data);
    //         //  storeData("user",snapshot.val());
    //         // console.log(saveData);
    //         // const t=  AsyncStorage.setItem("user",user)
    //         // console.log(t);
    //       },
    //       {
    //         onlyOnce: true,
    //       },
    //     );
    //   })
    //   .catch(err => {
    //     if (err.code == 'auth/wrong-password') {
    //       ToastAndroid.show(WRONG_PASSWORD, ToastAndroid.SHORT);
    //     } else if (err.code == 'auth/user-not-found') {
    //       ToastAndroid.show(USER_NOT_FOUND, ToastAndroid.SHORT);
    //     } else {
    //       ToastAndroid.show(TOO_MANY_REQUEST, ToastAndroid.LONG);
    //     }
    //   });
  };

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
              ref={emailInput}
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
              ref={passInput}
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
          <Button
            title={'LOGIN'}
            buttonStyle={loginStyles.buttonStyle}
            onPress={handleLogin}
            loading={isLoading}></Button>
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
