import React from 'react'
import { TextInput, Animated, Text, PanResponder ,View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements'
import Axios from 'axios'
import '../SettingsHomePage'
import { heightPercentage, widthPercentage } from '../../../../Tools/ResponsiveTool'


export default class Draggable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY({x: 150, y: 150}),
            RealX: 0,
            RealY: 0,
        };

        console.log("KEY " + this.props.index + "   ID " + this.props.id);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder : () => true,
            onMoveShouldSetPanResponder : (evt, gestureState) => {
                return !(gestureState.dx === 0 && gestureState.dy === 0)                  
            },
            onPanResponderGrant: (e, gesture) => {
                this.state.pan.setOffset(this.state.pan.__getValue());
                this.state.pan.setValue({x: 0, y: 0})
            },
            onPanResponderMove : (e, gesture) => {
                this.state.pan.setValue({ x: gesture.dx, y: gesture.dy });
               // console.log(gesture.dx + ", " + gesture.dy);

                this.setState({RealX: e.nativeEvent.pageX, RealY: e.nativeEvent.pageY})
            },
            onPanResponderRelease : (e, gesture) => {
                this.state.pan.flattenOffset();

                //if (this.isDropArea(gesture)) {
                this.setState({RealX: e.nativeEvent.pageX, RealY: e.nativeEvent.pageY});
                let tempx = this.state.RealX;
                let tempy = this.state.RealY;
                this.props.OnChange(this.props.index + " " + this.props.id + " " + tempx + " " + tempy);
                //console.log("Realx :" + this.state.RealX + " " + "Realy" + this.state.RealY);
            } //Step 4
        });
    }

    render() {
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[this.state.pan.getLayout(), styles.circle]}>
                <Button
                    onPress={() => this.props.OnDelete(this.props.index)}
                    title=""
                    buttonStyle={styles.Button}>
                </Button>
                <Text>
                    {this.props.index}
                </Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    Button: {
        //marginTop: heightPercentage('7%'),
        marginLeft: heightPercentage('8%'),
        height: heightPercentage('1%'),
        width: heightPercentage('1%'),
        borderRadius: 0,
        backgroundColor: "red"
    },

    circle: {
        backgroundColor: "gray",
        width: heightPercentage('10%'),
        height: heightPercentage('10%'),
        //borderRadius: heightPercentage('4%')
    }
});