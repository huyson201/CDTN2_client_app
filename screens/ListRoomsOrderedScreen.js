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
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
// import { DARK_GRAY, WHITE, ORANGE, GOLD_COLOR } from "../src/values/color";
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1, DARK_GRAY, MAP_MARKER, GOLD_COLOR} from '../src/values/color';
import {SEARCH_ICON_SIZE, SEARCH_TEXT_SIZE} from '../src/values/size';
import {Button} from 'react-native-elements';
import History from '../src/components/home/History';
import About from '../src/components/home/About';
// User Med Import
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUser, setRememberMe, setToken} from '../action_creators/user';
import {SIGNOUT_SUCCESSFULLY} from '../src/values/constants';
import userApi from '../api/userApi';
import hotelApi from './../api/hotelApi';
// Invoice Med import
import invoiceApi from './../api/invoiceApi';

const ListRoomsOrderedScreen = function ({navigation}) {
  // User
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  console.log(user);
  const handlePressEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };
  const handleToListRooms = () => {
    navigation.navigate('My Ordered Room');
  };
  const getHotelNameById = async hotelId => {
    try {
      const res = await hotelApi.getHotelById(hotelId);
      if (!res.data.error) {
        setDataHotel({
          name: res.data.data.hotel_name,
        });
        console.log(res.data.data.hotel_name);
      } else {
        console.log(res.data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //Get DATA
  // const [dataSource1, setDataSouce1] = useState([]);

  const [dataSource, setDataSouce] = useState([]);
  useEffect(() => {
    getData();
    // getHotelNameById(hotelID);
  }, []);
  // MODIFY DATASOUCE HERE
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const res = await invoiceApi.getInvoiceByUser(user.user_uuid, token);
      // console.log('test', res.data.data);
      setDataSouce(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const data = dataSource;
  const handlePressUserProfile = () => {
    navigation.goBack();
  };
  // PRINT RATING
  const printRating = star => {
    var rating = [];
    for (let i = 0; i < 5; i++) {
      rating.push(
        <Icon
          name="star"
          size={25}
          backgroundColor={GOLD_COLOR}
          color="#cfc021"></Icon>,
      );
    }
    return rating;
  };
  const getCreateDate = dateIn => {
    const result = new Date(dateIn);
    return result.getDate() + '/' + result.getMonth();
  };
  // MODIFY cái cây màu đen nằm giữa các ITEMS
  const ItemSeparatorView = () => {
    return <View style={ListRoomsOrderedStyle.ItemSeparatorView} />;
  };
  return (
    <View>
      <FlatList
        style={{marginTop: 5}}
        data={data}
        renderItem={({item, index}) => {
          return (
            // MODIFY ITEMSVIEW HERE
            <TouchableOpacity
              onPress={handlePressUserProfile}
              key={index}
              style={ListRoomsOrderedStyle.listItemStyle}>
              <View style={ListRoomsOrderedStyle.itemBody}>
                <View style={ListRoomsOrderedStyle.itemBoDyText}>
                  <Text
                    style={ListRoomsOrderedStyle.itemFont_HotelName}
                    numberOfLines={1}>
                    Khách sạn: {item.hotel_id}
                  </Text>
                  <Text
                    style={ListRoomsOrderedStyle.itemFont}
                    numberOfLines={1}>
                    Phòng số: {item.room_id}
                  </Text>
                  <Text
                    style={[ListRoomsOrderedStyle.itemFont]}
                    numberOfLines={2}>
                    {/* {printRating(item.id)} */}
                    Ngày Đặt Phòng:{' '}
                    <Text style={{color: '#7523b8'}}>
                      {' '}
                      {getCreateDate(item.p_date)}
                    </Text>
                  </Text>
                  <Text
                    style={[ListRoomsOrderedStyle.itemFont]}
                    numberOfLines={1}>
                    Chi phí:<Text style={{color: 'green'}}> {item.price}Đ</Text>
                  </Text>
                  <Text
                    style={[ListRoomsOrderedStyle.itemFont]}
                    numberOfLines={1}>
                    Trạng thái đơn:{' '}
                    <Text
                      style={
                        item.status === 'Đang đặt cọc'
                          ? {color: '#b8ae23'}
                          : item.status === 'Chưa xác nhận'
                          ? {color: 'red'}
                          : item.status === 'Đặt cọc'
                          ? {color: 'green'}
                          : {color: 'green'}
                      }>
                      {' '}
                      {item.status}
                    </Text>
                  </Text>
                </View>
              </View>
              <ItemSeparatorView />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const Title = styled.Text`
  color: #fff;
`;

const Container = styled.View`
  padding: 0 15px;
  width: 100%;
`;
const ListRoomsOrderedStyle = StyleSheet.create({
  container: {},
  header: {
    // height: 150,
    // position: 'relative',
    backgroundColor: BLUE1,
    paddingTop: 10,
    paddingBottom: 25,
    color: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    fontSize: 20,
  },
  textTitle: {
    fontSize: 20,
    marginLeft: 20,
  },
  listItemStyle: {
    borderRadius: 10,
  },
  itemBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  itemBoDyText: {
    flex: 2,
    flexDirection: 'column',
    marginTop: '5%',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    // alignContent: 'center',
  },
  itemBoDyImg: {
    flex: 1,
    // flexDirection:'column',
    marginHorizontal: 5,
    marginVertical: 10,
    minWidth: 110,
    minHeight: 110,
    maxWidth: 110,
    maxHeight: 110,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    resizeMode: 'cover',
  },
  ItemSeparatorView: {
    height: 1,
    width: '100%',
    backgroundColor: '#000000',
  },
  itemFont_HotelName: {
    color: '#104FDF',
    fontSize: 25,
  },
  itemFont_HotelStar: {color: '#cfc021', fontSize: 25},
  itemFont_id: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 0,
    marginTop: 0,
    borderWidth: 3,
    borderRadius: 20,
    paddingHorizontal: '40%',
    // paddingVertical: '3%',
    backgroundColor: '#808080',
    color: '#fff',
  },
  itemFont: {
    fontWeight: 'bold',
    paddingVertical: 5,
    fontSize: 20,
  },
});

export default ListRoomsOrderedScreen;
