import React from 'react';
import global from './Global';
import NavigationService from './NavigationService.js';
import { StyleSheet, View, Button, Text } from 'react-native';

export default class fuelInfos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fuel: global.fuel,
            speed: global.speed,
            long: global.long,
            lat: global.lat,
            password: '',
            goBack: '',
        }

    }
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text h1>Your tank is {this.state.fuel + '% full' +'\n'}</Text>
                <Button
                    title="Home"
                    onPress={() => this.props.navigation.navigate('MainHome')}
                    button_styles={styles.transparent_button}
                    button_text_styles={styles.transparent_button_text} />
                <Button
                    title="Speed infos"
                    onPress={() => this.props.navigation.navigate('SpeedInfo')}
                    button_styles={styles.transparent_button}
                    button_text_styles={styles.transparent_button_text} />
                <Button
                    title="Location infos"
                    onPress={() => this.props.navigation.navigate('LocationInfo')}
                    button_styles={styles.transparent_button}
                    button_text_styles={styles.transparent_button_text} />

            </View>
                <Button
                    title="refresh"
                    onPress={this.Refresh.bind(this)}
                    button_styles={styles.transparent_button}
                    button_text_styles={styles.transparent_button_text} />
        </View>
        );
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
        fetch('http://40.85.113.74:3000/data/getvehiculeinfo', data).then((res) => res.json())
            .then((resjson) => {
                if (resjson.success === true) {
                    global.speed = resjson.speed;
                    global.fuel = resjson.fuel;
                    global.lat = resjson.latitude;
                    global.long = resjson.longitude;
                    this.setState({fuel: global.fuel});
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