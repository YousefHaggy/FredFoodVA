import React, { Component } from 'react';
import { Linking, Platform, Text, View, StyleSheet, Image } from 'react-native'

export default class SocialCard extends Component {
    render() {
        return (
            <View style={styles.card}>
			<Text style={{fontSize:20, fontWeight:'bold', color:'#F59300'}}> {this.props.tweetDate} </Text>
			<Text style={{fontSize:18}}>{this.props.tweetText}</Text>
			{this.props.tweetPicture!=null ?(<Text style={{fontSize:18, color:'blue'}} onPress={()=>Linking.openURL(this.props.tweetPicture)}>{this.props.tweetPicture}</Text>):null}
			<Image source={{uri: this.props.tweetPicture}} style={{width:undefined,height:undefined, flex:1}}/>
			</View>
        )
    }
}
const styles = StyleSheet.create({
    card: {
        height: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: 5,
        flexWrap: 'wrap',
        borderRadius: 3,
        margin: 5,
        backgroundColor: '#FFF',
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
            },
            android: {
                elevation: 5
            }
        }),

    }
});
