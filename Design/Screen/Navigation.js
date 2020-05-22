import React from 'react';

import SignInScreen from './SignIn'
import SignUpScreen from './SignUp'

import HomeScreen from './Home'
import FuelScreen from './Fuel'
import SettingsScreen from './Settings'

import MapScreen from './Map'

import SettingsAccountScreen from './Settings/SettingsAccount'
import SettingsHomePageScreen from './Settings/SettingsHomePage/SettingsHomePage'

import BirthdaySettingsScreen from './Settings/BirthdaySettings'
import EmailSettingsScreen from './Settings/EmailSettings'
import NameSettingsScreen from './Settings/NameSettings'
import PasswordSettingsScreen from './Settings/PasswordSettings'

import { StyleSheet, Text, View, ActivityIndicator, Image, Icon, ScrollView } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView, StackViewTransitionConfigs  } from 'react-navigation'

import { heightPercentage, widthPercentage } from '../Tools/ResponsiveTool'

const SettingsStack = createStackNavigator({
  Settings: 
  {
    screen: SettingsScreen,
    navigationOptions:{
      header: null,
    }
  },
  SettingsHomePage:
  {
    screen: SettingsHomePageScreen,
    navigationOptions:{
      title: 'Settings homepage',
      headerStyle: {
        backgroundColor:"#1E1E1E", borderBottomWidth: 1, borderBottomColor: "#DDDDDD"
      },
      headerTintColor: 'white'
    }
  },
  SettingsAccount: 
  {
    screen: SettingsAccountScreen,
    navigationOptions:{
      title: 'Settings account',
      headerStyle: {
        backgroundColor: '#1E1E1E', borderBottomWidth: 1, borderBottomColor: "#DDDDDD"
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
        backgroundColor: '#1E1E1E', borderBottomWidth: 1, borderBottomColor: "#DDDDDD"
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
        backgroundColor: '#1E1E1E', borderBottomWidth: 1, borderBottomColor: "#DDDDDD"
      },
      headerTintColor: 'white'
    }
  },
  NameSettings: {
    screen: NameSettingsScreen,
    navigationOptions:{
      title: 'Change name',
      headerStyle: {
        backgroundColor: '#1E1E1E', borderBottomWidth: 1, borderBottomColor: "#DDDDDD"
      },
      headerTintColor: 'white'
    }
  },
  PasswordSettings: {
    screen: PasswordSettingsScreen,
    navigationOptions:{
      title: 'Change password',
      headerStyle: {
        backgroundColor: '#1E1E1E', borderBottomWidth: 1, borderBottomColor: "#DDDDDD"
      },
      headerTintColor: 'white'
    }
  }
},
{
  transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS,
  initialRouteName: 'Settings'
})

SettingsStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = false;
  if (navigation.state.index >= 0) {
    tabBarVisible = true;
  }

  return {
    tabBarVisible,
  };
};

const AppStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Fuel: FuelScreen,
    Settings: SettingsStack,
    Map: MapScreen,
  }, 
  {
    transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS,
    hideStatusBar: false,
    drawerBackgroundColor: '#1E1E1E',
    overlayColor: 'rgba(0,0,0, 0.7)',
    contentOptions: {
        labelStyle: {
          color: 'white',
        },
      activeTintColor: '#fff',
      activeBackgroundColor: '#2c84cc',
    },
    contentComponent: (props) => (
      <SafeAreaView>
          <View style={{height: heightPercentage('20%'),alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require("../assets/Logo.png")} style={{width: heightPercentage('10%'), height: heightPercentage('10%')}}></Image>
            <Text style={{fontSize: 26, color:"white", marginTop: heightPercentage('1%')}}>CarConnect</Text>
          </View>
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
      </SafeAreaView>
    )
  }
);

const AuthStack = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
});

export default createAppContainer(createSwitchNavigator(
  {
    //AuthLoading: LoadingScreen,
    //Auth: AuthStack,
    App: AppStack
  }
  // ,
  // {
  //   initialRouteName: 'AuthLoading',
  // }
));
