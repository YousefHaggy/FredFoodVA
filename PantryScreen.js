import React from "react";
import { FlatList } from "react-native";
import PantryCard from "./components/PantryCard";
export default function PantryScreen({ navigation, route }) {
  const { pantryList } = route.params;
  console.log("LIST" + pantryList);
  return (
    <FlatList
      data={pantryList.sort(function (a, b) {
        return a["name"] > b["name"] ? 1 : -1;
      })}
      renderItem={({ item }) => <PantryCard pantry={item}></PantryCard>}
    ></FlatList>
  );
}
