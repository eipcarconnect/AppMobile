/**
 * @format
 */

import 'react-native';
import React from 'react';
import firebase from 'firebase';
import SiginScreen from '../SiginScreen';
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

var good_email = "thomas.domine-@epitech.eu";
var good_paswd = "thomas.domine-@epitech.eu";

var wrong_email = "jaimelespates@gmail.com";
var wrong_paswd = "plipitiplop";

var short_email = "bob";
var short_paswd = "bob";

function inscription_test(email, password, email_confirm, password_confirm) {
    if (email.length < 4) {
        return 1;
    }
    if (password.length < 4) {
        return 2;
    }
    if (email != email_confirm) {
        return 3;
    }
    if (password != password_confirm) {
        return 4;
    }
    // Sign in with email and pass.
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            return 5;
        } else {
            return 6;
        }
    }).then(function () {
        return 0;
    });
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

it('firebase is initialized correctly', () => {
    expect(firebase.apps.length).toEqual(1);
});

it('renders correctly', () => {
    renderer.create(<SiginScreen />);
});

it('short paswd error gestion', () => {
    response = inscription_test(short_email, good_paswd, short_email, good_paswd);
    expect(response).toEqual(1);
});

it('short paswd error gestion', () => {
    response = inscription_test(good_email, short_paswd, good_email, short_paswd);
    expect(response).toEqual(2);
});

it('different email error gestion', () => {
    response = inscription_test(good_email, wrong_paswd, wrong_email, wrong_paswd);
    expect(response).toEqual(3);
});

it('different paswd error gestion', () => {
    response = inscription_test(good_email, wrong_paswd, good_email, good_paswd);
    expect(response).toEqual(4);
});

