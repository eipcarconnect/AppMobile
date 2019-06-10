/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import NavigationService from './NavigationService';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from './Home';
import NotVerif from './NotVerif';
import MainHome from './MainHome';
import SiginScreen from './SiginScreen';

export default class App extends React.Component {
  render() {
    return <Container ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />
  }
}

const Nav = createStackNavigator({
  Home: HomeScreen,
  Verif: NotVerif,
  Sigin: SiginScreen,
  MainHome: MainHome,
},
{
  initialRouteName: 'Home',
});

const Container = createAppContainer(Nav);

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

