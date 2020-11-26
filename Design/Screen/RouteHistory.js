import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

const initialArr = [
    {
        name: "Réunion",
        date: "5 mars 2020",
        startAdress: "1 rue françois périer 34070 Montpellier",
        destnationAdress: "8 rue du collège duvergier 34000 Montpellier",
    },
    {
        name: "Pitch pour le peojet 'Pomme D'amour'",
        date: "24 juikket 2020",
        startAdress: "1 rue françois périer 34070 Montpellier",
        destnationAdress: "8 rue du collège duvergier 34000 Montpellier",
    },
    {
        name: "Meeting avec des investisseur",
        date: "11 novembre 2020",
        startAdress: "1 rue françois périer 34070 Montpellier",
        destnationAdress: "8 rue du collège duvergier 34000 Montpellier",
    },
];

export default class RouteHistory extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            search: '',
            date: new Date(),
            searchList: initialArr,
            searchType: 'name',
            show: false,
        }
    }

    getSearchArray(type) {
        let tmp = [];
        if(type === 'name') {
            if (this.state.search !== '') {
                this.state.searchList.forEach((elem) => {
                    if (elem.name.toLowerCase().startsWith(this.state.search.toLowerCase()))
                        tmp.push(elem);
                });
                console.log(tmp);
                return tmp;
            }
            else
                return initialArr; 
        }
        else if (type === 'date') {
            this.state.searchList.forEach((elem) => {
                if (elem.date.toLowerCase() === this.formatDate(this.state.date).toLowerCase())
                    tmp.push(elem);
            });
            console.log(tmp);
            return tmp;
        }
    }

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show() {
        this.setState({ show: true })
    }

    formatDate(date) {
        var monthNames = [
            "Janvier", "Février", "Mars",
            "Avril", "Mai", "Juin", "juillet",
            "Août", "Septembre", "Octobre",
            "Novembre", "Décembre"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }


    displaySearch(type) {
        if (type === 'name') {
            return (<TextInput
                        placeholder="Rechercher"
                        value={this.state.search}
                        onChangeText={(text) => this.setState({ search: text })}>
                    </TextInput>);
        }
        else if (type === 'date') {
            const { show, date } = this.state;
            return (<View>
                <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={1} onPress={() => this.show('date')}>
                    <Text style={{ color: "Black" }}>{this.formatDate(this.state.date)}</Text>
                </TouchableOpacity>
                {show && <DateTimePicker value={date}
                    mode="date"
                    display="spinner"
                    onChange={this.setDate}
                />
                }
            </View>);
        }
    }

    displayHistory(type) {
        let toDisplay = this.getSearchArray(type);
        let routeList = toDisplay.map(Infos => (
            <Text style={{
                marginVertical: heightPercentage('3%'),
                marginHorizontal: widthPercentage('4%'),
                backgroundColor: "#2F2F2F",
                color: "white",
                textAlign: "center"
            }}>
                Nom: {Infos.name}{"\n"}
                     Date: {Infos.date}{"\n"}
                     Adresse de départ: {Infos.startAdress}{"\n"}
                     Adresse d'arrivée: {Infos.destnationAdress}{"\n"}
                    </Text>
        ));
        return routeList;
    }

    render() {
        return (
            <View>
                <Picker
                    selectedValue={this.state.searchType}
                    onValueChange={(text) => this.setState({ searchType: text })}
                >
                    <Picker.Item label="Recherche par Nom" value="name" />
                    <Picker.Item label="Recherche par Date" value="date" />
                </Picker>
                {this.displaySearch(this.state.searchType)}
                {this.displayHistory(this.state.searchType)}
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
});
