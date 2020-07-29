/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SettingsScreen from '../../screens/SettingsScreen';
import LoginScreen from '../../screens/LoginScreen';
import TermAndServiceScreen from '../../screens/TermAndServiceScreen';
import PrivacyPolicyScreen from '../../screens/PrivacyPolicyScreen';
import MyAccountScreen from '../../screens/MyAccountScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import CreateAccountScreen from '../../screens/CreateAccountScreen';
import RefundPolicy from '../../screens/RefundPolicy';
import MenuIcon from '../../common/MenuIcon';
import NewestScreen from '../../navigation/Stacks/Newest';
// eslint-disable-next-line no-unused-vars
///////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
    {
      SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: ({ navigation }) => ({
          gestureEnabled: true,
          headerLeft: () => <MenuIcon navigation={navigation} /> })
      },
      NewestScreen: {
        screen: NewestScreen,
        navigationOptions: () => ({
          gestureEnabled: false
        })
      },
      ForgotPasswordScreen: {
        screen: ForgotPasswordScreen,
        navigationOptions: () => ({
          gestureEnabled: false
        })
      },
      CreateAccountScreen: {
        screen: CreateAccountScreen,
        navigationOptions: () => ({
          gestureEnabled: false
        })
      },
      LoginScreen: {
        screen: LoginScreen,
        navigationOptions: () => 
            ({
            gestureEnabled: false,
           })
        
      },
      TermAndServiceScreen: {
        screen: TermAndServiceScreen,
        navigationOptions: () => 
            ({
            gestureEnabled: false,
           })
        
      },
      PrivacyPolicyScreen: {
        screen: PrivacyPolicyScreen,
        navigationOptions: () => 
            ({
            gestureEnabled: false,
           })
        
      },
      RefundPolicy: {
        screen: RefundPolicy,
        navigationOptions: () => 
            ({
            gestureEnabled: false,
           })
        
      },
      MyAccountScreen: {
        screen: MyAccountScreen,
        navigationOptions: () => ({
             gestureEnabled: true,
               })
      },
    }
  );
  HomeStackNavigator.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
    if (navigation.state.index > 0) {
      drawerLockMode = 'locked-closed';
    }
  
    return {
      drawerLockMode
    };
  };
  export default HomeStackNavigator;
  
