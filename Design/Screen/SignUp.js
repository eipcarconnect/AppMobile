import React from 'react'
import { TextInput, Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker';
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

export default class SignUp extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            lastname: '',
            firstname: '',
            password: '',
            password2: '',

            date: new Date('2000-01-01'),
            maxDate: new Date('2004-12-31'),
            minDate: new Date('1900-01-01'),
            show: false
        }
    }

    setEmail(text)
    {
        this.setState({email: text})
    }

    setLastName(text)
    {
        this.setState({lastname: text})
    }
    
    setFirstName(text)
    {
        this.setState({firstname: text})
    }

    setPassword(text)
    {
        this.setState({password: text})
    }

    setPassword2(text)
    {
        this.setState({password2: text})
    }

    setDate = (event, date) => {
        date = date || this.state.date;
    
        this.setState({
          show: Platform.OS === 'ios' ? true : false,
          date,
        });
    }

    show()
    {
        this.setState({show: true})
    }

    formatDate(date) {
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

    // handleSubmit() {
    //     let data = JSON.stringify({
    //         "user": {
    //             "email": this.state.email,
    //             "password": this.state.password,
    //         }
    //     });
    //         Axios.post(Global.IPServer + "/signup",
    //             data,
    //             { headers: { "Content-Type": "application/json" } })
    //             .then((response) => {
    //                 //console.error(response);
    //                 this._storeData("userRef", response2.data);
    //                 this.props.navigation.navigate('Home');
    //             }).catch(function (error) {
    //                 console.error(error);
    //             })
    // }


    handleSignUp() {
        if (this.state.date.length < 1) {
            alert('Select a Birth Date.');
            return;
        }
        if (this.state.firstname.length < 1) {
            alert('Please enter a First Name.');
            return;
        }
        if (this.state.lastname.length < 1) {
            alert('Please enter a Last Name.');
            return;
        }
        if (this.state.email.length < 1) {
            alert('Please enter an email address.');
            return;
        }
        if (this.state.password.length < 4) {
            alert('Your password is too short.');
            return;
        }
        if (this.state.password != this.state.password2) {
            alert('Les mots de passes ne correspondent pas');
            return;
        }
        
        // Sign in with email, pass, birthdate, name.
        var data = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:  this.state.firstname + " " + this.state.lastname,
                password: this.state.password,
                email: this.state.email,
                birthdate: this.state.date,
            }),
        }

        fetch('http://40.85.113.74:3000/auth/signup', data).then((res) => res.json())
        .then((resjson) => {
            if (resjson.success === true) {
                alert("User succesfully registered");
                this.props.navigation.navigate('SignIn');
            }
            else {
                alert(resjson.error);
                return;
            } });
    }

    render () {
        const { show, date } = this.state;
        return (
            <View style={styles.View}>
                <KeyboardAvoidingView keyboardVerticalOffset={String(-heightPercentage('5%'))} behavior="position" enabled>
                    <View style={{alignItems:"center"}}>
                        <Image source={require("../assets/Logo.png")} style={styles.Logo} />
                        <View style={{flexDirection:"row"}}>
                            <TextInput style={styles.TextInputVertical} 
                                placeholder="First Name"
                                autoCapitalize="none"
                                textContentType="givenName"
                                placeholderTextColor= 'white'
                                value={this.state.firstname}
                                onChangeText={(text) => this.setFirstName(text)}>
                            </TextInput>
                            <TextInput style={styles.TextInputVertical}
                                placeholder="Last Name"
                                autoCapitalize="none"
                                textContentType="familyName"
                                placeholderTextColor= 'white'
                                value={this.state.lastname}
                                onChangeText={(text) => this.setLastName(text)}>
                            </TextInput>
                        </View>


                        <View>
                            <TouchableOpacity style={styles.TouchableOpacity} activeOpacity= {1} onPress={() => this.show()}>
                                <Text style={{color: "white"}}>Birthday</Text>
                                <Text style={{color: "white"}}>{this.formatDate(this.state.date)}</Text>
                            </TouchableOpacity>
                            { show && <DateTimePicker value={date}
                                mode="date"
                                display="spinner"
                                maximumDate= {this.state.maxDate}
                                minimumDate= {this.state.minDate}
                                onChange={this.setDate}
                                 />
                            }
                        </View>


                        <TextInput style={styles.TextInput} 
                            placeholder="Email"
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            placeholderTextColor= 'white'
                            value={this.state.email}
                            onChangeText={(text) => this.setEmail(text)}>
                        </TextInput>
                        <View style={{flexDirection:"row"}}>
                            <TextInput style={styles.TextInputVertical} 
                                placeholder="Password"
                                autoCapitalize="none"
                                textContentType="password"
                                secureTextEntry={true}
                                placeholderTextColor= 'white'
                                value={this.state.password}
                                onChangeText={(text) => this.setPassword(text)}>
                            </TextInput>
                            <TextInput style={styles.TextInputVertical}
                                placeholder="Confirm password"
                                autoCapitalize="none"
                                textContentType="password"
                                secureTextEntry={true}
                                placeholderTextColor= 'white'
                                value={this.state.password2}
                                onChangeText={(text) => this.setPassword2(text)}>
                            </TextInput>
                        </View>
                        <Button
                            onPress={() => this.handleSignUp()}
                            title="Sign Up"
                            color="#32d7fb"
                            buttonStyle={styles.Button}>
                        </Button>
                        <Text style={styles.TextButton} onPress={() => this.props.navigation.navigate('SignIn')}>
                            Sign in instead
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
        marginTop: heightPercentage('5%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: 'center',
        padding: 4
    },
    TextInputVertical: {
        marginTop: heightPercentage('5%'),
        marginHorizontal: widthPercentage('4%'),
        height: heightPercentage('7%'),
        width: widthPercentage('36%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1
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