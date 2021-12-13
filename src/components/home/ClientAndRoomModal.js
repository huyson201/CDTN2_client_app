import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Modal, StyleSheet, Text, ToastAndroid, Touchable, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components";
import { BLUE1, DARK_GRAY } from "../../values/color";
import { ADULT_PERON_STRING, SELECT_BTN_NAME, CHILD_MAX_AGE_STRING, CHILD_STRING, CLI_ROOM_TITLE, ROOM_QUANTITY_STRING } from "../../values/constants";
import Icon from "react-native-vector-icons/FontAwesome5"
import QuantityControl from "./QuantityControl";
import { Button } from "react-native-elements"
import { BAR_TITLE_SIZE } from "../../values/size"
import { setPersonsAndRooms } from "../../../action_creators/search";
import { useDispatch, useSelector } from "react-redux";



const ClientAndRoomModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    const currentData = useSelector(state => state.search.personsAndRooms)
    const [data, setData] = useState({ ...currentData })

    const dispatch = useDispatch()

    const close = () => {
        setData({ ...currentData })
        setShow(false)
    }

    const selected = () => {
        // process data here when press select btn 
        let nData = { ...data }
        let action = setPersonsAndRooms(nData)
        dispatch(action)
        setShow(false)

    }

    const getQuantity = (quantity, type) => {
        let newData = { ...data }
        newData[type] = quantity
        setData(newData)


    }

    useImperativeHandle(ref, () => ({
        show() {
            setShow(true)
        }
    }))
    return (
        <Modal Modal
            onRequestClose={close}
            animationType={"slide"}
            style={styles.modal}
            visible={show} >
            <View style={styles.bar}>
                <Container>
                    <View style={styles.row}>
                        <Text style={styles.barTitle}>{CLI_ROOM_TITLE}</Text>
                        <TouchableWithoutFeedback onPress={close}>
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
                        <QuantityControl data={data.rooms} type="rooms" onPress={getQuantity} />
                    </ViewRow>
                </View>
                <View style={{ ...styles.row, ...styles.rowPadding, ...styles.separator }} >
                    <ViewRow>
                        <Icon name="user-alt" size={20} color={BLUE1} />
                        <Text style={styles.title}>{ADULT_PERON_STRING}</Text>
                    </ViewRow>
                    <ViewRow>
                        <QuantityControl data={data.adults} type="adults" onPress={getQuantity} />
                    </ViewRow>
                </View>
                {/* <View style={{ ...styles.row, ...styles.rowPadding, ...styles.separator }} >
                    <View>
                        <ViewRow>
                            <Icon name="child" size={20} color={BLUE1} />
                            <Text style={styles.title}>{CHILD_STRING}</Text>
                        </ViewRow>
                        <Text style={styles.smallText}>{CHILD_MAX_AGE_STRING}</Text>
                    </View>

                    <ViewRow>
                        <QuantityControl data={data.children} type="children" onPress={getQuantity} />
                    </ViewRow>
                </View> */}
            </Container>

            <View style={styles.btnBox}>
                <Button
                    title={SELECT_BTN_NAME}
                    buttonStyle={styles.btn}
                    onPress={selected}
                />
            </View>


        </Modal>
    )
})

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
        fontSize: BAR_TITLE_SIZE,
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
        backgroundColor: BLUE1
    }
})

export default ClientAndRoomModal;