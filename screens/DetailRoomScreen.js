import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styled from "styled-components";
import { BLUE1, DARK_GRAY, ORANGE_LIGHT } from "../src/values/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../src/values/size";
import { Button } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";
import DetailPriceModal from "../src/components/hotel/DetailPriceModal";
import { db } from "../cf_firebase/ConfigFireBase";
import { ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { convertDateToVNDate } from "../src/utilFunction";

const DetailRoomScreen = ({ navigation, route }) => {
  const detailRoom = ref(
    db,
    "hotels/" + route.params.hotelId + "/rooms/" + route.params.id
  );

  const [dataDetailRoom, setDataDetailRoom] = useState({
    roomName: "",
    adult: 0,
    children: 0,
    price: 0,
    desc: "",
    beds: 0,
    area: 0,
    status: 0,
    sale: 0,
    images: [],
    services: [],
  });

  // date state
  const date = useSelector((state) => state.search.date);
  let dateForRoom = date.dateString;
  let numberNight = date.numDate;
  // number night
  let receivedDate = convertDateToVNDate(date.receivedDate);
  let payDate = convertDateToVNDate(date.payDate);

  useEffect(() => {
    setDataDetailRoom({ services: [], images: [] });
    onValue(detailRoom, (snapshot) => {
      const data = snapshot.val();
      setDataDetailRoom({
        roomName: data.name,
        adult: data.adult,
        children: data.children,
        price: data.price,
        desc: data.roomDesc,
        beds: data.beds,
        area: data.area,
        status: data.status,
        sale: route.params.sale,
        images: data.images.split(","),
        services: data.services.split(","),
      });
    });
  }, []);
  const taxes = 50000;
  const bottomPopupRef = useRef();
  const handlePress = () => {
    bottomPopupRef.current.show();
  };
  let sum = sumPrice(
    dataDetailRoom.price,
    dataDetailRoom.sale,
    taxes,
    numberNight
  );

  let sumPre = dataDetailRoom.price * numberNight + taxes;
  const handleBooking = () => {
    navigation.navigate("Invoice", {
      id: route.params.id,
      data: dataDetailRoom,
      hotelName: route.params.hotelName,
      receivedDate: receivedDate,
      payDate: payDate,
      taxes: taxes,
      sum: sum,
    });
  };
  return (
    <View>
      <ScrollView>
        <View>
          <SliderBox
            images={dataDetailRoom.images}
            style={styles.img}
            parentWidth={DEVICE_WIDTH}
            paginationBoxVerticalPadding={5}
            dotStyle={{ width: 7, height: 7, marginHorizontal: -5 }}
            imageLoadingColor={"#fff"}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.nameRoom}>{dataDetailRoom.roomName}</Text>
          <View style={styles.description}>
            <ViewRow style={{ marginBottom: 20 }}>
              <ViewRow>
                <Icon name="users" size={18} color={BLUE1}></Icon>
                <View style={{ marginLeft: 5 }}>
                  <Text style={styles.title}>Khách</Text>
                  <Text style={{ fontSize: 11 }}>
                    {dataDetailRoom.adult + dataDetailRoom.children} người/1
                    phòng
                  </Text>
                </View>
              </ViewRow>
              <ViewRow>
                <Icon name="ruler" size={18} color={BLUE1}></Icon>
                <View style={{ marginLeft: 5 }}>
                  <Text style={styles.title}>Kích thước phòng</Text>
                  <Text style={{ fontSize: 11 }}>{dataDetailRoom.area} m2</Text>
                </View>
              </ViewRow>
            </ViewRow>
            <ViewRow>
              <ViewRow>
                <Icon name="bed" size={18} color={BLUE1}></Icon>
                <View style={{ marginLeft: 5 }}>
                  <Text style={styles.title}>Loại giường</Text>
                  <Text style={{ fontSize: 11 }}>
                    {dataDetailRoom.beds == 2 ? "Giường đôi" : "Giường đơn"}
                  </Text>
                </View>
              </ViewRow>
            </ViewRow>
          </View>
          <ViewRow style={styles.description}>
            <Text style={styles.title}>Tình trạng phòng: </Text>
            <View>
              <Text style={{ fontSize: 13 }}>
                {" "}
                {dataDetailRoom.status >= 1 ? "Còn phòng" : "Hết phòng"}
              </Text>
            </View>
          </ViewRow>
          <View style={styles.description}>
            <Text style={styles.title}>Dịch vụ phòng</Text>
            {dataDetailRoom.services.map((e) => {
              return (
                <ViewRow
                  key={Math.random(dataDetailRoom.services.length)}
                  style={{ justifyContent: "flex-start" }}
                >
                  <EntypoIcon
                    key={Math.random(dataDetailRoom.services.length)}
                    name="dot-single"
                  ></EntypoIcon>
                  <Text key={Math.random(dataDetailRoom.services.length)}>
                    {e}
                  </Text>
                </ViewRow>
              );
            })}
          </View>
          <View style={styles.change}>
            <Text style={styles.title}>Đổi lịch và huỷ phòng</Text>
            <Text>Không áp dụng đổi lịch</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.priceInfor}
        activeOpacity={1}
        onPress={handlePress}
      >
        <View>
          <ViewRow style={{ justifyContent: "flex-start" }}>
            <Icon
              style={{ paddingBottom: 3 }}
              color={BLUE1}
              name="chevron-up"
            ></Icon>
            <Text style={{ fontSize: 12, paddingBottom: 2, marginLeft: 3 }}>
              {`Tổng giá tiền cho ${dateForRoom} - ${numberNight} đêm - 1 phòng`}
            </Text>
          </ViewRow>
          <ViewRow>
            {/*  ? ( */}
            <View>
              {dataDetailRoom.sale != null && dataDetailRoom.sale != "" ? (
                <Text style={styles.priceSale}>VND {sumPre}</Text>
              ) : (
                <Text></Text>
              )}
              <Text style={styles.price}>VND {sum}</Text>
            </View>

            <Button
              buttonStyle={styles.button}
              title={"Chọn"}
              onPress={handleBooking}
            />
          </ViewRow>
        </View>
      </TouchableOpacity>
      <DetailPriceModal
        ref={bottomPopupRef}
        data={dataDetailRoom}
        id={route.params.id}
        taxes={50000}
        date={dateForRoom}
        numberNight={numberNight}
        sum={sum}
        sumPre={sumPre}
        hotelName={route.params.hotelName}
        receivedDate={receivedDate}
        payDate={payDate}
        navigation={navigation}
      ></DetailPriceModal>
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const styles = StyleSheet.create({
  priceInfor: {
    zIndex: 999,
    width: DEVICE_WIDTH,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderColor: "rgba(158, 150, 150, .5)",
    paddingVertical: 8,
    backgroundColor: "white",
  },
  priceSale: {
    color: DARK_GRAY,
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  price: {
    fontWeight: "500",
    fontSize: 17,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  nameRoom: {
    fontWeight: "600",
    fontSize: 19,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "rgba(158, 150, 150, .5)",
  },
  description: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "rgba(158, 150, 150, .5)",
  },
  change: {
    height: 200,
    paddingVertical: 16,
  },
  wrapper: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  container: {
    flex: 1,
  },
  img: {
    height: 200,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    fontSize: 10,
    padding: 0,
    backgroundColor: ORANGE_LIGHT,
    width: 100,
    height: 30,
  },
});
export default DetailRoomScreen;
