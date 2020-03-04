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
import MainHome from './MainHome';
import SiginScreen from './SiginScreen';
import EditScreen from './EditSreen';
import FuelInfo from './FuelInfos';
import SpeedInfo from './SpeedInfos';
import LocationInfo from './LocationInfos';

export default class App extends React.Component {
  render() {
    return <Container ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />
  }
}

const Nav = createStackNavigator({
  Home: HomeScreen,
  Sigin: SiginScreen,
  MainHome: MainHome,
  EditScreen: EditScreen,
  FuelInfo: FuelInfo,
  SpeedInfo, SpeedInfo,
  LocationInfo, LocationInfo
},
{
  initialRouteName: 'Home',
});

const Container = createAppContainer(Nav);

