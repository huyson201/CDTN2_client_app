import React, {useRef} from 'react';
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
import {BLUE1, DARK_GRAY, ORANGE_LIGHT} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../src/values/size';
import {Button} from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
const imgs = [
  'https://cdn.galaxy.tf/unit-media/tc-default/uploads/images/room_photo/001/579/602/dlx3-standard.jpg',
  'https://cdn.galaxy.tf/unit-media/tc-default/uploads/images/room_photo/001/579/602/dlx3-standard.jpg',
  'https://cdn.galaxy.tf/unit-media/tc-default/uploads/images/room_photo/001/579/602/dlx3-standard.jpg',
];
import DetailPriceModal from '../src/components/hotel/DetailPriceModal';
const DetailRoomScreen = ({navigation}) => {
  const bottomPopupRef = useRef();
  const test = () => {};
  const handlePress = () => {
    bottomPopupRef.current.show();
  };
  return (
    <ScrollView>
      <View>
      <SliderBox
        images={imgs}
        style={styles.img}
        parentWidth={DEVICE_WIDTH}
        paginationBoxVerticalPadding={5}
        dotStyle={{ width: 7, height: 7, marginHorizontal: -5 }}
        imageLoadingColor={"#fff"}
      />
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
          <Text style={styles.title}>Tình trạng phòng</Text>
          <View>
            <Text>Còn phòng</Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>Dịch vụ phòng</Text>
          <View >
            <ViewRow style={{justifyContent:'flex-start'}}>
              <EntypoIcon name="dot-single"></EntypoIcon>
              <Text>Tủ lạnh</Text>
            </ViewRow>
            <ViewRow style={{justifyContent:'flex-start'}}>
              <EntypoIcon name="dot-single"></EntypoIcon>
              <Text>Máy lạnh</Text>
            </ViewRow>
            <ViewRow style={{justifyContent:'flex-start'}}>
              <EntypoIcon name="dot-single"></EntypoIcon>
              <Text>Tivi</Text>
            </ViewRow>
          </View>
        </View>
        <View style={styles.change}>
          <Text style={styles.title}>Đổi lịch và huỷ phòng</Text>
          <Text>Không áp dụng đổi lịch</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={1} onPress={handlePress}>
        <View style={styles.priceInfor}>
          <ViewRow style={{justifyContent: 'flex-start'}}>
            <Icon
              style={{paddingBottom: 3}}
              color={BLUE1}
              name="chevron-up"></Icon>
            <Text style={{fontSize: 12, paddingBottom: 2, marginLeft: 3}}>
              Tổng giá tiền cho 29 - 30/9/2021 - 1 phòng - 1 đêm
            </Text>
          </ViewRow>
          <ViewRow>
            <View>
              <Text style={styles.priceSale}>VND 1.088.000</Text>
              <Text style={styles.price}>VND 4.088.000</Text>
            </View>
            <Button buttonStyle={styles.button} title={'Chọn'} />
          </ViewRow>
        </View>
      </TouchableOpacity>
      <DetailPriceModal ref={bottomPopupRef}></DetailPriceModal>
    </ScrollView>
  );
};
const ViewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const styles = StyleSheet.create({
  priceInfor: {
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderColor: 'rgba(158, 150, 150, .5)',
    marginTop: 16,
    paddingVertical: 8,
  },
  priceSale: {
    color: DARK_GRAY,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: '500',
    fontSize: 17,
  },
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
  change: {
    paddingVertical: 16,
  },
  wrapper: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  container: {
    flex: 1,
  },
  img: {
    height: 200,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    fontSize: 10,
    padding: 0,
    backgroundColor: ORANGE_LIGHT,
    width: 100,
    height: 30,
  },
});
export default DetailRoomScreen;
