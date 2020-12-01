import React from 'react'
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'
import {NavigationEvents} from 'react-navigation';
import NavBar from '../Tools/NavBar'

export class RouteItem extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {},
            elements: []
        }
    }

    render () {
        return(
            <View style={{backgroundColor: this.props.style, alignItems: "center", marginBottom: heightPercentage('3%'), width: widthPercentage('85%'), elevation: 10}}>
                <TouchableOpacity onPress={this.props.onPress}>

                <Text style={{marginTop: heightPercentage('2%'), color: "white", textAlign: "center", fontSize: 20, width: widthPercentage("75%")}}>
                    {this.props.name.toUpperCase()}
                </Text>
                <View style={{ marginTop: heightPercentage('2%'), marginBottom: heightPercentage('3%'), width: widthPercentage("85%")}}> 
                    <View style={{marginLeft: widthPercentage("4%") }}>
                        <Text style={{ color: "white" }}>{this.props.date}</Text>
                    </View>
                    <View style={{marginLeft: widthPercentage("4%"), marginTop: heightPercentage('1%')}}>
                        <Text style={{color: "#2c84cc"}}>Depart:</Text>
                        <Text style={{color: "white"}}>{this.props.start}</Text>
                    </View>
                    <View style={{marginLeft: widthPercentage("4%"), marginTop: heightPercentage('1%') }}>
                        <Text style={{color: "#2c84cc"}}>Arrivée:</Text>
                        <Text style={{color: "white"}}>{this.props.end}</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default class RouteHistory extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            search: '',
            date: new Date(),
            searchList: [],
            searchType: 'name',
            show: false,

            selectedId: null,
            itemSelected: null
        }

    }

    componentDidMount() {
        this.getRideArray();
    }

    
    parseDate(date) {
        let ret = date.split('/');
        return (ret[1] + '/' + ret[0] + '/' + ret[2]);
    }

    getRideArray() {
        var data = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: global.token,
            }),
        }
        fetch('http://40.85.113.74:3000/data/user/getrides', data).then((res) => res.json())
            .then((resjson) => {
                if (resjson.success === true) {
                    console.log('getrides OK');
                    this.setState({searchList: resjson.rides});
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
                return this.state.searchList; 
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

    date_sort(a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
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
                        placeholderTextColor= 'white'
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
    

    renderItem = ({ item }) => {
        const backgroundColor = item._id === this.state.selectedId ? "#606060" : "#2F2F2F";
        return (
        <RouteItem name={item.name} start={item.start}
        end={item.end} date={item.date} style={backgroundColor} onPress={() => {this.setState({selectedId: item._id, itemSelected: item})}}/>
    )};

    render() {
        return (
            <View style={styles.View}>
                <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
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
                    style={{width: widthPercentage("100%"), marginTop: heightPercentage("3%") }}
                    contentContainerStyle={{alignItems: "center"}}
                    data={this.getSearchArray(this.state.searchType)}
                    renderItem={this.renderItem}
                    keyExtractor={item => item._id}
                    extraData={this.state.selectedId}
                />
                <Button
                    onPress={() => {
                        if (this.state.selectedId !== null)
                        {
                            global.actualRide = this.state.itemSelected;
                            this.props.navigation.navigate('Accueil');
                        }
                    }}
                    title="Validez"
                    buttonStyle={styles.Button}>
                </Button>
            </View>
        )
    }   
}


const styles = StyleSheet.create({
    View: {
        flex: 1,
        // paddingTop: 20,
        backgroundColor: "#1E1E1E",
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
        marginTop: heightPercentage('2%'),
        marginBottom: heightPercentage('2%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        backgroundColor:"#2c84cc"
    },
    TextButton: {
        color: "#2c84cc",
        marginTop: heightPercentage('7%')
    },
});