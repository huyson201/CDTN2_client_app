import React, { useEffect } from "react"
import { Text } from "react-native"
import { View } from "react-native"
const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        }, 3000)
    }, [])
    return (
        <View>
            <Text>Splash screen</Text>
        </View>
    )
}

export default SplashScreen