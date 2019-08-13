import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base'
export default class PantryCard extends Component{
	render(){
		return(
			<View style={styles.card}>
			<Text style={{fontSize:20, fontWeight:'bold'}}> {this.props.pantryName} </Text>
			<Text>{this.props.pantryAddress}</Text>
			<Text>{this.props.pantryHours}</Text>
			<Button small style={{justifyContent:'center', marginTop:10, backgroundColor:'#F59300'}}><Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Get Directions</Text></Button>
		
			</View>
		);
	}
}
const styles= StyleSheet.create({
	card:{
		height:'auto',
		justifyContent:'space-between',
		flexDirection:'column',
		padding:5,
		flexWrap:'wrap',
		borderRadius:3,
		margin: 5, 
		backgroundColor:'#FFF',
		...Platform.select({
			ios:{
				shadowColor:"#000",
				shadowOffset: { width:0, height:1},
				shadowOpacity:0.8,
				shadowRadius:1,
			},
			android:{
				elevation:5
			}
		}),

	}
}); 