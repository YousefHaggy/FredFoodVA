import React, { useState, useEffect, useRef } from "react";
import { AppState, Text, StyleSheet, FlatList, View } from "react-native";
import SocialCard from "./components/SocialCard";
import { createStackNavigator } from "@react-navigation/stack";

function SocialScreen({ navigation }) {
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [updates, setUpdates] = useState([]);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTweets();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      getTweets();
    }

    appState.current = nextAppState;
  };

  const getTweets = async () => {
    try {
      setIsRefreshing(true);
      let response = await fetch(
        "http://fredfoodva.herokuapp.com/return_tweets"
      );
      let responseJson = await response.json();
      let tweets = responseJson.result;
      tweets.push({
        "tweet":
          "Welcome to the Fredericksburg Regional Food Bank App! Import updates from the food bank will be posted in this tab ",
        "date": "11:00 AM - 24 Oct 2019",
        "pic": null,
      });
      setIsRefreshing(false);
      setUpdates(tweets);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={updates}
        renderItem={({ item }) => (
          <SocialCard
            tweetText={item["tweet"]}
            tweetPicture={item["pic"]}
            tweetDate={item["date"]}
          />
        )}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            Loading updates, please ensure you have an internet connection
          </Text>
        }
        refreshing={isRefreshing}
        onRefresh={() => getTweets()}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function SocialStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#6C8241",
        },
        headerTintColor: "#FFFFFF",
      }}
    >
      <Stack.Screen name="Updates" component={SocialScreen} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    justifyContent: "flex-start",
  },
});
