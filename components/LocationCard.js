import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default class LocationCard extends Component {
  render() {
    console.log(this.props.pantryList);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          this.props.navigation.navigate("Pantries", {
            pantryList: this.props.pantryList,
            title: this.props.areaName,
          })
        }
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {this.props.areaName}
        </Text>
        <Ionicons
          name="ios-arrow-forward"
          size={25}
          style={{ alignSelf: "center", color: "#F59300" }}
        ></Ionicons>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    height: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 3,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#FFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
