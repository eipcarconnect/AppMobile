import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, Button, AppRegistry } from 'react-native'

import {NavigationEvents} from 'react-navigation';

import { heightPercentage, widthPercentage } from './ResponsiveTool'

export default class NavBar extends React.Component {

    constructor (props) {
        super(props)
    }


    render () {
        return (
            <View style={{flexDirection: "row", height: heightPercentage('7%'), width: widthPercentage('100%'), backgroundColor:"#1E1E1E", borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}>

                <TouchableOpacity style={{height: heightPercentage('5%'), marginVertical: heightPercentage('1.75%'), marginLeft: widthPercentage('3%') }}activeOpacity={0.7} onPress={() => this.props.onPushButton()}>
                    <Image source={require("../assets/Menu2.png")} style={{height: heightPercentage('3.5%'), width: heightPercentage('3.5%'), tintColor: "#DDDDDD", resizeMode: "cover"}} ></Image>
                </TouchableOpacity>
                <View style={{height: heightPercentage('7%'), width: widthPercentage('80%'),justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require("../assets/Logo.png")} style={{height: heightPercentage('3.5%'), width: heightPercentage('3.5%'), resizeMode: "cover"}} ></Image>
                </View>
            </View>
        )
    }
}