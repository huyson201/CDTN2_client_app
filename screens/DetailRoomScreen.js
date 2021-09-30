import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styled from 'styled-components';
import {BLUE1} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../src/values/size';
const imgs = [
  'https://cdn.galaxy.tf/unit-media/tc-default/uploads/images/room_photo/001/579/602/dlx3-standard.jpg',
  'https://cdn.galaxy.tf/unit-media/tc-default/uploads/images/room_photo/001/579/602/dlx3-standard.jpg',
  'https://cdn.galaxy.tf/unit-media/tc-default/uploads/images/room_photo/001/579/602/dlx3-standard.jpg',
];
const DetailRoomScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View>
        <ScrollView
          onScroll={e => onchange(e)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal>
          {imgs.map((e, i) => (
            <Image
              style={styles.img}
              key={i}
              resizeMode="stretch"
              source={{uri: e}}></Image>
          ))}
        </ScrollView>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.nameRoom}>Deluxe Double</Text>
        <View style={styles.description}>
          <ViewRow style={{marginBottom: 20}}>
            <ViewRow>
              <Icon name="users" size={20} color={BLUE1}></Icon>
              <View style={{marginLeft: 5}}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>Khách</Text>
                <Text>2 khách/1 phòng</Text>
              </View>
            </ViewRow>
            <ViewRow>
              <Icon name="ruler" size={20} color={BLUE1}></Icon>
              <View style={{marginLeft: 5}}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>
                  Kích thước phòng
                </Text>
                <Text>70.0 m2</Text>
              </View>
            </ViewRow>
          </ViewRow>
          <ViewRow>
            <ViewRow>
              <Icon name="bed" size={20} color={BLUE1}></Icon>
              <View style={{marginLeft: 5}}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>
                  Loại giường
                </Text>
                <Text>Giường đôi</Text>
              </View>
            </ViewRow>
          </ViewRow>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>Tiện nghi phòng</Text>
          <View style={{paddingLeft: 10}}>
            <Text>Tủ lạnh</Text>
            <Text>Máy lạnh</Text>
            <Text>TV</Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>Đổi lịch và huỷ phòng</Text>
          <Text>Không áp dụng đổi lịch</Text>
        </View>
        <TouchableOpacity>
        <View style={styles.price}>
          <ViewRow>
            <Icon name="chevron-up"></Icon>
            <Text>Tổng giá tiền cho 29 - 30/9/2021 - 1 phòng - 1 đêm</Text>
            <Text>VND 2.722.000</Text>
          </ViewRow>
        </View>
        </TouchableOpacity>
       
      </View>
    </ScrollView>
  );
};
const ViewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const styles = StyleSheet.create({
  price: {},
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  nameRoom: {
    fontWeight: '600',
    fontSize: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(158, 150, 150, .5)',
  },
  description: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(158, 150, 150, .5)',
  },
  wrapper: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  container: {
    flex: 1,
  },
  img: {
    width: DEVICE_WIDTH,
    height: 200,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
export default DetailRoomScreen;
