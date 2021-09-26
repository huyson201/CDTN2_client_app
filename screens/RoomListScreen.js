import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { BLUE1 } from "../src/values/color";
import styled from 'styled-components';
import Icon from "react-native-vector-icons/FontAwesome5";

const RoomListScreen = function () {
  return (
    <ScrollView>
      <View style={roomStyles.header}>
        {/* <View>
          <Text style={roomStyles.headerTextName}>Hotel's Name</Text>
          <Text style={roomStyles.headerTextAddress}>Hotel's Address</Text>
        </View>

        <Icon name="bookmark" size={20} /> */}

        <ViewRow>
          <Text style={roomStyles.headerTextName}>Hotel's Name</Text>
          <Text style={roomStyles.headerTextName}>Hotel's Name</Text>
          <Text style={roomStyles.headerTextName}>Hotel's Name</Text>
          {/* <TouchableOpacity activeOpacity={0.5}>
              <View style={{ flexDirection: "row", marginLeft: 12 }}>
                <Icon
                  name={"map-marked-alt"}
                  size={SEARCH_ICON_SIZE}
                  color={BLUE1}
                />
                <LabelSearch
                  style={homeStyles.mapString}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {SEARCH_MAP_STRING}
                </LabelSearch>
              </View>
            </TouchableOpacity> */}
          {/* <Button
              title={SEARCH_BTN_STRING}
              buttonStyle={homeStyles.searchBtn}
            /> */}
        </ViewRow>
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
    height: 40,
    backgroundColor: BLUE1,
    justifyContent: "center",
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
    position: "absolute",
  },
});

export default RoomListScreen;
