import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet} from 'react-native'

export default class SocialCard extends Component{
	render(){
		return(
			<View style={styles.card}>
			<Text style={{fontSize:20}}>{this.props.tweetText}</Text>
			</View>
			)
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