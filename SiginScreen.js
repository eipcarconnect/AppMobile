import React from 'react';
import moment from 'moment';
import firebase from 'firebase'
import NavigationService from './NavigationService.js';
import DateTimePicker from "react-native-modal-datetime-picker";
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default class SiginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            email_confirm: '',
            password: '',
            password_confirm: '',
            name: '',
            last_name: '',
            date: '',
            isDateTimePickerVisible: false,
            goBack: '',
        }
        setTimeout(() => {
            this.setState({ email: '' })
        }, 1000)
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.state.date = moment(date).format('YYYY-MM-DD');
        console.warn(this.state.date)
        this.hideDateTimePicker();
    };

    render() {
        if (firebase.auth().currentUser) {
            this.changeToMainHome();
            return (<View style={styles.container}>
            </View>);
        }
        return (
            <View style={styles.container}>
                <View style={styles.body}>

                    <Button title="Birth Date" onPress={this.showDateTimePicker} />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                        placeholder={"First Name"}
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ last_name: text })}
                        value={this.state.last_name}
                        placeholder={"Last Name"}
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                        placeholder={"Email Address"}
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ email_confirm: text })}
                        value={this.state.email_confirm}
                        placeholder={"Email Address Confirm"}
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder={"Password"}
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ password_confirm: text })}
                        value={this.state.password_confirm}
                        secureTextEntry={true}
                        placeholder={"Password Confirm"}
                    />

                    <Button
                        title="Sigin"
                        onPress={this.handleSignUp.bind(this)}
                        button_styles={styles.primary_button}
                        button_text_styles={styles.primary_button_text} />

                </View>
            </View>
        );
    }

    handleSignUp() {
        if (this.state.date.length < 1) {
            alert('Select a Birth Date.');
            return;
        }
        if (this.state.name.length < 1) {
            alert('Please enter a First Name.');
            return;
        }
        if (this.state.last_name.length < 1) {
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
        if (this.state.email != this.state.email_confirm) {
            alert('Les adresses mail ne correspondent pas');
            return;
        }
        if (this.state.password != this.state.password_confirm) {
            alert('Les mots de passes ne correspondent pas');
            return;
        }
        // Sign in with email and pass.
        var data = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password,
                email: this.state.email,
                birthdate: this.state.date,
            }),
        }

        fetch('http://40.85.113.74:3000/auth/signup', data).then((res) => res.json())
        .then((resjson) => {
            if (resjson.success === true) {
                alert("User succesfully registered");
                NavigationService.navigate('Home');
            }
            else {
                alert(resjson.error);
                return;
            } });
        // firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     if (errorCode == 'auth/weak-password') {
        //         alert('The password is too weak.');
        //     } else {
        //         alert(errorMessage);
        //         return;
        //     }
        // }).then(function() {
        //     NavigationService.navigate('Verif');
        // });
    }

    changeToMainHome() {
        NavigationService.navigate('MainHome');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});