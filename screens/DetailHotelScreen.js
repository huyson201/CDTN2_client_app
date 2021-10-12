import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import styled from "styled-components";
import { DEVICE_WIDTH } from "../src/values/size";
import {
  BLUE1,
  BLUE2,
  GOLD_COLOR,
  DARK_GRAY,
  ORANGE,
  LIGHT_GRAY,
} from "../src/values/color";
import { VND, CHECK, CONTENT } from "../src/values/constants";
import Icon1 from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/Feather";
import Icon4 from "react-native-vector-icons/Octicons";
import Comment from "../src/components/hotel/Comment";
import Utilities from "../src/components/hotel/Utilities";
import { db } from "../cf_firebase/ConfigFireBase";
import { ref, onValue } from "firebase/database";
import { SliderBox } from "react-native-image-slider-box";

const DetailHotelScreen = ({ navigation, route }) => {
  const hotel = ref(db, "hotels/" + route.params.hotelId);
  const [dataHotel, setDataHotel] = useState({
    hotelId: 0,
    name: "",
    address: "",
    price: 0,
    desc: "",
    star: [],
    phone: "",
    sale: "",
    images: [],
  });

  useEffect(() => {
    setDataHotel({ images: [] });
    onValue(hotel, (snapshot) => {
      const data = snapshot.val();
      let number = [];
      number.length = data.star;
      for (let i = 0; i < number.length; i++) {
        number[i] = "star";
      }

      setDataHotel({
        hotelId: data.hotel,
        name: data.name,
        address: data.address,
        price: route.params.price,
        desc: data.desc,
        star: number,
        phone: data.phone,
        sale: data.sale,
        images: data.image.split(","),
      });
    });
  }, []);

  return (
    <View>
      <ScrollView style={{ marginBottom: 80 }}>
        <View>
          <SliderBox
            key={Math.random()}
            images={dataHotel.images}
            paginationBoxVerticalPadding={5}
            dotStyle={{ width: 7, height: 7, marginHorizontal: -5 }}
            imageLoadingColor={"#fff"}
          />
        </View>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          {/* Hotel name */}
          <ViewRow>
            <Text style={styles.headText}>{dataHotel.name}</Text>
            <TouchableOpacity>
              <Icon2
                name="share-social-outline"
                size={25}
                color={BLUE2}
              ></Icon2>
            </TouchableOpacity>
          </ViewRow>
          {/* Border box, star rating */}
          <ViewRow1>
            <View style={styles.borderBox}>
              <Text style={styles.borderBoxText}>Khách sạn</Text>
            </View>
            <View style={{ marginLeft: 5 }}>
              <ViewRow1>
                {dataHotel.star.map((e) => {
                  return (
                    <Icon1
                      key={Math.random(dataHotel.star.length)}
                      name={e}
                      size={15}
                      color={GOLD_COLOR}
                    />
                  );
                })}
              </ViewRow1>
            </View>
          </ViewRow1>
          {/* Address */}
          <ViewRow1>
            <Icon3
              name="map-pin"
              size={15}
              color={DARK_GRAY}
              style={{ marginTop: 5 }}
            />
            {/* {HOTEL_ADDRESS} */}
            <Text style={styles.addressText}>{dataHotel.address}</Text>
          </ViewRow1>
          {/*  */}
          <ViewRow1
            style={{
              marginTop: 10,
              borderBottomWidth: 2,
              borderColor: DARK_GRAY,
              paddingBottom: 20,
            }}
          >
            <Icon4
              name="checklist"
              size={15}
              color={BLUE1}
              style={{ marginTop: 5 }}
            />
            <Text style={{ fontSize: 12, marginLeft: 2 }}>{CHECK}</Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 55,
                  fontWeight: "bold",
                  color: BLUE2,
                }}
              >
                {CONTENT}
              </Text>
            </TouchableOpacity>
          </ViewRow1>
        </View>
        {/* Comment */}
        <Comment />
        {/* Tiện nghi chung */}
        <Utilities />
        {/* Giờ nhận phòng/trả phòng */}
        <View style={styles.borderBottom}>
          <Text style={styles.headText}>Giờ nhận phòng/trả phòng</Text>
          <ViewRow style={{ marginTop: 15 }}>
            <Text>Giờ nhận phòng</Text>
            <Text style={{ fontWeight: "bold" }}>từ 14:00</Text>
          </ViewRow>
          <ViewRow style={{ marginTop: 10 }}>
            <Text>Giờ trả phòng</Text>
            <Text style={{ fontWeight: "bold" }}>trước 12:00</Text>
          </ViewRow>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <Text style={styles.headText}>Mô tả</Text>
          {/* {DESSRIPTION_HOTEL} */}
          <Text
            style={styles.contentText}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {dataHotel.desc}
          </Text>
          <View
            style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}
          >
            <TouchableOpacity
              onPress={() => {
                alert("xem tat ca");
              }}
            >
              <Text style={{ fontSize: 13, color: BLUE2, fontWeight: "bold" }}>
                XEM CHI TIẾT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <Text style={styles.contentText}>Giá/phòng/đêm từ</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: ORANGE }}>
            {VND}{" "}
            {dataHotel.sale != null && dataHotel.sale != ""
              ? dataHotel.price - dataHotel.price * dataHotel.sale
              : dataHotel.price}
          </Text>
          <Text style={{ fontSize: 11, fontWeight: "bold", color: DARK_GRAY }}>
            Giá cuối cùng
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("RoomListScreen", {
                id: "h1",
                hotelId: dataHotel.hotelId,
                hotelName: dataHotel.name,
                hotelAddress: dataHotel.address,
                sale: dataHotel.sale,
              });
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Chọn Phòng
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const ViewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ViewRow1 = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;
const styles = StyleSheet.create({
  headText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 8,
  },
  borderBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: BLUE1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  borderBoxText: {
    fontSize: 11,
    color: BLUE1,
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 12,
    maxWidth: "90%",
    width: "100%",
    marginLeft: 5,
    marginTop: 5,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: DARK_GRAY,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 14,
    color: DARK_GRAY,
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: LIGHT_GRAY,
    flexDirection: "row",
    height: 90,
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    backgroundColor: ORANGE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  // description: {
  //     paddingVertical: 16,
  //     borderBottomWidth: 1,
  //     borderColor: 'rgba(158, 150, 150, .5)',
  // },
  img: {
    width: DEVICE_WIDTH,
    height: 240,
  },
});
export default DetailHotelScreen;
