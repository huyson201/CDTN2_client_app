import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { BLUE1, BLUE2, DARK_GRAY, LIGHT_GRAY, GOLD_COLOR } from '../../values/color';
import { UTIL_STRING } from '../../values/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';

const Utilities = function () {
    return (
        <View>
            <View style={styles.hisHeader}>
                <Text style={styles.headText}>{UTIL_STRING}</Text>
            </View>
            <ScrollView horizontal={true}>
                <ViewRow>
                    <ViewCol>
                        <Icon name="silverware-fork-knife" size={30} color={BLUE1} />
                        <Text style={styles.contentText}>Nhà hàng</Text>
                    </ViewCol>
                    <ViewCol>
                        <Icon name="pool" size={30} color={BLUE1} />
                        <Text style={styles.contentText}>Hồ Bơi</Text>
                    </ViewCol>
                    <ViewCol>
                        <Icon name="hours-24" size={30} color={BLUE1} />
                        <Text style={styles.contentText}>Lễ tân 24h</Text>
                    </ViewCol>
                    <ViewCol>
                        <Icon1 name="parking" size={30} color={BLUE1} />
                        <Text style={styles.contentText}>Chỗ đậu xe</Text>
                    </ViewCol>
                    <ViewCol>
                        <Icon name="elevator-passenger" size={30} color={BLUE1} />
                        <Text style={styles.contentText}>Thang máy</Text>
                    </ViewCol>
                    <ViewCol>
                        <Icon2 name="wifi" size={30} color={BLUE1} />
                        <Text style={styles.contentText}>Wifi</Text>
                    </ViewCol>
                </ViewRow>
            </ScrollView>
            <View style={styles.borderBottom}>
                <TouchableOpacity>
                    <Text style={{ fontSize: 12, color: BLUE2, fontWeight: 'bold' }}>XEM TẤT CẢ TIỆN NGHI</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const ViewRow = styled.View`
  flex-direction: row;
  align-items: center;
  marginLeft: 15px;
  marginRight: 15px;
`;
const ViewCol = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
`;

const styles = StyleSheet.create({
    hisHeader: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
    },
    headText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    contentText: {
        fontSize: 13,
        color: DARK_GRAY,
        width: '100%',
    },
    borderBottom: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: DARK_GRAY,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 20,
    }
});

export default Utilities;
