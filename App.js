/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import NavigationService from './NavigationService';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from './Home';
import NotVerif from './NotVerif';
import MainHome from './MainHome';
import SiginScreen from './SiginScreen';
import EditScreen from './EditSreen';

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
  EditScreen: EditScreen,
},
{
  initialRouteName: 'Home',
});

const Container = createAppContainer(Nav);

