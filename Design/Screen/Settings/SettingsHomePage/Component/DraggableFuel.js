import React from 'react'
import { Text, View, StyleSheet, ImageBackground} from 'react-native'
import { Button } from 'react-native-elements'
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import Draggable from 'react-native-draggable';
import { heightPercentage, widthPercentage } from '../../../../Tools/ResponsiveTool'


export default class DraggableFuel extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y,
            role: this.props.role, //"Draggable", "Button" or "Dislay"
            value: this.props.value
        };
    }

    render() 
    {
        console.log(this.state.value);
        let ComponentView = 
        <View style={styles.View}>
            {/* <ImageBackground source={require("../../../../assets/fuel.png")} style={{flex: 1}} imageStyle={styles.ImageBackground}> */}
            <ImageBackground source={require("../../../../assets/FuelText.png")} style={{flex: 1}} imageStyle={styles.ImageTitle}>
                <View  style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: widthPercentage('45%'),
                height: heightPercentage('12%')}}>
                    <GaugeProgress style={styles.AnimatedGaugeProgress}
                    size={heightPercentage('11%')}
                    width={7}
                    fill={this.state.value}
                    rotation={90}
                    cropDegree={90}
                    tintColor="#2c84cc"
                    delay={0}
                    backgroundColor="#C2d5ef"
                    stroke={[2, 2]}
                    strokeCap="circle">
                        <View style={styles.ViewValue}>
                            <Text style={styles.Value}>{this.state.value}%</Text>
                        </View>
                    </GaugeProgress>
            </View>
            </ImageBackground>
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
                    this.props.OnChange(this.props.id + " " + Math.round(bounds.left) + " " + Math.round(bounds.top));
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
                    {ComponentView}
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
        borderColor:"#707070",
        borderWidth: 2,
        borderRadius: 0,
        backgroundColor:"#353535",
        width: widthPercentage('45%'),
        height: heightPercentage('12%')
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
        marginRight: widthPercentage('34%')
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
});