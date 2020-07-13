import React from 'react'
import { TextInput, Text, View, Image, StyleSheet, KeyboardAvoidingView, TouchableHighlight, AsyncStorage, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { save, getSaved, deletSaved} from '../Tools/Storage'
import messaging, { firebase } from '@react-native-firebase/messaging';
import Axios from 'axios'
import MapView, { Marker } from 'react-native-maps'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'


export default class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            toSave: '',
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder={global.test}
                    autoCapitalize="none"
                    placeholderTextColor='black'
                    value={global.test}
                    onChangeText={(text) => this.setGlobal(text)}>
                </TextInput>
                <Button
                    onPress={() => this.props.navigation.navigate('Test')}
                    title="retour"
                    buttonStyle={styles.Button}>
                </Button>

            </View>
        )
    }

    setGlobal(text) {
        global.test = text;
        this.setState({ toSave: this.state.toSave });
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
        paddingBottom: 20,
    },
    TextButton: {
        color: "#2c84cc",
        marginTop: heightPercentage('7%')
    },
});
