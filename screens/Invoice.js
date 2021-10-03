import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, ToastAndroid, TouchableNativeFeedback, View } from "react-native";
import styled from "styled-components";
import { BLUE1, DARK_GRAY, LIGHT_GRAY, ORANGE } from "../src/values/color";
import { CALENDAR_TEXT, CONFIRM_BTN, CONTACT_INFO, DETAIL_PRICE, SMALL_TEXT_TITLE, SUM_PRICE_SRT } from "../src/values/constants";
import Icon from "react-native-vector-icons/FontAwesome5"
import { formatCurrency } from "../src/utilFunction";
import { Button } from "react-native-elements";
const Invoice = () => {
    const [showDetailPrice, setShowDetailPrice] = useState(false)
    let detailPrice = null
    if (showDetailPrice) {
        detailPrice = (
            <DetailPrice>
                <RowView style={{ ...styles.space, paddingTop: 15, paddingBottom: 15 }}>
                    <Text>(x1) Standard Twin Room</Text>
                    <Text>{formatCurrency(1000000, "VND")}</Text>
                </RowView>
                <RowView style={{ ...styles.space, paddingTop: 15, paddingBottom: 15 }}>
                    <Text>Phí khách sạn</Text>
                    <Text>{formatCurrency(150000, "VND")}</Text>
                </RowView>
            </DetailPrice>
        )
    }

    const handlePressShowDetailPrice = () => {
        setShowDetailPrice(!showDetailPrice)
    }

    const handlePressConfirm = () => {
        ToastAndroid.show("xác nhận", ToastAndroid.SHORT)
    }
    return (
        <ScrollView style={{ backgroundColor: "rgba(0,0,0,.05)" }}>
            <MainBackground>
                <Text style={styles.textWhite}>{SMALL_TEXT_TITLE}</Text>
                <InvoiceBox>
                    <View>
                        <RowView style={styles.paddingDefault}>
                            <Icon name="hotel" size={16} color={BLUE1} />
                            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.textCap}>The Cap Hotel</Text>
                        </RowView>
                        <View style={styles.dateBox}>
                            <RowView>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedText}>Nhận phòng</Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedDate}>{CALENDAR_TEXT} (14:00)</Text>
                            </RowView>
                            <RowView style={styles.mTop}>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedText}>Trả phòng</Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.receivedDate}>{CALENDAR_TEXT} (12:00)</Text>
                            </RowView>
                        </View>
                        <View style={styles.paddingDefault}>
                            <Text style={styles.roomTitle}>(2x) Deluxe Twin Seaview</Text>
                            <Text style={styles.roomInfo}>1 giường (x2)</Text>
                            <Text style={styles.roomInfo}>2 khách/phòng</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.paddingDefault, backgroundColor: LIGHT_GRAY }}>
                        <RowView>
                            <Icon name="list-alt" size={16} color={"rgba(0,0,0,.6)"} />
                            <Text style={styles.textCondition}>Không hoàn tiền</Text>
                        </RowView>
                        <RowView>
                            <Icon name="list-alt" size={16} color={"rgba(0,0,0,.6)"} />
                            <Text style={styles.textCondition}>Không thể thay đổi lịch trình</Text>
                        </RowView>
                    </View>
                </InvoiceBox>
            </MainBackground>
            <InfoBox>
                <Text style={styles.textCap}>{CONTACT_INFO}</Text>
                <InvoiceBox style={{ ...styles.paddingDefault, ...styles.mTop }}>
                    <Text style={styles.textName}>Son</Text>
                    <Text style={styles.textInfo}>Email: huyson201@gmail.com</Text>
                    <Text style={styles.textInfo}>Phone: +84987458246</Text>
                </InvoiceBox>
            </InfoBox>

            <View>
                <Text style={{ ...styles.textCap, ...styles.paddingDefault }}>{DETAIL_PRICE}</Text>
                <TouchableNativeFeedback onPress={handlePressShowDetailPrice} >
                    <RowView style={{ ...styles.paddingDefault, backgroundColor: "#fff", ...styles.space }}>
                        <RowView>
                            <Icon name={showDetailPrice ? "angle-up" : "angle-down"} size={16} color={BLUE1} />
                            <Text style={styles.sumPriceString}>{SUM_PRICE_SRT}</Text>
                        </RowView>
                        <Text style={styles.priceStyle}>{formatCurrency(6928593, "VND")}</Text>
                    </RowView>
                </TouchableNativeFeedback>
                {detailPrice}
            </View>

            <View style={styles.paddingDefault}>
                <Button onPress={handlePressConfirm} title={CONFIRM_BTN} buttonStyle={{ backgroundColor: ORANGE, paddingTop: 15, paddingBottom: 15, marginTop: 12, marginBottom: 12 }} />
            </View>

        </ScrollView>
    )
}
const MainBackground = styled.View`
    padding: 15px 15px 32px 15px;
    background-color: ${BLUE1};
`

const InvoiceBox = styled.View`
    background-color:#fff;
    border-radius: 8px;
`

const RowView = styled.View`
    flex-direction: row;
    align-items: center;
`
const InfoBox = styled.View`
    padding: 22px 15px;
`
const DetailPrice = styled.View`
    padding: 15px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${LIGHT_GRAY};
    border-style: solid;
    background-color: #fff;
`
const styles = StyleSheet.create({
    textWhite: {
        color: "#fff",
        textAlign: "center",
        marginBottom: 12
    },
    textCap: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8
    },
    dateBox: {
        paddingBottom: 12,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomColor: LIGHT_GRAY,
        borderBottomWidth: 1,
        borderStyle: "solid"
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
    paddingDefault: {
        padding: 15
    },
    roomTitle: {
        fontWeight: "bold"
    },
    roomInfo: {
        color: DARK_GRAY,
        marginTop: 4
    },
    textCondition: {
        color: DARK_GRAY,
        marginLeft: 6
    },
    textName: {
        fontSize: 18,
        textTransform: "capitalize",
    },
    textInfo: {
        color: DARK_GRAY
    },
    space: {
        justifyContent: "space-between"
    },
    priceStyle: {
        fontWeight: "bold",
        fontSize: 16
    },
    sumPriceString: {
        marginLeft: 8,
        fontSize: 16
    }

})

export default Invoice;