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
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../src/values/size';
import { BLUE1, WHITE, BLUE2, GOLD_COLOR, DARK_GRAY, ORANGE, LIGHT_GRAY } from '../src/values/color';
import { VND, CHECK, HOTEL_NAME, HOTEL_ADDRESS, CONTENT, DESSRIPTION_HOTEL } from "../src/values/constants";
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/Octicons';
import Comment from '../src/components/hotel/Comment';
import Utilities from '../src/components/hotel/Utilities';

const DetailHotelScreen = ({ navigation }) => {
    return (
        <View>
            <ScrollView style={{ marginBottom: 80 }}>
                <View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal>
                        <Image style={styles.img} source={require('../src/images/detail_hotel_1.jpg')}></Image>
                        <Image style={styles.img} source={require('../src/images/the_cap_hotel.jpeg')}></Image>
                        <Image style={styles.img} source={require('../src/images/detail_hotel_2.jpeg')}></Image>
                        <Image style={styles.img} source={require('../src/images/detail_hotel_3.jpeg')}></Image>
                    </ScrollView>
                </View>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    {/* Hotel name */}
                    <ViewRow>
                        <Text style={styles.headText}>{HOTEL_NAME}</Text>
                        <TouchableOpacity>
                            <Icon2 name="share-social-outline" size={25} color={BLUE2}></Icon2>
                        </TouchableOpacity>
                    </ViewRow>
                    {/* Border box, star rating */}
                    <ViewRow1>
                        <View style={styles.borderBox}>
                            <Text style={styles.borderBoxText}>Khách sạn</Text>
                        </View>
                        <View style={{ marginLeft: 5 }}>
                            <ViewRow1>
                                <Icon1 name="star" size={15} color={GOLD_COLOR} />
                                <Icon1 name="star" size={15} color={GOLD_COLOR} />
                                <Icon1 name="star" size={15} color={GOLD_COLOR} />
                                <Icon1 name="star" size={15} color={GOLD_COLOR} />
                                <Icon1 name="star" size={15} color={GOLD_COLOR} />
                            </ViewRow1>
                        </View>
                    </ViewRow1>
                    {/* Address */}
                    <ViewRow1>
                        <Icon3 name="map-pin" size={15} color={DARK_GRAY} style={{ marginTop: 5 }} />
                        <Text style={styles.addressText}>{HOTEL_ADDRESS}</Text>
                    </ViewRow1>
                    {/*  */}
                    <ViewRow1 style={{ marginTop: 10, borderBottomWidth: 2, borderColor: DARK_GRAY, paddingBottom: 20 }}>
                        <Icon4 name="checklist" size={15} color={BLUE1} style={{ marginTop: 5 }} />
                        <Text style={{ fontSize: 12, marginLeft: 2 }}>{CHECK}</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 12, marginLeft: 55, fontWeight: 'bold', color: BLUE2 }}>{CONTENT}</Text>
                        </TouchableOpacity>
                    </ViewRow1>
                </View>
                {/* Comment */}
                <Comment />
                {/* Tiện nghi chung */}
                <Utilities />
                {/* Giờ nhận phòng/trả phòng */}
                <View style={styles.borderBottom}>
                    <Text style={styles.headText}>Giờ nhận phòng/trả phòng</Text>
                    <ViewRow style={{ marginTop: 15 }}>
                        <Text >Giờ nhận phòng</Text>
                        <Text style={{ fontWeight: 'bold' }}>từ 14:00</Text>
                    </ViewRow>
                    <ViewRow style={{ marginTop: 10 }}>
                        <Text >Giờ trả phòng</Text>
                        <Text style={{ fontWeight: 'bold' }}>trước 12:00</Text>
                    </ViewRow>
                </View>

                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <Text style={styles.headText}>Mô tả</Text>
                    <Text style={styles.contentText}>{DESSRIPTION_HOTEL}</Text>
                    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 13, color: BLUE2, fontWeight: 'bold' }}>XEM CHI TIẾT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {/* Footer */}
            <View style={styles.footer}>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <Text style={styles.contentText}>Giá/phòng/đêm từ</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: ORANGE }}>{VND}  3.000.000</Text>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: DARK_GRAY }}>Giá cuối cùng</Text>
                </View>
                <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Chọn Phòng</Text>
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
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 8,
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
        maxWidth: "90%",
        width: "100%",
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
        // maxWidth: "90%",
        // width: "100%",
        // marginLeft: 5,
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
        justifyContent: 'space-between'
    },
    button: {
        padding: 10,
        backgroundColor: ORANGE,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff'
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
