import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'
import NavBar from '../Tools/NavBar'
import StackBar from '../Tools/StackBar'

export default class Settings extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    render () {
        return (
            <View style={styles.View}>
                <NavBar onPushButton={() => this.props.navigation.openDrawer()} />
                {/* <Text style={{color: "white", fontSize: 23}}>
                    Settings
                </Text> */}
                <View>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('SettingsAccount')}>
                        <Text style={{color: "white", fontSize: 17}}>Settings account</Text>
                        <Text style={{color: "#8C8C8C", fontSize: 14 }}>Change account informations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('SettingsHomePage')}>
                        <Text style={{color: "white", fontSize: 17}}>Settings home page</Text>
                        <Text style={{color: "#8C8C8C", fontSize: 14 }}>Personalize your home page</Text>
                    </TouchableOpacity>
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
        width: heightPercentage('25%'),
        height: heightPercentage('25%'),
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
        marginTop: heightPercentage('3%'),
        height: heightPercentage('9%'),
        width: widthPercentage('90%'),
        color: 'white',
        padding: 4,
        justifyContent:"center",
    },
    TextInputVertical: {
        marginTop: heightPercentage('5%'),
        marginHorizontal: widthPercentage('4%'),
        height: heightPercentage('7%'),
        width: widthPercentage('36%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1,
    },
    UnderText:
    {
        color: '#8C8C8C'
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