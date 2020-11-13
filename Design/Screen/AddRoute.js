import React from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

export default class AddRoute extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            name: '',
            adresse1: '',
            cp1: '',
            ville1: '',
            adresse2: '',
            cp2: '',
            ville2: '',
            heures: '0',
            minutes: '01',
            
            date: this.setFirstDate(),
            show: false,
            showTime: false
        }
    }

    setFirstDate() {
        let d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    setTime = (event, date) => {
        date = date || this.state.date;

        this.setState({
            showTime: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show(type) {
        if (type === 'date')
            this.setState({ show: true })
        if (type === 'time')
            this.setState({ showTime: true })
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

    formatTime(date) {

        var hour = date.getHours();
        var min = date.getMinutes();

        return hour + 'h' + min;
    }

    sendTrajet() {
        let regCP = new RegExp("^[0-9]{5}$");
        if (this.state.name.length < 1) {
            alert('Veuillez entrer un nom de trajet');
            return (84);
        }
        if (this.state.adresse1.length < 1 || this.state.cp1.length < 1 || this.state.ville1.length < 1) {
            alert('Veuillez entrer une adresse de départ complète');
            console.log(this.state.adresse1, this.state.cp1, this.state.ville1)
            return (84);
        }
        else if (!regCP.test(this.state.cp1)) {
            alert('Veuillez entrer un code postal de départ valide ex 34070');
            return (84);
        }
        if (this.state.adresse2.length < 1 || this.state.cp2.length < 1 || this.state.ville2.length < 1) {
            alert('Veuillez entrer une adresse d\'arrivée complète');
            return (84);
        }
        else if (!regCP.test(this.state.cp2)) {
            alert('Veuillez entrer un code postal d\'arrivée valide ex 34070');
            return (84);
        }
        if (this.state.date.getHours() == '0' && (this.state.date.getMinutes() == '0')) {
            alert('Veuillez une estimation du temps de trajet');
            return (84);
        }
        alert("name:" + ' ' + this.state.name + ' ' +
            "adresse de départ:" + ' ' + this.state.adresse1 + ' ' + ' ' + ' ' + this.state.cp1 + ' ' + ' ' + ' ' + this.state.ville1 + ' ' +
            "adresse d\'arrivée:" + ' ' + this.state.adresse2 + ' ' + ' ' + ' ' + this.state.cp2 + ' ' + ' ' + ' ' + this.state.ville2 + ' ' +
            "date de départ:" + ' ' + this.formatDate(this.state.date) + ' ' + "temps de trajet estimé:" + ' ' + this.formatTime(this.state.date))
        console.log("name:", this.state.name, 
        "adresse de départ:", this.state.adresse1 + ' ' + this.state.cp1 + ' ' + this.state.ville1, 
        "adresse d\'arrivée:", this.state.adresse2 + ' ' + this.state.cp2 + ' ' + this.state.ville2,
            "date de départ:", this.formatDate(this.state.date), "temps de trajet estimé:", this.formatTime(this.state.date));
    }

    render() {
        const { show, date, showTime } = this.state;
        return (
            <View>
                <KeyboardAvoidingView keyboardVerticalOffset={String(-heightPercentage('10%'))} behavior="position" enabled>
                    <TextInput
                        placeholder="Nom du trajet"
                        autoCapitalize="none"
                        placeholderTextColor='black'
                        value={this.state.name}
                        onChangeText={(text) => this.setState({ name: text })}>
                    </TextInput>

                    <View>
                        <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={1} onPress={() => this.show('date')}>
                            <Text style={{ color: "Black" }}>Date du trajet</Text>
                            <Text style={{ color: "Black" }}>{this.formatDate(this.state.date)}</Text>
                        </TouchableOpacity>
                        {show && <DateTimePicker value={date}
                            mode="date"
                            display="spinner"
                            onChange={this.setDate}
                        />
                        }
                    </View>

                    <View>
                        <TextInput 
                            placeholder="Adresse de départ"
                            autoCapitalize="none"
                            placeholderTextColor='black'
                            value={this.state.adresse1}
                            onChangeText={(text) => this.setState({ adresse1: text })}>
                        </TextInput>
                        <TextInput 
                            placeholder="Code postal"
                            autoCapitalize="none"
                            placeholderTextColor='black'
                            value={this.state.cp1}
                            onChangeText={(text) => this.setState({ cp1: text })}>
                        </TextInput>
                        <TextInput 
                            placeholder="Ville"
                            autoCapitalize="none"
                            placeholderTextColor='black'
                            value={this.state.ville1}
                            onChangeText={(text) => this.setState({ ville1: text })}>
                        </TextInput>
                    </View>

                    <View>
                        <TextInput 
                            placeholder="Adresse d'arrivée"
                            autoCapitalize="none"
                            placeholderTextColor='black'
                            value={this.state.adresse2}
                            onChangeText={(text) => this.setState({ adresse2: text })}>
                        </TextInput>
                        <TextInput 
                            placeholder="Code postal"
                            autoCapitalize="none"
                            placeholderTextColor='black'
                            value={this.state.cp2}
                            onChangeText={(text) => this.setState({ cp2: text })}>
                        </TextInput>
                        <TextInput 
                            placeholder="Ville"
                            autoCapitalize="none"
                            placeholderTextColor='black'
                            value={this.state.ville2}
                            onChangeText={(text) => this.setState({ ville2: text })}>
                        </TextInput>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={1} onPress={() => this.show('time')}>
                            <Text style={{ color: "Black" }}>temps de trajet estimé</Text>
                            <Text style={{ color: "Black" }}>{this.formatTime(this.state.date)}</Text>
                        </TouchableOpacity>
                        {showTime && <DateTimePicker value={date}
                            mode="time"
                            display="spinner"
                            onChange={this.setTime}
                        />
                        }
                    </View>
                    


                    <Button title="Valider"
                        onPress={() => this.sendTrajet()}
                    /> 
                </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    View: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#353535",
        alignItems: "center"
    },
    Logo: {
        width: heightPercentage('25%'),
        height: heightPercentage('25%'),
        marginTop: heightPercentage('8%')
    },
    TextInput: {
        marginTop: heightPercentage('7%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1
    },
    Button: {
        marginBottom: 20,
    },
    TextButton: {
        color: "#2c84cc",
        marginTop: heightPercentage('7%')
    },
    ViewTextInput:{
        textAlignVertical: 'top',
    }
});
