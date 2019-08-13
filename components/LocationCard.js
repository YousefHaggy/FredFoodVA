import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
export default class LocationCard extends Component{
	render(){
		console.log(this.props.pantryList)
		return(
		<TouchableOpacity style={styles.card} onPress={()=>this.props.navigation.navigate("Pantries",{pantryList:this.props.pantryList, title:this.props.areaName})}>
			<Text style={{fontSize:20, fontWeight:'bold'}}> {this.props.areaName} </Text>
			<FontAwesomeIcon icon={ faChevronRight } style={{alignSelf:'center', color:"#F59300"}}>test </FontAwesomeIcon>
		 
		</TouchableOpacity>
	)	
	}
}
const styles= StyleSheet.create({
	card:{
		height:'auto',
		justifyContent:'space-between',
		flexDirection:'row',
		padding:5,
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