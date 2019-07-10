import React from 'react';
import firebase from 'firebase'
import NavigationService from './NavigationService.js';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default class SiginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            email_confirm: '',
            password: '',
            password_confirm: '',
            goBack: '',
        }
        setTimeout(() => {
            this.setState({ email: '' })
        }, 1000)
    }

    render() {
        if (firebase.auth().currentUser) {
            this.changeToMainHome();
            return (<View style={styles.container}>
            </View>);
        }
        return (
            <View style={styles.container}>
                <View style={styles.body}>
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
        if (this.state.email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (this.state.password.length < 4) {
            alert('Please enter a password.');
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
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
                return;
            }
        }).then(function() {
            NavigationService.navigate('Verif', { goBack: 'Sigin' });
        });
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