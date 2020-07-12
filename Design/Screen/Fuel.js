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

export default class Fuel extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            fuel: 0,
            value_actual_fuel: 50,
            last_fill_fuel: new Date("2020-07-10"),
            distance_left: 200,
            consomation_per_kilometer_max: 10.4, 
            consomation_per_kilometer: 7.5,
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
                    Fuel
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: heightPercentage("3%")}}>
                <View style={{width: widthPercentage("50%")}}>
                    <GaugeProgress style={styles.AnimatedGaugeProgress}
                        size={widthPercentage('40%')}
                        width={9}
                        fill={this.state.value_actual_fuel}
                        rotation={90}
                        cropDegree={90}
                        tintColor="#2c84cc"
                        delay={0}
                        backgroundColor="#C2d5ef"
                        stroke={[2, 2]}
                        strokeCap="circle">
                            <View style={styles.ViewValue}>
                                <Text style={styles.ValueActualVolume}>{this.state.value_actual_fuel}%</Text>
                            </View>
                    </GaugeProgress>
                </View>
                <View style={{width: widthPercentage("50%"), marginLeft: heightPercentage("2.5%")}}>
                        <Text style={styles.Text}>{"Last fill of fuel:\n" + this.formatDate(this.state.last_fill_fuel)}</Text>
                        <Text style={styles.Text}>{"Remaining distance:\n" + this.state.distance_left + "km"}</Text>
                </View>
            </View>
                <Text style={{color: "#FFFFFF", fontSize: 15, marginTop: heightPercentage("5%"), marginLeft: heightPercentage("4%")}}>{"Fuel consumption (L/100km):\n"}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: "#FFFFFF", fontSize: 15, marginLeft: widthPercentage("14%")}}>{"0"}</Text>
                <Text style={{color: "#FFFFFF", fontSize: 15, marginLeft: widthPercentage("66%")}}>{this.state.consomation_per_kilometer_max}</Text>
            </View>
            <View style={{width: widthPercentage("70%"), marginLeft: widthPercentage("15%")}}>
                <Progress.Bar style={{marginTop: heightPercentage("2%")}} borderWidth={0} color='rgba(44,132,204,1)' unfilledColor="#C2d5ef" 
                progress={this.state.consomation_per_kilometer/this.state.consomation_per_kilometer_max} height={9} width={widthPercentage("70%")}/>
                <Text style={{color: "#FFFFFF", fontSize: 15, 
                    marginLeft:(widthPercentage((70 * this.state.consomation_per_kilometer/this.state.consomation_per_kilometer_max).toString() - 2  + "%")),
                    marginTop: heightPercentage("2%")}}>
                    {this.state.consomation_per_kilometer}</Text>
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
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                        ]
                        }
                    ]
                    }}
                    width={widthPercentage("96%")} // from react-native
                    height={heightPercentage('33%')}
                    yAxisLabel=""
                    yAxisSuffix="L"
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