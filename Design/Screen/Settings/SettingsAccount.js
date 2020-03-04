import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../../Tools/ResponsiveTool'


export default class SettingsAccounts extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    render () {
        return (
            <View style={styles.View}>
                <Text style={{color: "white", fontSize: 23}}>
                    Settings Account
                </Text>
                <View>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('EmailSettings')}>
                        <Text style={{color: "white", fontSize: 17}}>E-mail address</Text>
                        <Text style={{color: "#8C8C8C", fontSize: 14 }}>exemple@gmail.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('PasswordSettings')}>
                        <Text style={{color: "white", fontSize: 17}}>Password</Text>
                        <Text style={{color: "#8C8C8C", fontSize: 14 }}>*********</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('NameSettings')}>
                        <Text style={{color: "white", fontSize: 17}}>Name</Text>
                        <Text style={{color: "#8C8C8C", fontSize: 14 }}>Eric DUPONT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('BirthdaySettings')}>
                        <Text style={{color: "white", fontSize: 17}}>Date of birth</Text>
                        <Text style={{color: "#8C8C8C", fontSize: 14 }}>12 January 1973</Text>
                    </TouchableOpacity>
                </View>
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