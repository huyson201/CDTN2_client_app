import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Picker,
  Image,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1, DARK_GRAY, MAP_MARKER} from '../src/values/color';
import {SEARCH_ICON_SIZE, SEARCH_TEXT_SIZE} from '../src/values/size';
import {Button} from 'react-native-elements';
import History from '../src/components/home/History';
import About from '../src/components/home/About';

const ListRoomsOrderedScreen = function () {
  const [dataSource, setDataSouce] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  // MODIFY DATASOUCE HERE
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(responseJson => {
        setDataSouce(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };
  // MODIFY ITEMSVIEW HERE
  const ItemView = (item, index) => {
    return (
      <View key={index} style={ListRoomsOrderedStyle.listItemStyle}>
        <Text style={ListRoomsOrderedStyle.itemFont_id} numberOfLines={1}>
          No.{item.id}
        </Text>
        <View style={ListRoomsOrderedStyle.itemBody}>
          <Image
            style={ListRoomsOrderedStyle.itemBoDyImg}
            source={require('../src/images/detail_hotel_2.jpeg')}
          />
          <Text style={ListRoomsOrderedStyle.itemBoDyText}>
            <Text style={ListRoomsOrderedStyle.itemFont} numberOfLines={1}>
              <Text
                style={ListRoomsOrderedStyle.itemFont_HotelName}
                numberOfLines={1}>
                {item.username} Hotel {item.id}{' '}
                <Icon
                  // style={ListRoomsOrderedStyle.icon}
                  name="star"
                  size={20}
                  backgroundColor="#F0FF00"
                  color="#05375a"></Icon>
              </Text>
            </Text>
          </Text>
        </View>
        <Text style={ListRoomsOrderedStyle.itemFont} numberOfLines={1}>
          <Text
            style={ListRoomsOrderedStyle.itemFont_HotelName}
            numberOfLines={1}>
            {/* {item.username} */}
          </Text>
        </Text>

        <Text style={ListRoomsOrderedStyle.itemFont} numberOfLines={1}>
          {item.address.suite}
        </Text>
        <Text style={ListRoomsOrderedStyle.itemFont} numberOfLines={1}>
          {item.address.city}
        </Text>
        <Button
          title="Detail"
          buttonStyle={ListRoomsOrderedStyle.toPropertiesItemBtn}></Button>
        <ItemSeparatorView />
      </View>
    );
  };
  // MODIFY cái cây màu đen nằm giữa các ITEMS
  const ItemSeparatorView = () => {
    return <View style={ListRoomsOrderedStyle.ItemSeparatorView} />;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* HEADER */}
        <View style={ListRoomsOrderedStyle.header}>
          <View style={ListRoomsOrderedStyle.headerListItemStyle}>
            <Text style={ListRoomsOrderedStyle.textTitle}>ID Properties</Text>
          </View>
          {/* <Title style={ListRoomsOrderedStyle.headerText}>
            LIST ROOMS HAVE BEEN ORDERED
          </Title> */}
        </View>
        <Container>
          {/* <View style={ListRoomsOrderedStyle.headerListItemStyle}>
            <Text style={ListRoomsOrderedStyle.textTitle}>ID                         Properties</Text>
          </View> */}
          <ScrollView>{dataSource.map(ItemView)}</ScrollView>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const Title = styled.Text`
  color: #fff;
`;

const Container = styled.View`
  padding: 0 15px;
  width: 100%;
`;
const ListRoomsOrderedStyle = StyleSheet.create({
  container: {},
  header: {
    height: 150,
    backgroundColor: BLUE1,
    padding: 15,
    color: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    fontSize: 20,
  },
  textTitle: {
    fontSize: 20,
    marginLeft: 20,
  },
  headerListItemStyle: {
    backgroundColor: '#cfcfcf',
    borderWidth: 2,
    borderColor: '#f96700',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
  },
  listItemStyle: {
    backgroundColor: '#c9efff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  itemBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  itemBoDyText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 0,
    marginTop: '5%',
  },
  itemBoDyImg: {
    marginHorizontal: 10,
    marginVertical: 20,
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    resizeMode: 'cover',
  },
  // ItemSeparatorView: {
  //   height: 0.5,
  //   width: '100%',
  //   backgroundColor: '#000000',
  // },
  itemFont_HotelName: {
    color: '#104FDF',
    fontSize: 25,
  },
  itemFont_id: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 0,
    marginTop: 0,
    borderWidth: 3,
    borderRadius: 20,
    paddingHorizontal: '40%',
    // paddingVertical: '3%',
    backgroundColor: '#808080',
    color: '#fff',
  },
  itemFont: {
    padding: 10,
    fontSize: 20,
  },
  toPropertiesItemBtn: {
    height: 35,
    borderRadius: 50,
  },
});

export default ListRoomsOrderedScreen;
