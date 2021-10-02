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
export const LIGHT_GRAY = '#F2F2F2';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../src/values/size';
import { BLUE1, WHITE, BLUE2, GOLD_COLOR, DARK_GRAY } from '../src/values/color';
import { VND, CHECK, HOTEL_NAME, HOTEL_ADDRESS, CONTENT } from "../src/values/constants";
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Ionicons';
import Comment from '../src/components/hotel/Comment';
import Utilities from '../src/components/hotel/Utilities';

const DetailHotelScreen = ({ navigation }) => {
    return (
        <ScrollView>
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
                    <Icon name="share-alt" size={25} color={BLUE2}></Icon>
                </ViewRow>
                {/* Border box, star rating */}
                <ViewRow1>
                    <View style={styles.borderBox}>
                        <Text style={styles.borderBoxText}>Khách sạn</Text>
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <ViewRow1>
                            <Icon name="star" size={15} color={GOLD_COLOR} />
                            <Icon name="star" size={15} color={GOLD_COLOR} />
                            <Icon name="star" size={15} color={GOLD_COLOR} />
                            <Icon name="star" size={15} color={GOLD_COLOR} />
                            <Icon name="star" size={15} color={GOLD_COLOR} />
                        </ViewRow1>
                    </View>
                </ViewRow1>

                <ViewRow1>
                    <Icon name="map-marker" size={20} color={DARK_GRAY} style={{ marginTop: 5 }} />
                    <Text style={styles.addressText}>{HOTEL_ADDRESS}</Text>
                </ViewRow1>

                <ViewRow1 style={{ marginTop: 10, borderBottomWidth: 2, borderColor: DARK_GRAY, paddingBottom: 15 }}>
                    <Icon name="check-square-o" size={15} color={BLUE1} style={{ marginTop: 5 }} />
                    <Text style={{ fontSize: 12, marginLeft: 2 }}>{CHECK}</Text>
                    <Text style={{ fontSize: 12, marginLeft: 55, fontWeight: 'bold', color: BLUE2 }}>{CONTENT}</Text>
                </ViewRow1>
            </View>
            <Comment />
            <Utilities/>
        </ScrollView>
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
