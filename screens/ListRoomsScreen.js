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
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1, DARK_GRAY, MAP_MARKER} from '../src/values/color';
import {SEARCH_ICON_SIZE, SEARCH_TEXT_SIZE} from '../src/values/size';
import {Button} from 'react-native-elements';
import History from '../src/components/home/History';
import About from '../src/components/home/About';

const ListRoomsScreen = function () {
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
      <View key={index} style={ListRoomsScreenStyle.listItemStyle}>
        <Text style={ListRoomsScreenStyle.itemFont} numberOfLines={1}>
          {item.id} : {item.name}
        </Text>
         <Text style={ListRoomsScreenStyle.itemFont} numberOfLines={1}>
          {item.email}
        </Text>
          <Button title="Detail" buttonStyle={ListRoomsScreenStyle.toPropertiesItemBtn}></Button>
        <ItemSeparatorView />
      </View>
    );
  };
  // MODIFY cái cây màu đen nằm giữa các ITEMS
  const ItemSeparatorView = () => {
    return <View style={ListRoomsScreenStyle.ItemSeparatorView} />;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* HEADER */}
        <View style={ListRoomsScreenStyle.header}>
          <Title style={ListRoomsScreenStyle.headerText}>
            LIST ROOMS
          </Title>
        </View>
        <Container>
          <View style={ListRoomsScreenStyle.headerListItemStyle}>
            <Text style={ListRoomsScreenStyle.textTitle}>ID                         Properties</Text>
          </View>
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
const ListRoomsScreenStyle = StyleSheet.create({
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
    marginTop:10,
    padding:10,
    borderRadius:20,

    
  },
  listItemStyle: {
    backgroundColor: "#c9efff",
    borderWidth: 1,
    borderRadius:10,
    padding: 10,
    marginTop: 10,
  },
  // ItemSeparatorView: {
  //   height: 0.5,
  //   width: '100%',
  //   backgroundColor: '#000000',
  // },
  itemFont: {
    padding: 10,
    fontSize: 20,
  },
  toPropertiesItemBtn:{
    height:35,
    borderRadius:50,
  },
});

export default ListRoomsScreen;
