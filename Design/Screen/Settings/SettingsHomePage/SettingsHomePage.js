import React from 'react'
import { TextInput, Animated, Text, PanResponder,View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements'
import { heightPercentage, widthPercentage } from '../../../Tools/ResponsiveTool'
import DraggableBattery from './Component/DraggableBattery'
import DraggableFuel from './Component/DraggableFuel'

export default class SettingsHomePage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            elements: [],
            scrollOffset: 0
        }
        this.UpdateElements = this.updateElement.bind(this);
    }

    componentDidMount() {
        this.getUser()
    }

    async getUser() {
        try
        {
            let res = await AsyncStorage.getItem("HomePageConfiguration");
            if (res !== null)
            {
                console.log(res)
                let i = 0;
                let saveElement = res.split("\n")
                while (saveElement[i]) 
                {
                    this.state.elements.push(saveElement[i])
                    this.setState({
                        elements: this.state.elements
                    })
                    i++
                }
            }
        }
        catch(error) {}
    }

    Panel()
    {
        if (this.state.scrollOffset == 0)
            this.scrollview.scrollTo({x:0, y:heightPercentage('91%'), animated: true});
        else
            this.scrollview.scrollTo({x:0, y:0, animated: true});
    }

    SaveAndQuit = async () => {
        try
        {
            const value = await AsyncStorage.getItem("HomePageConfiguration")
            if (value !== null) {
                await AsyncStorage.removeItem('HomePageConfiguration');
            }
        }
        catch (error) {}

        let HomePageConfiguration = ""
        let i = 0;
        while (this.state.elements[i])
        {
            HomePageConfiguration += this.state.elements[i].split(" ")[0] + " " +
            this.state.elements[i].split(" ")[1] + " " + this.state.elements[i].split(" ")[2] + "\n"
            i++
        }
        try 
        {
            await AsyncStorage.setItem("HomePageConfiguration", HomePageConfiguration);
            this.props.navigation.navigate('Settings')
        } 
        catch (error) {}
    };

    addElement(name_component)
    {
        let str = name_component + " " + 0 + " " + 0;
        this.state.elements.push(str)
        this.setState({
            elements: this.state.elements
        })
        this.Panel();
    }

    addElement2(name_component, posx, posy)
    {
        let str = name_component + " " + posx + " " + posy;
        this.state.elements.push(str)
        this.setState({
            elements: this.state.elements
        })
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
        console.log(this.state.elements)

    }

    deleteElement(name_component)
    {
        let temp = [...this.state.elements];
        while (temp[i])
        {
            if (temp[i].split(" ")[0] == name_component)
            {
                temp.splice(i, 1);
            }
            i++;
        }
        this.state.elements.splice(0, this.state.elements.length);
        this.setState({elements: this.state.elements})
        let i = 0;
        while (temp[i])
        {
            if (temp[i].split(" ")[0] != name_component)
            {
                this.addElement2(temp[i].split(" ")[0], temp[i].split(" ")[1], temp[i].split(" ")[2])
                console.log(temp[i]);
            }
            i++;
        }
    }

    checkElement(name_component)
    {
        let temp = this.state.elements;
        let i = 0;
        while (temp[i])
        {
            if (temp[i].split(" ")[0] == name_component)
            {
                return (true)
            }
            i++;
        }
        return (false)
    }

    render()
    {
        let Arr = this.state.elements.map((a, i) => {
            switch (this.state.elements[i].split(" ")[0]) {
                case "Battery":
                    return <DraggableBattery role="Draggable" id={this.state.elements[i].split(" ")[0]} value="43" 
                    x={parseInt(this.state.elements[i].split(" ")[1])} y={parseInt(this.state.elements[i].split(" ")[2])} 
                    OnChange={(str) => {this.updateElement(str)}} OnDelete={(id) => {this.deleteElement(id)}}></DraggableBattery>                  
               case "Fuel":
                    return <DraggableFuel role="Draggable"id={this.state.elements[i].split(" ")[0]} value="62"
                    x={parseInt(this.state.elements[i].split(" ")[1])} y={parseInt(this.state.elements[i].split(" ")[2])} 
                    OnChange={(str) => {this.updateElement(str)}} OnDelete={(ind) => {this.deleteElement(ind)}}></DraggableFuel>
                default:
                    break;
            }
        })

        let Button1 = null
        if (this.checkElement("Battery") == false)
            Button1 = 
                <TouchableOpacity style={{marginTop: heightPercentage('1%')}} onPress={() => {this.addElement("Battery")}}>
                    <DraggableBattery role="Button" x={0} y={0} value="43"></DraggableBattery>
                </TouchableOpacity>

        let Button2 = null;
        if (this.checkElement("Fuel") == false)
        {
            Button2 = 
                <TouchableOpacity style={{marginTop: heightPercentage('1%')}} onPress={() => {this.addElement("Fuel")}}>
                    <DraggableFuel role="Button" x={0} y={0} value="62"></DraggableFuel>
                </TouchableOpacity>
        }

        return (
            <View style={styles.View}>
                <ScrollView
                    onScroll={event => {this.state.scrollOffset = event.nativeEvent.contentOffset.y}}
                    ref={ref => {this.scrollview = ref;}}
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
                            {Button1}
                            {Button2}
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