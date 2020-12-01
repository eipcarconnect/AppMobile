import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, AppRegistry } from 'react-native'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
//import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import * as Progress from 'react-native-progress';

import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

import { deletSaved } from '../Tools/Storage'

import NavBar from '../Tools/NavBar';

const rideState = {
    rideName: 'Aucun',
    rideDate: '',
    rideStart: '',
    rideEnd: ''
}

export default class Home extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {},
            elements: [],
            
            brand: global.car.brand,
            model: global.car.model,
            numberplate: global.car.numberplate,
            ...rideState,
            kilometer: "23 871",
            fuel: 10,
            maxfuel: 100
        }
    }

    componentDidMount() {
        this.getUser()
        this.Refresh()
    }

    getCarList() {
        deletSaved("car");
        var data = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: global.token,
          }),
        }
        fetch('http://40.85.113.74:3000/data/user/getvehicles', data).then((res) => res.json())
          .then((resjson) => {
            if (resjson.success === true) {
              global.carList = resjson.vehicles;
              console.log('getCarList OK');
            }
            else {
              alert(resjson.error);
              console.log("getCarList", resjson.error);
              return;
            }
          });
      }

    async getUser() {
        try
        {
            let res = await AsyncStorage.getItem("HomePageConfiguration");
            if (res == null)
            {
                res = "Information " + widthPercentage("2.5%") + " " + heightPercentage("10%") + "\n" +
                        "Battery " + widthPercentage("2.5%") + " " + heightPercentage("26%") + "\n" +
                        "Fuel " + widthPercentage("52.5%") + " " + heightPercentage("26%")
                await AsyncStorage.setItem("HomePageConfiguration", res);
            }
            this.setState({
                elements: []
            })
            let i = 0;
            let saveElement = res.split("\n")
            while (saveElement[i]) 
            {
                this.state.elements.push(saveElement[i])
                this.setState({
                    elements: this.state.elements
                })
                i++
            }
        }
        catch(error) {console.log(error)}
    }

    Refresh() {
        console.log(global.actualRide);
       this.setState({brand: global.car.brand, model: global.car.model, numberplate: global.car.numberplate});
        if(global.actualRide !== null)
            if(!global.actualRide.date.includes('/')) {
                this.setState({
                    rideName: global.actualRide.name, 
                    rideDate: global.actualRide.date, 
                    rideStart: global.actualRide.start,
                    rideEnd: global.actualRide.end
                });
            }
            else {
                this.setState({
                    rideName: global.actualRide.name,
                    rideDate: this.formatDate(new Date(this.parseDate(global.actualRide.date))),
                    rideStart: global.actualRide.start,
                    rideEnd: global.actualRide.end
                });
            }
        else 
         this.setState({...rideState});
    }

    textScales(maxsize, width, charnumber)
    {
        let s = (width / charnumber);
        if (s > maxsize)
            return {fontSize: maxsize}
        return {fontSize: s}
    }

    goToAddInvoice() {
        console.log(global.actualRide);
        if (global.actualRide === null) {
            alert("Veuillez créer ou sélectionner un trajet avant de créer une facture");
            return;
        }
        else
            this.props.navigation.navigate('AddInvoice');

    }

    formatDate(date) {
        var monthNames = [
            "Janvier", "Février", "Mars",
            "Avril", "Mai", "Juin", "juillet",
            "Août", "Septembre", "Octobre",
            "Novembre", "Décembre"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    parseDate(date) {
        let ret = date.split('/');
        return (ret[1] + '/' + ret[0] + '/' + ret[2]);
    }

    actualTravel()
    {
        if (global.actualRide === null)
        {
            return (
                <View 
                    style={{width: widthPercentage("88%"),
                    //height: heightPercentage("30%"),
                    backgroundColor: "#2F2F2F",
                    marginTop: heightPercentage("3%"),
                    elevation: 10
                    }}>
                    <Text style={{marginTop: heightPercentage('2%'),marginBottom: widthPercentage("2%"), color: "white", textAlign: "center", fontSize: 20, width: widthPercentage("85%")}}>
                    Aucun trajet selectionné
                    </Text>
                    <Button
                        onPress={() => {this.props.navigation.navigate('RouteSelection')}}
                        title="SELECTIONNER UN TRAJET"
                        buttonStyle={{
                            height: heightPercentage('5%'),
                            width: widthPercentage('80%'),
                            marginTop: heightPercentage('1%'),
                            marginBottom: heightPercentage('2%'),
                            marginHorizontal: widthPercentage('4%'),
                            backgroundColor: "#2c84cc",
                        }}
                        titleStyle={{fontSize: 18}}>
                    </Button>
                </View>
            );
        }
        else
        {
            return (
                <View 
                style={{width: widthPercentage("88%"),
                    //height: heightPercentage("30%"),
                    backgroundColor: "#2F2F2F",
                    marginTop: heightPercentage("3%"),
                    elevation: 10
                    }}>
                    <Text style={{marginTop: heightPercentage('2%'), color: "white", textAlign:"center", fontSize: 25, width: widthPercentage("88%")}}>
                        {this.state.rideName.charAt(0).toUpperCase() + this.state.rideName.slice(1)}
                    </Text>
                    <View style={{ marginTop: heightPercentage('1%'), marginBottom: heightPercentage('1%'), width: widthPercentage("88%")}}> 
                        <View style={{}}>
                            <Text style={{color: "white", width:widthPercentage("88%"), textAlign:"center"}}>{this.state.rideDate}</Text>
                        </View>
                        <View style={{marginTop: heightPercentage('1%')}}>
                            <Text style={{color: "#2c84cc", marginLeft: widthPercentage("4%")}}>Depart:</Text>
                            <Text style={{color: "white", width:widthPercentage("88%"), textAlign:"center"}}>{this.state.rideStart}</Text>
                        </View>
                        <View style={{marginTop: heightPercentage('1%') }}>
                            <Text style={{color: "#2c84cc", marginLeft: widthPercentage("4%")}}>Arrivée:</Text>
                            <Text style={{color: "white", width:widthPercentage("88%"), textAlign:"center"}}>{this.state.rideEnd}</Text>
                        </View>
                    </View>
                    <Button
                    onPress={() => {this.props.navigation.navigate('RouteSelection')}}
                        title="CHANGER LE TRAJET EN COURS"
                        buttonStyle={{
                            height: heightPercentage('5%'),
                            width: widthPercentage('80%'),
                            marginTop: heightPercentage('1%'),
                            marginBottom: heightPercentage('2%'),
                            marginHorizontal: widthPercentage('4%'),
                            backgroundColor: "#2c84cc",
                        }}
                        titleStyle={{fontSize: 18}}>
                        </Button>
                </View>
            )
        }
    }
 

    render () {
        return (
            <View style={styles.View}>
                <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
                <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
                    {/* <View style={{width: widthPercentage("88%"),
                                height: heightPercentage("10%"),
                                backgroundColor: "#2F2F2F",
                                marginTop: heightPercentage("2%"),
                                elevation: 10,
                                alignItems:"center"}}>
                        <Text
                            numberOfLines={1}
                            style={[this.textScales(30, widthPercentage("130%"), global.name.length),
                                {
                                    width: widthPercentage("80%"),
                                    height: heightPercentage("6%"),
                                    marginTop: heightPercentage("2%"),
                                    color: "white"
                                }
                            ]}>
                            Bonjour {global.name.split(" ")[0]}
                        </Text>
                    </View> */}
                    <View style={{width: widthPercentage("88%"),
                                // height: heightPercentage("25%"),
                                backgroundColor: "#2F2F2F",
                                marginTop: heightPercentage("3%"),
                                elevation: 10
                                }}>
                        <View style={{flexDirection: "row"}}>
                            <View style={{marginTop: heightPercentage("1%"), width: widthPercentage("88%"),  alignItems: "center"}}>
                                <Text
                                    numberOfLines={1}
                                    style={[this.textScales(25, widthPercentage("130%"), this.state.brand.length),
                                    {
                                        //width: widthPercentage("80%"),
                                            //height: heightPercentage("4%"),
                                            //textAlign: "center",
                                            //width: widthPercentage("85%"),
                                            marginTop: heightPercentage("1%"),
                                            //backgroundColor: "red",
                                            color: "white"
                                        }
                                    ]}>
                                    {this.state.brand}
                                </Text>
                                <Text 
                                    numberOfLines={1}
                                    style={[this.textScales(20, widthPercentage("130%"), this.state.model.length),
                                        {
                                            //width: widthPercentage("80%"),
                                            //height: heightPercentage("4%"),
                                            marginTop: heightPercentage("1%"),
                                            //backgroundColor: "red",
                                            color: "white"
                                        }
                                    ]}>
                                    {this.state.model}
                                </Text>
                                <Text 
                                    numberOfLines={1}
                                    style={[this.textScales(16, widthPercentage("130%"), this.state.numberplate.length),
                                    {
                                        //width: widthPercentage("80%"),
                                        //height: heightPercentage("4%"),
                                            marginTop: heightPercentage("1%"),
                                            //backgroundColor: "red",
                                            color: "white"
                                        }
                                    ]}>
                                    {this.state.numberplate}
                                </Text>
                            </View>
                        </View>
                        <View style={{}}>  
                            <Button
                            onPress={() => {this.getCarList();this.props.navigation.navigate('CarSelect')}}
                                title="CHANGER DE VEHICULE"
                                buttonStyle={{
                                    height: heightPercentage('5%'),
                                    width: widthPercentage('80%'),
                                    marginTop: heightPercentage('3%'),
                                    marginBottom: heightPercentage('2%'),
                                    marginHorizontal: widthPercentage('4%'),
                                    backgroundColor: "#2c84cc",
                                }}
                                titleStyle={{fontSize: 18}}>
                            </Button>
                        </View>
                    </View>
                    

                        {this.actualTravel()}


                    <View style={{width: widthPercentage("88%"),
                                height: heightPercentage("17%"),
                                backgroundColor: "#2F2F2F",
                                marginTop: heightPercentage("3%"),
                                elevation: 10
                                }}>
                        <Button
                            onPress={() => {
                            this.props.navigation.navigate('AddRoute')
                            }}
                            title="CREER UN TRAJET"
                            buttonStyle={{
                                height: heightPercentage('5%'),
                                width: widthPercentage('80%'),
                                marginTop: heightPercentage('2%'),
                                marginHorizontal: widthPercentage('4%'),
                                backgroundColor: "#2c84cc",
                            }}
                            titleStyle={{fontSize: 18}}>
                        </Button>
                        <Button
                        onPress={() => this.goToAddInvoice()}
                            title="CREER UNE FACTURE"
                            buttonStyle={{
                                height: heightPercentage('5%'),
                                width: widthPercentage('80%'),
                                marginTop: heightPercentage('3%'),
                                marginBottom: heightPercentage('2%'),
                                marginHorizontal: widthPercentage('4%'),
                                backgroundColor: "#2c84cc",
                            }}
                            titleStyle={{fontSize: 18}}>
                        </Button>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    View: {
        flex:1, 
        //paddingTop: 20, 
        backgroundColor: "#1E1E1E",
        alignItems:"center"
    },
    Logo: {
        width: heightPercentage('6%'),
        height: heightPercentage('6%'),
        marginTop: heightPercentage('2%')
    },
    TextInput: {
        marginTop: heightPercentage('5%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1
    },
    TouchableOpacity: {
        marginTop: heightPercentage('5%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: 'center',
        padding: 4
    },
    TextInputVertical: {
        marginTop: heightPercentage('5%'),
        marginHorizontal: widthPercentage('4%'),
        height: heightPercentage('7%'),
        width: widthPercentage('36%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1
    },
    Button: {
        marginTop: heightPercentage('5%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        backgroundColor:"#2c84cc"
    },
    TextButton: {
        color: "#2c84cc",
        marginTop: heightPercentage('5%')
    },
  });