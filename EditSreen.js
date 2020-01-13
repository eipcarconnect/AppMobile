import React from 'react';
import moment from 'moment';
import global from './Global';
import NavigationService from './NavigationService.js';
import DateTimePicker from "react-native-modal-datetime-picker";
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default class EditScreen extends React.Component {
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
        this.hideDateTimePicker();
    };

    render() {
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
                        title="Edit"
                        onPress={this.editInfos.bind(this)}
                        button_styles={styles.primary_button}
                        button_text_styles={styles.primary_button_text} />

                </View>
            </View>
        );
    }

    editInfos() {
        if (this.state.email != this.state.email_confirm) {
            alert('Les adresses mail ne correspondent pas');
            return;
        }
        if (this.state.password != this.state.password_confirm) {
            alert('Les mots de passes ne correspondent pas');
            return;
        }
        this.state.name = this.state.name + " " + this.state.last_name;
        // edit user infos
        var data = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: global.token,
                name: this.state.name,
                password: this.state.password,
                email: this.state.email,
                birthdate: this.state.date,
            }),
        }

        fetch('http://40.85.113.74:3000/auth/edit', data).then((res) => res.json())
            .then((resjson) => {
                if (resjson.success === true) {
                    alert("User informations succesfully edited");
                    NavigationService.navigate('MainHome');
                }
                else {
                    alert(resjson.error);
                    return;
                }
            });
    }

    changeToMainHome() {
        NavigationService.navigate('Home');
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