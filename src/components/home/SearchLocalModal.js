import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FlatList, Modal, View, Text, StyleSheet, TouchableWithoutFeedback, ToastAndroid } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { BLUE1, DARK_GRAY, LIGHT_GRAY } from "../../values/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import { searchPlace } from "../../api-until/AutoComplete";
import styled from "styled-components";

let promiseSearch;
let places = []

// create a list item
const Item = ({ item, onPress }) => {
    let structText = item.structured_formatting;
    return (
        <TouchableWithoutFeedback onPress={() => onPress(item)}>
            <ItemPlace style={styles.border}>
                <Circle>
                    <Icon name="map-marker-alt" size={20} color={DARK_GRAY} />
                </Circle>
                <View style={styles.addressContainer}>
                    <MainText>{structText.main_text}</MainText>
                    <SecondText>{structText.secondary_text}</SecondText>
                </View>
            </ItemPlace>
        </TouchableWithoutFeedback>
    )
}



const SearchLocalModal = forwardRef((props, ref) => {
    const [searchKey, setSearchKey] = useState("")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    // update key search when pressing keyboard
    const updateSearch = (key) => {
        setLoading(true)
        setSearchKey(key)

        if (key !== "") {
            promiseSearch = searchPlace(key);
        } else {
            places = []
            setLoading(false)
        }
    }


    // add list address after searched
    if (promiseSearch) {
        promiseSearch.then(data => {
            if (data === places) return
            places = data
            setLoading(false)
            return
        })

    }

    // get data when pressed list item
    const handleSelectAddress = (item) => {
        ToastAndroid.show(JSON.stringify(item), ToastAndroid.SHORT)
        setShow(false);
    }

    // process open modal
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
            animationType="slide"
            onRequestClose={close}
            visible={show}
        >
            <SearchBar
                value={searchKey}
                onChangeText={updateSearch}
                placeholder="Nhập vị trí tìm kiếm khách sạn..."
                onClear={(key) => setSearchKey(key)}
                showLoading={loading}
                containerStyle={styles.searchContainer}
                inputContainerStyle={{ backgroundColor: "#fff" }}
                cancelIcon={<Icon name='arrow-right' />}

            />
            <View style={styles.listBox}>
                <FlatList
                    data={places}
                    renderItem={({ item, index }) => {
                        return (
                            <Item item={item} key={index} onPress={handleSelectAddress} />
                        )
                    }}
                    extraData={(item) => item.place_id}
                    onPress={handleSelectAddress}

                />
            </View>
            <Button title="Hoàn thành" buttonStyle={styles.btn} onPress={close} />
        </Modal>
    )
})

const Circle = styled.View`
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 99px;
    background-color: ${LIGHT_GRAY}
`
const ItemPlace = styled.View`
    padding: 12px 15px;
    flex-direction: row;
    align-items: center;
`
const MainText = styled.Text`
    font-size: 16px;
    color: black;
    font-weight: bold;
`
const SecondText = styled.Text`
    font-size: 14px;
    color: ${DARK_GRAY};
`
const styles = StyleSheet.create({
    addressContainer: {
        maxWidth: "90%",
        marginLeft: 12,
        flex: 1
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        borderStyle: "solid"
    },
    searchContainer: {
        backgroundColor: BLUE1,
        padding: 15,
        borderColor: BLUE1,
    },
    listBox: {
        flex: 1
    },
    btn: {
        paddingTop: 12,
        paddingBottom: 12
    }
})
export default SearchLocalModal;