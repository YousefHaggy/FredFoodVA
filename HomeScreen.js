import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import PantryCard from "./components/PantryCard"
import LocationCard from "./components/LocationCard"
export default class HomeScreen extends Component {
 render(){ 
  return (
    <View style={styles.container}>
    <Text style={{ fontSize:21,fontWeight:'bold', margin:5, fontFamily:'Roboto'}}>Select a location</Text>       
    <LocationCard pantryName="Spotsylvania"></LocationCard>
        <LocationCard pantryName="Stafford"></LocationCard>

    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS =="ios" ? 0: StatusBar.currentHeight
  },
});
