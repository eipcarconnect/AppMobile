import React from 'react'
import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'
import DateTimePicker from '@react-native-community/datetimepicker'
import NavBar from '../Tools/NavBar'
import { Picker } from '@react-native-picker/picker'
import { NavigationEvents } from 'react-navigation'

export class InvoiceItem extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    parseDate(date) {
        let ret = date.split('/');
        return (ret[1] + '/' + ret[0] + '/' + ret[2]);
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

    displayDate() {
        if (global.actualRide.date.includes('/'))
            return this.formatDate(new Date(this.parseDate(global.actualRide.date)));
        else
            return global.actualRide.date

    }

    render () {
        return(
            <View style={{backgroundColor: "#2F2F2F", alignItems: "center", marginTop: heightPercentage('3%'), width: widthPercentage('85%'), elevation: 10}}>
                <Text style={{marginTop: heightPercentage('2%'), color: "white", textAlign: "center", fontSize: 20}}>
                    {this.props.name.toUpperCase()}
                </Text>
                <View style={{width: widthPercentage("85%"), flexDirection: "row", alignItems: 'center',
                marginTop: heightPercentage('2%')}}>
                    <View style={{marginLeft: widthPercentage("8%") }}>
                        <Text style={{color: "white"}}>{this.displayDate()}</Text>
                    </View>
                    <View style={{marginRight: widthPercentage("8%"), flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{color: "#2c84cc"}}>{this.props.type}</Text>
                    </View>
                </View>
                <View style={{width: widthPercentage("85%"), flexDirection: "row", alignItems: 'center',
                marginTop: heightPercentage('2%'), marginBottom: heightPercentage('3%')}}>
                    <View style={{marginLeft: widthPercentage("8%") }}>
                        <Text style={{ color: "white" }}>{this.props.TTC} € TTC</Text>
                    </View>
                    <View style={{marginRight: widthPercentage("8%"), flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{color: "white"}}>{this.props.HT} € HT</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default class InvoiceHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            date: new Date(),
            searchList: [],
            searchType: 'name',
            show: false,
        }
    }

    parseDate(date) {
        let ret = date.split('/');
        return (ret[1] + '/' + ret[0] + '/' + ret[2]);
    }

    componentDidMount() {
        this.getInvoiceArray();
    }

    setSearchArray(type) {
        let tmp = [];
        console.log("AAAAAAAAAAAAAAAAAA", this.state.searchList);
        if (type === 'name') {
            if (this.state.search !== '') {
                this.state.searchList.forEach((elem) => {
                    if (elem.name.toLowerCase().startsWith(this.state.search.toLowerCase()))
                        tmp.push(elem);
                });
                return tmp;
            }
            else
                return this.state.searchList;
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

    getInvoiceArray() {
        if(global.actualRide === null) {
            this.setState({ searchList: [] });
        }
        else {
            var data = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rideId: global.actualRide._id,
                }),
            }
            fetch('http://40.85.113.74:3000/data/getbills', data).then((res) => res.json())
                .then((resjson) => {
                    if (resjson.success === true) {
                        console.log('getBills OK');
                        this.setState({ searchList: resjson.bills });
                        console.log(this.state.searchList);
                    }
                    else {
                        alert(resjson.error);
                        console.log("getBills", resjson.error);
                        return;
                    }
            });
        }
    }



    displaySearch() {
            return (<TextInput
                style={{
                    fontSize: 16,
                    paddingLeft: widthPercentage('2%'),
                    marginTop: heightPercentage('2%'),
                    height: heightPercentage('6%'),
                    width: widthPercentage('80%'),
                    borderColor: 'white',
                    color: 'white',
                    borderBottomWidth: 1
                }}
                placeholderTextColor='white'
                placeholder="Rechercher"
                value={this.state.search}
                onChangeText={(text) => this.setState({ search: text })}>
            </TextInput>);
    }

    renderItem = ({ item }) => (
        <InvoiceItem name={item.name} HT={item.priceHT}
        TTC={item.priceTTC} type={item.type} date={item.date}/>
    );

    render() {
        return (
            <View style={styles.View}>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
                <View style={{ borderBottomWidth: 1, borderColor: "white", marginTop: heightPercentage('1%') }}>
                    <Text
                        style={{ color: "white", height: heightPercentage('6%'), width: widthPercentage('80%') }}
                        >
                        Rechercher par Nom
                </Text>
                </View>
                {this.displaySearch()}
                <FlatList
                    data={this.setSearchArray(this.state.searchType)}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.numberplate}
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
    },
    Logo: {
        width: heightPercentage('25%'),
        height: heightPercentage('25%'),
        marginTop: heightPercentage('8%')
    },
    TextInput: {
        marginTop: heightPercentage('5%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1,
        fontSize: 16
    },
    TouchableOpacity: {
        marginTop: heightPercentage('2%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: 'center',
        padding: 4,
        paddingLeft: "2%"
    },
    Button: {
        marginBottom: 20,
    },
    TextButton: {
        color: "#2c84cc",
        marginTop: heightPercentage('7%')
    },
});