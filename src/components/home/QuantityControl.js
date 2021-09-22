import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, ToastAndroid } from "react-native"
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5"
import { BLUE1, LIGHT_GRAY } from "../../values/color";
const QuantityControl = function ({ onPress, type }) {
    const [quantity, setQuantity] = useState(1)

    // handle press plus btn
    const handlePlus = () => {
        if (quantity > 100) return
        setQuantity(quantity + 1)

        if (!onPress || typeof onPress === "function") {
            ToastAndroid.show("error", ToastAndroid.SHORT)
        }
        onPress(quantity, type)

    }

    //handle press minus btn

    const handleMinus = () => {
        if (quantity < 1) return
        setQuantity(quantity - 1)

        if (!onPress || typeof onPress === "function") return
        onPress(quantity, type)
    }
    return (
        <Container>
            <RowView>
                <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={handlePlus}>
                    <Icon name="plus" size={20} color={BLUE1} />
                </TouchableOpacity>
                <Text style={styles.textTitle} ellipsizeMode="tail" numberOfLines={1}>{quantity}</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={handleMinus} >
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