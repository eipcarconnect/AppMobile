import React from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import Draggable from 'react-native-draggable';
import { heightPercentage, widthPercentage } from '../../../../Tools/ResponsiveTool'


export default class DraggableMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y,
            role: this.props.role, //"Draggable", "Button" or "Dislay"
        };
    }

    render() {
        console.log(this.state.value);
        let ComponentView =
            <View style={styles.View}>
                <ImageBackground source={require("../../../../assets/Google_Maps_icon.png")} style={styles.logo} imageStyle={styles.ImageTitle}>
                  
                        
                </ImageBackground>
            </View>

        if (this.state.role == "Draggable") {
            return (
                <Draggable
                    renderSize={50}
                    x={this.state.x}
                    y={this.state.y}
                    onPressIn={() => { }}
                    onDragRelease={(event, gestureState, bounds) => {
                        this.props.OnChange(this.props.id + " " + Math.round(bounds.left) + " " + Math.round(bounds.top));
                    }}
                >
                    {ComponentView}
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'flex-end' }}>
                        <Button
                            onPress={() => this.props.OnDelete(this.props.id)}
                            title=""
                            buttonStyle={styles.Button}>
                        </Button>
                    </View>
                </Draggable>
            );
        }
        else if (this.state.role == "Display") {
            return (
                <Draggable
                    renderSize={20}
                    x={this.state.x}
                    y={this.state.y}
                    disabled={true}
                    >
                    <TouchableOpacity onPress={() => {this.props.onClick()}}>
                    {ComponentView}
                    </TouchableOpacity>
                </Draggable>
            );
        }
        else if (this.state.role == "Button") {
            return (
                ComponentView
            )
        }

    }
}

const styles = StyleSheet.create({

    View: {
        borderColor: "#707070",
        borderWidth: 2,
        borderRadius: 0,
        backgroundColor: "#353535",
        width: widthPercentage('20%'),
        height: heightPercentage('12%'),
        alignContent: "center"
    },

    AnimatedGaugeProgress: {
        marginTop: heightPercentage('1%'),
        marginLeft: widthPercentage('15%')
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

    ImageTitle: {
        //opacity: 0.3,
        resizeMode: "center",
        height: heightPercentage('9%'),
        marginTop: heightPercentage('1.3%'),
        marginRight: widthPercentage('34%'),
        marginLeft: widthPercentage('3.5%'),
    },

    ViewValue: {
        position: 'absolute',
        top: heightPercentage('2%'),
        left: widthPercentage('5%'),
        width: widthPercentage('15%'),
        height: heightPercentage('7%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    Value: {
        //opacity: 0.9,
        fontWeight: "bold",
        color: "#FFFFFF",
        //textAlign:"center",
        fontSize: 18,
    },

    Button: {
        marginLeft: heightPercentage('8%'),
        height: heightPercentage('1%'),
        width: heightPercentage('1%'),
        borderRadius: 0,
        backgroundColor: "red"
    },

    logo: {
        height: 40,
        width: 40,
        alignContent: "center",
    }
});