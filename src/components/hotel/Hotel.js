import React from "react";
import { Text, StyleSheet, Image } from "react-native";
import styled from "styled-components";
import { DARK_GRAY, WHITE, ORANGE, GOLD_COLOR } from "../../values/color";
import { VND, UNIT, HOTEL_TEXT } from "../../values/constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "../../../cf_firebase/ConfigFireBase";
import { ref, onValue } from "firebase/database";

const Hotel = function ({
  navigation,
  hotelName,
  hotelId,
  sale,
  priceSale,
  images,
  address,
}) {
  let itemSale = null;
  let prices = [];
  const rooms = ref(db, "hotels/" + hotelId + "/rooms");
  onValue(rooms, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const room = childSnapshot.val();
      prices.push({
        price: room.price,
      });
    });
  });

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
          source={{ uri: images.split(",")[0] }}
        />
        <ItemContent>
          {/* Hotel name */}
          <Text style={styles.headText}>{hotelName}</Text>
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
            <Text style={styles.addressText}>{address}</Text>
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
                {VND} {getMinPrice(prices)}
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
  let min = prices[0].price;
  prices.forEach((e) => {
    if (min >= e.price) {
      min = e.price;
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
