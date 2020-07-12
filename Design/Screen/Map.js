import React from 'react'
import { TextInput, Text, View, Image, StyleSheet, KeyboardAvoidingView, TouchableHighlight, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'
import messaging, { firebase } from '@react-native-firebase/messaging';
import Axios from 'axios'
import MapView, {Marker} from 'react-native-maps'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'


export default class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            seconds: 0,
            lat: global.lat,
            long: global.long,
            region: {
            latitude: global.lat,
            longitude: global.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            },
        }
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
                    this.setState({ email: '', password: '' });
                    console.log(global.lat);
                    console.log(global.long);
                }
                else {
                    alert(resjson.error);
                    return;
                }
            });
    }

    render() {
        return (
            <View>
            <View style={{
                ...StyleSheet.absoluteFillObject,
                height: heightPercentage('100%'),
                width: widthPercentage('100%'),
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <MapView
                    style={{ ...StyleSheet.absoluteFillObject }}
                        region={this.state.region}
                        onRegionChange={this.onRegionChange}
                        showsUserLocation={true}
                >
                    <Marker coordinate={{ latitude: this.state.lat, longitude: this.state.long }}
                        pinColor={"#2c84cc"} // any color
                        title={"You"}
                        description={"Your car position"} />
                    </MapView>
            </View>
            </View>
        )
    }

    // onRegionChange(region) {
    //     this.setState({ region });
    // }

    getInitialState() {
        return {
            region: {
                latitude: global.lat,
                longitude: global.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    tick() {
        this.getCarInfos();
        this.setState(prevState => ({
            seconds: prevState.seconds + 1, region: {
                latitude: prevState.lat + 1,
                longitude: global.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,}, lat: prevState.lat + 1, long: global.long
        }));
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 5000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }
}


const styles = StyleSheet.create({
    View: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#353535",
        alignItems: "center"
    },
    Logo: {
        width: heightPercentage('25%'),
        height: heightPercentage('25%'),
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
        backgroundColor: "#2c84cc"
    },
    TextButton: {
        color: "#2c84cc",
        marginTop: heightPercentage('7%')
    },
});
