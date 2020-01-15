import React from 'react';
import global from './Global';
import NavigationService from './NavigationService';
import {StyleSheet ,View, TextInput, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      goBack: '',
      password: '',
    }
    setTimeout(() => {
      this.setState({ email: '' });
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
  
  //  Sign in with email and pass.
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
      });
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
          NavigationService.navigate('MainHome');
        }
        else {
          alert(resjson.error);
          return;
        }
      });
  }

  changeToMainHome() {
        NavigationService.navigate('MainHome', { goBack: this.state.goBack });
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