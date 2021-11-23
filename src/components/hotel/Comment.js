import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { BLUE1, BLUE2, DARK_GRAY, LIGHT_GRAY } from '../../values/color';
import {
    COMMENT_STRING,
    COMMENT,
    USERNAME,
} from '../../values/constants';
import Rating from '../rate/Rating'
import hotelApi from '../../../api/hotelApi'

const commentData = [];

for (let i = 0; i < 3; i++) {
    commentData.push({
        id: i,
        comment: COMMENT,
        userName: USERNAME,
    });
}

const Comment = function ({ navigation, hotelId, hotelName, }) {
    const [rating, setRating] = useState()

    const renderItem = function ({ item }) {
        let userInfo = item.user_info
        let userName = userInfo !== null ? userInfo.user_name : 'NaN'
        // let userImage = userInfo !== null && userInfo.user_img ? userInfo.user_img : `https://ui-avatars.com/api/?name=${userName}&size=256`
        console.log(userInfo)
        return (
            <ItemContainer>
                <ItemContent>
                    <Text numberOfLines={3} ellipsizeMode='tail' style={styles.contentText}>{item.rate_comment}</Text>
                    {/* <TouchableOpacity>
                        <Text style={{ color: BLUE2, fontSize: 12 }}>Xem thêm</Text>
                    </TouchableOpacity> */}
                    {/* <ViewRow> */}
                    <Text style={styles.username}>{userName}</Text>
                    {/* </ViewRow> */}
                </ItemContent>
            </ItemContainer>
        );
    };

    const handleClickShowAll = () => {
        navigation.navigate('ListRatingScreen', {
            hotelId: hotelId,
            hotelName: hotelName
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                const res = await hotelApi.getRates(hotelId, {
                    limit: 5,
                    offset: 0,
                    sort: 'updatedAt:desc'
                })
                console.log(res.data.data)
                setRating(res.data.data)
            } catch (error) {
                console.log(error)
            }
        });
        return unsubscribe
    }, [navigation])

    if (!rating) {
        return <View></View>
    }

    return (
        <View>
            <View style={styles.hisHeader}>
                <Text style={styles.headText}>{COMMENT_STRING}</Text>
            </View>
            <View>
                <View style={styles.ratingStar}>
                    <View>
                        <Text style={styles.ratingText}>{(+rating.rating).toFixed(1)}</Text>
                        <View style={{ width: 80 }}>
                            <Rating readOnly defaultValue={(+rating.rating).toFixed(1)} size={10} key={(+rating.rating).toFixed(1)} />
                        </View>
                    </View>
                </View>

            </View>

            <FlatList
                style={{ marginTop: 10 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={rating.rows}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <View style={styles.borderBottom}>
                <TouchableOpacity onPress={handleClickShowAll}>
                    <Text style={{ fontSize: 12, color: BLUE2, fontWeight: 'bold' }}>XEM TOÀN BỘ ĐÁNH GIÁ</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const ItemContainer = styled.View`
  padding: 15px;
  background-color: rgba(0,0,0,.05);
  min-width: 220px;
  border-radius: 8px;
  marginLeft: 20px;
  marginTop: 8px;
`;
const ItemContent = styled.View`
  margin-top: 3px;
`;

const styles = StyleSheet.create({
    hisHeader: {
        paddingLeft: 18,
        paddingRight: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
    },
    contentText: {
        fontSize: 13,
        width: '100%',
    },
    username: {
        fontSize: 11,
        color: DARK_GRAY,
        justifyContent: 'flex-end',
    },
    borderBottom: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: DARK_GRAY,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 20,
        paddingTop: 20,
    },
    ratingStar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,
        paddingRight: 18,
        marginTop: 8
    },
    ratingText: {
        fontSize: 45,
        marginRight: 12,
        textAlign: 'center'
    }
});

export default Comment;
