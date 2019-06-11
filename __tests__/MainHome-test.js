/**
 * @format
 */

import 'react-native';
import React from 'react';
import firebase from 'firebase';
import MainHome from '../MainHome';
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
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

it('firebase is initialized correctly', () => {
    expect(firebase.apps.length).toEqual(1);
});


it('renders correctly', () => {
    renderer.create(<MainHome />);
});
