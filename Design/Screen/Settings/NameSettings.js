import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../../Tools/ResponsiveTool'


export default class NameSettings extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            newfirstname: "",
            newlastname: ""
        }
    }

    confirm()
    {

    }

    setNewFirstName(text)
    {
        this.setState({newfirstname: text})
    }

    setNewLastName(text)
    {
        this.setState({newlastname: text})
    }

    render () {
        return (
            <View style={styles.View}>
                <TextInput style={styles.TextInput} 
                    placeholder="New first name"
                    autoCapitalize="none"
                    textContentType="givenName"
                    placeholderTextColor= 'white'
                    value={this.state.newfirstname}
                    onChangeText={(text) => this.setNewFirstName(text)}>
                </TextInput>
                <TextInput style={styles.TextInput} 
                    placeholder="New last name"
                    autoCapitalize="none"
                    textContentType="familyName"
                    placeholderTextColor= 'white'
                    value={this.state.newlastname}
                    onChangeText={(text) => this.setNewLastName(text)}>
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