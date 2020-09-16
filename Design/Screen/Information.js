import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, AppRegistry } from 'react-native'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';

import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import * as Progress from 'react-native-progress';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

import NavBar from '../Tools/NavBar';

export default class Information extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            brand: "Volkswagen",
            model: "Polo 7",
            kilometers: 24000,
            kilometers_last_fill: 222,
            maxkilometer_last_fill: 430,
            date_first_log: new Date("1995-07-10"),
            park: true,
            lock: true
        }
    }

    formatDate(date) {
        date = new Date(date);
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    parking() {
        if (this.state.park ==true)
        return (
            <View style={{width: widthPercentage("50%"), alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require("../assets/parking.png")} style={{width: heightPercentage('5%'), height: heightPercentage('5%'), marginBottom:heightPercentage("1%"), tintColor: "#2c84cc"}}></Image>
                <Text style={{color: "#2c84cc", fontSize: 20}}>Park</Text>
            </View>
        )
        else
        return (
            <View style={{width: widthPercentage("50%"), alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require("../assets/parking.png")} style={{width: heightPercentage('5%'), height: heightPercentage('5%'), marginBottom:heightPercentage("1%"), tintColor: "#AAAAAA"}}></Image>
                <Text style={{color: "#AAAAAA", fontSize: 20}}>Mouving</Text>
            </View>
        )
    }

    lock() {
        if (this.state.lock ==true)
        return (
            <View style={{width: widthPercentage("50%"), alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require("../assets/key.png")} style={{width: heightPercentage('5%'), height: heightPercentage('5%'), marginBottom:heightPercentage("1%"), tintColor: "#2c84cc"}}></Image>
                <Text style={{color: "#2c84cc", fontSize: 20}}>Lock</Text>
            </View>
        )
        else
        return (
            <View style={{width: widthPercentage("50%"), alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require("../assets/key.png")} style={{width: heightPercentage('5%'), height: heightPercentage('5%'), marginBottom:heightPercentage("1%"), tintColor: "#AAAAAA"}}></Image>
                <Text style={{color: "#AAAAAA", fontSize: 20}}>Unlock</Text>
            </View>
        )
    } 

    render () {
    return (
        <View style={styles.View}>
            <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
            <View style={{width: widthPercentage("100%"), marginTop: heightPercentage("3%")}}>
                <Text style={styles.Title}>
                    Information
                </Text>
            </View>
            <View style={{width: widthPercentage('100%'), marginTop: heightPercentage("5%")}}>
                <Text style={{color: "#FFFFFF", textAlign:"center", fontSize: 28}}>
                    {this.state.brand}
                </Text>
                <Text style={{color: "#FFFFFF", textAlign:"center", fontSize: 25}}>
                    {this.state.model}
                </Text>
            </View>
            <View style={{flexDirection: 'row', height: heightPercentage("9%"), marginTop: heightPercentage("5%")}}>
                {this.parking()}
                {this.lock()}
            </View>
            <View style={{width: widthPercentage('100%'), marginTop: heightPercentage("5%")}}>
                <Text style={{color: "#FFFFFF", fontSize: 23, textAlign: "center"}}>
                    {this.state.kilometers} km
                </Text>
            </View>
                <Text style={{color: "#FFFFFF", fontSize: 15, marginTop: heightPercentage("5%"), marginLeft: heightPercentage("4%")}}>{"Kilometers per full tank:\n"}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: "#FFFFFF", fontSize: 15, marginLeft: widthPercentage("14%")}}>{"0"}</Text>
                <Text style={{color: "#FFFFFF", fontSize: 15, marginLeft: widthPercentage("66%")}}>{this.state.maxkilometer_last_fill}</Text>
            </View>
            <View style={{width: widthPercentage("70%"), marginLeft: widthPercentage("15%")}}>
                <Progress.Bar style={{marginTop: heightPercentage("2%")}} borderWidth={0} color='rgba(44,132,204,1)' unfilledColor="#C2d5ef" 
                progress={this.state.kilometers_last_fill/this.state.maxkilometer_last_fill} height={9} width={widthPercentage("70%")}/>
                <Text style={{color: "#FFFFFF", fontSize: 15, 
                    marginLeft:(widthPercentage((70 * this.state.kilometers_last_fill/this.state.maxkilometer_last_fill).toString() - 3  + "%")),
                    marginTop: heightPercentage("2%")}}>
                    {this.state.kilometers_last_fill}</Text>
            </View>
            <View style={{width: widthPercentage("100%"), height: heightPercentage("10%"), marginTop:heightPercentage("5%")}}>
                <Button
                    onPress={() => {}}
                    title="Diagnostic"
                    buttonStyle={styles.Button}
                    titleStyle={{fontSize: 22}}>>
                </Button>
            </View>
        </View>
    )
    }
}

const styles = StyleSheet.create({
    View: {
        flex:1,
        backgroundColor: "#1E1E1E",
    },
    ViewValue: {
        position: 'absolute',
        top: heightPercentage('3%'),
        left: widthPercentage('10%'),
        width: widthPercentage('20%'),
        height: heightPercentage('11%'),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white'
    },
    ValueActualVolume: {
        color: "#FFFFFF",
        fontSize: 30,
    },
    Text:{
        color: "#FFFFFF",
        fontSize: 20,
        marginTop: heightPercentage('3%')
    },
    AnimatedGaugeProgress: {
        marginTop: heightPercentage('1%'),
        marginLeft: widthPercentage('10%')
    },
    Title: {
        color: "#FFFFFF",
        textAlign:"center",
        fontSize: 30,
    },
    Button: {
        height: heightPercentage('10%'),
        width: widthPercentage('70%'),
        marginHorizontal: widthPercentage('15%'),
        backgroundColor:"#2c84cc"
    },
})