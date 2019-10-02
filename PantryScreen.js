import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native'
import PantryCard from './components/PantryCard'
export default class PantryScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', '')
        };
    }
    render() {
        let pantryList = this.props.navigation.getParam('pantryList', '').sort();
        console.log("LIST" + pantryList)
        return (
            <FlatList data={this.props.navigation.getParam('pantryList','').sort(function(a,b){return (a['name']>b['name']? 1:-1)})} 
            renderItem={({item})=><PantryCard pantry={item} ></PantryCard>}
         ></FlatList>
        );
    }
}