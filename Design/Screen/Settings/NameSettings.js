import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
// import global from '../../Tools/Global';
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

    editInfos() {
        if (this.state.newfirstname == "" || this.state.newlastname == "")
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
                name: this.state.newfirstname + " " + this.state.newlastname,
            }),
        }

        fetch('http://40.85.113.74:3000/auth/edit', data).then((res) => res.json())
            .then((resjson) => {
                if (resjson.success === true) {
                    this.props.navigation.navigate('Settings');
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
                    placeholder="Nouveau prenom"
                    autoCapitalize="none"
                    textContentType="givenName"
                    placeholderTextColor= 'white'
                    value={this.state.newfirstname}
                    onChangeText={(text) => this.setNewFirstName(text)}>
                </TextInput>
                <TextInput style={styles.TextInput} 
                    placeholder="Nouveau nom"
                    autoCapitalize="none"
                    textContentType="familyName"
                    placeholderTextColor= 'white'
                    value={this.state.newlastname}
                    onChangeText={(text) => this.setNewLastName(text)}>
                </TextInput>
                <Button
                    onPress={() => this.editInfos()}
                    title="Confirmer"
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
        backgroundColor: "#1E1E1E", 
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