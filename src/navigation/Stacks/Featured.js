/* eslint-disable import/newline-after-import */
/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import FeaturedScreen from '../../screens/FeaturedScreen';
import Home2Screen from '../../screens/Home2Screen';
import Home3Screen from '../../screens/Home3Screen';
import NewestScreen from '../../navigation/Stacks/Newest';
import MenuIcon from '../../common/MenuIcon';
const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: FeaturedScreen,
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
