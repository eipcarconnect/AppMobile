import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../../Tools/ResponsiveTool'


export default class PasswordSettings extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            currentpassword: "",
            newpassword: "",
            confirmnewpassword: ""
        }
    }

    confirm()
    {

    }

    setCurrentPassword(text)
    {
        this.setState({currentpassword: text})
    }

    setNewPassword(text)
    {
        this.setState({newpassword: text})
    }

    setConfirmNewPassword(text)
    {
        this.setState({confirmnewpassword: text})
    }

    render () {
        return (
            <View style={styles.View}>
                <TextInput style={styles.TextInput} 
                    placeholder="Current Password"
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry={true}
                    placeholderTextColor= 'white'
                    value={this.state.currentpassword}
                    onChangeText={(text) => this.setCurrentPassword(text)}>
                </TextInput>
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
                    onPress={() => this.confirm()}
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