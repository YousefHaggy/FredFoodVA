import React, { Component } from 'react';
import { AsyncStorage, Platform, StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import PantryCard from "./components/PantryCard"
import LocationCard from "./components/LocationCard"
import config from './config/config'
import { Notifications } from 'expo'
export default class HomeScreen extends Component {
    async getPantries() {
        try {
            this.setState({ isRefreshing: true })
            let response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.sheets.spreadsheetId}/values/A2:E?key=${config.sheets.apiKey}`);
            let responseJson = await response.json();
            let areaList = new Array();
            let pantryList = new Object();
            responseJson.values.forEach((value, index) => {
                if (!areaList.includes(value[0])) {
                    areaList.push(value[0])
                    pantryList[value[0]] = new Array();
                }
                pantryList[value[0]].push(value)
            });
            this.setState({ pantryList: pantryList, areaList: areaList });
            this.setState({ isRefreshing: false });
            _storeData = async () => {
                try {
                    await AsyncStorage.setItem("pantryList", pantryList)
                    await AsyncStorage.setItem("areaList", areaList)
                } catch (error) {}
            }
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
    componentDidMount() {
        this.getPantries()
        console.log(this.state.pantryList)
    }
    constructor() {
        super();
        this.state = {
            notification: {},
            pantryList: [],
            isRefreshing: true
        }
    }

    render() {
        console.log(this.state.pantryList)
        return (
            <View style={styles.container}>
            <FlatList data={this.state.areaList} 
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