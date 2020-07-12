import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, Button, AppRegistry } from 'react-native'

import {NavigationEvents} from 'react-navigation';

import { heightPercentage, widthPercentage } from './ResponsiveTool'

export default class StackBar extends React.Component {

    constructor (props) {
        super(props)
    }


    render () {
        return (
            <View style={{flexDirection: "row", height: heightPercentage('7%'), width: widthPercentage('100%'), backgroundColor:"#1E1E1E", borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}>

                <TouchableOpacity style={{marginVertical: heightPercentage('2%'), marginLeft: widthPercentage('4.5%') }}activeOpacity={0.7} onPress={() => this.props.onPushButton()}>
                    <Image source={require("../assets/back-icon.png")} style={{height: heightPercentage('3%'), width: heightPercentage('3%'), tintColor: "#FFFFFF", resizeMode: "cover"}} ></Image>
                </TouchableOpacity>
                
                <View style={{height: heightPercentage('7%'), marginTop: heightPercentage('1.7%')}}> 
                {/* justifyContent: 'center' */}
                    {/* <Image source={require("../assets/Logo.png")} style={{height: heightPercentage('3.5%'), width: heightPercentage('3.5%'), resizeMode: "cover"}} ></Image> */}
                    <Text style={{color: "#FFFFFF", fontSize: 20, marginLeft: widthPercentage('9%')}} >
                        Settings
                    </Text>
                </View>

            </View>
        )
    }
}