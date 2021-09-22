import React, { forwardRef, useImperativeHandle } from "react";
import { Modal, View } from "react-native";

const NightPicker = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({

    }))

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={true}
        >
            <View></View>
        </Modal>
    )
})


export default NightPicker;