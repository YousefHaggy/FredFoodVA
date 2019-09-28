import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Platform, StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import PantryCard from "./components/PantryCard"
import LocationCard from "./components/LocationCard"
import config from './config/config'
import { Notifications } from 'expo'
import { Searchbar } from "react-native-paper"
import Constants from "expo-constants"
import * as Permissions from 'expo-permissions'
import * as Location from "expo-location"
export default class HomeScreen extends Component {
    async getPantries() {
        try {
            this.setState({ isRefreshing: true })
            let response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.sheets.spreadsheetId}/values/A2:X?key=${config.sheets.apiKey}`);
            let responseJson = await response.json();
            let areaList = new Array();
            let pantryList = new Object();
            responseJson.values.forEach((value, index) => {
                if (index == 0) {
                    return;
                }
                if (!areaList.includes(value[2])) {
                    areaList.push(value[2])
                    pantryList[value[2]] = new Array();
                }
                pantryList[value[2]].push(value)
            });
            areaList.sort();
            const filter = this.state.filter;
            this.setState({ pantryList: pantryList, areaList: areaList, filteredAreaList: areaList.filter((area) => { return area.includes(filter) }) });
            this.setState({ isRefreshing: false });
            _storeData = async () => {
                try {
                    await AsyncStorage.setItem("pantryList", pantryList)
                    await AsyncStorage.setItem("areaList", areaList)
                } catch (error) {}
            }
            /*await this.getLocationAsync();
            if (this.state.location != null) {console.log(this.state.location);
                locationDetails=responseJson;
                locationDetails["location"]=this.state.location;
                response = await fetch('https://fredfoodbank.herokuapp.com/getNearestPantry', {
                    method: 'GET',
                    body: JSON.stringify(locationDetails)
                });
                responseJson = await response.json();
                this.setState({ nearestPantry: responseJson });
            }*/
        } catch (error) {
            _retrieveData = async () => {
                const pantryList = await AsyncStorage.getItem("pantryList")
                const areaList = await AsyncStorage.getItem("areaList")
                if (pantryList != null && areaList != null) {
                    this.setState({ pantryList: pantryList, areaList: areaList });
                    this.setState({ isRefreshing: false })
                }
            }
        }
    }
    /* async getLocationAsync() {
         let { status } = await Permissions.askAsync(Permissions.LOCATION);
         if (status === "granted") {
             let location = await Location.getCurrentPositionAsync({});
             location= await Location.reverseGeocodeAsync(location);
             this.setState({ location });
         }
     }*/
    filterList() {

    }
    componentDidMount() {
        this.getPantries()
        console.log(this.state.pantryList)
    }
    constructor() {
        super();
        this.state = {
            notification: {},
            pantryList: [],
            filteredAreaList: [],
            filter:'',
            location: null,
            nearestPantry: null,
            isRefreshing: true,
        }
    }

    render() {
        console.log(this.state.pantryList)
        return (
            <View style={styles.container}>
            <Searchbar placeholder="Search for a locality" onChangeText={query => { 
                                  this.setState({filter:query,filteredAreaList: this.state.areaList.filter((area)=>{return area.includes(query)})});
    
 }} style={{ margin:5}} value={this.state.searchQuery} />
           {/*<Text style={{fontSize:20, fontWeight:'bold'}}> Nearest Pantry</Text>\
            {this.props.nearestPantry!=null ? (<Text>dur</Text>): (<ActivityIndicator size="large" color="#F59300" />)}
            <Text style={{fontSize:20, fontWeight:'bold'}}> More pantries: </Text>*/}
            <FlatList data={this.state.filteredAreaList} 
            renderItem={({item})=><LocationCard areaName={item} navigation={this.props.navigation} pantryList={this.state.pantryList[`${item}`]}></LocationCard>}
            ListEmptyComponent={<Text style={{fontSize:20, fontWeight:'bold', textAlign:'center', textAlignVertical: "center"}}>Loading pantries</Text>}
            refreshing={this.state.isRefreshing}
            onRefresh={()=>this.getPantries()}></FlatList>
      
    </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'flex-start',
    },
});