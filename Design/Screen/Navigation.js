import React from 'react';
import { Image, Icon } from 'react-native'

import SignInScreen from './SignIn'
import SignUpScreen from './SignUp'

import HomeScreen from './Home'
import SettingsScreen from './Settings'

import MapScreen from './Map'

import SettingsAccountScreen from './Settings/SettingsAccount'
import SettingsHomePageScreen from './Settings/SettingsHomePage/SettingsHomePage'

import BirthdaySettingsScreen from './Settings/BirthdaySettings'
import EmailSettingsScreen from './Settings/EmailSettings'
import NameSettingsScreen from './Settings/NameSettings'
import PasswordSettingsScreen from './Settings/PasswordSettings'

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'


const SettingsAccountStack = createStackNavigator({
  SettingsAccount: 
  {
    screen: SettingsAccountScreen,
    navigationOptions:{
      title: 'Settings account',
      headerStyle: {
        backgroundColor: '#353535'
      },
      headerTintColor: 'white'
    }
  },
  BirthdaySettings:
  {
    screen: BirthdaySettingsScreen,
    navigationOptions:{
      title: 'Change date of birth',
      headerStyle: {
        backgroundColor: '#353535'
      },
      headerTintColor: 'white'
    }
  },
  EmailSettings:
  {
    screen: EmailSettingsScreen,
    navigationOptions:{
      title: 'Change e-mail address',
      headerStyle: {
        backgroundColor: '#353535'
      },
      headerTintColor: 'white'
    }
  },
  NameSettings: {
    screen: NameSettingsScreen,
    navigationOptions:{
      title: 'Change name',
      headerStyle: {
        backgroundColor: '#353535'
      },
      headerTintColor: 'white'
    }
  },
  PasswordSettings: {
    screen: PasswordSettingsScreen,
    navigationOptions:{
      title: 'Change password',
      headerStyle: {
        backgroundColor: '#353535'
      },
      headerTintColor: 'white'
    }
  }
},
{
  initialRouteName: 'SettingsAccount'
})

SettingsAccountStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  // }

  return {
    tabBarVisible,
  };
};


const SettingsStack = createStackNavigator({
  Settings: 
  {
    screen: SettingsScreen,
    navigationOptions:{
      header: null
    }
  },
  SettingsAccount:
  {
    screen: SettingsAccountStack,
    navigationOptions:{
      header: null,
    }
  },
  SettingsHomePage:
  {
    screen: SettingsHomePageScreen,
    navigationOptions:{
      header: null
    }
  }
},
{
  initialRouteName: 'Settings'
})

SettingsStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};


const AppStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsStack,
  }, 
  {
      hideStatusBar: false,
      drawerBackgroundColor: 'rgba(255,255,255,.9)',
      overlayColor: '#6b52ae',
      contentOptions: {
        activeTintColor: '#fff',
        activeBackgroundColor: '#6b52ae',
      },
    // tabBarOptions: 
    // {
    //   showLabel: false,
    //   showIcon: true,
    //   style: {
    //     backgroundColor: '#101010',
    //     borderTopWidth: 0
    //   }
    // }
  }
);

const AuthStack = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  Map: MapScreen,
});

export default createAppContainer(createSwitchNavigator(
  {
    //AuthLoading: LoadingScreen,
    Auth: AuthStack,
    App: AppStack
  }
  // ,
  // {
  //   initialRouteName: 'AuthLoading',
  // }
));
