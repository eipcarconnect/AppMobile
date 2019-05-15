import React from 'react'
import { TextInput, Text, View, Alert, AsyncStorage, Image, TouchableHighlight, ScrollView } from 'react-native'
import Axios from 'axios'
import { Button } from 'react-native-elements';


export default class Home extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    render () {
        return (
            <View>
                <ScrollView>
                    <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: "#2f4159", width: 1000, height: 500}}>
                </View>
            </View>
        )
    }
}