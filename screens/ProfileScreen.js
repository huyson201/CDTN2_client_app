import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, ToastAndroid} from 'react-native';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1} from '../src/values/color';
import {Button} from 'react-native-elements';
import {TextInput, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {auth} from '../cf_firebase/ConfigFireBase';
import {signOut} from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = function ({navigation}) {
  const [selectedValue, setSelectedValue] = useState('male');
  const handlePressEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };
  const handleToListRooms = () => {
    navigation.navigate('My Ordered Room');
  };

  const handleLogout = () => {
    signOut(auth).then(
      AsyncStorage.removeItem('user').then(
        ToastAndroid.show('Dang xuat thanh cong', ToastAndroid.SHORT),
      ),

      navigation.navigate('LoginScreen')
    );
  };
  return (
    <ScrollView>
      {/* HEADER */}
      <View style={EditProfileStyles.header}>
        {/* <Title style={EditProfileStyles.headerText}>USER INFORMATION</Title> */}
        <View style={EditProfileStyles.headerUserCicle}>
          <View>
            <Image
              style={EditProfileStyles.userImg}
              source={require('../src/images/detail_hotel_2.jpeg')}
            />
          </View>
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
            defaultValue="Name of user"
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
            defaultValue="0123456789"
            placeholder="Type Your Phone Here"
            autoCapitalize="none"
            style={EditProfileStyles.textInput}></TextInput>
        </View>
        {/* IDENTIFIER  */}
        <Text style={EditProfileStyles.textTitle}>Identifier</Text>
        <View style={EditProfileStyles.action}>
          <Icon
            style={EditProfileStyles.icon}
            name="check"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            editable={false}
            defaultValue="01236655488"
            placeholder="Type Your Identifier Here"
            autoCapitalize="none"
            style={EditProfileStyles.textInput}></TextInput>
        </View>
        {/* PICKER TO SELECT GENDER */}
        <Text style={EditProfileStyles.textTitle}>Gender</Text>
        <View style={EditProfileStyles.genderPicker}>
          <Picker
            enabled={false}
            selectedValue={selectedValue}
            style={{backgroundColor: '#ade5ff'}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        <View Style={EditProfileStyles.btn}>
          <Button
            onPress={handlePressEditProfile}
            title="Edit Information"
            buttonStyle={EditProfileStyles.editBtn}></Button>
          <Button
            onPress={handleToListRooms}
            title="My ordered Rooms"
            buttonStyle={EditProfileStyles.listRoomsBtn}></Button>
          <Button
            onPress={handleLogout}
            title="Logout"
            buttonStyle={EditProfileStyles.LogoutBtn}></Button>
        </View>
      </Container>
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

// const ViewRow = styled.View`
//   width: 100%;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;
const EditProfileStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
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
    maxWidth: 120,
    maxHeight: 120,
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
    color:'#000',
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
    marginVertical:10,
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
    marginTop:10,
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
