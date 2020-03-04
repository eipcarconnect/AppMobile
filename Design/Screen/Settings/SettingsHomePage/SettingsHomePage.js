import React from 'react'
import { TextInput, Animated, Text, PanResponder,View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements'
import Axios from 'axios'
import { heightPercentage, widthPercentage } from '../../../Tools/ResponsiveTool'
import Draggable from './Component/Draggable'
import Draggable2 from './Component/Draggable2'

var index = 0

export default class SettingsHomePage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            elements: [],
            scrollOffset: 0
        }
        this.UpdateElements = this.updateElement.bind(this);
        AsyncStorage.clear();
    }

    Panel()
    {
        if (this.state.scrollOffset == 0)
            this.scrollview.scrollTo({x:0, y:heightPercentage('91%'), animated: true});
        else
            this.scrollview.scrollTo({x:0, y:0, animated: true});
    }

    SaveAndQuit = async () => {
        try {
            let i = 0;
            while (this.state.elements[i])
            {
                await AsyncStorage.setItem("Drag" + this.state.elements[i].split(" ")[0], 
                this.state.elements[i].split(" ")[1] + " " + this.state.elements[i].split(" ")[2]
                + " " + this.state.elements[i].split(" ")[3]);
                i++;
            }

            let ress = await AsyncStorage.getAllKeys();
            i = 0;
            console.log("Resultat Sauvegarde"); 
            while (ress[i])
            {
                let res = await AsyncStorage.getItem(ress[i]);
                console.log(ress[i] + " : " + res);
                i++
            }
            this.props.navigation.navigate('Settings')
        } catch (error) {
        }
    };

    addElement(id)
    {
        let temp = index ++
        let str = temp.toString() + " " + id.toString() + " " + 0 + " " + 0;
        this.state.elements.push(str)
        this.setState({
            elements: this.state.elements
        })
        this.Panel();
    }

    updateElement(str)
    {
        let temp = this.state.elements;
        let i = 0;
        while (temp[i])
        {
            if (temp[i].split(" ")[0] == str.split(" ")[0])
            {
                temp[i] = str;
                break;
            }
            i++;
        }
        this.setState({elements: temp})
    }

    deleteElement(ind)
    {
        console.log("delete " + ind)
        let temp = this.state.elements;
        let res = [];
        let i = 0;
        while (temp[i])
        {
            if (temp[i].split(" ")[0] != ind)
            {
                res.push(temp[i]);
            }
            i++;
        }
        this.setState({elements: res})
    }

    render() {
        let Arr = this.state.elements.map((a, i) => {
            switch (parseInt(this.state.elements[i].split(" ")[1])) {
                case 1:
                    return <Draggable index={parseInt(this.state.elements[i].split(" ")[0])} id={parseInt(this.state.elements[i].split(" ")[1])}
                    realx={parseInt(this.state.elements[i].split(" ")[2])} realy={parseInt(this.state.elements[i].split(" ")[3])} 
                    OnChange={(str) => {this.updateElement(str)}} OnDelete={(ind) => {this.deleteElement(ind)}}></Draggable>                  
               case 2:
                    return <Draggable2 index={parseInt(this.state.elements[i].split(" ")[0])} id={parseInt(this.state.elements[i].split(" ")[1])}
                    realx={parseInt(this.state.elements[i].split(" ")[2])} realy={parseInt(this.state.elements[i].split(" ")[3])} 
                    OnChange={(str) => {this.updateElement(str)}} OnDelete={(ind) => {this.deleteElement(ind)}}></Draggable2>
                default:
                    break;
            }
        })

        return (
            <View style={styles.View}>
                <ScrollView
                    onScroll={event => {
                        this.state.scrollOffset = event.nativeEvent.contentOffset.y
                      }}
                    ref={ref => {
                        this.scrollview = ref;
                    }}
                    scrollEnabled={false}>

                    <View style={{height: heightPercentage('94%'), backgroundColor:"#353535", borderBottomColor:"#2c84cc", borderBottomWidth:1}}>
                        <View style={{height: heightPercentage('91%')}}>
                            {Arr}
                        </View>
                        <View style={{alignItems:"center"}}>
                            <Button
                                onPress={() => {this.Panel();}}
                                title=""
                                buttonStyle={styles.ButtonPanel}>
                            </Button>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", height: heightPercentage('84%')}}>
                        <ScrollView contentContainerStyle={{alignItems: "center"}}>
                            <Button
                                onPress={() => {this.addElement(1);}}
                                title="Add Draggable Blue"
                                buttonStyle={styles.Button1}>
                            </Button>
                            <Button
                                onPress={() => {this.addElement(2);}}
                                title="Add Draggable Gray"
                                buttonStyle={styles.Button2}>
                            </Button>
                        </ScrollView>
                    </View>
                    <View style={{flexDirection: "row", height: heightPercentage('7%')}}>
                        <Button
                            onPress={() => this.SaveAndQuit()}
                            title="Accept"
                            buttonStyle={styles.Button}>
                        </Button>
                        <Button
                            onPress={() => this.props.navigation.navigate('Settings')}
                            title="Cancel"
                            buttonStyle={styles.Button}>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: "#000000",
        //paddingTop: 20
    },
    row: {
        flexDirection: "row"
    },  
    DropZone: {
        height: heightPercentage('78%'),
        width: widthPercentage('78%'),
        backgroundColor: "#353535"
    },
    ButtonPanel: {
        height: heightPercentage('3%'),
        width: widthPercentage('25%'),
        //marginLeft: widthPercentage('1%'),
        //marginVertical: widthPercentage('1%'),
        backgroundColor:"#2c84cc"
    },
    Button: {
        height: heightPercentage('6%'),
        width: widthPercentage('48.5%'),
        marginLeft: widthPercentage('1%'),
        marginVertical: widthPercentage('1%'),
        backgroundColor:"#2c84cc"
    },
    Button1: {
        height: heightPercentage('6%'),
        width: widthPercentage('48.5%'),
        marginLeft: widthPercentage('1%'),
        marginVertical: widthPercentage('1%'),
        backgroundColor:"skyblue"
    },
    Button2: {
        height: heightPercentage('6%'),
        width: widthPercentage('48.5%'),
        marginLeft: widthPercentage('1%'),
        marginVertical: widthPercentage('1%'),
        backgroundColor:"gray"
    }
});