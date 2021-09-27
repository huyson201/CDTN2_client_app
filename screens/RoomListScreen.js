import React from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import { BLUE1, LIGHT_GRAY } from "../src/values/color";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

import RoomImage from "../src/values/1407953244000-177513283.jpg";

const RoomListScreen = function () {
  return (
    <ScrollView>
      <View>
        <ViewRow style={[roomStyles.header, roomStyles.horizontal]}>
          <Icon
            style={[roomStyles.icon, roomStyles.opacity]}
            name="arrow-circle-left"
            size={20}
          />
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
        <Image
          style={roomStyles.image}
          source={RoomImage}
          resizeMode="stretch"
        />
      </View>
      
    </ScrollView>
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
    height: 50,
    backgroundColor: BLUE1,
    alignItems: "center",
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
  image: {
    flex: 1,
    width: "auto",
    height: 200,
  },
  horizontal: {
    flexDirection: "row",
    paddingRight: 10,
  },
  opacity: {
    opacity: 0.8,
  },
});

export default RoomListScreen;
