/**
 * @format
 */

import 'react-native';
import React from 'react';
import global from '../Global';
import MainHome from '../MainHome';
import { fetch } from 'whatwg-fetch';
import renderer from 'react-test-renderer';

function getUserName() {
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
                return resjson.name;
            }
            else {
                return false;;
            }
        });
}

function getUserEmail() {
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
                if (resjson.email)
                    return true;
            }
            else {
                return false;;
            }
        });

} 
function getUserDate() {
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
                if (resjson.birthdate)
                    return true;
            }
            else {
                return false;;
            }
        });
}

function singOut() {
    global.name = '';
    global.date = '';
    global.email = '';
    global.token = '';
}

describe("Main home function testing", function () {

    it('renders correctly', () => {
        renderer.create(<MainHome />);
    });


    describe("reception of the user information", function() {

        it('user name recived', () => {
            resp = getUserName();
            expect(resp).toEqual(true);
        });

        it('user email recived', () => {
            resp = getUserEmail();
            expect(resp).toEqual(true);
        });

        it('user Birthdate recived', () => {
            resp = getUserDate();
            expect(resp).toEqual(true);
        });

    });

    describe("remove user information", function() {

        it('user name removed', () => {
            global.name = 'Thomas';
            singOut();
            expect(global.name).toEqual('');
        });

        it('user date removed', () => {
            global.date = '1998-24-10';
            singOut();
            expect(global.date).toEqual('');
        });

        it('user email removed', () => {
            global.email = 'ttyff@gg.com';
            singOut();
            expect(global.email).toEqual('');
        });

        it('user name removed', () => {
            global.token = 'ruieyuiqyfuh<uhufhui<fhuhsuihfuiseh';
            singOut();
            expect(global.name).toEqual('');
        });

    })

});

