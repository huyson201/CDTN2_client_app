import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ToastAndroid } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo'
import { BLUE1 } from '../src/values/color';
import { Button } from 'react-native-elements';
import { TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setRememberMe, setToken } from '../action_creators/user';
import { SIGNOUT_SUCCESSFULLY } from '../src/values/constants';
import userApi from '../api/userApi';

const EditProfileScreen = function ({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  console.log(user);
  const handlePressEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };
  const handleToListRooms = () => {
    navigation.navigate('My Ordered Room');
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await userApi.logout(token);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refresh_token');
      dispatch(setCurrentUser(null));
      dispatch(setRememberMe(false));
      dispatch(setToken(null));
      ToastAndroid.show(SIGNOUT_SUCCESSFULLY, ToastAndroid.SHORT);
    } catch (e) {
      console.log(e)
    }
  };
  return (
    <ScrollView>
      {/* HEADER */}
      {user !== null ?
        <>
          <View style={EditProfileStyles.header}>
            <View style={EditProfileStyles.headerUserCicle}>
                <Image
                  style={EditProfileStyles.userImg}
                  source={
                    user.user_img !== null ? { uri: user.user_img } : { uri: `https://ui-avatars.com/api/?name=${user.user_name}&size=256` }}
                />
            </View>
          </View>
          <Container>
            {/* EDIT BASIC INFORMATION */}
            <Text style={EditProfileStyles.textTitle}>Full Name</Text>
            <View style={EditProfileStyles.action}>
              <Icon
                style={EditProfileStyles.icon}
                name="user-alt"
                size={18}
                backgroundColor="#05375a"
                color="#05375a"></Icon>
              <TextInput
                editable={false}
                defaultValue={user && user.user_name}
                placeholder="Type Your Name Here"
                autoCapitalize="none"
                style={EditProfileStyles.textInput}></TextInput>
            </View>
            <Text style={EditProfileStyles.textTitle}>Phone</Text>
            <View style={EditProfileStyles.action}>
              <Icon
                style={EditProfileStyles.icon}
                name="phone-alt"
                size={18}
                backgroundColor="#05375a"
                color="#05375a"></Icon>
              <TextInput
                editable={false}
                defaultValue={user && user.user_phone}
                placeholder="Type Your Phone Here"
                autoCapitalize="none"
                style={EditProfileStyles.textInput}></TextInput>
            </View>
            {/* Email  */}
            <Text style={EditProfileStyles.textTitle}>Email</Text>
            <View style={EditProfileStyles.action}>
              <Icon1
                style={EditProfileStyles.icon}
                name="mail"
                size={18}
                backgroundColor="#05375a"
                color="#05375a" />
              <TextInput
                editable={false}
                defaultValue={user && user.user_email}
                autoCapitalize="none"
                style={EditProfileStyles.textInput}></TextInput>
            </View>
            <View Style={EditProfileStyles.btn}>
              <Button
                onPress={handlePressEditProfile}
                title="Edit Information"
                buttonStyle={EditProfileStyles.editBtn} />
              <Button
                onPress={handleToListRooms}
                title="My ordered Rooms"
                buttonStyle={EditProfileStyles.listRoomsBtn} />
              <Button
                onPress={handleLogout}
                title="Logout"
                buttonStyle={EditProfileStyles.LogoutBtn} />
            </View>
          </Container>
        </>
        : <Text></Text>}
    </ScrollView>
  );
};
const Title = styled.Text`
  color: #fff;
`;

const Container = styled.View`
  padding: 0 15px;
  width: 100%;
`;

const EditProfileStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    backgroundColor: BLUE1,
    paddingTop: 10,
    paddingBottom: 25,
    color: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  headerUserCicle: {
    display: 'flex',
    marginHorizontal: '33%',
    marginBottom: 10,
    height: 100,
    width: 100,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  userImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  icon: {
    paddingTop: 13,
    paddingRight: 15,
  },
  textTitle: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 5,
  },
  textInput: {
    color: '#000',
  },
  box: {
    height: 40,
    marginTop: 10,
    backgroundColor: '#ade5ff',
    textTransform: 'capitalize',
    borderRadius: 8,
    paddingLeft: 32,
    paddingRight: 32,
  },
  PickerStyle: {
    // height: 50,
    // width: 150,
    borderRadius: 50,
    backgroundColor: '#ade5ff',
    color: '#20232a',
    textAlign: 'center',
    //  Add Action Style
    paddingLeft: 20,
    // marginTop: 10,
    marginVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#ade5ff',
    borderRadius: 40,
  },
  Picker: {
    height: 50,
    width: 150,
    borderWidth: 1,
    backgroundColor: '#ade5ff',
  },
  genderPicker: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
    marginTop: 10,
  },
  btn: {
    justifyContent: 'center',
    maxWidth: '100%',
  },
  editBtn: {
    marginTop: 10,
    backgroundColor: '#ffc107',
    borderRadius: 40,
  },
  listRoomsBtn: {
    marginTop: 10,
    backgroundColor: '#28a745',
    borderRadius: 40,
  },
  LogoutBtn: {
    marginVertical: 10,
    // backgroundColor: '#cfcfcf',
    borderRadius: 40,
  },
  action: {
    paddingLeft: 20,
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#ade5ff',
    borderRadius: 40,
    // overflow: "hidden",
  },
});

export default EditProfileScreen;
