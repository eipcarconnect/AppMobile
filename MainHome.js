import React from 'react';
import firebase from 'firebase'
import NavigationService from './NavigationService.js';
import { StyleSheet, View, Button, Text } from 'react-native';

export default class mainHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            goBack: '',
        }
        setTimeout(() => {
            this.setState({ email: '' })
        }, 1000)

    }
    render() {
        const { navigation } = this.props;
        if (!firebase.auth().currentUser) {
            this.GoBack(navigation.getParam('goBack', 'Home'));
            return (<View style={styles.container}>
            </View>);
        }
        else if (firebase.auth().currentUser.emailVerified === false) {
            console.warn(firebase.auth().currentUser.emailVerified);
            this.GoVerif();
            return (<View style={styles.container}>
            </View>);
        }
        else {
            console.warn(firebase.auth().currentUser.emailVerified);
            return (<View style={styles.container}>
                <View style={styles.body}>
                    <Text h1>Welcome on our application</Text>
                    <Button
                        title="SingOut"
                        onPress={this.singOut.bind(this)}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />
                </View>
            </View>);
        }
    }

    singOut() {
        firebase.auth().signOut().then(function () {
            NavigationService.navigate('Home');
        });
    }

    GoBack(goBack) {
        NavigationService.navigate(goBack);
    }

    GoVerif() {
        NavigationService.navigate('Verif');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});