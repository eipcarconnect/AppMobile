import React from 'react';
import global from './Global';
import NavigationService from './NavigationService.js';
import { StyleSheet, View, Button, Text } from 'react-native';

export default class SpeedInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fuel: global.fuel,
            speed: global.speed,
            long: global.long,
            lat: global.lat,
            seconds: 0,
            password: '',
            goBack: '',
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text h1>Your actual speed is {this.state.speed + 'Km/h' + '\n'}</Text>
                    <Text h1>la vitesse a été actualisé {this.state.seconds + ' fois' + '\n'}</Text>
                    <Button
                        title="Home"
                        onPress={() => this.props.navigation.navigate('MainHome')}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />
                    <Button
                        title="Location infos"
                        onPress={() => this.props.navigation.navigate('LocationInfo')}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />
                    <Button
                        title="Fuel infos"
                        onPress={() => this.props.navigation.navigate('FuelInfo')}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />

                </View>
            </View>
        );
    }

    getCarInfos() {
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
                }
                else {
                    alert(resjson.error);
                    return;
                }
            });
    }

    tick() {
        this.getCarInfos();
            this.setState(prevState => ({
                seconds: prevState.seconds + 1, speed: global.speed
            }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    singOut() {
        global.name = '';
        global.date = '';
        global.email = '';
        global.token = '';
        NavigationService.navigate('Home');
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