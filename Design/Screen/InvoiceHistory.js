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

    render () {
        return(
            <View style={{backgroundColor: "#2F2F2F", alignItems: "center", marginTop: heightPercentage('3%'), width: widthPercentage('85%'), elevation: 10}}>
                <Text style={{marginTop: heightPercentage('2%'), color: "white", textAlign: "center", fontSize: 20}}>
                    {this.props.name.toUpperCase()}
                </Text>
                <View style={{width: widthPercentage("85%"), flexDirection: "row", alignItems: 'center',
                marginTop: heightPercentage('2%')}}>
                    <View style={{marginLeft: widthPercentage("8%") }}>
                        <Text style={{color: "white"}}>{this.props.date}</Text>
                    </View>
                    <View style={{marginRight: widthPercentage("8%"), flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{color: "#2c84cc"}}>{this.props.type}</Text>
                    </View>
                </View>
                <View style={{width: widthPercentage("85%"), flexDirection: "row", alignItems: 'center',
                marginTop: heightPercentage('2%'), marginBottom: heightPercentage('3%')}}>
                    <View style={{marginLeft: widthPercentage("8%") }}>
                        <Text style={{color: "white"}}>{this.props.TTC} € TTC</Text>
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

    componentDidMount() {
        this.getInvoiceArray();
    }

    setSearchArray(type) {
        let tmp = [];
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
        else if (type === 'date') {
            this.state.searchList.forEach((elem) => {
                if (elem.date.toLowerCase() === this.formatDate(this.state.date).toLowerCase())
                    tmp.push(elem);
            });
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
                    token: global.actualRide._id,
                }),
            }
            fetch('http://40.85.113.74:3000/data/getbills', data).then((res) => res.json())
                .then((resjson) => {
                    if (resjson.success === true) {
                        console.log('getrides OK');
                        this.setState({ searchList: resjson.bills });
                        this.state.searchList.forEach((elem, index) => {
                            console.log(elem, index);
                            elem.date = this.parseDate(elem.date);
                        });
                        this.state.searchList.sort(this.date_sort);
                        this.state.searchList.forEach((elem, index) => {
                            elem.date = this.formatDate(new Date(elem.date));
                        });
                    }
                    else {
                        alert(resjson.error);
                        console.log("getrides", resjson.error);
                        return;
                    }
            });
        }
    }



    displaySearch(type) {
        if (type === 'name') {
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
        else if (type === 'date') {
            const { show, date } = this.state;
            return (<View>
                <TouchableOpacity style={styles.TouchableOpacity} activeOpacity={1} onPress={() => this.show('date')}>
                    <Text style={{ color: "white", fontSize: 16 }}>{this.formatDate(this.state.date)}</Text>
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

    renderItem = ({ item }) => (
        <InvoiceItem name={item.name} numberplate={item.numberplate} HT={item.HT}
        TTC={item.TTC} type={item.type} date={item.date}/>
    );

    render() {
        return (
            <View style={styles.View}>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
                <View style={{ borderBottomWidth: 1, borderColor: "white", marginTop: heightPercentage('1%') }}>
                    <Picker
                        selectedValue={this.state.searchType}
                        dropdownIconColor="white"
                        style={{ color: "white", height: heightPercentage('6%'), width: widthPercentage('80%') }}
                        onValueChange={(text) => this.setState({ searchType: text })} >
                        <Picker.Item label="Rechercher par Nom" value="name" />
                        <Picker.Item label="Rechercher par Date" value="date" />
                </Picker>
                </View>
                {this.displaySearch(this.state.searchType)}
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