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

const EditProfileScreen = function ({navigation}) {
  const [selectedValue, setSelectedValue] = useState('male');
  const handlePressEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };
  const handleLogout = () => {
    signOut(auth).then(
      ToastAndroid.show('Dang xuat thanh cong', ToastAndroid.SHORT),
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
          {/* <Button
            title="Cancel"
            buttonStyle={EditProfileStyles.cancelBtn}></Button> */}
          <Button
            onPress={handleLogout}
            title="Logout"
            buttonStyle={EditProfileStyles.okBtn}></Button>
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
    padding: 15,
    color: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  headerUserCicle: {
    display: 'flex',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#7CAFDA',
    // borderWidth: 5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  userImg: {
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  headerUserText: {
    // elevation: 5,
    fontSize: 50,
    textAlign: 'center',
    marginTop: 15,
    backgroundColor: 'transparent',
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
  textInput: {},
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
    height: 50,
    width: 150,
    borderRadius: 50,
    backgroundColor: '#ade5ff',
    color: '#20232a',
    textAlign: 'center',
    //  Add Action Style
    paddingLeft: 20,
    marginTop: 10,
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
  cancelBtn: {
    marginTop: 10,
    backgroundColor: '#cfcfcf',
    borderRadius: 40,
  },
  okBtn: {
    marginTop: 10,
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
