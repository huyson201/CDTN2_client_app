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
import {AppRegistry, TextInput} from 'react-native';
import { Picker } from '@react-native-picker/picker';
const EditProfileScreen = function () {
  const [selectedValue, setSelectedValue] = useState('java');
  return (
    <ScrollView>
      {/* HEADER */}
      <View style={EditProfileStyles.header}>
        <Title style={EditProfileStyles.headerText}>
          EDIT USER INFORMATION
        </Title>
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
        {/* PICKER TO SELECT GENDER */}
        <Text style={EditProfileStyles.textTitle}>Gender</Text>
        <View style={EditProfileStyles.PickerStyle}>
          <Icon
            style={EditProfileStyles.icon}
            name="question"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <Picker
            selectedValue={selectedValue}
            style={EditProfileStyles.Picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Male" Color="blue" value="Male" />
            <Picker.Item label="Female" Color="blue" value="Female" />
            <Picker.Item label="Other" Color="blue" value="Other" />
          </Picker>
        </View>
        <Button title="OK" buttonStyle={EditProfileStyles.Btn}></Button>
        <Button
          title="Cancel"
          buttonStyle={EditProfileStyles.cancelBtn}></Button>
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
    height: 150,
    backgroundColor: BLUE1,
    padding: 15,
    color: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    fontSize: 20,
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
  cancelBtn: {
    marginTop: 10,
    backgroundColor: '#cfcfcf',
    borderRadius: 40,
  },
  Btn: {
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
  },
});

export default EditProfileScreen;
