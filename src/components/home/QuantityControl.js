import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5"
import { BLUE1, LIGHT_GRAY } from "../../values/color";
const QuantityControl = function ({ onPressPlus, onPressMinus }) {
    return (
        <Container>
            <RowView>
                <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
                    <Icon name="plus" size={20} color={BLUE1} />
                </TouchableOpacity>
                <Text style={styles.textTitle} ellipsizeMode="tail" numberOfLines={1}>100</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.btn} >
                    <Icon name="minus" size={20} color={BLUE1} />
                </TouchableOpacity>
            </RowView>
        </Container>
    )
}

const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
`
const RowView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
`
const styles = StyleSheet.create({
    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        marginRight: 10,
        width: 40,
        textAlign: "center"
    },
    btn: {
        backgroundColor: LIGHT_GRAY,
        padding: 8
    }
})
export default QuantityControl;