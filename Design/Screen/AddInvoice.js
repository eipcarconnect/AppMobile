import React from 'react'
import { TextInput, View, StyleSheet, Picker, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'


export default class AddInvoice extends React.Component {

    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            numberplate: global.car.numberplate,
            prixHT: '',
            prixTTC: '',
            categorie: 'none',
            tmp: '',
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="Nom de la facture"
                    autoCapitalize="none"
                    placeholderTextColor='black'
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}>
                </TextInput>
                <Text style={{
                    color: "black",
                }}>
                    {this.state.numberplate}
                </Text>
                <Picker
                    selectedValue={this.state.categorie}
                    // style={{ height: 50, width: 150 }}
                    onValueChange={(text) => this.setState({ categorie: text })}
                >
                    <Picker.Item label="Selectionner une cathégorie" value="none" />
                    <Picker.Item label="Restauration" value="restauration" />
                    <Picker.Item label="Logement" value="logement" />
                    <Picker.Item label="Essence" value="essence" />
                    <Picker.Item label="Autoroute" value="autoroute" />
                    <Picker.Item label="Autre" value="autre" />
                </Picker>
                <TextInput
                    placeholder="Prix hors taxe"
                    autoCapitalize="none"
                    placeholderTextColor='black'
                    value={this.state.prixHT}
                    onChangeText={(text) => this.setState({ prixHT: text })}>
                </TextInput>
                <TextInput
                    placeholder="Prix TTC"
                    autoCapitalize="none"
                    placeholderTextColor='black'
                    value={this.state.prixTTC}
                    onChangeText={(text) => this.setState({ prixTTC: text })}>
                </TextInput>
                <Button title="Valider"
                    onPress={() => this.sendFacture()}
                />               
            </View>
        )
    }


    sendFacture() {
        let regPrix1 = new RegExp("^([0-9]+[\,]?[0-9]?[0-9]?|[0-9]+)$");
        let regPrix2 = new RegExp("^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$");
        if (this.state.name.length < 1) {
            alert('Veuillez entrer un nom de facture');
            return (84);
        }
        if (this.state.categorie === 'none') {
            alert('Veuillez selecetionner une categorie de factute');
            return (84);
        }
        if (this.state.prixHT.length < 1) {
            alert('Veuillez entrer un prix Hors Taxes');
            return (84);
        }
        else if (!regPrix1.test(this.state.prixHT) && !regPrix2.test(this.state.prixHT)) {
            alert('Format du Prix HT invalide');
            return (84);
        }
        if (this.state.prixTTC.length < 1) {
            alert('Veuillez entrer un prix TTC');
            return (84);
        }
        else if (!regPrix1.test(this.state.prixTTC) && !regPrix2.test(this.state.prixTTC)) {
            alert('Format du Prix TTC invalide');
            return (84);
        }
        let prixHT = parseFloat(this.state.prixHT.replace(",", "."));
        let prixTTC = parseFloat(this.state.prixTTC.replace(",", "."));
        alert("name:" + ' ' + this.state.name + ' ' + "numberplate:" + ' ' + this.state.numberplate + ' ' + "categorie:" + ' ' + this.state.categorie,
            "prixHT:" + ' ' + prixHT + ' ' + "prixTTC:" + ' ' + prixTTC);
        console.log("name:", this.state.name, "numberplate:", this.state.numberplate, "categorie:", this.state.categorie,
            "prixHT:", prixHT, "prixTTC:", prixTTC);
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