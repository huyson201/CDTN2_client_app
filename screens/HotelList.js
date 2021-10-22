import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { xoaDau } from "../src/utilFunction";
import { useSelector } from "react-redux";
import Hotel from "../src/components/hotel/Hotel";
import hotelApi from "../api/hotelApi";

const HotelList = function ({ navigation }) {
  // get data from firebase
  const [listData, setListData] = useState([]);
  const searchData = useSelector((state) => state.search);

  async function getAll() {
    const res = await hotelApi.getAll();
    return res.data.data;
  }

  // get data from firebase
  useEffect(() => {
    let filterData = [];
    let data = getAll();
    let searchAddress = searchData.address;
    data.then((res) => {
      filterData = res.rows;
      // filterData = Object.values(filterData);
      // filterData = filterAddress(filterData, searchAddress);
      // console.log(filterData);
      setListData([...filterData]);
      console.log(listData);
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
                key={item.hotel_id}
                hotelId={item.hotel_id}
                priceSale={5000000}
                sale={0.5}
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
