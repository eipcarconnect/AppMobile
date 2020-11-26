import React from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements'
import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'
import NavBar from '../Tools/NavBar';


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

    render() {
        return (
            <View style={styles.View}>
                 <NavBar onPushButton={() => this.props.navigation.openDrawer()}/>
                <Text style={{fontSize: 26, color: "white", marginTop: heightPercentage("4%") }}>Create an invoice</Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Invoice name"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}>
                </TextInput>
                <View style={{borderBottomWidth: 1, borderColor: "white",  marginTop: heightPercentage('5%')}}>
                    <Picker
                        selectedValue={this.state.categorie}
                        dropdownIconColor="white"
                        style={{color: "white", height: heightPercentage('6%'), width: widthPercentage('80%') }}
                        onValueChange={(text) => this.setState({ categorie: text })} >
                            <Picker.Item label="Selectionner une cathégorie" value="none" />
                            <Picker.Item label="Restauration" value="restauration" />
                            <Picker.Item label="Logement" value="logement" />
                            <Picker.Item label="Essence" value="essence" />
                            <Picker.Item label="Autoroute" value="autoroute" />
                            <Picker.Item label="Autre" value="autre" />
                    </Picker>
                </View>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Prix hors taxe"
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    value={this.state.prixHT}
                    onChangeText={(text) => this.setState({ prixHT: text })}>
                </TextInput>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Prix TTC"
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    value={this.state.prixTTC}
                    onChangeText={(text) => this.setState({ prixTTC: text })}>
                </TextInput>
                <Button
                    onPress={() => this.sendFacture()}
                    title="Send"
                    color="#32d7fb"
                    buttonStyle={styles.Button}>
                </Button>             
            </View>
        )
    }
}


const styles = StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: "#1E1E1E",
        alignItems: "center"
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
        marginTop: heightPercentage('5%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: 'center',
        padding: 4
    },
    TextInputVertical: {
        marginTop: heightPercentage('5%'),
        marginHorizontal: widthPercentage('4%'),
        height: heightPercentage('7%'),
        width: widthPercentage('36%'),
        borderColor: 'white',
        color: 'white',
        borderBottomWidth: 1
    },
    Button: {
        marginTop: heightPercentage('7%'),
        height: heightPercentage('6%'),
        width: widthPercentage('80%'),
        backgroundColor:"#2c84cc"
    },
    TextButton: {
        color: "#2c84cc",
        marginTop: heightPercentage('7%')
    },
});
