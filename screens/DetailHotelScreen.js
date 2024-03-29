import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import {DEVICE_WIDTH} from '../src/values/size';
import {
  BLUE1,
  BLUE2,
  GOLD_COLOR,
  DARK_GRAY,
  ORANGE,
  LIGHT_GRAY,
} from '../src/values/color';
import {VND, CHECK, CONTENT} from '../src/values/constants';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/Octicons';
import Comment from '../src/components/hotel/Comment';
import Utilities from '../src/components/hotel/Utilities';
import {SliderBox} from 'react-native-image-slider-box';
import hotelApi from '../api/hotelApi';
import ratingApi from '../api/rateApi';
import {useSelector} from 'react-redux';
import RatingItem from '../src/components/rate/RatingItem';

const DetailHotelScreen = ({navigation, route}) => {
  const {user_uuid} = useSelector(state => state.user.currentUser);
  const [dataHotel, setDataHotel] = useState({
    name: '',
    address: '',
    price: 0,
    desc: '',
    star: [],
    phone: '',
    images: [],
  });

  const [userRate, setUserRate] = useState();
  const [services, setServices] = useState(null);

  const getHotelById = async hotelId => {
    try {
      const res = await hotelApi.getHotelById(hotelId);
      if (res.data.data) {
        let number = [];
        number.length = res.data.data.hotel_star;
        for (let i = 0; i < number.length; i++) {
          number[i] = 'star';
        }
        setDataHotel({
          name: res.data.data.hotel_name,
          price: route.params.price,
          images: res.data.data.hotel_slide
            ? res.data.data.hotel_slide.split(',')
            : [],
          address: res.data.data.hotel_address,
          phone: res.data.data.hotel_phone,
          desc: res.data.data.hotel_desc,
          star: number,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getServiceById = async hotelId => {
    try {
      const res = await hotelApi.getServiceById(hotelId);
      if (res.data.data) {
        setServices(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRatingOfUser = async () => {
    if (user_uuid) {
      try {
        const res = await ratingApi.getByUserAndHotel(
          user_uuid,
          route.params.hotelId,
        );
        if (res.data.data) {
          setUserRate(res.data.data.rows[0]);
          // console.log(res.data.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getHotelById(route.params.hotelId);
    getServiceById(route.params.hotelId);
  }, []);

  useEffect(() => {
    // getRatingOfUser()
    const unsubscribe = navigation.addListener('focus', getRatingOfUser);
    return unsubscribe;
  }, [navigation]);

  const handleRatingClick = () => {
    navigation.navigate('RatingScreen', {
      hotelId: route.params.hotelId,
      hotelName: dataHotel.name,
    });
  };
  const handleUpdateRatingClick = () => {
    navigation.navigate('RatingScreen', {
      hotelId: route.params.hotelId,
      hotelName: dataHotel.name,
      rate: userRate,
    });
  };

  const userRatingView = useMemo(() => {
    if (!userRate || typeof userRate !== 'object')
      return (
        <View style={{paddingTop: 10}}>
          <Text style={styles.ratingTitle}>Xếp hạng khách sạn này</Text>
          <Text style={styles.ratingHint}>
            Cho nguời khác biết suy nghĩ của bạn
          </Text>
          <TouchableOpacity onPress={handleRatingClick}>
            <Text style={styles.ratingLink}>Viết bài viết đánh giá</Text>
          </TouchableOpacity>
        </View>
      );

    return (
      <View>
        <Text style={styles.ratingTitle}>Đánh giá của bạn</Text>
        <RatingItem rateValue={userRate} />
        <TouchableOpacity onPress={handleUpdateRatingClick}>
          <Text style={styles.ratingLink}>Chỉnh sửa bài đánh giá của bạn</Text>
        </TouchableOpacity>
      </View>
    );
  }, [userRate]);
  return (
    <View>
      <ScrollView style={{marginBottom: 80}}>
        <View>
          <SliderBox
            images={
              dataHotel.images !== null && dataHotel.images
                ? dataHotel.images
                : null
            }
            paginationBoxVerticalPadding={5}
            dotStyle={{width: 7, height: 7, marginHorizontal: -5}}
            imageLoadingColor={'#fff'}
          />
        </View>
        <View style={{paddingHorizontal: 20, paddingTop: 10}}>
          {/* Hotel name */}
          <ViewRow>
            <Text style={styles.headText}>{dataHotel.name}</Text>
            <TouchableOpacity>
              <Icon2
                name="share-social-outline"
                size={25}
                color={BLUE2}></Icon2>
            </TouchableOpacity>
          </ViewRow>
          {/* Border box, star rating */}
          <ViewRow1>
            <View style={styles.borderBox}>
              <Text style={styles.borderBoxText}>Khách sạn</Text>
            </View>
            <View style={{marginLeft: 5}}>
              <ViewRow1>
                {dataHotel.star.map((e, i) => {
                  return (
                    <Icon1 key={i} name={e} size={15} color={GOLD_COLOR} />
                  );
                })}
              </ViewRow1>
            </View>
          </ViewRow1>
          {/* Address */}
          <ViewRow1>
            <Icon3
              name="map-pin"
              size={15}
              color={DARK_GRAY}
              style={{marginTop: 5}}
            />
            {/* {HOTEL_ADDRESS} */}
            <Text style={styles.addressText}>{dataHotel.address}</Text>
          </ViewRow1>
          {/*  */}
          <ViewRow1
            style={{
              marginTop: 10,
              borderBottomWidth: 2,
              borderColor: DARK_GRAY,
              paddingBottom: 20,
            }}>
            <Icon4
              name="checklist"
              size={15}
              color={BLUE1}
              style={{marginTop: 5}}
            />
            <Text style={{fontSize: 12, marginLeft: 2}}>{CHECK}</Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 55,
                  fontWeight: 'bold',
                  color: BLUE2,
                }}>
                {CONTENT}
              </Text>
            </TouchableOpacity>
          </ViewRow1>
        </View>
        {/* rating */}
        <View style={{paddingHorizontal: 20, paddingTop: 10}}>
          {userRatingView}
        </View>

        {/* Comment */}
        <Comment
          navigation={navigation}
          hotelName={dataHotel.name}
          hotelId={route.params.hotelId}
        />
        {/* Tiện nghi chung */}
        <Utilities services={services} />
        {/* Giờ nhận phòng/trả phòng */}
        <View style={styles.borderBottom}>
          <Text style={styles.headText}>Giờ nhận phòng/trả phòng</Text>
          <ViewRow style={{marginTop: 15}}>
            <Text>Giờ nhận phòng</Text>
            <Text style={{fontWeight: 'bold'}}>từ 14:00</Text>
          </ViewRow>
          <ViewRow style={{marginTop: 10}}>
            <Text>Giờ trả phòng</Text>
            <Text style={{fontWeight: 'bold'}}>trước 12:00</Text>
          </ViewRow>
        </View>

        <View style={{paddingHorizontal: 20, paddingTop: 10}}>
          <Text style={styles.headText}>Mô tả</Text>
          {/* {DESSRIPTION_HOTEL} */}
          <Text
            style={styles.contentText}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {dataHotel.desc}
          </Text>
          <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Mô tả', dataHotel.desc, [
                  {text: 'OK', onPress: () => {}},
                ]);
              }}>
              <Text style={{fontSize: 13, color: BLUE2, fontWeight: 'bold'}}>
                XEM CHI TIẾT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={{paddingHorizontal: 20, paddingTop: 10}}>
          <Text style={styles.contentText}>Giá/phòng/đêm từ</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: ORANGE}}>
            {VND} {dataHotel.price}
          </Text>
          <Text style={{fontSize: 11, fontWeight: 'bold', color: DARK_GRAY}}>
            Giá cuối cùng
          </Text>
        </View>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('RoomListScreen', {
                id: route.params.hotelId,
                hotelId: route.params.hotelId,
                hotelName: dataHotel.name,
                hotelAddress: dataHotel.address,
              });
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Chọn Phòng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const ViewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ViewRow1 = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;
const styles = StyleSheet.create({
  headText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 8,
  },
  ratingTitle: {
    fontSize: 18,
  },
  ratingHint: {
    fontSize: 13,
    color: 'rgba(0,0,0,.6)',
  },
  ratingLink: {
    color: BLUE1,
    fontWeight: 'bold',
    marginTop: 12,
  },
  borderBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: BLUE1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  borderBoxText: {
    fontSize: 11,
    color: BLUE1,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 12,
    maxWidth: '90%',
    width: '100%',
    marginLeft: 5,
    marginTop: 5,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: DARK_GRAY,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 14,
    color: DARK_GRAY,
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: LIGHT_GRAY,
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: ORANGE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  // description: {
  //     paddingVertical: 16,
  //     borderBottomWidth: 1,
  //     borderColor: 'rgba(158, 150, 150, .5)',
  // },
  img: {
    width: DEVICE_WIDTH,
    height: 240,
  },
});
export default DetailHotelScreen;
