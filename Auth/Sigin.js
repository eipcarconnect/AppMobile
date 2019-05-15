import React from 'react';
import NavigationService from './NavigationService.js';
import {StyleSheet, View, TextInput, Button } from 'react-native';

export default class SiginScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        var email;
        var password;
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={email}
                        placeholder={"Email Address"}
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={password}
                        secureTextEntry={true}
                        placeholder={"Password"}
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
        // Sign in with email and pass.
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.warn(error);
            this.props.navigation.navigate('Verif');
        });
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