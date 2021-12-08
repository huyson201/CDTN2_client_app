import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import invoiceApi from './../api/invoiceApi';
import OrderedRoomItem from '../src/components/hotel/OrderedRoomItem';

const ListRoomsOrderedScreen = function ({ navigation }) {
  const user = useSelector(state => state.user.currentUser);
  const [dataSource, setDataSouce] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const res = await invoiceApi.getInvoiceByUser(user.user_uuid, token);
      if (res.data.data) {
        setDataSouce(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <FlatList
        style={{ marginTop: 5 }}
        data={dataSource}
        renderItem={({ item, index }) => {
          return (
            <OrderedRoomItem key={index} item={item} />
          );
        }}
      />
    </View>
  );
};

export default ListRoomsOrderedScreen;
