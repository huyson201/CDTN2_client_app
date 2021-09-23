import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, ToastAndroid } from "react-native";
import RangeSlider from 'rn-range-slider';
import { DEVICE_WIDTH } from "../../values/size";
import styled from "styled-components";
import { CANCEL_BTN_NAME, FILTER_STRING, ROOM_PRICE_STRING, SELECT_BTN_NAME, STAR_RANK_STRING } from "../../values/constants";
import { BLUE1, DARK_GRAY, GOLD_COLOR } from "../../values/color";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

const maxPrice = 400000;
const minPrice = 0;

const calPrice = (percent) => {
    if (!percent || percent === 0) return minPrice
    return (Math.floor(percent / 100 * maxPrice));
}


const StarChecks = ({ data, onPress }) => {
    let stars = data.map((el, index) => {
        if (el.name === 1) {
            return (
                <TouchableWithoutFeedback key={index} onPress={() => onPress(index)}>
                    <StarBox style={styles.borderLeftStyle}>
                        <Text style={styles.starText}>{el.name}</Text>
                        <Icon name="star" size={18} color={el.active ? GOLD_COLOR : DARK_GRAY} />
                    </StarBox>
                </TouchableWithoutFeedback>
            )
        }

        return (
            <TouchableWithoutFeedback key={index} onPress={() => onPress(index)}>
                <StarBox>
                    <Text style={styles.starText}>{el.name}</Text>
                    <Icon name="star" size={18} color={el.active ? GOLD_COLOR : DARK_GRAY} />
                </StarBox>
            </TouchableWithoutFeedback>
        )
    })

    return stars;
}

const arrStar = [
    { name: 1, active: false },
    { name: 2, active: false },
    { name: 3, active: false },
    { name: 4, active: false },
    { name: 5, active: false },
];

const SearchFilterModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    // low, hight value
    const [low, setLow] = useState(0)
    const [high, setHigh] = useState(100)

    const [starBtns, setStarBtns] = useState([...arrStar])


    let highPrice = calPrice(high)
    let lowPrice = calPrice(low)


    // rander widgets
    const renderThumb = () => {
        return (
            <View style={styles.thumb}></View>
        )
    }
    const renderRail = () => {
        return (
            <View style={styles.rail}></View>
        )
    }
    const renderRailSelected = () => {
        return (
            <View style={styles.railSelected}></View>
        )
    }


    const handleValueChange = (low, hight) => {
        setLow(low)
        setHigh(hight)
    }

    const handlePressStar = (index) => {
        let newStarBtns = [...starBtns]
        let active = newStarBtns[index].active
        newStarBtns[index].active = !active
        setStarBtns(newStarBtns)

    }
    // process modal
    const close = () => {
        setStarBtns([...arrStar])
        setLow(0)
        setHigh(100)
        setShow(false)
    }

    const handleSelected = () => {
        close()
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
            visible={show}
        >
            <TouchableWithoutFeedback style={styles.outside} onPress={close}>
                <TransparentView >
                    <Title>{FILTER_STRING}</Title>
                </TransparentView>
            </TouchableWithoutFeedback>
            <FilterContent>
                <View>
                    <FilterHead >{ROOM_PRICE_STRING}</FilterHead>
                    <RowView>
                        <PriceField ellipsizeMode="tail" numberOfLine={1}>{lowPrice} VND</PriceField>
                        <Line />
                        <PriceField ellipsizeMode="tail" numberOfLine={1}>{highPrice} VND</PriceField>
                    </RowView>
                    <View style={styles.slice}>
                        <RangeSlider
                            low={low}
                            high={high}
                            min={0}
                            max={100}
                            step={5}
                            floatingLabel
                            renderThumb={renderThumb}
                            renderRail={renderRail}
                            renderRailSelected={renderRailSelected}
                            onValueChanged={handleValueChange}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <FilterHead>{STAR_RANK_STRING}</FilterHead>
                    <RowView>
                        <StarChecks data={starBtns} onPress={handlePressStar} />
                    </RowView>
                </View>
                <RowView>
                    <Button containerStyle={styles.btnCancel} title={CANCEL_BTN_NAME} onPress={close} type="outline" />
                    <Button containerStyle={styles.btnSelect} title={SELECT_BTN_NAME} onPress={handleSelected} />
                </RowView>
            </FilterContent>
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
const FilterContent = styled.View`
    max-height: 50%;
    background-color: #fff;
    padding: 15px;
`
const FilterHead = styled.Text`
    color: ${BLUE1};
    font-size: 18px;
    font-weight: bold;
`
const PriceField = styled.Text`
    padding: 8px 0px;
    border: 1px solid ${DARK_GRAY};
    border-radius: 20px;
    width: 40%;
    text-align: center;
`
const RowView = styled.View`
  flex-direction: row;  
  margin-top: 15px; 
  justify-content: center;
  align-items: center;
`
const Line = styled.View`
    width: 10%;
    height: 2px;
    background-color: ${DARK_GRAY};
`

const StarBox = styled.View`
    border-color: ${DARK_GRAY};
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-style: solid;
    flex-direction: row;
    justify-content:center;
    align-items:center;
    flex:1;
    padding: 8px 0;

`
const styles = StyleSheet.create({
    thumb: {
        backgroundColor: "white",
        height: 25,
        width: 25,
        borderRadius: 15,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 15
    },
    rail: {
        height: 5,
        width: DEVICE_WIDTH - 44.5,
        backgroundColor: DARK_GRAY
    },
    railSelected: {
        backgroundColor: BLUE1, height: 5, width: '100%', marginLeft: -12
    },
    outside: {
        flex: 1
    },
    slice: {
        marginTop: 20
    },
    section: {
        marginTop: 20,
    },
    starText: {
        fontSize: 18,
        marginRight: 3,
        marginBottom: 3
    },
    borderLeftStyle: {
        borderLeftWidth: 1,
    },
    btnCancel: {
        flex: 1,
        marginRight: 5
    },
    btnSelect: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: BLUE1
    },
})
export default SearchFilterModal;