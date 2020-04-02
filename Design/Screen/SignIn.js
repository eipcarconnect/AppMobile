import React from 'react'
import { TextInput, Text, View, Image, StyleSheet, KeyboardAvoidingView, TouchableHighlight, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'
import global from "../Tools/Global"
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

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

    toggleSignIn() {
        if (this.state.email.length < 1) {
          alert('Please enter an email address.');
          return(84);
        }
        if (this.state.password.length < 1) {
          alert('Please enter a password.');
          return(84);
        }
    
        var data = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
        }
        
        fetch('http://40.85.113.74:3000/auth/signin', data).then((res) => res.json())
          .then((resjson) => {
            if (resjson.success === true) {
              var str = resjson.token;
              global.token = str.slice(4, str.length);
              this.getUserInfos();
            }
            else {
              alert(resjson.error);
              return;
            }
          })
          .catch((error) => {
            alert(error);
          })
      }
    
      getUserInfos() {
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
              global.date = resjson.birthdate.split('T')[0];
              this.setState({ email: '', password: '' });
              this.getCarInfos();
            }
            else {
              alert(resjson.error);
              return;
            }
          });
      }
    
      getCarInfos() {
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
        fetch('http://40.85.113.74:3000/data/getvehiculeinfo', data).then((res) => res.json())
          .then((resjson) => {
            if (resjson.success === true) {
              global.speed = resjson.speed;
              global.fuel = resjson.fuel;
              global.lat = resjson.latitude;
              global.long = resjson.longitude;
              this.setState({ email: '', password: '' });
              this.props.navigation.navigate('Home');
            }
            else {
              alert(resjson.error);
              return;
            }
          });
      }

    // handleSubmit() {
    //     let data = JSON.stringify({
    //         "user": {
    //             "email": this.state.email,
    //             "password": this.state.password,
    //         }
    //     });
    //         Axios.post("http://40.85.113.74:3000/auth/signin",
    //         data,
    //         { headers: { Accept: 'application/json', "Content-Type": "application/json" } })
    //         .then((response) => {
    //             if (response.status == 200 || response.status == 201) {
    //                 //this._storeData("userRef", response.data);
    //                 this.props.navigation.navigate('Home');
    //             }
    //             else {
    //                 console.log(response.error);
    //                 return;
    //             }
    //         }).catch(function (error) {
    //             console.log(error);
    //         })
    //     }
        
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
            <View style={styles.View}>
                <KeyboardAvoidingView keyboardVerticalOffset={String(-heightPercentage('10%'))}  behavior="position" enabled>
                    <View style={{alignItems:"center"}}>
                        <Image source={require("../assets/Logo.png")} style={styles.Logo} />
                        <TextInput style={styles.TextInput} 
                            placeholder="Email"
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            placeholderTextColor= 'white'
                            value={this.state.email}
                            onChangeText={(text) => this.setEmail(text)}>
                        </TextInput>
                        <TextInput style={styles.TextInput} 
                            placeholder="Password"
                            autoCapitalize="none"
                            textContentType="password"
                            secureTextEntry={true}
                            placeholderTextColor= 'white'
                            value={this.state.password}
                            onChangeText={(text) => this.setPassword(text)}>
                        </TextInput>
                        <Button
                            onPress={() => this.toggleSignIn()/*this.handleSubmit()*//*this.props.navigation.navigate('Home')*/}
                            title="Sign In"
                            buttonStyle={styles.Button}>
                        </Button>
                        <Text style={styles.TextButton}
                        onPress={() => this.props.navigation.navigate('SignUp')}>
                            Create account
                        </Text>
                    </View>
                </KeyboardAvoidingView>
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
        marginTop: heightPercentage('8%')
    },
    TextInput: {
        marginTop: heightPercentage('7%'),
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
    },
    TextButton: {
        color: "#2c84cc",
        marginTop: heightPercentage('7%')
    },
  });
