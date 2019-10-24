import React, { Component } from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import SocialCard from './components/SocialCard'
export default class SocialScreen extends Component {
    async getTweets() {
        try {
            this.setState({ isRefreshing: true })
            let response = await fetch('http://fredfoodbank.herokuapp.com/return_tweets');
            let responseJson = await response.json();
            let tweets = responseJson.result;
            tweets.push({'tweet':"Welcome to the Fredericksburg Regional Food Bank App! Import updates from the food bank will be posted in this tab ",'date':"11:00 AM - 24 Oct 2019",'pic':null});
            this.setState({
                tweets: tweets,
                isRefreshing: false
            });
        } catch (error) {

        }
    }
    constructor() {
        super();
        this.state = {
            tweets: [],
            isRefreshing: true
        }
    }
    componentDidMount() {
        this.getTweets()
    }
    render() {
        return (
            <FlatList data={this.state.tweets} renderItem={({item})=><SocialCard tweetText={item['tweet']} 
			tweetPicture={item['pic']}
			tweetDate={item['date']}
			/>
        }
        ListEmptyComponent = { <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center', textAlignVertical: "center"}}>
			Loading updates, please ensure you have an internet connection</Text> }
        refreshing = { this.state.isRefreshing }
        onRefresh = {
            () => this.getTweets()
        }
        />
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'flex-start'
    }
});