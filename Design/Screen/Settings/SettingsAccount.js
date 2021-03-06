import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import {NavigationEvents} from 'react-navigation';
import { Button } from 'react-native-elements'
import Axios from 'axios'
// import global from '../../Tools/Global';
import { heightPercentage, widthPercentage } from '../../Tools/ResponsiveTool'
import NavBar from '../../Tools/NavBar';

export default class SettingsAccounts extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: global.email,
            name: global.name,
            token: global.token
        }
    }

    componentDidMount() {
        this.Reload();
    }

    Reload() {
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
        fetch('http://40.85.113.74:3000/auth/getuserinfos', data).then((res) => res.json())
        .then((resjson) => {
            if (resjson.success === true) {
                global.name = resjson.name;
                global.email = resjson.email
                this.setState({ email: global.email, name: global.name, date: global.date });
            }
            else {
                alert(resjson.error);
                return;
            }
        });
    }

    formatDate(date) {
        console.log(date);
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
                <NavBar onPushButton={() => this.props.navigation.openDrawer()} />
                <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
                <View>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('EmailSettings')}>
                        <Text style={{color: "white", fontSize: 17}}>E-mail</Text>
                        <Text style={{color: "#8C8C8C", fontSize: 14 }}>{global.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('PasswordSettings')}>
                        <Text style={{color: "white", fontSize: 17}}>Mot de passe</Text>
                        <Text style={styles.UnderText}>*********</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('NameSettings')}>
                        <Text style={{color: "white", fontSize: 17}}>Nom</Text>
                        <Text style={styles.UnderText}>{global.name}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    View: {
        flex:1, 
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
        color: '#8E8E8E',
        fontSize: 14
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