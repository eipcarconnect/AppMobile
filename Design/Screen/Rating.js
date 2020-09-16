import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, AppRegistry } from 'react-native'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
import { Rating, AirbnbRating } from 'react-native-ratings';

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

export default class RatingApp extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            rate: 3,
            message: ""
        }
    }

    toggleSignIn() {
          
        }

    submit()
    {
        console.log(this.state.rate)
        console.log(this.state.message)

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var date = dd + "-" + mm + "-" + yyyy;

        console.log(global.name)
        console.log(this.state.rate.toString())



        var data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Date: date,
                User: global.name,
                Platform: "android",
                Rate: this.state.rate.toString(),
                Message: this.state.message,
            }),
          }
          
          fetch('http://13.79.21.93:80/', data).then((res) => res.text())
            .then((restext) => {
              alert("Your evaluation has been sent.")
            })
            .catch((error) => {
              alert(error);
            })
    }

    render () {
    return (
        <View style={styles.View}>
            <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
            <View style={{width: widthPercentage("100%"), marginTop: heightPercentage("4%")}}>
                <Text style={styles.Title}>
                    How was your experience ?
                </Text>
                <View style={{marginVertical: heightPercentage('4%'), alignItems: 'center'}} >
                    <AirbnbRating 
                    count={5}
                    reviews={["Terrible", "Bad", "OK", "Good", "Perfect"]}
                    defaultRating={3}
                    reviewColor='#2c84cc'
                    selectedColor='#2c84cc'
                    size={30}
                    onFinishRating={(value) => {this.setState({rate: value}); console.log(value)}}
                    />
                </View>
                <View style={{width: widthPercentage('100%'), marginVertical: heightPercentage('3%'), alignItems: 'center'}} >
                    <TextInput
                    style={{ height: heightPercentage('40'), width: widthPercentage('86%'), borderColor: 'gray', borderWidth: 1, color: '#FFFFFF' }}
                    maxLength={250}
                    multiline={true}
                    placeholder="Comment..."
                    placeholderTextColor="#AAAAAA"
                    textAlignVertical= "top"
                    onChangeText={text => this.setState({message: text})}
                    value={this.state.message}
                    />
                </View>
                <View style={{width: widthPercentage('100%'), marginVertical: heightPercentage('3%'), alignItems: 'center'}} >
                    <Button
                        onPress={() => this.submit()}
                        title="Submit"
                        buttonStyle={{
                            height: heightPercentage('6%'),
                            width: widthPercentage('60%'),
                            backgroundColor:"#2c84cc"
                        }}>
                    </Button>
                </View>
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
        fontSize: 26,
    },
    Button: {
        height: heightPercentage('10%'),
        width: widthPercentage('70%'),
        marginHorizontal: widthPercentage('15%'),
        backgroundColor:"#2c84cc"
    },
})