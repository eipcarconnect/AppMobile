import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import global from '../../Tools/Global';
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../../Tools/ResponsiveTool'


export default class PasswordSettings extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            newpassword: "",
            confirmnewpassword: ""
        }
    }

    setNewPassword(text)
    {
        this.setState({newpassword: text})
    }

    setConfirmNewPassword(text)
    {
        this.setState({confirmnewpassword: text})
    }

    editInfos() {
        if (this.state.newpassword !== this.state.confirmnewpassword)
            return
        // edit user infos
        var data = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: global.token,
                password: this.state.newpassword,
            }),
        }

        fetch('http://40.85.113.74:3000/auth/edit', data).then((res) => res.json())
            .then((resjson) => {
                if (resjson.success === true) {
                    this.props.navigation.navigate('SettingsAccount');
                }
                else {
                    alert(resjson.error);
                    return;
                }
            });
    }

    render () {
        return (
            <View style={styles.View}>
                <TextInput style={styles.TextInput} 
                    placeholder="New Password"
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry={true}
                    placeholderTextColor= 'white'
                    value={this.state.newpassword}
                    onChangeText={(text) => this.setNewPassword(text)}>
                </TextInput>
                <TextInput style={styles.TextInput} 
                    placeholder="Confirm new password"
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry={true}
                    placeholderTextColor= 'white'
                    value={this.state.confirmnewpassword}
                    onChangeText={(text) => this.setConfirmNewPassword(text)}>
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