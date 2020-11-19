import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'
import NavBar from '../Tools/NavBar'

const data = [
    {
        name: "pause repas",
        numberplate: "AA-389-BB",
        type: "Restauration",
        date: "11 novembre 2020",
        HT: "10,34",
        TTC: "12,54"
    },
    {
        name: "Hotel",
        numberplate: "AA-389-BB",
        type: "Logement",
        date: "10 novembre 2020",
        HT: "23,34",
        TTC: "25,54"
    },
    {
        name: "péage",
        numberplate: "AA-389-BB",
        type: "Autoroute",
        date: "9 novembre 2020",
        HT: "9,34",
        TTC: "11,54"
    },
];

export class InvoiceItem extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {},
            elements: []
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
            name: '',
            numberplate: '',
            prixHT: '',
            prixTTC: '',
            categorie: 'none',
            tmp: ''
        }
    }

    renderItem = ({ item }) => (
        <InvoiceItem name={item.name} numberplate={item.numberplate} HT={item.HT}
        TTC={item.TTC} type={item.type} date={item.date}/>
    );

    render() {
        return (
            <View style={styles.View}>
                <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
                <FlatList
                    data={data}
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
