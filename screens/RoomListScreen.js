import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { BLUE1, LIGHT_GRAY } from '../src/values/color';
import styled from 'styled-components';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Room from '../src/components/hotel/Room';
import hotelApi from '../api/hotelApi';

const RoomListScreen = function ({ navigation, route }) {
  const [data, setData] = useState([]);
  let itemData = {
    id: 0,
    roomName: '',
    price: '',
    people: 0,
    children: 0,
    status: 0,
    sale: 0,
    images: [],
  };
  // const room = ref(db, 'hotels/' + route.params.hotelId + '/rooms');

  const getAllRoomsByIdHotel = async hotelId => {
    try {
      const res = await hotelApi.getAllRoomsByIdHotel(hotelId);
      let roomData = [];
      setData([]);
      if (!res.data.error) {
        res.data.data.length !== 0
          ? res.data.data.map(e => {
            itemData = {
              id: e.room_id,
              children: 1,
              sale: route.params.sale,
            };
            roomData.push(itemData);
            setData([...roomData]);
          })
          : setData([{ message: 'Khong co du lieu phong', id: null }]);
      } else {
        console.log(res.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllRoomsByIdHotel(route.params.hotelId);
  }, []);

  const [iconBookmarkState, setIconBookmarkState] = useState({ check: false });
  const [iconHeartState, setIconHeartState] = useState({ check: false });

  const handleBack = () => {
    navigation.goBack();
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

  const handleMenu = () => {
    alert('Menu');
  };
  console.log(data);


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
          <Text style={roomStyles.headerTextName}>
            {route.params.hotelName}
          </Text>
          <Text style={roomStyles.headerTextAddress}>
            {route.params.hotelAddress}
          </Text>
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
      {data.message ? (
        <Text style={{ display: flex, justifyContent: 'center' }}>
          {data.message}
        </Text>
      ) : (
        <FlatList
          style={roomStyles.marginScrollView}
          data={data}
          renderItem={({ item }) => {
            return (
              <View>
                <Room
                  key={item.id}
                  roomId={item.id}
                  hotelId={route.params.hotelId}
                  hotelName={route.params.hotelName}
                  sale={item.sale}
                  children={item.children}
                  navigation={navigation}
                />
              </View>
            );
          }}
        />
      )}
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
    alignItems: 'center',
    flex: 0.08,
    fontFamily: 'AnticSlab-Regular',
  },
  headerTextName: {
    color: '#fff',
    fontSize: 15,
  },
  headerTextAddress: {
    color: '#fff',
    fontSize: 10,
  },
  icon: {
    paddingLeft: 15,
    color: LIGHT_GRAY,
  },
  horizontal: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  marginScrollView: {
    flex: 2,
  },
});

export default RoomListScreen;
