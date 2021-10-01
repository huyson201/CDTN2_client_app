import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../../../screens/HomeScreen";
import ListRestaurants from "../../../screens/ListRestaurants";
const Stack = createNativeStackNavigator()

const TaskHome = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ListRestaurants" component={ListRestaurants} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default TaskHome;