import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, AppRegistry } from 'react-native'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
//import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import * as Progress from 'react-native-progress';

import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

import NavBar from '../Tools/NavBar';

export default class Home extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {},
            elements: [],
            
            brand: global.car.brand,
            model: global.car.model,
            numberplate: global.car.numberplate,
            kilometer: "23 871",
            fuel: 10,
            maxfuel: 100
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
       this.setState({brand: global.car.brand, model: global.car.model, numberplate: global.car.numberplate});
    }

    textScales(maxsize, width, charnumber) 
    {
        // console.log(charnumber);
        // console.log(width);
        let s = (width / charnumber);
        // console.log(s);
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


    // RouteModal(modalVisible, setModalVisible)
    // {
    //     return (
    //         <Modal
    //           animationType="slide"
    //           transparent={true}
    //           visible={modalVisible}
    //           onRequestClose={() => {
    //             Alert.alert("Modal has been closed.");
    //           }}
    //         >
    //           <View style={styles.centeredView}>
    //             <View style={styles.modalView}>
    //               <Text style={styles.modalText}>Hello World!</Text>
      
    //               <TouchableHighlight
    //                 style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
    //                 onPress={() => {
    //                   setModalVisible(!modalVisible);
    //                 }}
    //               >
    //                 <Text style={styles.textStyle}>Hide Modal</Text>
    //               </TouchableHighlight>
    //             </View>
    //           </View>
    //         </Modal>
    //     )
    // }
 

    render () {
        //const [modalVisible, setModalVisible] = useState(false);
        // const mod = 
        //     <Modal
        //       animationType="slide"
        //       transparent={true}
        //       visible={modalVisible}
        //       onRequestClose={() => {
        //         Alert.alert("Modal has been closed.");
        //       }}
        //     >
        //       <View style={styles.centeredView}>
        //         <View style={styles.modalView}>
        //           <Text style={styles.modalText}>Hello World!</Text>
      
        //           <TouchableHighlight
        //             style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
        //             onPress={() => {
        //               setModalVisible(!modalVisible);
        //             }}
        //           >
        //             <Text style={styles.textStyle}>Hide Modal</Text>
        //           </TouchableHighlight>
        //         </View>
        //       </View>
        //     </Modal>

        return (
            <View style={styles.View}>
                <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
                <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
                    <View style={{width: widthPercentage("88%"),
                                height: heightPercentage("10%"),
                                backgroundColor: "#2F2F2F",
                                marginTop: heightPercentage("3.5%"),
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
                        {/* <Text 
                            numberOfLines={1}
                            style={[this.textScales(18, widthPercentage("130%"), global.email.length),
                                {
                                    width: widthPercentage("80%"),
                                    height: heightPercentage("4%"),
                                    marginTop: heightPercentage("1%"),
                                    //backgroundColor: "red",
                                    color: "white"
                                }
                            ]}>
                            {global.email}
                        </Text> */}
                    </View>
                    <View style={{width: widthPercentage("88%"),
                                height: heightPercentage("21%"),
                                backgroundColor: "#2F2F2F",
                                marginTop: heightPercentage("3.5%"),
                                elevation: 10
                                }}>
                        <View style={{flexDirection: "row", marginLeft: widthPercentage("3%")}}>
                            <View style={{marginTop: heightPercentage("1%")}}>
                                <Text
                                    numberOfLines={1}
                                    style={[this.textScales(25, widthPercentage("130%"), this.state.brand.length),
                                    {
                                        //width: widthPercentage("80%"),
                                            //height: heightPercentage("4%"),
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
                            {/* <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: heightPercentage("2%"), marginRight: widthPercentage("6%")}}>
                                <Progress.Circle 
                                            progress={fuel/100}
                                            size={heightPercentage("12%")}
                                            showsText={true}
                                            formatText={(progress) => 
                                            {
                                                if ((progress*100)%1 > 0)
                                                    return("Fuel\n " + ((progress*100) - ((progress*100)%1)) + "%")
                                                return("Fuel\n " + progress*100 + "%")
                                            }}
                                            thickness={5} 
                                            borderWidth={1}
                                            strokeCap={"round"} 
                                            borderRadius={0}
                                            borderColor={'rgba(44,132,204,1)'}
                                            color={'rgba(44,132,204,1)'}>
                                </Progress.Circle>
                            </View> */}
                        </View>
                        <View style={{marginBottom:heightPercentage("2%")}}>  
                            <Text 
                                numberOfLines={1}
                                style={[this.textScales(20, widthPercentage("130%"), this.state.numberplate.length),
                                {
                                    width: widthPercentage("88%"),
                                    //height: heightPercentage("4%"),
                                    marginTop: heightPercentage("1%"),
                                    textAlign:"center",
                                    //backgroundColor: "red",
                                    color: "white"
                                }
                            ]}>
                                {this.state.kilometer} Km
                            </Text>
                        </View>
                    </View>
                    <View style={{width: widthPercentage("88%"),
                                height: heightPercentage("12%"),
                                backgroundColor: "#2F2F2F",
                                marginTop: heightPercentage("3.5%"),
                                elevation: 10
                                }}>
                        <Button
                            onPress={() => {
                            this.props.navigation.navigate('AddRoute')
                            }}
                            title="CREER UN TRAJET"
                            buttonStyle={{
                                height: heightPercentage('6%'),
                                width: widthPercentage('80%'),
                                marginVertical: heightPercentage('3%'),
                                marginHorizontal: widthPercentage('4%'),
                                backgroundColor: "#2c84cc",
                            }}
                            titleStyle={{fontSize: 18}}>
                        </Button>
                    </View>
                    <View style={{width: widthPercentage("88%"),
                                height: heightPercentage("12%"),
                                backgroundColor: "#2F2F2F",
                                marginTop: heightPercentage("3.5%"),
                                elevation: 10
                                }}>
                        <Button
                        onPress={() => this.goToAddInvoice()}
                            title="CREER UNE FACTURE"
                            buttonStyle={{
                                height: heightPercentage('6%'),
                                width: widthPercentage('80%'),
                                marginVertical: heightPercentage('3%'),
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