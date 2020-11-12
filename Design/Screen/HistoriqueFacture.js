import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

const initialArr = [
    {
        name: "pause repas",
        plaque: "AA-389-BB",
        type: "Restauration",
        date: "11 novembre 2020",
        HT: "10,34",
        TTC: "12,54"
    },
    {
        name: "Hotel",
        plaque: "AA-389-BB",
        type: "Logement",
        date: "10 novembre 2020",
        HT: "23,34",
        TTC: "25,54"
    },
    {
        name: "péage",
        plaque: "AA-389-BB",
        type: "Autoroute",
        date: "9 novembre 2020",
        HT: "9,34",
        TTC: "11,54"
    },
];

export default class HistoriqueFacture extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            name: '',
            plaque: '',
            prixHT: '',
            prixTTC: '',
            categorie: 'none',
            tmp: '',
             
        }
    }

    render() {
        return (
            <View>
                {this.displayHistory()}
            </View>
        )
    }

    displayHistory() {
        let FactList = initialArr.map(Infos => (
            <Text style={{
                marginVertical: heightPercentage('3%'),
                marginHorizontal: widthPercentage('4%'),
                backgroundColor: "#2F2F2F",
                color: "white",
                textAlign: "center"
            }}>
                Nom: {Infos.name}{"\n"}
                     plaque: {Infos.plaque}{"\n"}
                     Type: {Infos.type}{"\n"}
                     Date: {Infos.date}{"\n"}
                     Prix Hors Taxes: {Infos.HT}{"\n"}
                     Prix TTC: {Infos.TTC}{"\n"}</Text>
        ));
        return FactList;
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
