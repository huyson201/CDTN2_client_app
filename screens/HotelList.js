import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import styled from "styled-components";
import { DARK_GRAY, WHITE, GOLD_COLOR } from "../src/values/color";
import { xoaDau } from "../src/utilFunction";
import { useSelector } from "react-redux";
import hotelApi from "../api/hotelApi";
import Hotel from "../src/components/hotel/Hotel"

const HotelList = function ({ navigation }) {
  const [listData, setListData] = useState([]);
  const searchData = useSelector((state) => state.search);

  // get data from firebase
  useEffect(() => {
    setListData([]);
    let searchAddress = removePrefixAddress(searchData.address).trim();
    let fromDate = searchData.date.receivedDate.replace(/\//g, '-')
    let toDate = searchData.date.payDate.replace(/\//g, '-')
    let arrStar = searchData.filter.rankStars;
    let maxPrice = searchData.filter.maxPrice;
    let minPrice = searchData.filter.minPrice;
    let {adults, rooms } = searchData.personsAndRooms

    let query = `filter?address=${searchAddress}&from=${fromDate}T12:00:00&to=${toDate}T12:00:00&room=${rooms}&adult=${adults}`;
    if (arrStar.length > 0) query += `&star=${arrStar}`
    if (maxPrice && minPrice) query += `&min=${minPrice}&max=${maxPrice}`
    console.log(query);

    async function filterData() {
      try {
        let res = await hotelApi.getAll(query)
        let data = res.data.data
        setListData([...data]);
        console.log(res.data)
      } catch (error) {
        console.log(error.response)
      }

    }
    filterData()
  }, []);

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
  let str = xoaDau(address)
  str = str.replace('xa', '');
  str = str.replace('huyen', '');
  str = str.replace('tinh', '');
  str = str.replace('thanh pho', '');
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
