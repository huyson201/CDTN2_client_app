import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import { ORANGE_LIGHT, BLUE2 } from '../../values/color';
import { SliderBox } from 'react-native-image-slider-box';
import hotelApi from '../../../api/hotelApi';
import { useSelector } from 'react-redux';
import { convertDateToVNDate } from '../../utilFunction';

const Room = function ({
  roomId,
  hotelId,
  hotelName,
  sale,
  children,
  navigation,
}) {
  const [state, setState] = useState();
  const [roomData, setRoomData] = useState({
    roomName: '',
    price: 0,
    people: 0,
    status: 0,
    images: [],
  });

  // date state
  const date = useSelector((state) => state.search.date);
  let numberNight = date.numDate;

  const taxes = 50000;
  let sum = sumPrice(
    roomData.price,
    sale,
    taxes,
    numberNight
  );

  const getRoomById = async (roomId) => {
    if (roomId) {
      const res = await hotelApi.getRoomById(roomId);
      !res.data.error
        ? setRoomData({
          roomName: res.data.data.room_name,
          price: res.data.data.room_price,
          people: res.data.data.room_num_people,
          status: res.data.data.room_quantity ? res.data.data.room_quantity : 0,
          images: res.data.data.room_imgs ? res.data.data.room_imgs.split(',') : [],
        })
        : setRoomData([{ message: 'Khong co du lieu phong' }]);
    } else {
      console.log("Khong co id phong");
    }
  };

  const handleBooking = () => {
    navigation.navigate('Invoice', {
      id: roomId,
      hotelId: hotelId,
      hotelName: hotelName,
      taxes: taxes,
      sum: sum,
    });
  };

  const layoutWidth = e => {
    setState({
      width: e.nativeEvent.layout.width,
    });
  };

  useEffect(() => {
    getRoomById(roomId);
  }, [roomId]);

  return (
    <View style={[styles.view, styles.textOption]} onLayout={layoutWidth}>
      {state && roomData.images !== null ?
        <>
          <SliderBox
            images={roomData.images}
            style={styles.image}
            parentWidth={state.width}
            paginationBoxVerticalPadding={5}
            dotStyle={{ width: 7, height: 7, marginHorizontal: -5 }}
            imageLoadingColor={'#fff'}
          />

          <Text style={styles.textName} numberOfLines={1}>{roomData.roomName}</Text>
          <ViewRow>
            <View>
              <Text style={styles.textContent}>
                <Icon1 name="money" size={14} color="#05375a">
                  {' '}
                </Icon1>{' '}
                {sale != null && sale != '' ? roomData.price - roomData.price * sale : roomData.price}
                <Feather style={{ paddingTop: 10 }} name="dollar-sign" size={14}>
                  {' '}
                </Feather>
                /đêm
              </Text>
              <Text style={styles.textContent}>
                <Ionicon name="people" size={15} color="#05375a">
                  {' '}
                </Ionicon>
                {roomData.people} người lớn {children} trẻ em
              </Text>

              {roomData.status >= 1 ? (
                <Text style={styles.textContent}>
                  <Icon name="check" size={14} color="#05375a">
                    {' '}
                  </Icon>
                  Còn {roomData.status} phòng
                </Text>
              ) : (
                <Text style={styles.textContent}>
                  {' '}
                  <Octicons name="x" size={16} color="#05375a">
                    {' '}
                  </Octicons>{' '}
                  Hết phòng
                </Text>
              )}
            </View>
            <View>
              <TouchableOpacity activeOpacity={0.8}>
                <Button
                  title={'Chọn'}
                  color={ORANGE_LIGHT}
                  onPress={handleBooking}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DetailRoomScreen', {
                    id: roomId,
                    hotelId: hotelId,
                    hotelName: hotelName,
                    sale: sale,
                  });
                }}>
                <Text style={styles.textDetail}>
                  Xem chi tiết{' '}
                  <Icon1
                    name="angle-double-right"
                    size={15}
                    color={BLUE2}
                    style={styles.iconDetail}></Icon1>
                </Text>
              </TouchableOpacity>
            </View>
          </ViewRow>


        </>
        : <Text></Text>}



    </View>
  );
};

//Tính tổng tiền bao gồm cả thuế
function sumPrice(price, sale, taxes, numberNight) {
  let sum = price * numberNight + taxes;
  if (sale != null && sale != "") {
    sum = price * numberNight + taxes - price * sale;
  }
  return sum;
}

const ViewRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`;

const styles = StyleSheet.create({
  view: {
    // padding: 20,
    // paddingTop: 10,
    borderWidth: 0.5,
    backgroundColor: '#ececec',
    borderColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    margin: 12,
  },
  textName: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft:10
  },
  image: {
    flex: 1,
    width: 'auto',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textDetail: {
    color: BLUE2,
    fontStyle: 'italic',
    fontSize: 13,
    marginTop: 10,
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  button: {
    width: 50,
    height: 50,
  },
  rowDetail: {
    flexDirection: 'row',
  },
  iconDetail: {
    marginTop: 12,
  },
  textOption: {
    fontFamily: 'AnticSlab-Regular',
  },
  textContent: {
    color: '#464646',
  },
});

export default Room;
