import React from 'react';
import firebase from 'firebase'
import NavigationService from './NavigationService.js';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default class Profil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: firebase.auth().currentUser.email,
            goBack: '',
            password: '',
        }
        setTimeout(() => {
            this.setState({ email: '' })
        }, 1000)

    }
    render() {
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
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            secureTextEntry={true}
                            placeholder={"Password"}
                        />

                        <Button
                            title="Login"
                            onPress={this.toggleSignIn.bind(this)}
                            button_styles={styles.primary_button}
                            button_text_styles={styles.primary_button_text} />

                        <Button
                            title="New here?"
                            onPress={() => this.props.navigation.navigate('Sigin', {
                                'email': this.state.email,
                                'password': this.state.password
                            })}
                            button_styles={styles.transparent_button}
                            button_text_styles={styles.transparent_button_text} />
                    </View>
                </View>
            );
    }

    getUserEmail() {
        var user = firebase.auth().currentUser;
        var email = user.email;
        this.set
    }

    toggleSignIn() {
        if (this.state.email.length < 4) {
            alert('Please enter an email address.');
            return (84);
        }
        if (this.state.password.length < 4) {
            alert('Please enter a password.');
            return (84);
        }
        //  Sign in with email and pass.
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
        }).then(function () {
            NavigationService.navigate('MainHome');
        });
    }

    changeToMainHome() {
        if (firebase.auth().currentUser.emailVerified == true) {
            setTimeout(() => {
                NavigationService.navigate('MainHome', { goBack: this.state.goBack });
            }, 1000)
        }
        else {
            setTimeout(() => {
                NavigationService.navigate('Verif', { goBack: this.state.goBack });
            }, 1000)
        }
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