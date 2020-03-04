import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'


export default class Home extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    render () {
        return (
            <View style={styles.View}>
                {/* <ScrollView> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color:"white", fontSize:36, marginTop: heightPercentage('2%')}}>
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
                    </View>
                {/* </ScrollView> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    View: {
        flex:1, 
        paddingTop: 20, 
        backgroundColor: "#353535", 
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