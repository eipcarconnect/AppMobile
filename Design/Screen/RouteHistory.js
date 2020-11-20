import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
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
        name: "Pitch pour le peojet 'Pomme D'amour'",
        date: "11 novembre 2020",
        startAdress: "1 rue françois périer 34070 Montpellier",
        destnationAdress: "8 rue du collège duvergier 34000 Montpellier",
        timeEstimation: "3h34"
    },
    {
        name: "Meeting avec des investisseur",
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
            search: '',
            searchList: initialArr,
        }
    }

    render() {
        return (
            <View>
                <View>
                    <TextInput 
                        placeholder="Rechercher"
                        value={this.state.password}
                        onChangeText={(text) => this.setState({search: text})}>
                    </TextInput>
                </View>
                {this.displayHistory()}
            </View>
        )
    }

    getSearchArray() {
        let tmp = [];
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

    displayHistory() {
        let toDisplay = this.getSearchArray();
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
