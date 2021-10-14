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

const printRating = star => {
  var rating = [];
  for (let i = 0; i < star; i++) {
    rating.push(
      <Icon
        name="star"
        size={25}
        backgroundColor="#cfc021"
        color="#cfc021"></Icon>,
    );
  }
  return rating;
};
const ListRoomsOrderedScreen = function ({navigation}) {
   
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
   const handlePressUserProfile = () => {
    navigation.goBack();
  };
  // MODIFY ITEMSVIEW HERE
  const ItemView = (item, index) => {
    return (
      <TouchableOpacity 
      onPress={handlePressUserProfile}
      key={index} style={ListRoomsOrderedStyle.listItemStyle}>
        {/* <Text style={ListRoomsOrderedStyle.itemFont_id} numberOfLines={1}>
          No.{item.id}
        </Text> */}
        <View style={ListRoomsOrderedStyle.itemBody}>
          <Image
            style={ListRoomsOrderedStyle.itemBoDyImg}
            source={require('../src/images/detail_hotel_2.jpeg')}
          />
        
          <View style={ListRoomsOrderedStyle.itemBoDyText}>
            <Text
              style={ListRoomsOrderedStyle.itemFont_HotelName}
              numberOfLines={1}>
              {item.username}
            </Text>
            <Text
              style={ListRoomsOrderedStyle.itemFont_HotelStar}
              numberOfLines={1}>
              {printRating(item.id)}
            </Text>
             <Text style={ListRoomsOrderedStyle.itemFont} numberOfLines={1}>
              Total: {item.id} $
            </Text>
            <Text 

            numberOfLines={1}>
             Address:  {item.address.suite}, {item.address.city}
            </Text>
          </View>
        </View>
        <ItemSeparatorView />
      </TouchableOpacity>
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
          <View style={ListRoomsOrderedStyle.headerUserCicle}>
            <View>
              <Image
                style={ListRoomsOrderedStyle.userImg}
                source={require('../src/images/list.png')}
              />
            </View>
          </View>
        </View>
        <Container>
          {/* <View style={ListRoomsOrderedStyle.headerListItemStyle}>
            <Text style={ListRoomsOrderedStyle.textTitle}>ID                         Properties</Text>
          </View> */}
          <ItemSeparatorView />
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
    // height: 150,
    position: 'relative',
    backgroundColor: BLUE1,
    paddingTop: 5,
    paddingBottom: 25,
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
  headerUserCicle: {
    display: 'flex',
    marginHorizontal: '33%',
    marginBottom: 10,
    height: 100,
    width: 100,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  userImg: {

    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 60,
    resizeMode: 'cover',
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
    // backgroundColor: '#c9efff',
    // borderWidth: 1,
    borderRadius: 10,
    // padding: 10,
    // marginTop: 10,
  },
  itemBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  itemBoDyText: {
    flex: 2,
    flexDirection: 'column',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // marginBottom: 0,
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  itemBoDyImg: {
    flex: 1,
    // flexDirection:'column',
    marginHorizontal: 5,
    marginVertical: 10,
    minWidth: 110,
    minHeight: 110,
    maxWidth: 110,
    maxHeight: 110,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    resizeMode: 'cover',
  },
  ItemSeparatorView: {
    height: 1,
    width: '100%',
    backgroundColor: '#000000',
  },
  itemFont_HotelName: {
    color: '#104FDF',
    fontSize: 25,
  },
  itemFont_HotelStar: {color: '#cfc021', fontSize: 25},
  itemFont_id: {
    fontSize: 20,
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
