import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { BLUE1, LIGHT_GRAY } from "../src/values/color";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/AntDesign";
import Room from "../src/components/hotel/Room";
import { dataRoom } from "../src/values/constants";

const RoomListScreen = function ({ navigation }) {

  const [iconBookmarkState, setIconBookmarkState] = useState({ check: false });
  const [iconHeartState, setIconHeartState] = useState({ check: false });

  const handleBack = () => {
    // navigation.goBack();
    alert("go back")
  };

  const handleIconBookmark = () => {
    if (iconBookmarkState.check == false) {
      setIconBookmarkState({
        check: true,
      });
    } else {
      setIconBookmarkState({
        check: false,
      });
    }
  };

  const handleIconHeart = () => {
    if (iconHeartState.check == false) {
      setIconHeartState({
        check: true,
      });
    } else {
      setIconHeartState({
        check: false,
      });
    }
  };

  const handleMenu=()=>{
    alert("Menu");
  }
  return (
    <View style={{ flex: 1 }}>
      <ViewRow style={[roomStyles.header, roomStyles.horizontal]}>
        <TouchableOpacity onPress={handleBack}>
          <Icon3
            style={[roomStyles.icon, roomStyles.opacity]}
            name="arrowleft"
            size={20}
          />
        </TouchableOpacity>
        <View style={{ paddingLeft: 15 }}>
          <Text style={roomStyles.headerTextName}>Hotel's Name</Text>
          <Text style={roomStyles.headerTextAddress}>Hotel's Address</Text>
        </View>
        <View style={roomStyles.horizontal}>
          <TouchableOpacity onPress={handleIconBookmark}>
            {iconBookmarkState.check == false ? (
              <Icon2
                style={roomStyles.icon}
                name="bookmark-outline"
                size={20}
              />
            ) : (
              <Icon2 style={roomStyles.icon} name="bookmark" size={20} />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleIconHeart}>
            {iconHeartState.check == false ? (
              <Icon2 style={roomStyles.icon} name="heart-outline" size={20} />
            ) : (
              <Icon2 style={roomStyles.icon} name="heart" size={20} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleMenu}>
          <Icon2 style={roomStyles.icon} name="dots-vertical" size={20} />
          </TouchableOpacity>
        </View>
      </ViewRow>
      <FlatList
        style={roomStyles.marginScrollView}
        data={dataRoom}
        renderItem={({ item }) => {
          return (
            <View>
              <Room
                key={item.id}
                name={item.name}
                price={item.price}
                adult={item.adult}
                children={item.children}
                status={item.status}
                images={item.image}
                navigation={navigation}
              />
            </View>
          );
        }}
      />
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
    paddingLeft: 15,
    color: LIGHT_GRAY,
  },
  horizontal: {
    flexDirection: "row",
    paddingRight: 10,
  },
  marginScrollView: {
    flex: 2,
  },
});

export default RoomListScreen;
