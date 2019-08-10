import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
export default class PantryCard extends Component{
	render(){
		return(
			<View style={{height:'auto',justifyContent:'center', flexDirection:'column', elevation:5, padding:5, borderRadius:3, margin: 5, backgroundColor:'#FFF'}}>
			<Text style={{fontSize:20, fontWeight:'bold'}}> {this.props.pantryName} </Text>
			<Button title="test" color='#F59300' style={{justifyContent:'center', color:'black'}}></Button>
			<Text>{this.props.pantryAddress}</Text>
			</View>
		);
	}
}