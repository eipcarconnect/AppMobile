import React from 'react';

import SignInScreen from './SignIn'
import SignUpScreen from './SignUp'

import HomeScreen from './Home'
import FuelScreen from './Fuel'
import InformationScreen from './Information'
import RatingScreen from './Rating'
import BatteryScreen from './Battery'
import SettingsScreen from './Settings'

import { deletSaved } from '../Tools/Storage'

import MapScreen from './Map'

import AddFactureScreen from './AddFacture'
import AddTrajetScreen from './AddTrajet'


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
    screen: SettingsAccountScreen,
    navigationOptions:{
      header: null,
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

function disconnect() {
  global.name = '';
  global.date = '';
  global.email = '';
  global.token = '';
  global.speed = '';
  global.fuel = '';
  global.lat = '';
  global.long = '';
  global.registToken = '';
  deletSaved("email");
}

const AuthStack = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  Map: MapScreen,
});

const AppStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    AuthStack: AuthStack,
    Settings: SettingsStack,
    AddTrajet: AddTrajetScreen,
    AddFacture: AddFactureScreen
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
              onPress={() => {disconnect(); props.navigation.navigate('AuthStack'); }}
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
