/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/imports-first */
import React from 'react';
import { Dimensions, I18nManager } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import NewestScreen from '../../screens/NewestScreen';
import ForgotPasswordScreen from '../../navigation/FilterDrawer';
/// ////////////////////////////////////////////////// Home Stack Start
WIDTH = Dimensions.get('window').width;
const DrawerConfigs = {
  drawerLockMode: 'locked-closed',
  mode: 'modal',
  // edgeWidth: 0,
  gestureEnabled: false,
  disableGestures: true,
  // eslint-disable-next-line no-undef
  drawerWidth: WIDTH * 0.78,
  headerMode: 'none',
  headerShown: false,
  drawerPosition:
   I18nManager.isRTL
        ? 'left'
        : 'right',
  contentComponent: props => <ForgotPasswordScreen {...props} />
};

const StackNavigator = createStackNavigator({
  NewestScreen: {
    screen: NewestScreen,
    navigationOptions: () => ({
      gestureEnabled: false,
      disableGestures: true,
      swipeEnabled: false,
      mode: 'modal',
    })
  }
});
StackNavigator.navigationOptions = ({ navigation }) => ({
  swipeEnabled: false
});
const HomeStackNavigator = createDrawerNavigator(
  {
    StackNavigator: {
      screen: StackNavigator,
      navigationOptions: () => ({
        gestureEnabled: false,
        disableGestures: true,
        swipeEnabled: false,
        mode: 'modal',
      })
    }
  },
  DrawerConfigs
);
HomeStackNavigator.navigationOptions = () => ({
  headerShown: false,
  });
export default HomeStackNavigator;
