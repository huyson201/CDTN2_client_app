import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BLUE1 } from '../src/values/color';
import { Button } from 'react-native-elements';
import { TextInput, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../api/userApi';
import { launchImageLibrary } from 'react-native-image-picker';
import { setCurrentUser } from '../action_creators/user';

const EditProfileScreen = function ({ navigation }) {
  const { currentUser, token } = useSelector(state => state.user)
  const [user_name, setUserName] = useState(currentUser.user_name)
  const [user_phone, setUserPhone] = useState(currentUser.user_phone)
  const [file, setFile] = useState()
  const dispatch = useDispatch()
  const handlePressUserProfile = () => {
    navigation.goBack();
  };

  const handlePressEditUserProfile = async () => {
    console.log('file', file)
    let formData = new FormData();
    formData.append("user_name", user_name)
    formData.append("user_phone", user_phone)

    if (file) {
      formData.append("avatar", file)
      console.log('from data', formData)
    }

    try {
      const res = await userApi.update(token, currentUser.user_uuid, formData)
      if (res.data.data) {
        dispatch(setCurrentUser(res.data.data))
        // console.log(res.data.data, "data update");
        ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error, "error update");
    }
  }

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        console.log(response)
        setFile({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName
        });
      }
    });
  };

  const renderFileData = () => {
    if (file) {
      return <Image style={EditProfileStyles.userImg} source={{ uri: file.url }}
      />
    } else {
      return <Text>dhfkjashdfkjasdkfj</Text>
    }
  }

  return (
    <ScrollView>
      {/* HEADER */}
      <View style={EditProfileStyles.header}>
        <View style={EditProfileStyles.headerUserCicle}>
          <Image
            style={EditProfileStyles.userImg}
            source={
              currentUser.user_img !== null ? { uri: currentUser.user_img } : { uri: `https://ui-avatars.com/api/?name=${currentUser.user_name}&size=256` }}
          />
          {/* <Icon name="camera" style={{fontSize:20,color:"#ffff",textAlign:"right"}}/> */}
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
            defaultValue={currentUser ? currentUser.user_name : ""}
            autoCapitalize="none"
            style={EditProfileStyles.textInput}
            onChangeText={(val) => val ? setUserName(val) : ""}></TextInput>
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
            defaultValue={currentUser ? currentUser.user_phone : ""}
            autoCapitalize="none"
            style={EditProfileStyles.textInput}
            onChangeText={(val) => val ? setUserPhone(val) : ""}
          ></TextInput>
        </View>

        <View>
          <TouchableOpacity onPress={chooseImage} >
            <Text>Choose File</Text>
            {renderFileData()}
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={launchCamera}  >
            <Text>Directly Launch Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={launchImageLibrary}  >
            <Text >Directly Launch Image Library</Text>
          </TouchableOpacity> */}
        </View>

        <View style={EditProfileStyles.btn}>
          <Button onPress={handlePressEditUserProfile} title="EDIT" buttonStyle={EditProfileStyles.okBtn}></Button>
          <Button
            title="Cancel"
            onPress={handlePressUserProfile}
            buttonStyle={EditProfileStyles.cancelBtn}></Button>
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

const ViewRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

  textInput: {
    color: '#000',
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
    // backgroundColor: '#ade5ff',
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
    marginTop: 50,
    justifyContent: 'center',
    minWidth: '100%',
  },
  cancelBtn: {
    marginTop: 10,
    backgroundColor: '#cfcfcf',
    borderRadius: 40,
  },
  okBtn: {
    marginTop: 10,
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
  },
});

export default EditProfileScreen;
