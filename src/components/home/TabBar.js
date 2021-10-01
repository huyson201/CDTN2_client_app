import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BLUE1 } from '../../values/color';
import "react-native-gesture-handler";
// import TaskHome from "../../components/TaskScreen/TaskHome"
import NotificationScreen from "../../../screens/NotificationScreen"
import ProfileScreen from '../../../screens/ProfileScreen';
import HomeScreen from '../../../screens/HomeScreen';
import { View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"

const Tab = createBottomTabNavigator();

const TabBar = () => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size, padding }) => {
                    let iconName = ""
                    let iconColor = "rgba(0,0,0,.5)"
                    switch (route.name) {
                        case "Home":
                            iconColor = focused ?? BLUE1
                            iconName = "home"
                            break;
                        case "Notify":
                            iconColor = focused ?? BLUE1
                            iconName = "bell"
                            break;
                        case "Profile":
                            iconColor = focused ?? BLUE1
                            iconName = "user-alt"
                            break;
                    }

                    return (<Icon name={iconName} color={color} size={size} style={{ paddingBottom: padding }} />)
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: "Home" }} />
            <Tab.Screen name="Notify" component={NotificationScreen} options={{ title: "Notification" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        </Tab.Navigator>

    );
};

export default TabBar;