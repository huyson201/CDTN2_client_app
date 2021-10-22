import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import styled from "styled-components";
import { DARK_GRAY, WHITE, ORANGE, GOLD_COLOR } from "../../values/color";
import { VND, UNIT, HOTEL_TEXT } from "../../values/constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import hotelApi from "../../../api/hotelApi";

const Hotel = function ({
  navigation,
  hotelId,
  sale,
  priceSale,
}) {
  const [hotel, setHotel] = useState({
    hotelName: "",
    sale: 0.5,
    priceSale: 500000,
    images: [],
    image: "",
    address: "",
    phone: "",
    desc: "",
    star: 1,
  });
  let itemSale = null;
  let prices = [500000, 6000000, 700000];

  const getHotelById = async (hotelId) => {
    try {
      const res = await hotelApi.getHotelById(hotelId);
      if (!res.data.error) {
        setHotel({
          hotelName: res.data.data.hotel_name,
          sale: 0.5,
          priceSale: 500000,
          images: res.data.data.hotel_slide,
          image: "",
          address: res.data.data.hotel_address,
          phone: res.data.data.hotel_phone,
          desc: res.data.data.hotel_desc,
          star: res.data.data.hotel_star,
        });
      } else {
        console.log(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getAllRoomsByIdHotel = async (hotelId) => {
  //   try {
  //     const res = await hotelApi.getAllRoomsByIdHotel(hotelId);
  //     if (!res.data.error) {
  //       res.data.data.rooms.length !== 0
  //         ? res.data.data.rooms.map((e) => {
  //             prices.push(e.room_price);
  //           })
  //         : prices.push(0);
  //     } else {
  //       console.log(res.data.error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // get data from firebase
  useEffect(() => {
    prices = [];
    getHotelById(hotelId);
    // getAllRoomsByIdHotel(hotelId);
  }, []);

  if (sale != "" && sale != null) {
    itemSale = (
      <Text
        style={{ fontSize: 13, fontWeight: "bold", color: ORANGE }}
        key={priceSale}
      >
        {" "}
        {VND} {getMinPrice(prices) - getMinPrice(prices) * sale}
      </Text>
    );
  }
  return (
    <ItemContainer
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate("DetailHotelScreen", {
          id: 1,
          hotelId: hotelId,
          price: getMinPrice(prices),
        });
      }}
    >
      <ViewRow>
        {/* Hotel image */}
        <Image
          style={styles.hotelImage}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/booking-hotel-app-fbd6a.appspot.com/o/hotels%2Fdetail_hotel_1.jpg?alt=media&token=5abe59ac-e680-4392-8091-ddb0932ea46b",
          }}
        />
        <ItemContent>
          {/* Hotel name */}
          <Text style={styles.headText}>{hotel.hotelName}</Text>
          {/* Star */}
          <ViewRow>
            <Icon name="star" size={15} color={GOLD_COLOR} />
            <Icon name="star" size={15} color={GOLD_COLOR} />
            <Icon name="star" size={15} />
            <Icon name="star" size={15} />
          </ViewRow>
          {/* Address */}
          <ViewRow>
            <Icon
              name="map-marker"
              size={12}
              color={DARK_GRAY}
              style={{ marginTop: 8 }}
            />
            <Text style={styles.addressText}>{hotel.address}</Text>
          </ViewRow>

          {/* Hotel price */}
          <Text style={styles.priceText}>
            {itemSale != null ? `${VND} ${getMinPrice(prices)}` : ``}
          </Text>
          {/* Hotel price sale */}
          <ViewRow>
            {itemSale != null ? (
              itemSale
            ) : (
              <Text style={{ fontSize: 13, fontWeight: "bold", color: ORANGE }}>
                {" "}
                {VND} {console.log(getMinPrice(prices))}
              </Text>
            )}
            <Text style={styles.contentText}>{UNIT}</Text>
          </ViewRow>
          <Text style={styles.contentText}>{HOTEL_TEXT}</Text>
        </ItemContent>
      </ViewRow>
    </ItemContainer>
  );
};

//lấy giá min giữa các room của hotel
function getMinPrice(prices) {
  let min = 0;
  if (prices.length >= 1) {
    min = prices[0];
    prices.forEach((e) => {
      if (min >= e) {
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  contentText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: "90%",
    width: "100%",
    marginLeft: 5,
  },
  addressText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: "90%",
    width: "100%",
    marginLeft: 5,
    marginTop: 5,
  },
  priceText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: "90%",
    width: "100%",
    marginLeft: 5,
    marginTop: 60,
    textDecorationLine: "line-through",
  },
});

export default Hotel;
