import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { STATUS_INVOICE } from '../../values/constants';
import { ORANGE } from '../../values/color';
import hotelApi from '../../../api/hotelApi';

const OrderedRoomItem = (props) => {
    const [name, setName] = useState()

    const handleDetailRoom = () => {
        console.log("press Detail");
    }

    const getCreateDate = dateIn => {
        const result = new Date(dateIn);
        return result.getDate() + '/' + result.getMonth();
    }

    useEffect(() => {
        const getNameHotel = async () => {
            try {
                const res = await hotelApi.getHotelById(props.item.hotel_id)
                if (res.data.data) {
                    setName(res.data.data.hotel_name)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getNameHotel()
    }, [])

    return (
        <TouchableOpacity
            onPress={handleDetailRoom}
            style={ListRoomsOrderedStyle.listItemStyle}>
            <View style={ListRoomsOrderedStyle.itemBoDyText}>
                <Text
                    style={ListRoomsOrderedStyle.itemFont_HotelName}
                    numberOfLines={1}>
                    Khách sạn: {name}
                </Text>
                <Text
                    style={ListRoomsOrderedStyle.itemFont}
                    numberOfLines={1}>
                    Phòng số: {props.item.room_id}
                </Text>
                <Text
                    style={[ListRoomsOrderedStyle.itemFont]}
                    numberOfLines={2}>
                    Ngày Đặt Phòng:{' '}
                    <Text>
                        {' '}
                        {getCreateDate(props.item.p_date)}
                    </Text>
                </Text>
                <Text
                    style={[ListRoomsOrderedStyle.itemFont]}
                    numberOfLines={1}>
                    Chi phí:<Text style={{ color: "green" }}> {props.item.price}Đ</Text>
                </Text>
                <Text
                    style={[ListRoomsOrderedStyle.itemFont]}
                    numberOfLines={1}>
                    Trạng thái đơn:{' '}
                    <Text
                        style={{ color: ORANGE }}>
                        {' '}
                        {Object.values(STATUS_INVOICE[props.item.status])}
                    </Text>
                </Text>
            </View>
            {/* <ItemSeparatorView /> */}
        </TouchableOpacity>
    );
};

const ListRoomsOrderedStyle = StyleSheet.create({
    listItemStyle: {
        borderBottomColor: "#000",
        borderBottomWidth: 1
    },
    itemBoDyText: {
        paddingHorizontal: 10,
        margin:10
    },
    itemBoDyImg: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 10,
        minWidth: 110,
        minHeight: 110,
        maxWidth: 110,
        maxHeight: 110,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#000',
        resizeMode: 'cover',
    },
    ItemSeparatorView: {
        height: 1,
        width: '100%',
        backgroundColor: '#000000',
        marginTop: 10
    },
    itemFont_HotelName: {
        color: '#104FDF',
        fontSize: 25,
        fontWeight: '600'
    },
    itemFont_HotelStar: { color: '#cfc021', fontSize: 25 },
    itemFont_id: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 0,
        marginTop: 0,
        borderWidth: 3,
        borderRadius: 20,
        paddingHorizontal: '40%',
        backgroundColor: '#808080',
        color: '#fff',
    },
    itemFont: {
        fontWeight: 'bold',
        paddingVertical: 3,
        paddingHorizontal: 5,
        fontSize: 20,
    },
});

export default OrderedRoomItem;
