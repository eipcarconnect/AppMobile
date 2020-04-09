import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import global from '../../Tools/Global';
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../../Tools/ResponsiveTool'


export default class EmailSettings extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            newemail: ""
        }
        console.log("actual token:" + global.token);
    }


    editInfos() {
        // edit user infos
        var data = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: global.token,
                email: this.state.newemail
            }),
        }

        fetch('http://40.85.113.74:3000/auth/edit', data).then((res) => res.json())
            .then((resjson) => {
                if (resjson.success === true) {
                    global.token = resjson.token;
                    //console.log("new token: " + str);
                    //global.token = str.slice(4, str.length);
                    console.log("new token: " + global.token);
                    this.props.navigation.navigate('SettingsAccount');
                }
                else {
                    alert(resjson.error);
                    return;
                }
            });
    }

    setEmail(text)
    {
        this.setState({newemail: text})
    }

    render () {
        return (
            <View style={styles.View}>
                <TextInput style={styles.TextInput} 
                    placeholder="New email address"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    placeholderTextColor= 'white'
                    value={this.state.newemail}
                    onChangeText={(text) => this.setEmail(text)}>
                </TextInput>
                <Button
                    onPress={() => this.editInfos()}
                    title="Confirm"
                    buttonStyle={styles.Button}>
                </Button>
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
    TextInput: {
        marginTop: heightPercentage('5%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1
    },
    Button: {
        marginTop: heightPercentage('7%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        backgroundColor:"#2c84cc"
    }
});