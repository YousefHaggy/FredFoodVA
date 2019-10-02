import React, { Component } from 'react';
import { Linking, Platform, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base'
export default class PantryCard extends Component {
    _getDirections(location) {
        let encodedAddress = encodeURIComponent(location)
        console.log(encodedAddress)
        if (Platform.OS == "ios") {
            Linking.openURL(`http://maps.apple.com/?daddr=${encodedAddress}`)
        } else {
            Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`)
        }
    }

    render() {
        var hours = this.props.pantry['hours'];
        var services = this.props.pantry['services']
        var hasHours = false;
        var hasServices = false;
        return (
            <View style={styles.card}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>{this.props.pantry['name']} </Text>
            <Text  style={{fontSize:15}}>{this.props.pantry['address']}</Text>
            <Text style={{fontSize:15}}>Phone: <Text style={{color:'blue'}} onPress={()=>Linking.openURL(`tel:${this.props.pantry['phone']}`)}>{this.props.pantry['phone']}</Text></Text>
            {
                Object.keys(hours).map(function(key,index){
                    if(hours[key]['hours']!=""){
                        if(!hasHours){
                            hasHours=true
                            return ([<Text style={{fontSize:17, fontWeight:'bold'}}>Hours of Operation: </Text>,<Text style={{fontSize:15}}>- {hours[key]['frequency']} {key}: {hours[key]['hours']}</Text>])
                        }
                        else
                       return (<Text style={{fontSize:15}}>- {hours[key]['frequency']} {key}: {hours[key]['hours']}</Text>)
                    }
                })
            }
             {
                Object.keys(services).map(function(key,index){
                    if(services[key]!=""){
                        if(!hasServices){
                                hasServices=true;
                                 return ([<Text style={{fontSize:18, fontWeight:'bold'}}>Services: </Text>,<Text style={{fontSize:15}}>- {key}</Text>])
                        }
                        else
                       return (<Text style={{fontSize:15}}>- {key}</Text>)
                    }
                })
            }
            { this.props.pantry['notes']!=""? (
                [<Text style={{fontSize:17, fontWeight:'bold'}}>Operations Note:</Text>,
                <Text style={{fontSize:15}}>{this.props.pantry['notes']}</Text>]
                )
             :
             null }
            <Button small style={{justifyContent:'center', marginTop:10, backgroundColor:'#F59300'}} onPress={()=>this._getDirections(this.props.pantry['address'])}><Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Get Directions</Text></Button>
            </View>
        );
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
        fontSize: 20,
        textAlign: 'left',
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