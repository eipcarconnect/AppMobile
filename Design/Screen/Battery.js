import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, Button, AppRegistry } from 'react-native'
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

export default class Battery extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            fuel: 0,
            value_actual_battery: 65,
            time_remaining: "12h34",
            generation: 5,
            consomation_max: 5, 
            consomation: 3,
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

    render () {
    return (
        <View style={styles.View}>
            <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
            <View style={{width: widthPercentage("100%"), marginTop: heightPercentage("3%")}}>
                <Text style={styles.Title}>
                    Battery
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: heightPercentage("3%")}}>
                <View style={{width: widthPercentage("50%")}}>
                    <GaugeProgress style={styles.AnimatedGaugeProgress}
                        size={widthPercentage('40%')}
                        width={9}
                        fill={this.state.value_actual_battery}
                        rotation={90}
                        cropDegree={90}
                        tintColor="#2c84cc"
                        delay={0}
                        backgroundColor="#C2d5ef"
                        stroke={[2, 2]}
                        strokeCap="circle">
                            <View style={styles.ViewValue}>
                                <Text style={styles.ValueActualVolume}>{this.state.value_actual_battery}%</Text>
                            </View>
                    </GaugeProgress>
                </View>
                <View style={{width: widthPercentage("50%"), marginLeft: heightPercentage("2.5%")}}>
                        <Text style={styles.Text}>{"Time remaining:\n" + this.state.time_remaining}</Text>
                        <Text style={styles.Text}>{"Generated power:\n" + this.state.generation + "kw/H"}</Text>
                </View>
            </View>
                <Text style={{color: "#FFFFFF", fontSize: 15, marginTop: heightPercentage("5%"), marginLeft: heightPercentage("4%")}}>{"Electicity consumption (Kw/24h):\n"}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: "#FFFFFF", fontSize: 15, marginLeft: widthPercentage("14%")}}>{"0"}</Text>
                <Text style={{color: "#FFFFFF", fontSize: 15, marginLeft: widthPercentage("66%")}}>{this.state.consomation_max}</Text>
            </View>
            <View style={{width: widthPercentage("70%"), marginLeft: widthPercentage("15%")}}>
                <Progress.Bar style={{marginTop: heightPercentage("2%")}} borderWidth={0} color='rgba(44,132,204,1)' unfilledColor="#C2d5ef" 
                progress={this.state.consomation/this.state.consomation_max} height={9} width={widthPercentage("70%")}/>
                <Text style={{color: "#FFFFFF", fontSize: 15, 
                    marginLeft:(widthPercentage((70 * this.state.consomation/this.state.consomation_max).toString() - 2  + "%")),
                    marginTop: heightPercentage("2%")}}>
                    {this.state.consomation}</Text>
            </View>
            <View>
                <LineChart
                    data={{
                    labels: [ "2", "4", "6", "8", 
                    "10", "12", "14", "16", "18", "20",
                    "22", "24", "26", "28", "30" ],
                    datasets: [
                        {
                        data: [
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                            Math.random() * 10,
                        ]
                        }
                    ]
                    }}
                    width={widthPercentage("96%")} // from react-native
                    height={heightPercentage('33%')}
                    yAxisLabel="H"
                    yAxisSuffix="KW"
                    yAxisInterval={1}
                    xAxisInterval={10} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#353535",
                        backgroundGradientFrom: "#1C1C1C",
                        backgroundGradientTo: "#1C1C1C",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "3",
                            strokeWidth: "1",
                            stroke: "#DDDDDD"
                        }
                    }}
                    bezier
                    style={{
                        marginTop: heightPercentage("4%"),
                        marginLeft: widthPercentage("2%")
                    }}
                />
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
        fontSize: 15,
        marginTop: heightPercentage('3%')
    },
    AnimatedGaugeProgress: {
        marginTop: heightPercentage('1%'),
        marginLeft: widthPercentage('10%')
    },
    Title: {
        color: "#DDDDDD",
        textAlign:"center",
        fontSize: 30,
    },
})