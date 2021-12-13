import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BLUE1, DARK_GRAY } from '../src/values/color'
import { Button } from 'react-native-elements'
import Rating from '../src/components/rate/Rating'
import ratingApi from '../api/rateApi'

const RatingScreen = ({ route, navigation }) => {
    const { currentUser, token } = useSelector((state) => state.user)
    const { hotelName, hotelId, rate } = route.params
    const [comment, setComment] = useState(() => rate ? rate.rate_comment : '')
    const [rateValue, setRateValue] = useState(() => rate ? rate.rate_star : 0)
    const [loading, setLoading] = useState(true)

    const handleRating = (rateValue) => {
        setRateValue(rateValue)
    }

    const handleClickPost = async () => {
        setLoading(true)

        if (rateValue === 0) {
            ToastAndroid.show('Rating value require!!', ToastAndroid.SHORT)
            setLoading(false)
            return
        }

        if (!rate) {
            try {
                const res = await ratingApi.create({
                    rate_star: +rateValue,
                    rate_comment: comment,
                    hotel_id: hotelId
                }, token)

                ToastAndroid.show('Rating success !!', ToastAndroid.SHORT)
                navigation.goBack()
            } catch (error) {
                ToastAndroid.show(error.response.data, ToastAndroid.SHORT)
            }

            setLoading(false)
            return
        }

        try {
            const res = await ratingApi.update(rate.id, {
                rate_star: +rateValue,
                rate_comment: comment,
            }, token)

            ToastAndroid.show('Update rating success !!', ToastAndroid.SHORT)
            navigation.goBack()
        } catch (error) {
            ToastAndroid.show(error.response.data, ToastAndroid.SHORT)
        }

        setLoading(false)
    }

    const handleClickBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <View style={styles.loading}><ActivityIndicator size='large' color={DARK_GRAY} /></View>
        )
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.toolbar}>
                {/* exit bottom */}
                <TouchableWithoutFeedback onPress={handleClickBack}>
                    <Icon name='times' size={24} color={'rgba(0,0,0,.5)'} />
                </TouchableWithoutFeedback>
                {/* title */}
                <View style={styles.toolbarTitleBox}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.toolbarHotelName}>{hotelName ? hotelName : 'Caption Hotel'}</Text>
                    <Text style={styles.toolbarHint}>Xếp hạng khách sạn này</Text>
                </View>
                <Button title="Đăng" onPress={handleClickPost} />
            </View>
            <View style={{ ...styles.container, marginTop: 20 }}>
                <View style={styles.col}>
                    <View>
                        <Image
                            style={styles.imgStyle}
                            source={
                                currentUser.user_img !== null
                                    ? { uri: currentUser.user_img }
                                    : {
                                        uri: `https://ui-avatars.com/api/?name=${currentUser.user_name}&size=256`,
                                    }
                            }
                        />
                    </View>
                    <View style={styles.descStyle}>
                        <Text style={styles.userName}>{currentUser.user_name}</Text>
                        <Text style={styles.descHint}>Đây là bài đánh giá công khai của bạn</Text>
                    </View>
                </View>
            </View>
            <View style={styles.ratingBox}>
                <Rating onRating={handleRating} size={20} defaultValue={rate ? rate.rate_star : rateValue} />
            </View>
            <View style={{ ...styles.container, marginTop: 32 }}>
                <TextInput clearButtonMode="while-editing" autoCapitalize="sentences" returnKeyType='done' returnKeyLabel='Done' value={comment} placeholder='Mô tả trải nghiệm của bạn (không bắt buộc).' style={styles.styleInput} multiline={true} numberOfLines={4} maxLength={500} onChangeText={(text) => setComment(text)} />
                <Text style={{ textAlign: 'right', marginTop: 5, paddingHorizontal: 5 }}>{comment.length}/500</Text>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    styleInput: {
        borderWidth: 2,
        borderColor: BLUE1,
        paddingHorizontal: 12,
        textAlignVertical: 'top',
        borderRadius: 12
    },
    ratingBox: {
        marginTop: 40,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        paddingHorizontal: 15
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: DARK_GRAY,
        paddingHorizontal: 15
    },
    toolbarTitleBox: {
        flex: 1,
        marginHorizontal: 24
    },
    toolbarHotelName: {
        fontSize: 16,
    },
    toolbarHint: {
        fontSize: 13,
        marginTop: 6
    },
    col: {
        flexDirection: 'row'
    },
    imgStyle: {
        width: 60,
        height: 60,
        borderRadius: 60
    },
    descStyle: {
        marginLeft: 15
    },
    userName: {
        fontSize: 18
    },
    descHint: {
        marginTop: 4,
        color: 'rgba(0,0,0,.6)'
    }
})

export default RatingScreen