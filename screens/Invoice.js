import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from "react-native";
import styled from "styled-components";
import { BLUE1, DARK_GRAY, LIGHT_GRAY, ORANGE } from "../src/values/color";
import {
  CONFIRM_BTN,
  CONTACT_INFO,
  DETAIL_PRICE,
  SMALL_TEXT_TITLE,
  SUM_PRICE_SRT,
} from "../src/values/constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import { convertDateToVNDate, formatCurrency } from "../src/utilFunction";
import { Button } from "react-native-elements";
import hotelApi from "../api/hotelApi";
import { useDispatch, useSelector } from "react-redux";
import invoiceApi from "../api/invoiceApi";
import { isJwtExpired } from 'jwt-check-expiration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from "../api/userApi";
import jwtDecode from "jwt-decode";
import { setCurrentUser, setToken } from "../action_creators/user";

const Invoice = (props) => {
  const [data, setData] = useState({
    roomName: "",
    beds: 0,
    people: 0,
    status: 0
  })
  const [showDetailPrice, setShowDetailPrice] = useState(false);
  let detailPrice = null;
  let sumPriceRoom = (props.route.params.sum) - (props.route.params.taxes);
  const { currentUser, token } = useSelector(state => state.user);
  const dispatch = useDispatch()
  // date state
  const date = useSelector((state) => state.search.date);
  // number night
  let receivedDate = convertDateToVNDate(date.receivedDate);
  let payDate = convertDateToVNDate(date.payDate);

  const getUser = async (token) => {
    if (token && isJwtExpired(token) === false) {
      const userId = jwtDecode(token)
      console.log(userId.user_uuid, "userid");
      try {
        const res = await userApi.getUserById(token, userId.user_uuid)
        console.log(res.data);
        if (res.data.data) {
          dispatch(setCurrentUser(res.data.data))
          console.log(res.data.data);
        }
      } catch (error) {
        console.log(error, "error luc get user");
      }
    } else {
      refresh()
    }
  }
  
  const refresh = async () => {
    try {
      await AsyncStorage.getItem('refresh_token').then(value => {
        if (value != null && isJwtExpired(value) == false) {
          userApi.refreshToken(value).then(res => {
            console.log("da refresh thanh cong");
            dispatch(setToken(res.data.token))
            setTokenLocal(res.data.token)
          }).catch(error => console.log(error))
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getRoomById = async () => {
    try {
      if (props.route.params.id) {
        const res = await hotelApi.getRoomById(props.route.params.id);
        !res.data.error
          ? setData({
            roomName: res.data.data.room_name,
            beds: res.data.data.room_beds,
            people: res.data.data.room_num_people,
            status: res.data.data.room_quantity ? res.data.data.room_quantity : 0,
          })
          : setData([{ message: 'Khong co du lieu phong' }]);
      } else {
        console.log("Khong co id phong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (showDetailPrice) {
    detailPrice = (
      <DetailPrice>
        <RowView style={{ ...styles.space, paddingTop: 15, paddingBottom: 15 }}>
          <Text>(x1) {data.roomName}</Text>
          <Text>{formatCurrency(sumPriceRoom, "VND")}</Text>
        </RowView>
        <RowView style={{ ...styles.space, paddingTop: 15, paddingBottom: 15 }}>
          <Text>Phí khách sạn</Text>
          <Text>{formatCurrency(props.route.params.taxes, "VND")}</Text>
        </RowView>
      </DetailPrice>
    );
  }

  const setTokenLocal = async (token) => {
    try {
      await AsyncStorage.setItem('token', token).then(value => {
        console.log(value, "token");
      })
    } catch (error) {
      console.log(error);
    }
  }


  const handlePressShowDetailPrice = () => {
    setShowDetailPrice(!showDetailPrice);
  };

  useEffect(() => {
    getUser(token)
    getRoomById();
  }, [token]);

  const handlePressConfirm = async () => {
    try {
      if (token && isJwtExpired(token) == false) {
        let jsonData = {
          token: token,
          price: props.route.params.sum,
          hotelId: props.route.params.hotelId,
          rDate: date.receivedDate,
          pDate: date.payDate,
          roomId: props.route.params.id,
          roomQty: data.status,
          status: "Chưa xác nhận"
        }
        invoiceApi.create(jsonData)
          .then((res) => {
            console.log(res.data.message);
          }).catch(err => console.log(err))
      } else if (token != null && isJwtExpired(token) == true) {
        refresh()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "rgba(0,0,0,.05)" }}>
      <MainBackground>
        <Text style={styles.textWhite}>{SMALL_TEXT_TITLE}</Text>
        <InvoiceBox>
          <View>
            <RowView style={styles.paddingDefault}>
              <Icon name="hotel" size={16} color={BLUE1} />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.textCap}
              >
                {props.route.params.hotelName}
              </Text>
            </RowView>
            <View style={styles.dateBox}>
              <RowView>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.receivedText}
                >
                  Nhận phòng
                </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.receivedDate}
                >
                  {receivedDate} (14:00)
                </Text>
              </RowView>
              <RowView style={styles.mTop}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.receivedText}
                >
                  Trả phòng
                </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.receivedDate}
                >
                  {payDate} (12:00)
                </Text>
              </RowView>
            </View>
            <View style={styles.paddingDefault}>
              <Text style={styles.roomTitle}>
                (2x) {data.roomName}
              </Text>
              <Text style={styles.roomInfo}>
                1 giường (x{data.beds})
              </Text>
              <Text style={styles.roomInfo}>
                {/* {props.route.params.data.people +
                  props.route.params.data.children}{" "} */}
                {data.people}
                khách/phòng
              </Text>
            </View>
          </View>
          <View
            style={{ ...styles.paddingDefault, backgroundColor: LIGHT_GRAY }}
          >
            <RowView>
              <Icon name="list-alt" size={16} color={"rgba(0,0,0,.6)"} />
              <Text style={styles.textCondition}>Không hoàn tiền</Text>
            </RowView>
            <RowView>
              <Icon name="list-alt" size={16} color={"rgba(0,0,0,.6)"} />
              <Text style={styles.textCondition}>
                Không thể thay đổi lịch trình
              </Text>
            </RowView>
          </View>
        </InvoiceBox>
      </MainBackground>
      <InfoBox>
        <Text style={styles.textCap}>{CONTACT_INFO}</Text>
        <InvoiceBox style={{ ...styles.paddingDefault, ...styles.mTop }}>
          <Text style={styles.textName}>{currentUser.user_name}</Text>
          <Text style={styles.textInfo}>Email: {currentUser.user_email}</Text>
          <Text style={styles.textInfo}>Phone: {currentUser.user_phone}</Text>
        </InvoiceBox>
      </InfoBox>

      <View>
        <Text style={{ ...styles.textCap, ...styles.paddingDefault }}>
          {DETAIL_PRICE}
        </Text>
        <TouchableNativeFeedback onPress={handlePressShowDetailPrice}>
          <RowView
            style={{
              ...styles.paddingDefault,
              backgroundColor: "#fff",
              ...styles.space,
            }}
          >
            <RowView>
              <Icon
                name={showDetailPrice ? "angle-up" : "angle-down"}
                size={16}
                color={BLUE1}
              />
              <Text style={styles.sumPriceString}>{SUM_PRICE_SRT}</Text>
            </RowView>
            <Text style={styles.priceStyle}>
              {formatCurrency(props.route.params.sum, "VND")}
            </Text>
          </RowView>
        </TouchableNativeFeedback>
        {detailPrice}
      </View>

      <View style={styles.paddingDefault}>
        <Button
          onPress={handlePressConfirm}
          title={CONFIRM_BTN}
          buttonStyle={{
            backgroundColor: ORANGE,
            paddingTop: 15,
            paddingBottom: 15,
            marginTop: 12,
            marginBottom: 12,
          }}
        />
      </View>
    </ScrollView>
  );
};
const MainBackground = styled.View`
  padding: 15px 15px 32px 15px;
  background-color: ${BLUE1};
`;

const InvoiceBox = styled.View`
  background-color: #fff;
  border-radius: 8px;
`;

const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const InfoBox = styled.View`
  padding: 22px 15px;
`;
const DetailPrice = styled.View`
  padding: 15px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${LIGHT_GRAY};
  border-style: solid;
  background-color: #fff;
`;
const styles = StyleSheet.create({
  textWhite: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  textCap: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  dateBox: {
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomColor: LIGHT_GRAY,
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  receivedText: {
    width: "30%",
    marginRight: "10%",
  },
  receivedDate: {
    width: "70%",
  },
  mTop: {
    marginTop: 8,
  },
  paddingDefault: {
    padding: 15,
  },
  roomTitle: {
    fontWeight: "bold",
  },
  roomInfo: {
    color: DARK_GRAY,
    marginTop: 4,
  },
  textCondition: {
    color: DARK_GRAY,
    marginLeft: 6,
  },
  textName: {
    fontSize: 18,
    textTransform: "capitalize",
  },
  textInfo: {
    color: DARK_GRAY,
  },
  space: {
    justifyContent: "space-between",
  },
  priceStyle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sumPriceString: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Invoice;
