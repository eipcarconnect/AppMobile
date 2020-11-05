import React from 'react'
import { TextInput, View, StyleSheet, Picker } from 'react-native'
import { Button } from 'react-native-elements'
import { save, getSaved, deletSaved} from '../Tools/Storage'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'


export default class Map extends React.Component {

    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            plaque: '',
            prixHT: 0.0,
            prixTTC: 0.0,
            categorie: '',
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
                <TextInput
                    placeholder="Plaque d'immatriculation"
                    autoCapitalize="none"
                    placeholderTextColor='black'
                    value={this.state.plaque}
                    onChangeText={(text) => this.setState({plaque: text})}>
                </TextInput>
                <Picker
                    selectedValue={"restauration"}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(text) => this.setState({ categorie: text })}
                >
                    <Picker.Item label="Restauration" value="restauration" />
                    <Picker.Item label="Logement" value="logement" />
                    <Picker.Item label="Essence" value="essence" />
                    <Picker.Item label="Autoroute" value="autoroute" />
                    <Picker.Item label="Autre" value="autre" />
                </Picker>
                {/* <Button title="Suprimmer la phrase sauvegardée"
                    onPress={() => this.deleteDatat()}
                />                */}
            </View>
        )
    }

    deleteDatat() {
        deletSaved('save').then((value) => {
            if (value == true)
                alert("Phrase supprimée avec succés")
            else
                alert("Aucune phrase à supprimer");
        })
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
