/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../Home';
import firebase from 'firebase'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

var config = {
    apiKey: "AIzaSyDYxR513RoV3YdPGJAmLr2rS4-mRzpTq8g",
    authDomain: "notifeiptest.firebaseapp.com",
    databaseURL: "https://notifeiptest.firebaseio.com",
    projectId: "notifeiptest",
    storageBucket: "notifeiptest.appspot.com",
    messagingSenderId: "250277878146",
    appId: "1:250277878146:web:86e46286c0a9b875"
};

var email = "thomas.domine-@epitech.eu";
var paswd = "thomas.domine-@epitech.eu";

var wrong_email = "jaimelespates@gmail.com";
var wrong_paswd = "plipitiplop";

var short_email = "bob";
var short_paswd = "bob";

if (!firebase.apps.length) {
    firebase.initializeApp(config);
};

function connexion_test(arg_mail, arg_pswd) {
    if (arg_mail.length < 4) {
        return 1;
    }
    if (arg_pswd.length < 4) {
        return 2;
    }
    
    firebase.auth().signInWithEmailAndPassword(arg_mail, arg_pswd).catch(function (error) {
        console.log("plop");
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
            return 3;
        } else {
            return 4;
        }
    }).then(function () {
        return 0;
    });
}

it('firebase is initialized correctly', () => {
    expect(firebase.apps.length).toEqual(1);
});

it('renders correctly', () => {
    renderer.create(<Home />);
});

// it('correct request gestion', () => {
//     response = connexion_test(email, paswd);
//     expect(connexion_test(email, paswd)).toEqual(0);
// });

it('short paswd error gestion', () => {
    response = connexion_test(short_email, paswd);
    expect(response).toEqual(1);
});

it('short paswd error gestion', () => {
    response = connexion_test(email, short_paswd);
    expect(response).toEqual(2);
});

// it('wrong paswd error gestion', () => {
//     response = connexion_test(email, wrong_paswd);
//     expect(response).toEqual(3);
// });

// it ('wrong mail error gestion', () => {
//     response = connexion_test(wrong_email, paswd);
//     expect(response).toEqual(4);
// });