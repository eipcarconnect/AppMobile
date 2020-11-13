import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

const initialArr = [
    {
        name: "Réunion",
        date: "11 novembre 2020",
        startAdress: "1 rue françois périer 34070 Montpellier",
        destnationAdress: "8 rue du collège duvergier 34000 Montpellier",
        timeEstimation: "3h34"
    },
    {
        name: "Réunion",
        date: "11 novembre 2020",
        startAdress: "1 rue françois périer 34070 Montpellier",
        destnationAdress: "8 rue du collège duvergier 34000 Montpellier",
        timeEstimation: "3h34"
    },
    {
        name: "Réunion",
        date: "11 novembre 2020",
        startAdress: "1 rue françois périer 34070 Montpellier",
        destnationAdress: "8 rue du collège duvergier 34000 Montpellier",
        timeEstimation: "3h34"
    },
];

export default class RouteHistory extends React.Component {


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
        let routeList = initialArr.map(Infos => (
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
                    Temps estimé: {Infos.timeEstimation}{"\n"}</Text>
        ));
        return routeList;
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
