import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import styled from 'styled-components';
import { BLUE1, BLUE2, DARK_GRAY, LIGHT_GRAY } from '../../values/color';
import {
    COMMENT_STRING,
    COMMENT,
    USERNAME,
} from '../../values/constants';
const commentData = [];

for (let i = 0; i < 3; i++) {
    commentData.push({
        id: i,
        comment: COMMENT,
        userName: USERNAME,
    });
}
const Comment = function () {
    const renderItem = function ({ item }) {
        return (
            <ItemContainer activeOpacity={0.5} underlayColor="#d3d3d3">
                <ItemContent>
                    <Text style={styles.contentText}>{item.comment}</Text>
                    <Text style={{ color: BLUE2, fontSize: 12 }}>Xem thêm</Text>
                    {/* <ViewRow> */}
                    <Text style={styles.username}>{item.userName}</Text>
                    {/* </ViewRow> */}
                </ItemContent>
            </ItemContainer>
        );
    };
    return (
        <View>
            <View style={styles.hisHeader}>
                <Text style={styles.headText}>{COMMENT_STRING}</Text>
            </View>

            <FlatList
                style={{ marginTop: 10 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={commentData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <View style={styles.borderBottom}>
                <Text style={{ fontSize: 12, color: BLUE2, fontWeight: 'bold' }}>XEM TOÀN BỘ ĐÁNH GIÁ</Text>
            </View>
        </View>
    );
};

const ItemContainer = styled.TouchableOpacity`
  padding: 15px;
  background-color: rgba(0,0,0,.05);
  max-width: 280px;
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
        paddingTop: 15,
    }
});

export default Comment;
