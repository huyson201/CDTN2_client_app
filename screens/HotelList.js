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

const HotelList = function ({ navigation }) {
  const [listData, setListData] = useState([]);
  const searchData = useSelector((state) => state.search);
  const starCountRef = ref(db, "hotels");

  // get data from firebase
  useEffect(() => {
    let data = [];
    let searchAddress = searchData.address;
    let arrStar = searchData.filter.rankStars;
    // let maxPrice = searchData.filter.maxPrice;
    // let minPrice = searchData.filter.minPrice;

    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
      data = Object.values(data);

      data = filterAddress(data, searchAddress);
      data = filterStar(data, arrStar);
      // data = filterPrice(data, maxPrice, minPrice);
      setListData([...data]);
    });
  }, []);

  //   render item in flat list
  const renderItem = function ({ item, index }) {
    let itemSale = null;
    if (item.priceSale != " " && item.priceSale != null) {
      itemSale = (
        <Text style={{ fontSize: 13, fontWeight: "bold", color: ORANGE }}>
          {" "}
          {VND} {item.priceSale}
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
          });
        }}
      >
        <ViewRow key={item.id}>
          {/* Hotel image */}
          <Image
            style={styles.hotelImage}
            source={{ uri: item.image.split(",")[0] }}
          />
          <ItemContent>
            {/* Hotel name */}
            <Text style={styles.headText}>{item.name}</Text>
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
              <Text style={styles.addressText}>{item.address}</Text>
            </ViewRow>

            {/* Hotel price */}
            <Text style={styles.priceText}>
              {itemSale != null ? `${VND} ${item.price}` : ``}
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
                  {VND} {item.price}
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

  return (
    <View>
      <FlatList
        style={{ marginTop: 5 }}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const filterStar = (data, arrStars) => {
  if (arrStars.length === 0) return data;
  return data.filter((el) => {
    if (arrStars.includes(el.star)) return el;
  });
};

// filter Price

function filterPrice(data, max, min) {
  if (max == min && max == 10000000) {
    let nData = data.filter((el) => {
      let rooms = el.rooms;
      for (let key in rooms) {
        if (rooms[key].price >= max) return el;
      }
    });

    return nData;
  }

  let nData = data.filter((el) => {
    let rooms = el.rooms;
    for (const key in rooms) {
      if (rooms[key].price >= min && rooms[key].price <= max) return el;
    }
  });

  return nData;
}

// filter function
function filterAddress(data, searchAddress) {
  let xoaDauAddress = xoaDau(searchAddress).toLowerCase();
  xoaDauAddress = removePrefixAddress(xoaDauAddress);

  let newData = data.filter((el) => {
    let arrAddress = xoaDauAddress.split(",");
    let address = xoaDau(el.address).toLowerCase();
    for (let i = arrAddress.length - 1; i >= 0; i--) {
      if (address.indexOf(arrAddress[i]) !== -1) {
        return el;
      }
    }
  });

  return newData;
}

function removePrefixAddress(address) {
  let str = address.replace("xa", "");
  str = str.replace("huyen", "");
  str = str.replace("tinh", "");
  str = str.replace("thanh pho", "");
  str = str.replace("duong", "");

  return str;
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

export default HotelList;
