import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components";
import { db } from "../cf_firebase/ConfigFireBase";
import { ref, onValue } from "firebase/database";
import { xoaDau } from "../src/utilFunction";
import { useSelector } from "react-redux";
import Hotel from "../src/components/hotel/Hotel";

const HotelList = function ({ navigation }) {
  // get data from firebase
  const [listData, setListData] = useState([]);
  const searchData = useSelector((state) => state.search);
  const starCountRef = ref(db, "hotels");
  // get data from firebase
  useEffect(() => {
    setListData([]);
    let data = [];
    let searchAddress = searchData.address;
    // let arrStar = searchData.filter.rankStars;
    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
      data = Object.values(data);
      data = filterAddress(data, searchAddress);
      setListData([...data]);
    });
  }, []);

  return (
    <View>
      <FlatList
        style={{ marginTop: 5 }}
        data={listData}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Hotel
                key={Math.random()}
                hotelId={item.hotel}
                hotelName={item.name}
                priceSale={item.priceSale}
                sale={item.sale}
                images={item.image}
                address={item.address}
                navigation={navigation}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const filterStar = (data, arrStars) => {
  if (arrStars.length === 0) return data;
  return data.filter((el) => {
    if (arrStars.includes(el.star)) return el;
  });
};

// filter Price

function filterPrice(data, max, min) {
  if (max == min && max == 10000000) {
    let nData = data.filter((el) => {
      let rooms = el.rooms;
      for (let key in rooms) {
        if (rooms[key].price >= max) return el;
      }
    });

    return nData;
  }

  let nData = data.filter((el) => {
    let rooms = el.rooms;
    for (const key in rooms) {
      if (rooms[key].price >= min && rooms[key].price <= max) return el;
    }
  });

  return nData;
}

// filter function
function filterAddress(data, searchAddress) {
  let xoaDauAddress = xoaDau(searchAddress).toLowerCase();
  xoaDauAddress = removePrefixAddress(xoaDauAddress);

  let newData = data.filter((el) => {
    let arrAddress = xoaDauAddress.split(",");
    let address = xoaDau(el.address).toLowerCase();
    for (let i = arrAddress.length - 1; i >= 0; i--) {
      if (address.indexOf(arrAddress[i]) !== -1) {
        return el;
      }
    }
  });

  return newData;
}

function removePrefixAddress(address) {
  let str = address.replace("xa", "");
  str = str.replace("huyen", "");
  str = str.replace("tinh", "");
  str = str.replace("thanh pho", "");
  str = str.replace("duong", "");

  return str;
}
export default HotelList;
