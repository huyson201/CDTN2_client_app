import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import styled from "styled-components";
import { DARK_GRAY, WHITE, ORANGE, GOLD_COLOR } from "../src/values/color";
import { VND, UNIT, HOTEL_TEXT } from "../src/values/constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "../cf_firebase/ConfigFireBase";
import { ref, onValue } from "firebase/database";
import { xoaDau } from "../src/utilFunction";
import { useSelector } from "react-redux";
import axios from "axios"

const HotelList = function ({ navigation }) {
  const [listData, setListData] = useState([]);
  const searchData = useSelector((state) => state.search);
  const starCountRef = ref(db, "hotels");

  // get data from firebase
  useEffect(() => {
    setListData([]);
    // let data = [];
    let searchAddress = searchData.address;
    let fromDate = searchData.date.receivedDate.replace('/', '-')
    let toDate = searchData.date.payDate.replace('/', '-')
    let arrStar = searchData.filter.rankStars;
    let maxPrice = searchData.filter.maxPrice;
    let minPrice = searchData.filter.minPrice;
    let { children, adults, rooms } = searchData.personsAndRooms

    // onValue(starCountRef, (snapshot) => {
    //   data = snapshot.val();
    //   data = Object.values(data);
    //   data = filterAddress(data, searchAddress);
    //   data = filterStar(data, arrStar);
    //   data = filterPrice(data, maxPrice, minPrice);
    //   setListData([...data]);
    // });

    let query = `filter?address=${searchAddress}&from=${fromDate}T12:00:00&to=${toDate}T12:00:00&room=${rooms}&adult=${adults}`;
    if (arrStar.length > 0) query += `&star=${arrStar}`
    if (maxPrice && minPrice) query += `&min=${minPrice}&max=${maxPrice}`

    async function filterData() {
      try {
        let res = await axios({
          method: 'get',
          url: "http://192.168.1.10:3000/" + query
        })

        let data = res.data.data
        setListData([...data]);
        console.log(res)
        console.log(listData)
      } catch (error) {
        console.log(error.response)
      }

    }
    filterData()
  }, []);

  //   render item in flat list
  const renderItem = function ({ item, index }) {
    if (listData.length === 0) return
    let itemSale = null;
    let prices = item.rooms;

    if (item.hotel_sale && item.hotel_sale !== "") {
      itemSale = (
        <Text style={{ fontSize: 13, fontWeight: "bold", color: ORANGE }} key={item.priceSale}>
          {" "}
          {VND} {getMinPrice(prices) - getMinPrice(prices) * item.sale}
        </Text>
      );
    }

    return (
      <ItemContainer
        activeOpacity={0.9}
        key={item.id}
        onPress={() => {
          navigation.navigate("DetailHotelScreen", {
            id: 1,
            hotelId: item.hotel,
            price: getMinPrice(prices),
          });
        }}
      >
        <ViewRow>
          {/* Hotel image */}
          <Image
            style={styles.hotelImage}
            source={{ uri: item.hotel_img }}
          />
          <ItemContent>
            <Column >
              <View>
                {/* Hotel name */}
                <Text style={styles.headText}>{item.hotel_name}</Text>
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
                  <Text style={styles.addressText}>{item.hotel_address}</Text>
                </ViewRow>
                {/*  hotel desc*/}
                <Text numberOfLines={3} ellipsizeMode='tail' style={styles.hotelDesc}>
                  {item.hotel_desc}
                </Text>
              </View>
              <View>
                {/* Hotel price */}
                <Text style={styles.priceText}>
                  {itemSale != null ? `${VND} ${getMinPrice(prices)}` : ``}
                </Text>

                {/* Hotel price sale */}
                <ViewRow>
                  {itemSale != null ? (
                    itemSale
                  ) : (
                    <Text
                      style={{ fontSize: 13, fontWeight: "bold", color: ORANGE }}
                    >
                      {" "}
                      {VND} {getMinPrice(prices)}
                    </Text>
                  )}
                  <Text style={styles.contentText}>{UNIT}</Text>
                </ViewRow>
                <Text style={styles.contentText}>{HOTEL_TEXT}</Text>
              </View>
            </Column>
          </ItemContent>
        </ViewRow>
      </ItemContainer>
    );
  };

  return (
    <View>
      <FlatList
        style={{ marginTop: 5 }}
        data={listData}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Hotel
                key={item.hotel_id}
                hotelId={item.hotel_id}
                priceSale={5000000}
                sale={0.5}
                navigation={navigation}
              />
            </View>
          );
        }}
      />
    </View>
  );
};


function removePrefixAddress(address) {
  let str = address.replace('xa', '');
  str = str.replace('huyen', '');
  str = str.replace('tinh', '');
  str = str.replace('thanh pho', '');
  str = str.replace('duong', '');

  return str;
}

//lấy giá min giữa các room của hotel
function getMinPrice(prices) {

  let min = prices[0].room_price;
  prices.forEach((e) => {
    if (min >= e.room_price) {
      min = e.room_price;
    }
  });
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
  max-height: 200px;
  padding-bottom: 10px;
`;

const Column = styled.View`
  flex-direction:column;
  height: 100%;
  justify-content: space-between;
`
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
  hotelDesc: {
    fontSize: 11,
    color: DARK_GRAY,
    marginLeft: 5,
  },
  priceText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: "90%",
    width: "100%",
    marginLeft: 5,
    textDecorationLine: "line-through",
  },
});

export default HotelList;
