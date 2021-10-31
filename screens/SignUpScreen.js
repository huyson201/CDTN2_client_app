import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {BLUE1} from '../src/values/color';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../src/values/size';
import {Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {EMAIL_OR_PHONE_EXISTED, PHONE_INVALID, SIGNUP_SUCCESSFULLY} from '../src/values/constants';
import userApi from '../api/userApi';

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(6, 'Password is too short!')
    .required('Password is required!'),
  confirm_password: Yup.string().equals(
    [Yup.ref('password'), null],
    'Password does not match!',
  ),
  phone: Yup.string().min(10, 'Invalid phone!').required('phone is required!'),
});

const SignUpScreen = ({navigation}) => {
  const [data, setData] = useState({
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const userInfor = {
    fullname: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
  };
  const [isLoading, setLoading] = useState(false);

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
  const handleSignUp = async (values, formikActions) => {
    setLoading(true);
    try {
      const res = await userApi.signUp(
        values.fullname,
        values.email,
        values.password,
        values.confirm_password,
        values.phone,
      );
      if (res.data.message == 'success') {
        formikActions.resetForm();
        setLoading(false);
        ToastAndroid.show(SIGNUP_SUCCESSFULLY, ToastAndroid.SHORT);
        navigation.navigate('LoginScreen', {
          emailUser: values.email,
        });
      } else {
        setLoading(false);
        ToastAndroid.show(EMAIL_OR_PHONE_EXISTED, ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(PHONE_INVALID, ToastAndroid.SHORT);
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textLogo}>Sign up</Text>
          </View>
          <Formik
            initialValues={userInfor}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions) => {
              handleSignUp(values, formikActions);
            }}>
            {({
              values,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
            }) => {
              return (
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
                      value={values.fullname}
                      onBlur={handleBlur('fullname')}
                      placeholder="Your Name"
                      autoCapitalize="none"
                      style={styles.textInput}
                      onChangeText={handleChange('fullname')}></TextInput>
                  </View>
                  {errors.fullname && touched.fullname ? (
                    <Text style={{color: 'red'}}>{errors.fullname}</Text>
                  ) : null}
                  <Text style={styles.text_footer}>Email</Text>
                  <View style={styles.action}>
                    <Icon2
                      style={styles.icon}
                      name="envelope"
                      size={18}
                      color="#05375a"></Icon2>
                    <TextInput
                      value={values.email}
                      onBlur={handleBlur('email')}
                      placeholder="Your Email"
                      autoCapitalize="none"
                      onChangeText={handleChange('email')}
                      style={styles.textInput}></TextInput>
                  </View>
                  {errors.email && touched.email ? (
                    <Text style={{color: 'red'}}>{errors.email}</Text>
                  ) : null}
                  <Text style={styles.text_footer}>Số điện thoại</Text>
                  <View style={styles.action}>
                    <Icon
                      style={styles.icon}
                      name="phone-alt"
                      size={18}
                      backgroundColor="#05375a"
                      color="#05375a"></Icon>
                    <TextInput
                      value={values.phone}
                      onBlur={handleBlur('phone')}
                      placeholder="Your Phone Number"
                      autoCapitalize="none"
                      style={styles.textInput}
                      onChangeText={handleChange('phone')}></TextInput>
                  </View>
                  {errors.phone && touched.phone ? (
                    <Text style={{color: 'red'}}>{errors.phone}</Text>
                  ) : null}
                  <Text style={styles.text_footer}>Mật khẩu</Text>
                  <View style={styles.action}>
                    <Icon
                      style={styles.icon}
                      name="key"
                      size={18}
                      backgroundColor="#05375a"
                      color="#05375a"></Icon>
                    <TextInput
                      value={values.password}
                      onBlur={handleBlur('password')}
                      secureTextEntry={data.secureTextEntry ? true : false}
                      placeholder="Your Password"
                      autoCapitalize="none"
                      onChangeText={handleChange('password')}
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
                  {errors.password && touched.password ? (
                    <Text style={{color: 'red'}}>{errors.password}</Text>
                  ) : null}
                  <Text style={styles.text_footer}>Xác nhận mật khẩu</Text>
                  <View style={styles.action}>
                    <Icon
                      style={styles.icon}
                      name="key"
                      size={18}
                      backgroundColor="#05375a"
                      color="#05375a"></Icon>
                    <TextInput
                      value={values.confirm_password}
                      onBlur={handleBlur('confirm_password')}
                      secureTextEntry={
                        data.confirm_secureTextEntry ? true : false
                      }
                      placeholder="Confirm password"
                      onChangeText={handleChange('confirm_password')}
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
                  {errors.confirm_password && touched.confirm_password ? (
                    <Text style={{color: 'red'}}>
                      {errors.confirm_password}
                    </Text>
                  ) : null}
                  <Button
                    onPress={handleSubmit}
                    buttonStyle={styles.buttonStyle}
                    title="Sign Up"
                    loading={isLoading}></Button>
                </View>
              );
            }}
          </Formik>
          <View style={styles.footer}></View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    flex: 3,
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
  footer: {},
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
