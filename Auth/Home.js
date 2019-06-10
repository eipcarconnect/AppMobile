import React from 'react';
import firebase from 'firebase'
import NavigationService from './NavigationService.js';
import {StyleSheet ,View, TextInput, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyDYxR513RoV3YdPGJAmLr2rS4-mRzpTq8g",
      authDomain: "notifeiptest.firebaseapp.com",
      databaseURL: "https://notifeiptest.firebaseio.com",
      projectId: "notifeiptest",
      storageBucket: "notifeiptest.appspot.com",
      messagingSenderId: "250277878146",
      appId: "1:250277878146:web:86e46286c0a9b875"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.state = {
      email: '',
      goBack: '',
      password: '',
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
    else {
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
  }

  toggleSignIn() {
    if (this.state.email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (this.state.password.length < 4) {
      alert('Please enter a password.');
      return;
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
    });
    this.setState({ email: '', password: '', goBack: 'Home' });
    setTimeout(() => {
      NavigationService.navigate('MainHome', { goBack: this.state.goBack });
    }, 1000)
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