/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../Home';
import global from '../Global';
import { fetch } from 'whatwg-fetch'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

var email = "thomas.domine-@epitech.eu";
var password = "thomas.domine-@epitech.eu23";

var bad_mail= 'rfqehfuhuifhuih@gsdhg.com';

var empty_string = '';

var name = "bob";
var last_name = "moran";
var date = "1996-12-06";

function connexion_test(arg_mail, arg_pswd) {
    if (arg_mail.length < 1) {
        return 1;
    }
    if (arg_pswd.length < 1) {
        return 2;
    }

    var data = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }

    fetch('http://40.85.113.74:3000/auth/signin', data).then((res) => res.json())
        .then((resjson) => {
            if (resjson.success === true) {
                var str = resjson.token;
                global.token = str.slice(4, str.length);
                this.getUserInfos();
                getUserInfos();
            }
            else {
                return false;
            }
        });
}

function getUserInfos() {
    var data = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: global.token,
        }),
    }

    fetch('http://40.85.113.74:3000/auth/getuserinfos', data).then((res) => res.json())
        .then((resjson) => {
            if (resjson.success === true) {
                global.name = resjson.name;
                global.email = resjson.email
                global.date = resjson.birthdate.split('T')[0];
                return true;
            }
            else {
                return false;;
            }
        });
}

describe("login function testing", function () {

    it('renders correctly', () => {
        renderer.create(<Home />);
    });

    describe("parameter error gestion", function () {
        
        it('missing email error gestion', () => {
            response = connexion_test(empty_string, password);
            expect(response).toEqual(1);
        });
        
        it('missing paswd error gestion', () => {
            response = connexion_test(email, empty_string);
            expect(response).toEqual(2);
        });
    })

    describe("Response Management Testing", function () {

        it('Good request response gestion', () => {
            response = connexion_test(email, password, email, password, date, name, last_name);
            expect(response).toEqual(true);
        });

        it('bad request response gestion', () => {
            response = connexion_test(email, password, bad_mail, password, date, name, last_name);
            expect(response).toEqual(false);
        });
    })
});
