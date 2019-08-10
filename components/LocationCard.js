import React, { Component } from 'react'
import { Stylesheet, Text, View, Button, TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
export default class LocationCard extends Component{
	render(){
		return(
		<TouchableOpacity style={{height:'auto',justifyContent:'space-between', flexDirection:'row', elevation:5, padding:5, borderRadius:3, margin: 5, backgroundColor:'#FFF'}}>
			<Text style={{fontSize:20, fontWeight:'bold'}}> {this.props.pantryName} </Text>
			<FontAwesomeIcon icon={ faChevronRight } style={{alignSelf:'center', color:"#F59300"}}>test </FontAwesomeIcon>
		
		</TouchableOpacity>
	)	
	}
}