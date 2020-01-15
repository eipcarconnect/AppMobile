import React from 'react';
import global from './Global';
import NavigationService from './NavigationService.js';
import { StyleSheet, View, Button, Text, Linking,Platform } from 'react-native';

export default class LocationInfos extends React.Component {
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
                    <Text h1>Your actual location is at latitude {this.state.lat + 'and at longitude ' +  this.state.long + ' Click on "Map" button to visualise it' + '\n'}</Text>

                    <Button
                        title="Home"
                        onPress={() => this.props.navigation.navigate('MainHome')}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />
                    <Button
                        title="Fuel infos"
                        onPress={() => this.props.navigation.navigate('FuelInfo')}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />
                    <Button
                        title="Speed infos"
                        onPress={() => this.props.navigation.navigate('SpeedInfo')}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />
                    <Button
                        title="Map"
                        onPress={this.seeCar.bind(this)}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />

                </View>
            </View>
        );
    }

    // getCarInfos() {
    //     var data = {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             token: global.token,
    //         }),
    //     }
    //     fetch('http://40.85.113.74:3000/data/getvehiculeinfo', data).then((res) => res.json())
    //         .then((resjson) => {
    //             if (resjson.success === true) {
    //                 global.speed = resjson.speed;
    //                 global.fuel = resjson.fuel;
    //                 global.lat = resjson.latitude;
    //                 global.long = resjson.longitude;

    //             }
    //             else {
    //                 alert(resjson.error);
    //                 return;
    //             }
    //         });
    // }

    seeCar() {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${global.lat},${global.long}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        Linking.openURL(url); 
    }

    // tick() {
    //     this.getCarInfos();
    //     this.setState(prevState => ({
    //         seconds: prevState.seconds + 1, lat: global.lat, long: global.long
    //     }));
    // }

    // componentDidMount() {
    //     this.interval = setInterval(() => this.tick(), 1000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

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