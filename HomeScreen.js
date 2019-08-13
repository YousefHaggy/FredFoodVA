import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import PantryCard from "./components/PantryCard"
import LocationCard from "./components/LocationCard"
import config from './config/config'
export default class HomeScreen extends Component {
    async getPantries() {
        try {
            let response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.sheets.spreadsheetId}/values/A2:E?key=${config.sheets.apiKey}`);
            let responseJson = await response.json();
            let areaList = new Array();
            let pantryList= new Object();
            responseJson.values.forEach((value, index) => {
                if (!areaList.includes(value[0])) {
                    areaList.push(value[0])
                    pantryList[value[0]]=new Array();
                }
                pantryList[value[0]].push(value)
            });
            this.setState({ pantryList: pantryList, areaList: areaList });
        } catch (error) {
            console.log('error')
        }
    }
    componentDidMount() {
        this.getPantries()
        console.log(this.state.pantryList)
    }
    constructor() {
        super();
        this.state = {
            pantryList: [],
        }
    }
    render() {
      console.log(this.state.pantryList)
        return (
            <View style={styles.container}>
            <FlatList data={this.state.areaList} 
            renderItem={({item})=><LocationCard areaName={item} navigation={this.props.navigation} pantryList={this.state.pantryList[`${item}`]}></LocationCard>}
            ListEmptyComponent={<Text  style={{fontSize:20, fontWeight:'bold', textAlign:'center', marginTop:10}}>Loading pantries</Text>}></FlatList>
      
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