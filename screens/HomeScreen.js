import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from 'react-native';
import styled from 'styled-components';
import {
  SEARCH_TITLE,
  LOCAL_SEARCH_TEXT,
  HOTEL_CHECK_OUT,
  MAX_DAY,
  FILTER_STRING,
  SEARCH_MAP_STRING,
  SEARCH_BTN_STRING,
  ADDRESS_NULL_MESSAGE
} from '../src/values/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BLUE1, BLUE2, DARK_GRAY, MAP_MARKER, ORANGE } from '../src/values/color';
import { SEARCH_ICON_SIZE, SEARCH_TEXT_SIZE } from '../src/values/size';
import { Button } from 'react-native-elements';
import History from '../src/components/home/History';
import About from '../src/components/home/About';
import ClientAndRoomModal from "../src/components/home/ClientAndRoomModal"
import CalendarModal from '../src/components/home/CalendarModal';
import NightPicker from '../src/components/home/NightPicker';
import SearchFilterModal from '../src/components/home/SearchFilterModal';
import SearchLocalModal from '../src/components/home/SearchLocalModal';
import { useDispatch, useSelector } from "react-redux";
import { convertDateToVNDate, convertStrPersonRooms } from '../src/utilFunction';

const HomeScreen = function ({ navigation }) {
  const roomModalRef = React.createRef()
  const calendarRef = useRef()
  const nightPickerRef = useRef()
  const filterRef = useRef()
  const addressRef = useRef()

  // address state
  const address = useSelector(state => state.search.address)
  // date state
  const date = useSelector(state => state.search.date)

  // number night
  let receivedDate = convertDateToVNDate(date.receivedDate)
  let payDate = convertDateToVNDate(date.payDate)
  let numberNight = date.numDate

  // person, rooms
  const personsAndRooms = useSelector(state => state.search.personsAndRooms)
  let strPARooms = convertStrPersonRooms(personsAndRooms)

  const dispatch = useDispatch()

  const handlePressRoomPicker = function () {
    roomModalRef.current.show()
  }

  const handlePressDate = () => {
    calendarRef.current.show()
  }

  const handlePressNightPicker = () => {
    nightPickerRef.current.show()
  }

  const handlePressFilterRef = () => {
    filterRef.current.show()
  }
  const handlePressAddress = () => {
    addressRef.current.show()

  }

  const HandlePressSearch = () => {
    if (address === "") {
      ToastAndroid.show(ADDRESS_NULL_MESSAGE, ToastAndroid.SHORT)
      return
    }
    navigation.navigate("ListHotels")
  }

  const handlePressMap = () => {
    navigation.navigate("GoogleMap")
  }
  return (
    <ScrollView>
      <View style={homeStyles.header}>
        <Title style={homeStyles.headerText}>Booking Hotel</Title>
        <Title>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Title>
      </View>
      {/* search box */}
      <Container>
        <SearchBox style={homeStyles.elevation}>
          {/* search title */}
          <View style={homeStyles.searchTitle}>
            <TouchableOpacity activeOpacity={0.7}>
              <ViewRow>
                <Title ellipsizeMode="tail" numberOfLines={1}>
                  {SEARCH_TITLE}
                </Title>
                <Icon name="angle-right" size={20} color="#fff" />
              </ViewRow>
            </TouchableOpacity>
          </View>

          {/* select location field */}
          <Container style={homeStyles.filedSpace}>
            <TouchableOpacity activeOpacity={0.5} onPress={handlePressAddress}>
              <Field>
                <Icon
                  name={'map-marker-alt'}
                  size={SEARCH_ICON_SIZE}
                  color={MAP_MARKER}
                />
                <LabelSearch ellipsizeMode="tail" numberOfLines={1}>
                  {address !== "" ? address : LOCAL_SEARCH_TEXT}
                </LabelSearch>
              </Field>
            </TouchableOpacity>
          </Container>

          {/* select day field */}
          <Container style={homeStyles.filedSpace}>
            <ViewRow>
              <TouchableOpacity
                onPress={handlePressDate}
                activeOpacity={0.5}
                style={homeStyles.searchCol1}>
                <Field>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name={'calendar-alt'} size={SEARCH_ICON_SIZE} />
                    <LabelSearch ellipsizeMode="tail" numberOfLines={1}>
                      {receivedDate}
                    </LabelSearch>
                  </View>
                </Field>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePressNightPicker}
                activeOpacity={0.5}
                style={homeStyles.searchCol2}>
                <Field>
                  <View>
                    <LabelSearch ellipsizeMode="tail" numberOfLines={1}>
                      {numberNight} Đêm
                    </LabelSearch>
                  </View>
                </Field>
              </TouchableOpacity>
            </ViewRow>

            <ViewRow style={{ marginTop: 5 }}>
              <View style={homeStyles.searchCol1}>
                <Text style={homeStyles.smallText}>
                  {HOTEL_CHECK_OUT} {payDate}
                </Text>
              </View>
              <View style={homeStyles.searchCol2}>
                <Text textAlign="left" style={homeStyles.smallText}>
                  {MAX_DAY} 31 đêm
                </Text>
              </View>
            </ViewRow>
          </Container>

          {/* select person numbers */}
          <Container style={homeStyles.filedSpace}>
            <TouchableOpacity activeOpacity={0.5} onPress={handlePressRoomPicker}>
              <Field>
                <Icon
                  name={'user-friends'}
                  size={SEARCH_ICON_SIZE}
                  color={BLUE1}
                />
                <LabelSearch ellipsizeMode="tail" numberOfLines={1}>
                  {strPARooms}
                </LabelSearch>
              </Field>
            </TouchableOpacity>
          </Container>

          {/* Filter */}
          <Container style={homeStyles.filedSpace}>
            <TouchableOpacity activeOpacity={0.5} onPress={handlePressFilterRef}>
              <Field>
                <Icon name={'sliders-h'} size={SEARCH_ICON_SIZE} color={BLUE1} />
                <LabelSearch ellipsizeMode="tail" numberOfLines={1}>
                  {FILTER_STRING}
                </LabelSearch>
              </Field>
            </TouchableOpacity>
          </Container>

          {/* btn control */}
          <Container>
            <ViewRow style={{ marginTop: 12 }}>
              <TouchableOpacity activeOpacity={0.5} onPress={handlePressMap}>
                <View style={{ flexDirection: 'row', marginLeft: 12 }}>
                  <Icon
                    name={'map-marked-alt'}
                    size={SEARCH_ICON_SIZE}
                    color={BLUE1}
                  />
                  <LabelSearch
                    style={homeStyles.mapString}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {SEARCH_MAP_STRING}
                  </LabelSearch>
                </View>
              </TouchableOpacity>
              <Button
                title={SEARCH_BTN_STRING}
                buttonStyle={homeStyles.searchBtn}
                onPress={HandlePressSearch}
              />
            </ViewRow>
          </Container>
        </SearchBox>
      </Container>
      {/* History */}
      <History />
      <Container>
        <About />
      </Container>

      {/* modal */}
      <ClientAndRoomModal ref={roomModalRef} />
      <CalendarModal ref={calendarRef} />
      <NightPicker ref={nightPickerRef} />
      <SearchFilterModal ref={filterRef} />
      <SearchLocalModal ref={addressRef} />
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

const SearchBox = styled.View`
  transform: translateY(-32px);
  border-radius: 10px;
`;

const Field = styled.View`
  border-bottom-width: 1px;
  border-color: #d3d3d3;
  border-style: solid;
  padding-top: 12px;
  padding-bottom: 12px;
  flex-direction: row;
  align-items: center;
`;

const LabelSearch = styled.Text`
  font-size: ${SEARCH_TEXT_SIZE}px;
  margin-left: 8px;
  text-transform: capitalize;
`;
const ViewRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const homeStyles = StyleSheet.create({
  container: {},
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
  searchTitle: {
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: BLUE2,
    width: '100%',
  },
  elevation: {
    elevation: 2,
    shadowColor: '#52006A',
    paddingBottom: 15,
  },
  filedSpace: {
    marginTop: 5,
    marginBottom: 5,
  },
  smallText: {
    fontSize: 12,
    color: DARK_GRAY,
  },
  searchCol1: {
    maxWidth: '60%',
    width: '100%',
  },
  searchCol2: {
    maxWidth: '30%',
    width: '100%',
  },
  mapString: {
    color: BLUE1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBtn: {
    backgroundColor: ORANGE,
    textTransform: 'capitalize',
    borderRadius: 8,
    paddingLeft: 32,
    paddingRight: 32,
  },
});

export default HomeScreen;
