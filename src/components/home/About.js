import React from "react"
import { StyleSheet, View, Text, FlatList } from "react-native"
import styled from "styled-components"
import { ABOUT_WHY } from "../../values/constains"
import { BLUE1, DARK_GRAY } from "../../values/color"
import Icon from "react-native-vector-icons/FontAwesome5"

let dataInfo = [
    {
        icon: "headset",
        title: "Hỗ trợ khách hàng 24/7",
        desc: "Chat là có, gọi là nghe, không quản đêm hôm, ngày nghỉ và ngày lễ."
    },
    {
        icon: "money-bill-alt",
        title: "Giá tốt sát ngày",
        desc: "Cam kết tốt nhất khi đặt gần ngày cho chuyến đi của bạn."
    },
    {
        icon: "credit-card",
        title: "Thanh toán dễ dàng, đa dạng",
        desc: "Bao gồm thêm chuyển khoản ngân hàng, và tiền mặt tại cửa hàng."
    },
    {
        icon: "hotel",
        title: "Hơn 8000+ khách sạn dọc Việt Nam",
        desc: "Hàng nghìn khách sạn, đặc biệt là 4 sao và 5 sao, cho phép bạn thoải mái lựa chọn, giá cạnh tranh, phong phú."
    },
    {
        icon: "phone-alt",
        title: "Hotline 24/7: 1900 2083",
        desc: "Sẵn sàn giải đáp tất cả thắc mắt của quý khách về đặt phòng khách sạn."
    }
]

const About = function () {
    let items = []
    for (let i = 0; i < dataInfo.length; i++) {
        let item = createAboutItem(dataInfo[i], i);
        items.push(item)
    }
    return (
        <AboutContainer>
            <Text style={styles.header}>{ABOUT_WHY}</Text>
            <View style={styles.aboutContent}>
                {items}
            </View>
        </AboutContainer>
    )
}

const createAboutItem = (item, id) => {
    return (
        <ViewRow style={styles.separator} key={id}>
            <Icon name={item.icon} size={40} color={BLUE1} style={styles.icon} />
            <View style={styles.textContent}>
                <Text style={styles.textTitle}>{item.title}</Text>
                <Text style={styles.textDesc}>
                    {item.desc}
                </Text>
            </View>
        </ViewRow>
    )
}
const AboutContainer = styled.View`
    margin-top: 24px;
`
const ViewRow = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 15px 0;
`
const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    },
    aboutContent: {
        marginTop: 12,
    },
    icon: {
        maxWidth: "15%",
        marginRight: 10,
        width: "100%"
    },
    textContent: {
        marginLeft: 10,
        maxWidth: "85%",
        width: "100%"
    },
    textTitle: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    textDesc: {
        textAlign: "left",
        fontSize: 12,
        color: DARK_GRAY,
        textTransform: "capitalize",
        paddingRight: 50,
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        borderStyle: "solid"
    }

});
export default About;