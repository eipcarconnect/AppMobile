import React from 'react';
import { Image, Icon } from 'react-native'

import SignInScreen from './SignIn'
import SignUpScreen from './SignUp'

import AppletScreen from './Home'
import SettingsScreen from './Settings'

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
      header: null
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
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

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
      header: null
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


const AppStack = createBottomTabNavigator(
  {
    Home: 
    {
      screen: AppletScreen,
      navigationOptions: 
      {
        tabBarIcon: ({ focused }) => {
          const image = focused 
          ? require('../assets/home-white.png') 
          : require('../assets/home-grey.png')
          return (<Image source={image} style={{width:22, height:22}}/>)
        }
      }
    },
    Settings: 
    {
      screen: SettingsStack,
      navigationOptions: 
      {
        tabBarIcon: ({ focused }) => {
          const image = focused 
          ? require('../assets/settings-white.png') 
          : require('../assets/settings-grey.png')
          return (<Image source={image} style={{width:22, height:22}}/>)
        }
      }
    }
  }, 
  {
    tabBarOptions: 
    {
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: '#101010',
        borderTopWidth: 0
      }
    }
  }
);

const AuthStack = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
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
