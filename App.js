import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
} from "react-native";
import PantryCard from "./components/PantryCard";
import LocationCard from "./components/LocationCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SocialScreen from "./SocialScreen";
import PantryScreen from "./PantryScreen";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { NavigationContainer } from "@react-navigation/native";
// Push notifcations
const PUSH_ENDPOINT = "https://fredfoodva.herokuapp.com/push_token";

async function registerForPushNotifications() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return;
  }
  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("pantry-updates", {
      name: "Pantry Updates",
      sound: true,
      priority: "high",
      vibrate: true,
    });
  }

  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  return fetch(PUSH_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
    }),
  });
  console.log("function called");
}
registerForPushNotifications();

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#F59300",
          inactiveTintColor: "white",
          style: {
            backgroundColor: "#6C8241",
          },
        }}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6C8241",
          },
          headerTintColor: "#FFFFFF",
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            title: "Locations",
            tabBarLabel: "Locations",
            tabBarIcon: ({ color, size }) => (
              <IconComponent name={"md-map"} size={size} color={color} />
            ),
            tabBarBadge: 3,
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Updates"
          component={SocialScreen}
          options={{
            title: "Updates",
            tabBarLabel: "Updates",
            tabBarIcon: ({ color, size }) => (
              <IconComponent name={"md-cloud"} size={size} color={color} />
            ),
            tabBarBadge: 3,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
