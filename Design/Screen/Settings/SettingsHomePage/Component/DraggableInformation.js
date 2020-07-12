import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements'
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import Draggable from 'react-native-draggable';
import { heightPercentage, widthPercentage } from '../../../../Tools/ResponsiveTool'


export default class DraggableInformation extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y,
            role: this.props.role, //"Draggable", "Button" or "Dislay"
            carBrand: "Volkswagen",
            carModel: "Golf 7",
            fuel: "50",
            battery: "50"
        };
    }

    render() 
    {
        let ComponentView = 
        <View style={styles.View}>

            {/* <ImageBackground source={require("../../../../assets/fuel.png")} style={{flex: 1}} imageStyle={styles.ImageBackground}> */}
            {/* <ImageBackground source={require("../../../../assets/FuelText.png")} style={{flex: 1}} imageStyle={styles.ImageTitle}> */}
                    <Text style={styles.Brand}>{this.state.carBrand}</Text>  
                    <Text style={styles.Model}>{this.state.carModel}</Text>
                    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <Image style={styles.Image} source={require("../../../../assets/key.png")}></Image>
                        <Image style={styles.Image} source={require("../../../../assets/parking.png")}></Image>
                    </View>
            {/* </ImageBackground> */}
            {/* </ImageBackground> */}
        </View>

        if (this.state.role == "Draggable")
        {
            return (
                <Draggable
                renderSize={50} 
                x={this.state.x}
                y={this.state.y}
                onPressIn={() => {}}
                onDragRelease={(event, gestureState, bounds) => {        
                    this.props.OnChange(this.props.id + " " + Math.round(bounds.left) + " " + (heightPercentage("7%") + Math.round(bounds.top)));
                }}
                >
                    {ComponentView}
                    <View  style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'flex-end'}}>
                        <Button
                            onPress={() => this.props.OnDelete(this.props.id)}
                            title=""
                            buttonStyle={styles.Button}>
                        </Button>
                    </View>
                </Draggable>
            );
        }
        else if (this.state.role == "Display")
        {
            return (
                <Draggable
                renderSize={50} 
                x={this.state.x}
                y={this.state.y}
                disabled={true}
                onPressIn={() => {}}>
                    <TouchableOpacity /*onPress={()=>{console.log("quoi")}}*/>
                        {ComponentView}
                    </TouchableOpacity>
                </Draggable>
            );
        }
        else if (this.state.role == "Button")
        {
            return (
                ComponentView
            )
        }
        
    }
}

const styles = StyleSheet.create({

    View: {
        borderColor: "#707070",
        borderWidth: 1,
        borderRadius: 0,
        backgroundColor: "#353535",
        width: widthPercentage('95%'),
        height: heightPercentage('14%')
    },

    ImageBackground: {
        //tintColor: "#000000",
        opacity: 0.2,
        width: heightPercentage('12%'),
        resizeMode: "center",
        height: heightPercentage('10%'),
        marginTop: heightPercentage('0.5%'),
        marginLeft: widthPercentage('18%')
    },

    Image: {
        opacity: 1,
        tintColor: "#2c84cc",
        resizeMode: "center",
        height: heightPercentage('4%'),
        width: widthPercentage('8%'),
        marginTop: heightPercentage('1%'),
        marginHorizontal: widthPercentage('15%')
    },

    Brand: {
        //opacity: 0.9,
        //fontWeight: "bold",
        color: "#FFFFFF",
        textAlign:"center",
        fontSize: 25,
    },

    Model: {
        //opacity: 0.9,
        //fontWeight: "bold",
        color: "#FFFFFF",
        textAlign:"center",
        fontSize: 20,
    },

    Button: {
        marginLeft: heightPercentage('8%'),
        height: heightPercentage('1%'),
        width: heightPercentage('1%'),
        borderRadius: 0,
        backgroundColor: "red"
    },
});