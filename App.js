import * as React from "react";
import { Platform, View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenStack from "./HomeScreen";
import SocialScreenStack from "./SocialScreen";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { NavigationContainer } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

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
}
registerForPushNotifications();

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={"Home"}
        tabBarOptions={{
          activeTintColor: "#F59300",
          inactiveTintColor: "white",
          style: {
            backgroundColor: "#6C8241",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: "Locations",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={"md-map"} size={size} color={color} />
            ),
          }}
          component={HomeScreenStack}
        />
        <Tab.Screen
          name="Updates"
          component={SocialScreenStack}
          options={{
            tabBarLabel: "Updates",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={"md-cloud"} size={size} color={color} />
            ),
            tabBarBadge: 5,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
