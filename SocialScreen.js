import React, { Component} from 'react';
import { Text , StyleSheet, FlatList} from 'react-native';
import SocialCard from './components/SocialCard'
export default class SocialScreen extends Component{
	async getTweets(){
		try{
			let response= await fetch('http://fredfoodbank.pythonanywhere.com/return_tweets');
			let responseJson= await response.json();
			let tweets=responseJson.result;
			this.setState({
				tweets:tweets,
			});
		}
		catch(error)
		{

		}
	}
	constructor(){
		super();
		this.state={
			tweets:[],
		}
	}
	componentDidMount(){
		this.getTweets()
	}
	render(){
		return(
			<FlatList data={this.state.tweets} renderItem={({item})=><SocialCard tweetText={item} />} 
			ListEmptyComponent={<Text style={{fontSize:20, fontWeight:'bold', textAlign:'center', textAlignVertical: "center"}}>Loading updates</Text>}
			/>
					)
}
}
const styles= StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#eeeeee',
		justifyContent:'flex-start'
	}
});