import React, { useState } from "react";
import { Modal, StyleSheet, Text, Touchable, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components";
import { BLUE1, DARK_GRAY, ORANGE } from "../../values/color";
import { ADULT_PERON_STRING, SELECT_BTN_NAME, CHILD_MAX_AGE_STRING, CHILD_STRING, CLI_ROOM_TITLE, ROOM_QUANTITY_STRING } from "../../values/constains";
import Icon from "react-native-vector-icons/FontAwesome5"
import QuantityControl from "./QuantityControl";
import { Button } from "react-native-elements"
const ClientAndRoomModal = () => {
    const [close, setClose] = useState(false)
    return (
        <Modal
            style={styles.modal}
            visible={close}>
            <View style={styles.bar}>
                <Container>
                    <View style={styles.row}>
                        <Text style={styles.barTitle}>{CLI_ROOM_TITLE}</Text>
                        <TouchableWithoutFeedback>
                            <Icon name="times" size={20} color="#fff" />
                        </TouchableWithoutFeedback>
                    </View>
                </Container>
            </View>
            <Container>
                <View style={{ ...styles.row, ...styles.rowPadding, ...styles.separator }} >
                    <ViewRow>
                        <Icon name="door-open" size={20} color={BLUE1} />
                        <Text style={styles.title}>{ROOM_QUANTITY_STRING}</Text>
                    </ViewRow>
                    <ViewRow>
                        <QuantityControl />
                    </ViewRow>
                </View>
                <View style={{ ...styles.row, ...styles.rowPadding, ...styles.separator }} >
                    <ViewRow>
                        <Icon name="user-alt" size={20} color={BLUE1} />
                        <Text style={styles.title}>{ADULT_PERON_STRING}</Text>
                    </ViewRow>
                    <ViewRow>
                        <QuantityControl />
                    </ViewRow>
                </View>
                <View style={{ ...styles.row, ...styles.rowPadding, ...styles.separator }} >
                    <View>
                        <ViewRow>
                            <Icon name="child" size={20} color={BLUE1} />
                            <Text style={styles.title}>{CHILD_STRING}</Text>
                        </ViewRow>
                        <Text style={styles.smallText}>{CHILD_MAX_AGE_STRING}</Text>
                    </View>

                    <ViewRow>
                        <QuantityControl />
                    </ViewRow>
                </View>
            </Container>

            <View style={styles.btnBox}>
                <Button
                    title={SELECT_BTN_NAME}
                    buttonStyle={styles.btn}
                />
            </View>


        </Modal>
    )
}

const Container = styled.View`
    padding:15px 20px;
`
const ViewRow = styled.View`
    flex-direction: row;
    align-items: center;
`
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        position: "relative"
    },
    bar: {
        backgroundColor: BLUE1,
    },
    barTitle: {
        fontSize: 20,
        color: "#fff"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    rowPadding: {
        paddingTop: 15,
        paddingBottom: 15
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        borderStyle: "solid"
    },
    smallText: {
        color: DARK_GRAY
    },
    btnBox: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 15,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
        borderStyle: "solid"
    },
    btn: {
        borderRadius: 8,
        backgroundColor: ORANGE
    }
})
export default ClientAndRoomModal;