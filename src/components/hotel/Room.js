import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {ORANGE_LIGHT, BLUE2} from '../../values/color';
import {SliderBox} from 'react-native-image-slider-box';
import hotelApi from '../../../api/hotelApi';
import {useSelector} from 'react-redux';
import {convertDateToVNDate} from '../../utilFunction';

const Room = function ({roomId, hotelId, hotelName, navigation}) {
  const [state, setState] = useState();
  const [ordered, setOrdered] = useState();
  const [roomData, setRoomData] = useState();

  // date state
  const date = useSelector(state => state.search.date);
  let numberNight = date.numDate;
  const searchData = useSelector(state => state.search);
  let {rooms} = searchData.personsAndRooms;
  let maxPrice = searchData.filter.maxPrice;
  let minPrice = searchData.filter.minPrice;

  // number night
  let receivedDate = `${date.receivedDate.replace(/\//g, '-')}T14:00:00`;
  let payDate = `${date.payDate.replace(/\//g, '-')}T12:00:00`;

  const getOrdered = async roomId => {
    try {
      const res = await hotelApi.getOrderedByRoomId(
        roomId,
        receivedDate,
        payDate,
      );
      if (res.data.ordered) {
        setOrdered(res.data.ordered);
      } else {
        setOrdered(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomById = async roomId => {
    const res = await hotelApi.getRoomById(roomId);
    res.data.data &&
    +res.data.data.room_price >= minPrice &&
    +res.data.data.room_price <= maxPrice
      && setRoomData({
          roomName: res.data.data.room_name,
          price: res.data.data.room_price,
          people: res.data.data.room_num_people,
          status:
            res.data.data.room_quantity &&
            res.data.data.room_quantity - ordered,
          images: res.data.data.room_imgs
            ? res.data.data.room_imgs.split(',')
            : [],
          surcharge: +res.data.data.room_surcharge,
        })
     
  };

  const handleBooking = () => {
    let sum = sumPrice(
      +roomData.price,
      +roomData.surcharge,
      +numberNight,
      +rooms,
    );
    navigation.navigate('Invoice', {
      id: roomId,
      hotelId: hotelId,
      hotelName: hotelName,
      taxes: roomData.surcharge ? +roomData.surcharge : 0,
      sum: sum,
      room_quantity: roomData.status,
    });
  };

  const layoutWidth = e => {
    setState({
      width: e.nativeEvent.layout.width,
    });
  };

  useEffect(async () => {
    if (roomId) {
      await getOrdered(roomId);
    }
    return () => {
      setOrdered();
    };
  }, [roomId]);

  useEffect(() => {
    getRoomById(roomId);
    return () => {
      setRoomData();
    };
  }, [ordered]);

  return (
    <>
      {roomData && (
        <View style={[styles.view, styles.textOption]} onLayout={layoutWidth}>
          {state && roomData.images !== null ? (
            <>
              <SliderBox
                images={roomData.images ? roomData.images : []}
                style={styles.image}
                parentWidth={state.width}
                paginationBoxVerticalPadding={5}
                dotStyle={{width: 7, height: 7, marginHorizontal: -5}}
                imageLoadingColor={'#fff'}
              />

              <Text style={styles.textName} numberOfLines={1}>
                {roomData.roomName}
              </Text>
              <ViewRow>
                <View>
                  <Text style={styles.textContent}>
                    <Icon1 name="money" size={14} color="#05375a">
                      {' '}
                    </Icon1>{' '}
                    {
                      // sale != null && sale != '' ? roomData.price - roomData.price * sale :
                      roomData.price
                    }
                    <Feather
                      style={{paddingTop: 10}}
                      name="dollar-sign"
                      size={14}>
                      {' '}
                    </Feather>
                    /đêm
                  </Text>
                  <Text style={styles.textContent}>
                    <Ionicon name="people" size={15} color="#05375a">
                      {' '}
                    </Ionicon>
                    {roomData.people && roomData.people} người lớn
                  </Text>

                  {roomData.status && roomData.status >= 1 ? (
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
                        status: roomData.status,
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
          ) : (
            <Text></Text>
          )}
        </View>
      )}
    </>
  );
};

//Tính tổng tiền bao gồm cả thuế
function sumPrice(price, taxes, numberNight, rooms) {
  let sum = price * numberNight * rooms;
  if (taxes && taxes > 0) {
    sum = price * numberNight * rooms + taxes;
  }
  // if (sale != null && sale != '') {
  //   sum = price * numberNight + taxes - price * sale;
  // }
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
    paddingLeft: 10,
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
