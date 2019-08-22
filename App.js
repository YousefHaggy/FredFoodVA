import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import PantryCard from "./components/PantryCard"
import LocationCard from "./components/LocationCard"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './HomeScreen'
import SocialScreen from './SocialScreen'
import PantryScreen from './PantryScreen'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
// Push notifcations
const PUSH_ENDPOINT="https://fredfoodbank.pythonanywhere.com/push_token"

async function registerForPushNotifications()
{
    const { status : existingStatus}= await Permissions.getAsync(
        Permissions.NOTIFICATIONS
        );
    let finalStatus= existingStatus;

    if (existingStatus!=="granted")
    {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus=status;
    }

    if(finalStatus!=="granted"){
        return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token)
    return fetch(PUSH_ENDPOINT,{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token:{
                value:token,
            },
            user:{
                username: 'Brent',
            },
        }),
    });
    console.log("function called")
}
registerForPushNotifications();
// Navigation
const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    Pantries: { screen: PantryScreen }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#6C8241'
        },
        headerTintColor: '#FFFFFF',
        title: 'Locations',
    }
});
const SocialStack = createStackNavigator({
    SocialScreen: { screen: SocialScreen }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#6C8241'
        },
        headerTintColor: '#FFFFFF',
        title: 'Updates',
    }
});

const App = createBottomTabNavigator({
    Locations: { screen: HomeStack },
    Updates: { screen: SocialStack }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName == "Locations") {
                iconName = `md-map`;
            } else if (routeName == "Updates") {
                iconName = 'md-cloud'
            }
            return <IconComponent name={iconName} size={25} color={tintColor} />;
        },

    }),
    tabBarOptions: {
        activeTintColor: '#F59300',
        inactiveTintColor: 'white',
        style: {
            backgroundColor: '#6C8241'
        },
    },
});

export default createAppContainer(App);