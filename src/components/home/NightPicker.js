import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-elements";
import { WheelPicker } from "react-native-wheel-picker-android";
import { useDispatch } from "react-redux";
import styled from "styled-components"
import { setNightNumber } from "../../../action_creators/search";
import { BLUE1, BLUE2, LIGHT_GRAY } from "../../values/color";
import { CANCEL_BTN_NAME, PICKER_CHOOSE_NIGHT, SELECT_BTN_NAME } from "../../values/constants";

const nights = []
const nightString = []

for (let i = 1; i <= 31; i++) {
    nights.push(i)
    nightString.push(`${i}  Đêm`)
}
const NightPicker = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    const [currentValue, setCurrentValue] = useState(1)
    const dispatch = useDispatch()
    const onChangeValue = (selectedValue) => {
        setCurrentValue(selectedValue)
    }

    const handlePressChoose = () => {
        let action = setNightNumber(currentValue + 1)
        dispatch(action)
        setShow(false)
    }

    const close = () => {
        setShow(false)
    }


    useImperativeHandle(ref, () => ({
        show() {
            setShow(true)
        }
    }))

    return (
        <Modal
            onRequestClose={close}
            transparent={true}
            animationType="slide"
            visible={show}>
            <TouchableWithoutFeedback style={styles.outside} onPress={close}>
                <TransparentView >
                    <Title>{PICKER_CHOOSE_NIGHT}</Title>
                </TransparentView>
            </TouchableWithoutFeedback>

            <PickerContent>
                <View style={styles.pickerBox}>
                    <WheelPicker
                        style={styles.wheelPicker}
                        indicatorWidth={1}
                        data={nightString}
                        itemTextSize={24}
                        selectedItemTextSize={24}
                        itemTextColor={BLUE1}
                        hideIndicator
                        selectedItemTextColor={BLUE2}
                        selectedItem={currentValue}
                        isCyclic={false}
                        onItemSelected={onChangeValue}
                    />
                </View>
                <View style={styles.btnBox}>
                    <Button buttonStyle={styles.btnCancel} type="outline" title={CANCEL_BTN_NAME} onPress={close} />
                    <Button buttonStyle={styles.btnSelect} title={SELECT_BTN_NAME} onPress={handlePressChoose} />
                </View>
            </PickerContent>
        </Modal>
    )
})


const Title = styled.Text`
    color:#fff;
    position:absolute;
    bottom: 12px;
    left: 5px;
    font-weight: bold;
`
const TransparentView = styled.View`
    flex:1;
    background-color: rgba(0,0,0,.5);
    position: relative;
`
const PickerContent = styled.View`
    flex:1;
    background-color: #fff;
    max-height: 40%;
    height:100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`
const styles = StyleSheet.create({
    wheelPicker: {
        height: "90%",
        width: "100%",
    },
    pickerBox: {
        padding: 25
    },
    btnBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        width: "100%",
        borderTopColor: LIGHT_GRAY,
        borderTopWidth: 1,
        borderStyle: "solid",
        marginTop: "-10%"
    },
    btnCancel: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: "18%",
        paddingRight: "18%",
        marginRight: 5
    },
    btnSelect: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: "18%",
        paddingRight: "18%",
        marginLeft: 5,
        backgroundColor: BLUE1
    },
    outside: {
        flex: 1
    }

})
export default NightPicker;