import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import styled from "styled-components";
import { formatCurrency } from "../../utilFunction";
import { BLUE1, DARK_GRAY, LIGHT_GRAY } from "../../values/color";
import { CALENDAR_TEXT, CONTACT_INFO, DETAIL_PRICE, SUM_PRICE_SRT } from "../../values/constants";
const DetailInvoice = () => {
    const [showDetailPrice, setShowDetailPrice] = useState(false)
    const [activeState, setActiveState] = useState(0)

    let detailPrice = null
    if (showDetailPrice) {
        detailPrice = (
            <DetailPrice>
                <RowView style={{ justifyContent: "space-between" }}>
                    <Text>(x1) Standard Twin Room</Text>
                    <Text>{formatCurrency(1000000, "VND")}</Text>
                </RowView>
                <RowView style={{ ...styles.mTop, justifyContent: "space-between" }}>
                    <Text>Phí khách sạn</Text>
                    <Text>{formatCurrency(150000, "VND")}</Text>
                </RowView>
            </DetailPrice>
        )
    }

    const handlePressShowDetailPrice = () => {
        console.log("pressed")
        setShowDetailPrice(!showDetailPrice)
    }

    return (
        <View style={styles.container}>
            <RowView style={styles.paddingDefault}>
                <Icon name="hotel" size={16} color={BLUE1} />
                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.textCap}>The Cap Hotel</Text>
            </RowView>
            <View style={styles.dateBox}>
                <RowView>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedText}>Mã Hóa Đơn: </Text>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedDate}> fwqdawfgqc</Text>
                </RowView>
                <RowView style={styles.mTop}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedText}>Nhận phòng</Text>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedDate}>{CALENDAR_TEXT} (14:00)</Text>
                </RowView>
                <RowView style={styles.mTop}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedText}>Trả phòng</Text>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedDate}>{CALENDAR_TEXT} (12:00)</Text>
                </RowView>
            </View>
            <View>
                <Text style={styles.roomTitle}>(2x) Deluxe Twin Seaview</Text>
                <Text style={styles.roomInfo}>1 giường (x2)</Text>
                <Text style={styles.roomInfo}>2 khách/phòng</Text>
            </View>
            <InfoBox>
                <Text style={{ ...styles.textCap, marginLeft: 0, marginTop: 8 }}>{CONTACT_INFO}</Text>
                <InvoiceBox style={{ ...styles.paddingDefault, ...styles.mTop }}>
                    <Text style={styles.textName}>Name: Son</Text>
                    <Text style={styles.textInfo}>Email: huyson201@gmail.com</Text>
                    <Text style={styles.textInfo}>Phone: +84987458246</Text>
                </InvoiceBox>
            </InfoBox>

            <View>
                <Text style={{ ...styles.textCap, marginLeft: 0, marginTop: 8 }}>{DETAIL_PRICE}</Text>
                <TouchableNativeFeedback onPress={handlePressShowDetailPrice}  >
                    <RowView style={{ justifyContent: "space-between", marginTop: 8, paddingTop: 8, paddingBottom: 8 }}>
                        <RowView>
                            <Icon name={showDetailPrice ? "angle-up" : "angle-down"} size={16} color={BLUE1} />
                            <Text style={styles.sumPriceString}>{SUM_PRICE_SRT}</Text>
                        </RowView>
                        <Text style={styles.priceStyle}>{formatCurrency(6928593, "VND")}</Text>
                    </RowView>
                </TouchableNativeFeedback>
                {detailPrice}
            </View>
            <View>
                <Text style={{ ...styles.textCap, marginLeft: 0, marginTop: 8 }}>Trạng thái</Text>
                <RowView style={{ marginTop: 32, justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <StatusItem>
                        <Circle style={activeState === 0 ? styles.borderActive : styles.borderNormal}>
                            <Text style={activeState === 0 ? styles.colorActive : styles.colorNormal}>0</Text>
                        </Circle>
                        <Text style={activeState === 0 ? styles.statusActive : styles.statusText}>Đang xử lí</Text>
                    </StatusItem>
                    <Line />
                    <StatusItem>
                        <Circle style={activeState === 1 ? styles.borderActive : styles.borderNormal}><Text style={activeState === 1 ? styles.colorActive : styles.colorNormal}>1</Text></Circle>
                        <Text style={activeState === 1 ? styles.statusActive : styles.statusText}>Xác nhận</Text>
                    </StatusItem>
                    <Line />
                    <StatusItem>
                        <Circle style={activeState === 2 ? styles.borderActive : styles.borderNormal}><Text style={activeState === 2 ? styles.colorActive : styles.colorNormal}>2</Text></Circle>
                        <Text style={activeState === 2 ? styles.statusActive : styles.statusText}>Đặt cọc</Text>
                    </StatusItem>
                    <Line />
                    <StatusItem>
                        <Circle style={activeState === 3 ? styles.borderActive : styles.borderNormal}><Text style={activeState === 3 ? styles.colorActive : styles.colorNormal}>3</Text></Circle>
                        <Text style={activeState === 3 ? styles.statusActive : styles.statusText}>Nhận Phòng</Text>
                    </StatusItem>
                </RowView>

            </View>
        </View>
    )
}

const StatusItem = styled.View`
    justify-content: center;
    align-items: center;
    position: relative;
`
const Line = styled.View`
    width: 8%;
    height: 2px;
    background-color: ${DARK_GRAY};
    margin-bottom: 30px;
`
const Circle = styled.View`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border: 1px solid ${DARK_GRAY};
    border-radius: 40px;
`
const RowView = styled.View`
    flex-direction: row;
    align-items: center;
`
const InfoBox = styled.View`
    
`
const InvoiceBox = styled.View`
    border-radius: 8px;
`
const DetailPrice = styled.View`
    padding: 15px 0;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${LIGHT_GRAY};
    border-style: solid;
    background-color: #fff;
`
const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#fff",
        flex: 1
    },
    textCap: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8
    },
    dateBox: {
        paddingBottom: 12,
        marginTop: 8
    },
    receivedText: {
        width: "30%",
        marginRight: "10%"
    },
    receivedDate: {
        width: "70%"
    },
    mTop: {
        marginTop: 8
    },
    roomTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    roomInfo: {
        marginTop: 5,
    },
    sumPriceString: {
        marginLeft: 8,
        fontSize: 16
    },
    priceStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    statusText: {
        marginTop: 8,
        fontSize: 13
    },
    statusActive: {
        marginTop: 8,
        fontSize: 13,
        color: "green",
        fontWeight: "bold"
    },
    colorNormal: {
        color: "black"
    },
    colorActive: {
        color: "green",
        fontWeight: "bold"
    },
    borderNormal: {
        borderColor: DARK_GRAY
    },
    borderActive: {
        borderColor: "green"
    }
})
export default DetailInvoice;