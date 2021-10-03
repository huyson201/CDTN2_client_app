import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoomListScreen from "../../../screens/RoomListScreen";
import DetailRoomScreen from "../../../screens/DetailRoomScreen"
import HotelList from "../../../screens/HotelList";
import { BLUE1 } from "../../values/color"
import TabBar from "../home/TabBar";
const Stack = createNativeStackNavigator()

const TaskHome = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="HomeTab" component={TabBar} options={{ headerShown: false }} />
            <Stack.Screen name="ListHotels" component={HotelList} options={{
                headerShown: true,
                title: "Kết quả tìm kiếm",
                headerTintColor: "#fff",
                headerStyle: { backgroundColor: BLUE1 }
            }} />
            <Stack.Screen name="RoomListScreen" component={RoomListScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default TaskHome;