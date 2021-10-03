import React, {forwardRef, useState, useImperativeHandle} from 'react';
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import styled from 'styled-components';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {BLUE1, DARK_GRAY, ORANGE_LIGHT} from '../../values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../../values/size';
const DetailPriceModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const close = () => {
    setShow(false);
  };
  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
  }));
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={close}>
      <TouchableWithoutFeedback onPress={close}>
        <TransparentView>
          <Title>Chi tiết giá </Title>
        </TransparentView>
      </TouchableWithoutFeedback>
      <Content>
        <ViewRow>
          <Text>Ngày</Text>
          <DetailText>4-5 tháng 10 2021</DetailText>
        </ViewRow>
        <ViewRow style={{marginBottom: 20}}>
          <Text>Số phòng</Text>
          <DetailText>2 phòng</DetailText>
        </ViewRow>
        <ViewRow>
          <Text>Giá mỗi đêm</Text>
          <DetailText style={{color: ORANGE_LIGHT}}>VND 1.088.000</DetailText>
        </ViewRow>
        <ViewRow>
          <Text>Tổng giá tiền cho 1 đêm</Text>
          <DetailText>VND 1.088.000</DetailText>
        </ViewRow>
        <ViewRow>
          <Text>Thuế và phí</Text>
          <Text style={{paddingBottom:5}}>VND 550.000</Text>
        </ViewRow>
      </Content>
      <TouchableOpacity
        style={{backgroundColor: 'white'}}
        activeOpacity={1}
        onPress={close}>
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
    </Modal>
  );
});
const DetailText = styled.Text`
  padding-bottom: 5px;
  font-weight: 500;
`;
const Title = styled.Text`
  color: #fff;
  position: absolute;
  bottom: 8px;
  left: 10px;
  font-weight: 500;
`;

const Content = styled.View`
  background-color: #fff;
  padding: 15px;
`;
const TransparentView = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;
`;
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
    paddingVertical: 5,
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

  button: {
    fontSize: 10,
    padding: 0,
    backgroundColor: ORANGE_LIGHT,
    width: 100,
    height: 30,
  },
});
export default DetailPriceModal;
