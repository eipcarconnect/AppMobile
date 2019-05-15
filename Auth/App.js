/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import NavigationService from './NavigationService';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import firebase from 'firebase'

export default class App extends React.Component {
  render() {
    return <Container ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />
  }
}

class HomeScreen extends React.Component {
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

class mainHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      goBack: '',
    }
    setTimeout(() => {
      this.setState({ email: '' })
    }, 1000)

  }
  render() {
    const { navigation } = this.props;
    if (!firebase.auth().currentUser) {
      this.GoBack(navigation.getParam('goBack', 'Home'));
      return (<View style={styles.container}>
      </View>);
    }
    else if (firebase.auth().currentUser.emailVerified === false) {
      console.warn(firebase.auth().currentUser.emailVerified);
      this.GoVerif();
      return (<View style={styles.container}>
      </View>);
    }
    else {
      console.warn(firebase.auth().currentUser.emailVerified);
      return (<View style={styles.container}>
        <View style={styles.body}>
          <Text h1>Welcome on our application</Text>
          <Button
            title="SingOut"
            onPress={this.singOut.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>);
    }
  }

  singOut() {
    firebase.auth().signOut().then(function () {
      NavigationService.navigate('Home');
    });
  }

  GoBack(goBack) {
    NavigationService.navigate(goBack);
  }

  GoVerif() {
    NavigationService.navigate('Verif');
  }

}

class notverif extends React.Component {
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


class SiginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
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
    });
    this.setState({ email: '', password: '', goBack: 'Sigin' });
    setTimeout(() => {
      NavigationService.navigate('Verif', { goBack: this.state.goBack });
    }, 1000)
  }

  changeToMainHome() {
    NavigationService.navigate('MainHome');
  }
}
const Nav = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Verif: {
      screen: notverif
    },
    Sigin: {
      screen: SiginScreen
    },
    MainHome: {
      screen: mainHome
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const Container = createAppContainer(Nav);

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

