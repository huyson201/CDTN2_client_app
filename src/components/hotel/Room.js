import React, { useState, onLayout } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  NativeEventEmitter,
} from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon1 from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { BLUE2 } from "../../values/color";
import { SliderBox } from "react-native-image-slider-box";
// import {dataImage} from "../../values/constants"
// import onLayout from "react-native-on-layout";

const Room = function ({ name, price, adult, children, status, images }) {
  const handleBooking = () => {
    alert("you have been booked!!");
  };
  const [state, setState] = useState(0);

  const layoutWidth = (e) => {
    setState({
      width: e.nativeEvent.layout.width,
    });
  };

  return (
    <View style={[styles.view,styles.textOption]} onLayout={layoutWidth}>
      <SliderBox
        images={images}
        // onCurrentImagePressed={(index)}
        style={styles.image}
        parentWidth={state.width}
        // ImageComponentStyle={{ width: "97%", resizeMode: "stretch" }}
      />
      <ViewRow>
        <View style={styles.textContent}>
          <Text style={styles.textName}>{name}</Text>
          <Text>
            <Icon1 name="money" size={14} color="#05375a">
              {" "}
            </Icon1>
            {price}
            <Feather
              style={{ paddingTop: 10 }}
              name="dollar-sign"
              size={14}
            ></Feather>
            /đêm
          </Text>
          <Text>
            <Ionicon name="people" size={14} color="#05375a">
              {" "}
            </Ionicon>
            {adult} người lớn {children} trẻ em
          </Text>
          <Text>
            <Icon name="check" size={14} color="#05375a">
              {" "}
            </Icon>
            {status}
          </Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.8}>
            <Button
              title={"Chọn phòng"}
              color={BLUE2}
              onPress={handleBooking}
            />
          </TouchableOpacity>
          <View style={styles.rowDetail}>
            <Text style={styles.textDetail}>Room details </Text>
            <TouchableOpacity onPress={handleBooking}>
              <Icon1
                name="angle-double-right"
                size={15}
                color="#525050"
                style={styles.iconDetail}
              ></Icon1>
            </TouchableOpacity>
          </View>
        </View>
      </ViewRow>
    </View>
  );
};

const ViewRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
`;

const styles = StyleSheet.create({
  view: {
    // padding: 20,
    // paddingTop: 10,
    borderWidth: 0.5,
    backgroundColor: "#ececec",
    borderColor: "#fff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    margin: 12,
  },
  textName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "auto",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textDetail: {
    fontStyle: "italic",
    fontSize: 13,
    color: "#767676",
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    width: 50,
    height: 50,
  },
  rowDetail: {
    flexDirection: "row",
  },
  iconDetail:{
    marginTop:12
  },
  textOption:{
    fontFamily:"AnticSlab-Regular"
  }
});

export default Room;
