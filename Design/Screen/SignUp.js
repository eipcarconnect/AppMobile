import React from 'react'
import { TextInput, Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements'
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
            company: '',
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

    getCompagnyPickerItem() {
        let companyList = global.company.map(Infos => (
            <Picker.Item label={Infos} value={Infos} />
        ));
        return companyList;
    }

    handleSignUp() {
        if (this.state.firstname.length < 1) {
            alert('Please enter a First Name.');
            return;
        }
        if (this.state.lastname.length < 1) {
            alert('Please enter a Last Name.');
            return;
        }
        if (this.state.company == 'none') {
            alert('Veuillez selectionner une entreprise');
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
                company: this.state.company
            }),
        }
        fetch('http://40.85.113.74:3000/auth/signup', data).then((res) => res.json())
        .then((resjson) => {
            if (resjson.success === true) {
                alert("Nouvel utilisateur crée avec succés");
                this.props.navigation.navigate('SignIn');
            }
            else {
                alert(resjson.error);
                return;
            } });
    }

    render () {
        return (
            <View style={styles.View}>
                <KeyboardAvoidingView keyboardVerticalOffset={String(-heightPercentage('5%'))} behavior="position" enabled>
                    <View style={{alignItems:"center"}}>
                        <Image source={require("../assets/Logo.png")} style={styles.Logo} />
                        <View style={{flexDirection:"row"}}>
                            <TextInput style={styles.TextInputVertical} 
                                placeholder="Prénom"
                                autoCapitalize="none"
                                textContentType="givenName"
                                placeholderTextColor= 'white'
                                value={this.state.firstname}
                                onChangeText={(text) => this.setFirstName(text)}>
                            </TextInput>
                            <TextInput style={styles.TextInputVertical}
                                placeholder="Nom"
                                autoCapitalize="none"
                                textContentType="familyName"
                                placeholderTextColor= 'white'
                                value={this.state.lastname}
                                onChangeText={(text) => this.setLastName(text)}>
                            </TextInput>
                        </View>


                        <View>
                            <View style={{borderBottomWidth: 1, borderColor: "white",  marginTop: heightPercentage('5%')}}>
                                <Picker
                                    selectedValue={this.state.company}
                                    dropdownIconColor="white"
                                    style={{color: "white", height: heightPercentage('6%'), width: widthPercentage('80%') }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ company: itemValue })}
                                    >
                                    <Picker.Item label="Selectionner une entreprise" value="none" />
                                {this.getCompagnyPickerItem()}
                                </Picker>
                            </View>
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
                                placeholder="Mot de passe"
                                autoCapitalize="none"
                                textContentType="password"
                                secureTextEntry={true}
                                placeholderTextColor= 'white'
                                value={this.state.password}
                                onChangeText={(text) => this.setPassword(text)}>
                            </TextInput>
                            <TextInput style={styles.TextInputVertical}
                                placeholder="Confirmer"
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
                            title="Inscription"
                            color="#32d7fb"
                            buttonStyle={styles.Button}>
                        </Button>
                        <Text style={styles.TextButton} onPress={() => this.props.navigation.navigate('SignIn')}>
                            Se connecter
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