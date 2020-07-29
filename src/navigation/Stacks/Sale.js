/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SaleScreen from '../../screens/SaleScreen';
import Home2Screen from '../../screens/Home2Screen';
import Home3Screen from '../../screens/Home3Screen';
import MenuIcon from '../../common/MenuIcon';
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: SaleScreen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: true,
        headerLeft: () => <MenuIcon navigation={navigation} />
      })
    },
    Home2: {
      screen: Home2Screen,
      navigationOptions: () =>
        ({
          gestureEnabled: false,
        })
    },
    Home3: {
      screen: Home3Screen,
      navigationOptions: () => ({
        gestureEnabled: false,
      })
    }
  }
);
export default HomeStackNavigator;
