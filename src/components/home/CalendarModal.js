import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, StyleSheet, Text, ToastAndroid, TouchableWithoutFeedback, View } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import styled from "styled-components";
import { BLUE1 } from "../../values/color";
import { CLOSE_CALENDAR_BTN, GET_ROOM_DATE } from "../../values/constants";
import { BAR_TITLE_SIZE } from "../../values/size";

const CalendarModal = forwardRef((props, ref) => {
    const [showState, setShowState] = useState(false)
    useImperativeHandle(ref, () => ({
        show() {
            setShowState(true)
        }
    }))

    const close = () => {
        setShowState(false)
    }

    const onDateChange = (date, type) => {
        ToastAndroid.show(JSON.stringify(date), ToastAndroid.SHORT)
    }

    return (
        <Modal
            onRequestClose={close}
            style={styles.container}
            animationType="slide"
            visible={showState}>
            <View style={styles.container}>
                <Bar>
                    <Text style={styles.barTitle}>{GET_ROOM_DATE}</Text>
                    <TouchableWithoutFeedback onPress={close}>
                        <Text style={styles.btn}>{CLOSE_CALENDAR_BTN}</Text>
                    </TouchableWithoutFeedback>
                </Bar>
                <View style={styles.calendarBox}>
                    <CalendarPicker
                        previousTitle={preBtnName}
                        nextTitle={nextBtnName}
                        weekdays={weekdays}
                        months={months}
                        todayBackgroundColor={BLUE1}
                        todayTextStyle={styles.todayText}
                        selectedDayTextColor="#fff"
                        scaleFactor={375}
                        onDateChange={onDateChange}
                    />
                </View>
            </View>

        </Modal>
    )
})

const nextBtnName = "Sau"
const preBtnName = "Trước"
const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
]

const Bar = styled.View`
    padding: 15px;
    background-color: ${BLUE1};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    barTitle: {
        color: "#fff",
        fontSize: BAR_TITLE_SIZE,
    },
    btn: {
        color: "#fff",
        fontSize: 16
    },
    calendarBox: {
        marginTop: 15
    },
    todayText: {
        color: "#fff"
    }
})
export default CalendarModal;