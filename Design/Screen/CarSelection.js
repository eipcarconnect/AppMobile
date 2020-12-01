import React from 'react'
import { TextInput, Text, View, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'
import NavBar from '../Tools/NavBar'
import StackBar from '../Tools/StackBar'
import { save, getSaved } from '../Tools/Storage'

export class CarItem extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    render () {
        return(
        <TouchableOpacity style={{marginTop: heightPercentage("2%")}} activeOpacity={0.7} onPress={() => {
            global.car = {
                model: this.props.data.model.split(' ')[0],
                brand: this.props.data.model,
                numberplate: this.props.data.licencePlate,
                id: this.props.data._id,
            }
            save("car", JSON.stringify(global.car));
            this.props.onTap();
        }}>
            <View style={{backgroundColor: "#2F2F2F", width: widthPercentage("90%"),
            height: heightPercentage("9%"), flexDirection: "row", alignItems: 'center', elevation: 10}}>
                <View style={{marginLeft: widthPercentage("5%") }}>
                    <Text style={{color: "white", fontSize: 20}}>{this.props.data.model.split(' ')[0]}</Text>
                    <Text style={{color: "white", fontSize: 18}}>{this.props.data.model}</Text>
                </View>
                <View style={{marginRight: widthPercentage("5%"), flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{ color: "white", fontSize: 18 }}>{this.props.data.licencePlate}</Text>
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
            data: [],
        }
    }

    componentDidMount() {
        this.getCarList();
    }

    getCarList() {
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
        fetch('http://40.85.113.74:3000/data/user/getvehicles', data).then((res) => res.json())
            .then((resjson) => {
                if (resjson.success === true) {
                    this.setState({data: resjson.vehicles});
                    console.log('getCarList OK', this.state.data, resjson.vehicles);
                    // console.log(this.state.data);
                }
                else {
                    alert(resjson.error);
                    console.log("getCarList", resjson.error);
                    return;
                }
            });
    }

    renderItem = ({ item }) => (
        <CarItem data={item} 
        onTap={()=>{
            this.props.navigation.navigate('Accueil');
        }}/>
    );

    render () {
        return (
            <View style={styles.View}>
                <View style={{flexDirection: "row", height: heightPercentage('7%'), width: widthPercentage('100%'), backgroundColor:"#1E1E1E", borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}>
                    <View style={{height: heightPercentage('7%'), width: widthPercentage('100%'), marginLeft: widthPercentage('6%'), justifyContent: 'center'}}>
                        <Text style={{color: "white", fontSize: 20}}>Selectionnez un véhicule</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.model}
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
