import React from 'react'
import { TextInput, Text, View, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'
import NavBar from '../Tools/NavBar'
import StackBar from '../Tools/StackBar'

const data = [
{ model:"208", brand:"Peugeot", numberplate: "XX-666-XX" },
{ model:"Polo" , brand:"Volkswagen", numberplate: "AB-123-CA" },
{ model:"C4 Picasso" , brand:"Citroen", numberplate: "CA-321-AB" }
]

export class CarItem extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {},
            elements: []
        }
    }

    render () {
        return(
        <TouchableOpacity style={{marginTop: heightPercentage("2%")}} activeOpacity={0.7} onPress={() => {
            global.model = this.props.model;
            global.brand = this.props.brand;
            global.numberplate = this.props.numberplate;
            this.props.onTap();
        }}>
            <View style={{backgroundColor: "#2F2F2F", width: widthPercentage("90%"),
            height: heightPercentage("9%"), flexDirection: "row", alignItems: 'center'}}>
                <View style={{marginLeft: widthPercentage("5%") }}>
                    <Text style={{color: "white", fontSize: 20}}>{this.props.brand}</Text>
                    <Text style={{color: "white", fontSize: 18}}>{this.props.model}</Text>
                </View>
                <View style={{marginRight: widthPercentage("5%"), flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{color: "white", fontSize: 18}}>{this.props.numberplate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    }
}

export default class CarSelection extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {},
            elements: []
        }
    }

    renderItem = ({ item }) => (
        <CarItem model={item.model} brand={item.brand} numberplate={item.numberplate} 
        onTap={()=>{
            this.props.navigation.navigate('Home');
        }}/>
    );

    render () {
        return (
            <View style={styles.View}>
                <View style={{flexDirection: "row", height: heightPercentage('7%'), width: widthPercentage('100%'), backgroundColor:"#1E1E1E", borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}>
                    <View style={{height: heightPercentage('7%'), width: widthPercentage('100%'), marginLeft: widthPercentage('6%'), justifyContent: 'center'}}>
                        <Text style={{color: "white", fontSize: 20}}>Select your vehicle</Text>
                    </View>
                </View>
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.numberplate}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    View: {
        flex:1, 
        //paddingTop: 20, 
        backgroundColor: "#1E1E1E",
        alignItems:"center"
    }
});
