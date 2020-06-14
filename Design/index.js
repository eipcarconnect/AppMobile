/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

