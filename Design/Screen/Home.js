import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, Button, AppRegistry } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements'
import {NavigationEvents} from 'react-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

// import { Button } from 'react-native-elements'

// import global from '../Tools/Global';
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

import DraggableBattery from './Settings/SettingsHomePage/Component/DraggableBattery'
import DraggableFuel from './Settings/SettingsHomePage/Component/DraggableFuel'
import DraggableInformation from './Settings/SettingsHomePage/Component/DraggableInformation'
import DraggableMap from './Settings/SettingsHomePage/Component/DraggableMap'

import NavBar from '../Tools/NavBar';

export default class Home extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {},
            elements: [],
            fuel: 0,
            battery: 50
        }
    }

    componentDidMount() {
        this.getUser()
        this.Refresh()
    }

    async getUser() {
        try
        {
            //await AsyncStorage.removeItem("HomePageConfiguration")
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
        fetch('http://40.85.113.74:3000/data/getvehiculeinfo', data).then((res) => res.json())
            .then((resjson) => {
                if (resjson.success === true) {
                    global.speed = resjson.speed;
                    global.fuel = resjson.fuel;
                    global.lat = resjson.latitude;
                    global.long = resjson.longitude;
                    this.setState({fuel: global.fuel});
                }
                else {
                    alert(resjson.error);
                    return;
                }
            });
    }

    render () {
        let Arr = this.state.elements.map((a, i) => {
            switch (this.state.elements[i].split(" ")[0]) {
                case "Battery":
                    return <DraggableBattery role="Display" x={parseInt(this.state.elements[i].split(" ")[1])}
                    y={parseInt(this.state.elements[i].split(" ")[2])} value={this.state.battery}></DraggableBattery>                  
                case "Fuel":
                    return <DraggableFuel role="Display" x={parseInt(this.state.elements[i].split(" ")[1])}
                    y={parseInt(this.state.elements[i].split(" ")[2])} value={this.state.fuel}> </DraggableFuel>
                case "Information":
                    return <DraggableInformation role="Display" x={parseInt(this.state.elements[i].split(" ")[1])}
                    y={parseInt(this.state.elements[i].split(" ")[2])}> </DraggableInformation>
                case "Map":
                    return <DraggableMap role="Display" x={parseInt(this.state.elements[i].split(" ")[1])}
                        y={parseInt(this.state.elements[i].split(" ")[2])} onClick={() => { this.props.navigation.navigate('Map') }}> </DraggableMap>
                default:
                    break;
            }
        })

        return (
            <View style={styles.View}>
            <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
                <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
                {/* <ScrollView> */}
                    {Arr}
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color:"white", fontSize:36, marginTop: heightPercentage('2%')}}
                            Volkswagen
                        </Text>
                        <Text style={{color:"white", fontSize:24, marginTop: heightPercentage('2%')}}>
                            Polo
                        </Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: heightPercentage('2%')}}> 
                            <Text style={{color:"white", fontSize:20, marginTop: heightPercentage('2%')}}>
                                100000 km
                            </Text>
                        </View>
                        <View style={{flexDirection:"row", marginTop: heightPercentage('6%')}}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: widthPercentage('15%')}}>
                                <Image source={require("../assets/fuel.png")} style={styles.Logo} />
                                <Text style={{color:"white", fontSize:20, marginTop: heightPercentage('2%')}}>
                                    40L / 45L
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: widthPercentage('15%')}}>
                                <Image source={require("../assets/car-battery.png")} style={styles.Logo} />
                                <Text style={{color:"white", fontSize:20, marginTop: heightPercentage('2%')}}>
                                    95%
                                </Text>
                            </View>
                        </View>
                    </View> */}
                {/* </ScrollView> */}
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