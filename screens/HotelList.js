import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import styled from "styled-components";
import { DARK_GRAY, WHITE, ORANGE, GOLD_COLOR } from "../src/values/color";
import { HOTEL_NAME, HOTEL_ADDRESS, HOTEL_PRICE, VND, HOTEL_PRICE_SALE, UNIT, HOTEL_TEXT } from "../src/values/constants";
// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const hotelData = [

]

for (let i = 0; i < 5; i++) {
    hotelData.push({
        id: i,
        name: HOTEL_NAME,
        address: HOTEL_ADDRESS,
        price: HOTEL_PRICE,
        price_sale: HOTEL_PRICE_SALE,
    })
}
const HotelList = function () {
    const renderItem = function ({ item }) {
        return (
            <ItemContainer>
                <ViewRow>
                    {/* Hotel image */}
                    <Image
                        style={styles.hotelImage}
                        source={require('../src/images/the_cap_hotel.jpeg')} />
                    <ItemContent>
                        {/* Hotel name */}
                        <Text style={styles.headText}>{item.name}</Text>
                        {/* Star */}
                        <ViewRow>
                            {/* <Image
                                style={styles.starImage}
                                source={require('../../images/star1.png')} /> */}
                            <Icon name="star" size={15} color={GOLD_COLOR}/>
                            <Icon name="star" size={15} color={GOLD_COLOR}/>
                            <Icon name="star" size={15} />
                            <Icon name="star" size={15} />
                        </ViewRow>
                        {/* Address */}
                        <ViewRow>
                            <Icon name="map-marker" size={12} color={DARK_GRAY} style={{ marginTop: 8}} />
                            <Text style={styles.addressText}>{item.address}</Text>
                        </ViewRow>
                        {/* Hotel price */}
                        <Text style={styles.priceText}>{VND}   {item.price}</Text>
                        {/* Hotel price sale */}
                        <ViewRow>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: ORANGE }}> {VND}  {item.price_sale}</Text>
                            <Text style={styles.contentText}>{UNIT}</Text>
                        </ViewRow>
                        {/* Giá cuối cùng! */}
                        <Text style={styles.contentText}>{HOTEL_TEXT}</Text>
                    </ItemContent>
                </ViewRow>
            </ItemContainer>

        )
    }
    return (
        <View>
            <FlatList
                style={{ marginTop: 5 }}
                data={hotelData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const ItemContainer = styled.TouchableOpacity`
    background-color: ${WHITE};
    border-radius: 8px;
    margin: 5px 10px;
`
const ItemContent = styled.View`
    margin-top: 8px;
    margin-left: 5px;
`
const ViewRow = styled.View`
    flex-direction: row;
`;

const styles = StyleSheet.create({
    hotelImage: {
        width: 120,
        height: 200,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    starIcon: {
        backgroundColor: GOLD_COLOR,
    },
    headText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    contentText: {
        fontSize: 11,
        color: DARK_GRAY,
        maxWidth: "90%",
        width: "100%",
        marginLeft: 5,
    },
    addressText: {
        fontSize: 11,
        color: DARK_GRAY,
        maxWidth: "90%",
        width: "100%",
        marginLeft: 5,
        marginTop: 5,
    },
    priceText: {
        fontSize: 11,
        color: DARK_GRAY,
        maxWidth: "90%",
        width: "100%",
        marginLeft: 5,
        marginTop: 60,
        textDecorationLine: "line-through"
    },
})

export default HotelList;