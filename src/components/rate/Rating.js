import React, { useState, useMemo, useEffect } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BLUE1 } from '../../values/color'

const renderStar = (rates, onPressItem, size) => {
    if (!Array.isArray(rates) || rates.length <= 0) return

    return rates.map((el, index) => {
        return (<TouchableWithoutFeedback key={el.rateId} onPress={() => onPressItem(el)}><Icon name='star' size={size} solid={el.checked} color={el.checked && BLUE1} /></TouchableWithoutFeedback>)
    })
}

const Rating = ({ onRating, defaultValue, readOnly, size }) => {
    const generateRating = () => {
        const rate = [
            { rateId: 1, checked: false },
            { rateId: 2, checked: false },
            { rateId: 3, checked: false },
            { rateId: 4, checked: false },
            { rateId: 5, checked: false }
        ]
        if (defaultValue) {
            rate.forEach(el => {
                if (el.rateId <= defaultValue) el.checked = true
            })
        }

        return rate
    }
    const [value, setValue] = useState(defaultValue)
    const [rating, setRating] = useState(generateRating)

    const handlePressStar = (el) => {
        if (readOnly) return
        let currentRate = 0

        let newRating = rating.map(star => {
            if (star.rateId === el.rateId && value === el.rateId && el.checked) {
                return { rateId: star.rateId, checked: false }
            }

            if (star.rateId <= el.rateId) {
                let rate = { rateId: star.rateId, checked: true }
                currentRate = el.rateId
                return rate
            }

            return { rateId: star.rateId, checked: false }
        })

        setRating([...newRating])
        setValue(currentRate)

        if (onRating && typeof onRating === 'function') {
            onRating(currentRate)
        }
    }

    const rateItems = useMemo(() => {
        return renderStar(rating, handlePressStar, size ? size : 30)
    }, [rating])

    return (

        <View style={styles.container}>
            {rateItems}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    }
})

export default Rating