import React from 'react'
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Axios from 'axios'
import global from '../../Tools/Global';
import DateTimePicker from '@react-native-community/datetimepicker'
import { heightPercentage, widthPercentage } from '../../Tools/ResponsiveTool'


export default class BirthdaySettings extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            date: new Date(global.date),
            maxDate: new Date('2004-12-31'),
            minDate: new Date('1900-01-01'),
            show: false
        }
    }

    setNewBirthday = (event, date) => {
        date = date || this.state.date;
    
        this.setState({
          show: Platform.OS === 'ios' ? true : false,
         date,
        });
    }

    formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    show()
    {
        this.setState({show: true})
    }

    editInfos() {
        // edit user infos
        var data = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: global.token,
                name: global.name,
                password: "",
                email: global.email,
                birthdate: this.state.date,
            }),
        }

        fetch('http://40.85.113.74:3000/auth/edit', data).then((res) => res.json())
            .then((resjson) => {
                if (resjson.success === true) {
                    this.props.navigation.navigate('SettingsAccount');
                }
                else {
                    alert(resjson.error);
                    return;
                }
            });
    }

    render () {
        const { show, date } = this.state;
        return (
            <View style={styles.View}>
                <View>
                    <TouchableOpacity style={styles.TouchableOpacity} activeOpacity= {1} onPress={() => this.show()}>
                        <Text style={{color: "white"}}>New date of birth</Text>
                        <Text style={{color: "white"}}>{this.formatDate(this.state.date)}</Text>
                    </TouchableOpacity>
                    { show && <DateTimePicker value={date}
                        mode="date"
                        display="spinner"
                        maximumDate= {this.state.maxDate}
                        minimumDate= {this.state.minDate}
                        onChange={this.setNewBirthday}/>
                    }
                </View>
                <Button
                    onPress={() => this.editInfos()}
                    title="Confirm"
                    buttonStyle={styles.Button}>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    View: {
        flex:1, 
        paddingTop: 20, 
        backgroundColor: "#353535", 
        alignItems:"center"
    },
    TouchableOpacity: {
        marginTop: heightPercentage('5%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: 'center',
        padding: 4
    },
    TextInput: {
        marginTop: heightPercentage('5%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1
    },
    Button: {
        marginTop: heightPercentage('7%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        backgroundColor:"#2c84cc"
    }
});