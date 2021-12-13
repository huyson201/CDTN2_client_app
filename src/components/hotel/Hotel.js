import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import styled from 'styled-components';
import {DARK_GRAY, WHITE, ORANGE, GOLD_COLOR} from '../../values/color';
import {VND, UNIT, HOTEL_TEXT} from '../../values/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import hotelApi from '../../../api/hotelApi';

const Hotel = function ({navigation, hotelId}) {
  const [hotel, setHotel] = useState();
  const [prices, setPrices] = useState([]);

  const getHotelById = async hotelId => {
    try {
      const res = await hotelApi.getHotelById(hotelId);
      if (!res.data.error) {
        let number = [];
        number.length = res.data.data.hotel_star;
        for (let i = 0; i < number.length; i++) {
          number[i] = 'star';
        }
        setHotel({
          hotelName: res.data.data.hotel_name,
          image: res.data.data.hotel_img,
          address: res.data.data.hotel_address,
          phone: res.data.data.hotel_phone,
          star: number,
        });
      } else {
        console.log(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRoomsByIdHotel = async hotelId => {
    try {
      const res = await hotelApi.getAllRoomsByIdHotel(hotelId);
      setPrices([]);
      let temp = [];
      if (!res.data.error) {
        res.data.data.length !== 0
          ? res.data.data.map(e => {
              temp.push(e.room_price);
              setPrices([...temp]);
            })
          : setPrices([0]);
      } else {
        console.log(res.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  // get data from server
  useEffect(() => {
    getHotelById(hotelId);
    getAllRoomsByIdHotel(hotelId);
    return () => {
      setHotel();
      setPrices([]);
    };
  }, []);

  return (
    <>
      {hotel && (
        <ItemContainer
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('DetailHotelScreen', {
              id: 1,
              hotelId: hotelId,
              price: getMinPrice(prices),
            });
          }}>
          <ViewRow>
            {/* Hotel image */}
            <Image
              style={styles.hotelImage}
              source={{
                uri: hotel.image,
              }}
            />
            <ItemContent>
              {/* Hotel name */}
              <Text style={styles.headText}>{hotel.hotelName}</Text>
              {/* Star */}
              <ViewRow>
                {hotel.star.map((e, i) => {
                  return <Icon key={i} name={e} size={15} color={GOLD_COLOR} />;
                })}
              </ViewRow>
              {/* Address */}
              <ViewRow>
                <Icon
                  name="map-marker"
                  size={12}
                  color={DARK_GRAY}
                  style={{marginTop: 8}}
                />
                <Text style={styles.addressText}>{hotel.address}</Text>
              </ViewRow>

              {/* Hotel price  */}
              <ViewRow style={{marginTop: 70}}>
                <Text style={{fontSize: 13, fontWeight: 'bold', color: ORANGE}}>
                  {' '}
                  {VND} {getMinPrice(prices)}
                </Text>
                {/* )} */}
                <Text style={styles.contentText}>{UNIT}</Text>
              </ViewRow>
              <Text style={styles.contentText}>{HOTEL_TEXT}</Text>
            </ItemContent>
          </ViewRow>
        </ItemContainer>
      )}
    </>
  );
};

//lấy giá min giữa các room của hotel
function getMinPrice(prices) {
  let min = 0;
  if (prices.length === 1) {
    min = prices[0];
  }
  if (prices.length > 1) {
    min = prices[0];
    prices.forEach(e => {
      if (+e <= +min) {
        min = e;
      }
    });
  }
  return min;
}

const ItemContainer = styled.TouchableOpacity`
  background-color: ${WHITE};
  border-radius: 8px;
  margin: 5px 10px;
`;
const ItemContent = styled.View`
  margin-top: 8px;
  margin-left: 5px;
`;
const ViewRow = styled.View`
  flex-direction: row;
`;
const styles = StyleSheet.create({
  hotelImage: {
    width: 120,
    height: 200,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  starIcon: {
    backgroundColor: GOLD_COLOR,
  },
  headText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contentText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: '90%',
    width: '100%',
    marginLeft: 5,
  },
  addressText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: '90%',
    width: '100%',
    marginLeft: 5,
    marginTop: 5,
  },
  priceText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: '90%',
    width: '100%',
    marginLeft: 5,
    marginTop: 60,
    textDecorationLine: 'line-through',
  },
});

export default Hotel;
