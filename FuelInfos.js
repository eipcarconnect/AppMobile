import React from 'react';
import global from './Global';
import NavigationService from './NavigationService.js';
import { StyleSheet, View, Button, Text } from 'react-native';

export default class mainHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: global.email,
            name: global.name,
            date: global.date,
            password: '',
            goBack: '',
        }

    }
    render() {
        return (<View style={styles.container}>
            <View style={styles.body}>
                <Text h1>Welcome on our application {this.state.name + '\n'}</Text>
                <Text h1>Your email is {this.state.email + '\n'}</Text>
                <Text h1>Your birthdate is {this.state.date + '\n'}</Text>
                <Button
                    title="SingOut"
                    onPress={this.singOut.bind(this)}
                    button_styles={styles.transparent_button}
                    button_text_styles={styles.transparent_button_text} />
                <Button
                    title="Edit infos"
                    onPress={() => this.props.navigation.navigate('EditScreen')}
                    button_styles={styles.transparent_button}
                    button_text_styles={styles.transparent_button_text} />

            </View>
            <Button
                title="refresh"
                onPress={this.Refresh.bind(this)}
                button_styles={styles.transparent_button}
                button_text_styles={styles.transparent_button_text} />
        </View>);
    }

    singOut() {
        global.name = '';
        global.date = '';
        global.email = '';
        global.token = '';
        NavigationService.navigate('Home');
    }

    Refresh() {
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
                    this.setState({ email: global.email, name: global.name, date: global.date });
                }
                else {
                    alert(resjson.error);
                    return;
                }
            });
    }

    GoBack(goBack) {
        NavigationService.navigate(goBack);
    }

    GoVerif() {
        NavigationService.navigate('Verif');
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