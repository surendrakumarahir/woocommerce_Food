/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import AdressesScreen from '../../screens/AdressesScreen';
import SearchFilterClass from '../../common/SearchFilterClass';
import NewestScreen from '../../navigation/Stacks/Newest';
import MenuIcon from '../../common/MenuIcon';
// eslint-disable-next-line no-unused-vars
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: AdressesScreen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: true,
        headerLeft: () => <MenuIcon navigation={navigation} />
      })
    },
    NewestScreen: {
      screen: NewestScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    SearchFilterClass: {
      screen: SearchFilterClass,
      navigationOptions: () => ({
        gestureEnabled: false,
        headerRight: null
      })
    },
  },
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
