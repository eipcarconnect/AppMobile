import React from 'react';

import SignInScreen from './SignIn'
import SignUpScreen from './SignUp'

import HomeScreen from './Home'
import FuelScreen from './Fuel'
import InformationScreen from './Information'
import RatingScreen from './Rating'
import SettingsScreen from './Settings'

import MapScreen from './Map'

import TestScreen from './Test'

import Test2Screen from './Test2'

import SettingsAccountScreen from './Settings/SettingsAccount'
import SettingsHomePageScreen from './Settings/SettingsHomePage/SettingsHomePage'

import BirthdaySettingsScreen from './Settings/BirthdaySettings'
import EmailSettingsScreen from './Settings/EmailSettings'
import NameSettingsScreen from './Settings/NameSettings'
import PasswordSettingsScreen from './Settings/PasswordSettings'

import { StyleSheet, Text, View, ActivityIndicator, Image, Icon, ScrollView } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView, StackViewTransitionConfigs  } from 'react-navigation'
import { Button } from 'react-native-elements'
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

const AuthStack = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  Map: MapScreen,
  Test: TestScreen,
  Test2: Test2Screen,
});

const AppStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Information: InformationScreen,
    Fuel: FuelScreen,
    Map: MapScreen,
    Settings: SettingsStack,


    Rating: RatingScreen,
    AuthStack: AuthStack
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
    contentComponent: (props) => {
      var copyprops = Object.assign({}, props);
      copyprops.items = copyprops.items.filter(function(item) {if (item.key !== 'Rating' && item.key !== 'AuthStack') return true})
      return (
        <SafeAreaView style={{height: '100%'}}>
            <View style={{height: heightPercentage('20%'),alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require("../assets/Logo.png")} style={{width: heightPercentage('10%'), height: heightPercentage('10%')}}></Image>
              <Text style={{fontSize: 26, color:"white", marginTop: heightPercentage('1%')}}>CarConnect</Text>
            </View>
          <ScrollView>
            <DrawerItems {
              ...copyprops
              } />
          </ScrollView>
          <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <Button
              onPress={() => props.navigation.navigate('Rating')}
              title="Rate the app"
              buttonStyle={{
                height: heightPercentage('6%'),
                marginVertical: heightPercentage('1%'),
                marginHorizontal: widthPercentage('2%'),
                backgroundColor:"#2c84cc"
              }}>
            </Button>
            <Button
              onPress={() => props.navigation.navigate('AuthStack')}
              title="Deconnection"
              buttonStyle={{
                height: heightPercentage('6%'),
                marginVertical: heightPercentage('1%'),
                marginHorizontal: widthPercentage('2%'),
                backgroundColor:"#A00000"
              }}>
            </Button>
          </View>
        </SafeAreaView>
      )
    }
  }
);


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
