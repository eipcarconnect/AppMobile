import React from 'react';
import firebase from 'firebase'
import NavigationService from './NavigationService.js';
import {StyleSheet, View, Text, Button } from 'react-native';

export default class  notverif extends React.Component {
    
  render() {
    const { navigation } = this.props;
    if (!firebase.auth().currentUser) {
      this.ChangeBack(navigation.getParam('goBack', 'Home'));
      return (<View style={styles.container}>
      </View>);
    }
    else if (firebase.auth().currentUser.emailVerified === true) {
      this.GoMainHome();
      return (<View style={styles.container}>
      </View>);
    }
    else {
      return (
        <View style={styles.container}>
          <Text h1>Your account is not confirmed</Text>
          <Button title="Send Verification Email"
            onPress={this.sendEmailVerification.bind(this)}
          />

          <Button
            title="SingOut"
            onPress={this.singOut.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />

          <Button
            title="Continue"
            onPress={() => this.props.navigation.navigate('MainHome')}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />

          <Button
            title="Refresh"
            onPress={() => this.props.navigation.navigate('MainHome')}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />

        </View>
      );
    }
  }

  /**
 * Sends an email verification to the user.
 */
  sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function () {
      alert('Email Verification Sent!');
    });
  }

  ChangeBack(goBack) {
    NavigationService.navigate(goBack);
  }

  singOut() {
    firebase.auth().signOut().then(function () {
      NavigationService.navigate('Home');
    });
  }

  GoMainHome() {
    firebase.auth().signOut().then(function () {
      NavigationService.navigate('MainHome');
    });
  }

  Refresh() {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      userProvidedPassword
    );
    user.reauthenticateAndRetrieveDataWithCredential(credential);
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