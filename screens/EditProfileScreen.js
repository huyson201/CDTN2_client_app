import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import styled from 'styled-components';
import {
  SEARCH_TITLE,
  LOCAL_SEARCH_TEXT,
  NIGHT_NUMBER,
  CALENDAR_TEXT,
  HOTEL_CHECK_OUT,
  MAX_DAY,
  PERSON_NUMBER,
  FILTER_STRING,
  SEARCH_MAP_STRING,
  SEARCH_BTN_STRING,
} from '../src/values/constains';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1, DARK_GRAY, MAP_MARKER} from '../src/values/color';
import {SEARCH_ICON_SIZE, SEARCH_TEXT_SIZE} from '../src/values/size';
import {Button} from 'react-native-elements';
import History from '../src/components/home/History';
import About from '../src/components/home/About';
import {AppRegistry, TextInput, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const EditProfileScreen = function ({navigation}) {
  const [selectedValue, setSelectedValue] = useState('male');
  const image = {uri: 'https://reactjs.org/logo-og.png'};
  const handlePressUserProfile = () => {
    navigation.goBack();
  };
  return (
    <ScrollView>
      {/* HEADER */}
      <View style={EditProfileStyles.header}>
        {/* <Title style={EditProfileStyles.headerText}>
          EDIT USER INFORMATION
        </Title> */}
        <View style={EditProfileStyles.headerUserCicle}>
          {/* <Icon
            style={EditProfileStyles.headerUserimg}
            name="user-alt"
            size={50}
            backgroundColor="#05375a"
            color="#fff"></Icon> */}
          <View>
            <Image
              style={EditProfileStyles.userImg}
              source={require('../src/images/the_cap_hotel.jpeg')}
            />
          </View>

          {/* <Text style={EditProfileStyles.headerUserimg}>Test </Text> */}
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
            defaultValue="0123456789"
            placeholder="Type Your Phone Here"
            autoCapitalize="none"
            style={EditProfileStyles.textInput}></TextInput>
        </View>
        {/* Modify identifier */}
        <Text style={EditProfileStyles.textTitle}>Identifier</Text>
        <View style={EditProfileStyles.action}>
          <Icon
            style={EditProfileStyles.icon}
            name="check"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            defaultValue="01236655488"
            placeholder="Type Your Identifier Here"
            autoCapitalize="none"
            style={EditProfileStyles.textInput}></TextInput>
        </View>
        {/* PICKER TO SELECT GENDER */}
        <Text style={EditProfileStyles.textTitle}>Gender</Text>
        <View style={EditProfileStyles.genderPicker}>
          <Picker
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
        <View style={EditProfileStyles.btn}>
          <Button title="OK" buttonStyle={EditProfileStyles.okBtn}></Button>
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
  container: {flex: 1, backgroundColor: '#FFF'},
  header: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: BLUE1,
    padding: 15,
    color: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
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
    backgroundColor: 'pink',
    borderWidth: 5,
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
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
    backgroundColor: 'transparent',
    borderWidth: 0,
    //
    flex: 1,
    justifyContent: 'center',
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
  headerUserimg: {
    // elevation: 5,
    fontSize: 50,
    textAlign: 'center',
    marginTop: 15,
    backgroundColor: 'transparent',
    borderWidth: 0,
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
