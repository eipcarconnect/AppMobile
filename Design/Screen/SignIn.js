import React from 'react'
import { TextInput, Text, View, Image, StyleSheet, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements'
import { save, getSaved } from '../Tools/Storage'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

export default class SignIn extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
          email: '',
            password: '',
          }
        global.name = '';
        global.email = '';
        global.token = '';
        global.test = '';
        global.car = {};
        global.company = [];
        global.carList = [];
        global.actualRide = null;
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
          alert('Veuillez saisir une adresse email');
          return(84);
        }
        if (this.state.password.length < 1) {
          alert('Veuillez saisir un mot de passe');
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
              global.token = resjson.token;
              console.log('signin OK');
              this.getUserInfos();
            }
            else {
              if(resjson.error === "UserNotFound")
                alert("L'adresse email n'existe pas");
              else if (resjson.error === "WrongPassword")
                alert("Le mot de passe est invalide");
              console.log("signin", resjson.error);
              return;
            }
          })
          .catch((error) => {
            console.log(error);
            alert("Impossible de se connecter au serveur");
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
              save("email", global.email);
              this.setState({ email: '', password: '' });
              console.log('geuUserInfos OK');
              getSaved('car').then((value) => {
                if (value) {
                  global.car = JSON.parse(value);
                  this.props.navigation.navigate('Accueil');
                }
                else {
                  this.props.navigation.navigate('CarSelect');
                }
              });
            }
            else {
              alert(resjson.error);
              console.log("getuserinfos", resjson.error);
              return;
            }
          });
      }

  getCompanyList() {
    var data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }
    fetch('http://40.85.113.74:3000/data/company', data).then((res) => res.json())
      .then((resjson) => {
        if (resjson.success === true) {
          global.company = resjson.company.sort();
          this.props.navigation.navigate('SignUp');
        }
        else {
          alert(resjson.error);
          console.log(resjson);
          return;
        }
      });
  }

  componentDidMount() {
    getSaved("email").then((value) => {
      if (value)
        this.setEmail(value);
    });
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
                            placeholder="Mot de passe"
                            autoCapitalize="none"
                            textContentType="password"
                            secureTextEntry={true}
                            placeholderTextColor= 'white'
                            value={this.state.password}
                            onChangeText={(text) => this.setPassword(text)}>
                        </TextInput>
                        <Button
                            onPress={() => this.toggleSignIn()/*this.handleSubmit()*//*this.props.navigation.navigate('Home')*/}
                            title="Connexion"
                            buttonStyle={styles.Button}>
                        </Button>
                        <Text style={styles.TextButton}
                        onPress={() => this.getCompanyList()}>
                            Créer un compte
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
        backgroundColor: "#1E1E1E", 
        alignItems:"center"
    },
    Logo: {
        width: heightPercentage('17%'),
        height: heightPercentage('17%'),
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
