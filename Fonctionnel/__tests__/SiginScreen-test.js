/**
 * @format
 */

import 'react-native';
import React from 'react';
import SiginScreen from '../SiginScreen';
import renderer from 'react-test-renderer';
import { fetch } from 'whatwg-fetch'

var email = "thomas.domine-@epitech.eu";
var password = "thomas.domine-@epitech.eu";

var wrong_email = "jaimelespates@gmail.com";
var wrong_paswd = "plipitiplop24";

var short_paswd = "bob";

var name = "bob";
var last_name = "moran";

var empty_string = "";

var date = "1996-12-06";

function singin_test(email, password, email_confirm, password_confirm, date, name, last_name) {
    if (email.length < 1) {
        return 1;
    }
    if (password.length < 8) {
        return 2;
    }
    if (email != email_confirm) {
        return 3;
    }
    if (password != password_confirm) {
        return 4;
    }
    if (date.length < 1) {
        return 5;
    }
    if (name.length < 1) {
        return 6;
    }
    if (last_name.length < 1) {
        return 7;
    }

    name = name + " " + last_name;

    var data = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            password: password,
            email: email,
            birthdate: date,
        }),
    }

    fetch('http://40.85.113.74:3000/auth/signup', data).then((res) => res.json())
        .then((resjson) => {
            if (resjson.success === true) {
                return true;
            }
            else {
                return false;
            }
        });
}

function bad_singin_test(email, password, date) {

    var data = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
            email: email,
            birthdate: date,
        }),
    }

    
    fetch('http://40.85.113.74:3000/auth/signup', data).then((res) => res.json())
    .then((resjson) => {
        console.log('I want to be seen!');
            if (resjson.success === true) {
                return true;
            }
            else {
                return false;
            }
        });
}

describe("sigin function testing", function() {
    
    it('renders correctly', () => {
        renderer.create(<SiginScreen />);
    });
    
    describe("parameter error gestion", function() {

        it('empty email error gestion', () => {
            response = singin_test(empty_string, password, empty_string, password, date, name, last_name);
            expect(response).toEqual(1);
        });
        
        it('short paswd error gestion', () => {
            response = singin_test(email, short_paswd, email, short_paswd, date, name, last_name);
            expect(response).toEqual(2);
        });
        
        it('different email error gestion', () => {
            response = singin_test(email, wrong_paswd, wrong_email, wrong_paswd, date, name, last_name);
            expect(response).toEqual(3);
        });
        
        it('different paswd error gestion', () => {
            response = singin_test(email, wrong_paswd, email, password, date, name, last_name);
            expect(response).toEqual(4);
        });
        
        it('missing date error gestion', () => {
            response = singin_test(email, password, email, password, empty_string, name, last_name);
            expect(response).toEqual(5);
        });
        
        it('missing name error gestion', () => {
            response = singin_test(email, password, email, password, date, empty_string, last_name);
            expect(response).toEqual(6);
        });
        
        it('missing last name error gestion', () => {
            response = singin_test(email, password, email, password, date, name, empty_string);
            expect(response).toEqual(7);
        });
    });

    describe("Response Management Testing", function() {

        it('Good request response gestion', () => {
            response = singin_test(email, password, email, password, date, name, last_name);
            expect(response).toEqual(true);
        });

        it('Good bad response gestion', () => {
            response = bad_singin_test(email, password, date);
            expect(response).toEqual(false);
        });

    });
    
});


