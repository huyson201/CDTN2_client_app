import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  useState,
} from "react-native";
import { BLUE1, LIGHT_GRAY } from "../src/values/color";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

import Room from "../src/components/hotel/Room";

import { dataRoom, SEARCH_TITLE } from "../src/values/constants";
import {DEVICE_WIDTH,DEVICE_HEIGHT} from "../src/values/size"

const RoomListScreen = function ({ navigation }) {
  const handleBack = () => {
    navigation.navigate("Home");
  };

  return (
      <View style={{ flex: 1 }}>
        <ViewRow style={[roomStyles.header, roomStyles.horizontal]}>
          <TouchableOpacity onPress={handleBack}>
            <Icon
              style={[roomStyles.icon, roomStyles.opacity]}
              name="arrow-circle-left"
              size={20}
            />
          </TouchableOpacity>
          <View style={{ paddingLeft: 15 }}>
            <Text style={roomStyles.headerTextName}>Hotel's Name</Text>
            <Text style={roomStyles.headerTextAddress}>Hotel's Address</Text>
          </View>
          <View style={roomStyles.horizontal}>
            <Icon2 style={roomStyles.icon} name="bookmark-outline" size={20} />
            <Icon2 style={roomStyles.icon} name="heart-outline" size={20} />
            <Icon2 style={roomStyles.icon} name="dots-vertical" size={20} />
          </View>
        </ViewRow>

      <ScrollView style={roomStyles.marginScrollView}>
        {dataRoom.map((item) => (
          <View>
            <Room
              name={item.name}
              price={item.price}
              adult={item.adult}
              children={item.children}
              status={item.status}
              images={item.image}
            />
          </View>
        ))}
      </ScrollView>
      </View>
  );
};

const ViewRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const roomStyles = StyleSheet.create({
  header: {
    backgroundColor: BLUE1,
    alignItems: "center",
    flex: 0.08,
    // position: "absolute",
    // zIndex: 999,
  },
  headerTextName: {
    color: "#fff",
    fontSize: 15,
  },
  headerTextAddress: {
    color: "#fff",
    fontSize: 10,
  },
  icon: {
    marginLeft: 10,
    color: LIGHT_GRAY,
  },

  horizontal: {
    flexDirection: "row",
    paddingRight: 10,
  },
  opacity: {
    opacity: 0.8,
  },
  marginScrollView: {
    flex: 2,
  },
});

export default RoomListScreen;
