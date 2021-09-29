import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Picker,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1, DARK_GRAY, MAP_MARKER} from '../src/values/color';
import {SEARCH_ICON_SIZE, SEARCH_TEXT_SIZE} from '../src/values/size';
import {Button} from 'react-native-elements';
import History from '../src/components/home/History';
import About from '../src/components/home/About';

const CreateRoomScreen = function () {
  const [selectedValue, setSelectedValue] = useState('java');
  const [value, onChangeText] = React.useState("");
  // DATE PICKER METHOD
 
  //
  return (
    <ScrollView>
      {/* HEADER */}
      <View style={CRUDRoomsStyle.header}>
        <Title style={CRUDRoomsStyle.headerText}>ADD NEW ROOM</Title>
      </View>
      <Container>
        {/* EDIT BASIC INFORMATION */}
        <Text style={CRUDRoomsStyle.textTitle}>Room's name</Text>
        <View style={CRUDRoomsStyle.action}>
          <Icon
            style={CRUDRoomsStyle.icon}
            name="money"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="Name of user"
            placeholder="Type Your Room's Name Here"
            autoCapitalize="none"
            style={CRUDRoomsStyle.textInput}></TextInput>
        </View>
        <Text style={CRUDRoomsStyle.textTitle}>Price</Text>
        <View style={CRUDRoomsStyle.action}>
          <Icon
            style={CRUDRoomsStyle.icon}
            name="phone-alt"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            placeholder="Type Your Room's Price Here"
            maxLength={9}
            autoCapitalize="none"
            style={CRUDRoomsStyle.textInput}></TextInput>
        </View>
        {/* EDIT  DESCRIPTION */}
        <Text style={CRUDRoomsStyle.textTitle}>Room's Description</Text>
        <UselessTextInput
          multiline
          numberOfLines={4}
          placeholder="Room's description"
          onChangeText={text => onChangeText(text)}
          value={value}
          style={CRUDRoomsStyle.textAreaInput}
        />
        {/* EDIT NUMBER OF BEDS */}
        <Text style={CRUDRoomsStyle.textTitle}>Beds</Text>
        <View style={CRUDRoomsStyle.action}>
          <Icon
            style={CRUDRoomsStyle.icon}
            name="bed"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="0123456789"
            placeholder="Type number of beds in your room"
            autoCapitalize="none"
            style={CRUDRoomsStyle.RoomDescription}></TextInput>
        </View>
        {/* DATE PICKER */}
       
        {/* PICKER TO SELECT ROOM"S STATUS */}
        <Text style={CRUDRoomsStyle.textTitle}>Status</Text>
        <View style={CRUDRoomsStyle.PickerStyle}>
          <Icon
            style={CRUDRoomsStyle.icon}
            name="question"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <Picker
            selectedValue={selectedValue}
            style={CRUDRoomsStyle.Picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Available" Color="blue" value="Available" />
            <Picker.Item label="Rented" Color="blue" value="Rented" />
            <Picker.Item label="Maintaining" Color="blue" value="Maintain" />
          </Picker>
        </View>
        <Button title="Create" buttonStyle={CRUDRoomsStyle.Btn}></Button>
        <Button title="Cancel" buttonStyle={CRUDRoomsStyle.cancelBtn}></Button>
      </Container>
    </ScrollView>
  );
};
const UselessTextInput = props => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={1000}
    />
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
const CRUDRoomsStyle = StyleSheet.create({
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
  RoomDescription: {
    height: 50,
  },
  textTitle: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 5,
  },
  textAreaInput: {
    padding: 10,
    backgroundColor: '#ade5ff',
    borderRadius: 17,
    marginTop: 10,
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

export default CreateRoomScreen;
