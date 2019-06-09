import React from 'react'
import { TextInput, Text, View, Image, KeyboardAvoidingView, TouchableHighlight, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'
import Axios from 'axios'

export default class SignIn extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    setEmail(text)
    {
        this.setState({
            email: text
        })
    }

    setPassword(text)
    {
        this.setState({
            password: text
        })
    }

    handleSubmit() {
        let data = JSON.stringify({
            "user": {
                "email": this.state.email,
                "password": this.state.password,
            }
        });
            Axios.post(Global.IPServer + "/user/local/login",
            data,
            { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    this._storeData("userRef", response.data);
                    this.props.navigation.navigate('Home');
                }
            }).catch(function (error) {
                // console.error(error);
            })
        }
        
    _storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch {
            console.error(error)
        }
    }

    _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null)
                console.error(value);
        } catch {
            console.error(error)
        }
    }

    render () {
        return (
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#353535", alignItems:"center"}}>
                <KeyboardAvoidingView keyboardVerticalOffset="-100" behavior="position" enabled>
                    <View style={{alignItems:"center"}}>
                        <Image source={require("../assets/Logo.png")} style={{width: 150, height: 150, marginTop: 75}} />
                        <TextInput style={{marginTop: 30, height:40, width:300, borderColor: 'white', borderBottomWidth: 1}} 
                            placeholder="Email"
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            value={this.state.email}
                            onChangeText={(text) => this.setEmail(text)}>
                        </TextInput>
                        <TextInput style={{marginTop: 30, height:40, width:300, borderColor: 'white', borderBottomWidth: 1}} 
                            placeholder="Password"
                            autoCapitalize="none"
                            textContentType="password"
                            value={this.state.password}
                            onChangeText={(text) => this.setPassword(text)}>
                        </TextInput>
                        <Button
                            onPress={() => this.props.navigation.navigate('Home')}
                            title="Sign In"
                            buttonStyle={{marginTop: 35, height:40, width:300, backgroundColor:"#2c84cc"}}>
                        </Button>
                        <Text style={{color: "#2c84cc", marginTop: 35}}
                        onPress={() => this.props.navigation.navigate('SignUp')}>
                            Create account
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
