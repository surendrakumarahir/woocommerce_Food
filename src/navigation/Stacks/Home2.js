/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home2Screen from '../../screens/Home2Screen';
import MenuIcon from '../../common/MenuIcon';
import LoginScreen from '../../screens/LoginScreen';
import ProductDetails from '../../screens/ProductDetails';
import CreateAccountScreen from '../../screens/CreateAccountScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import NewestScreen from '../../navigation/Stacks/Newest';
import VendorScreen from '../../screens/VendorScreen';
import RatingAndReviewScreen from '../../screens/RatingAndReviewScreen';
// eslint-disable-next-line no-unused-vars
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
  {
    Home2Screen: {
      screen: Home2Screen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: true,
        headerLeft: () => <MenuIcon navigation={navigation} />
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
    NewestScreen: {
      screen: NewestScreen,
      navigationOptions: () =>
        ({
          gestureEnabled: false
        })
    },
    VendorScreen: {
      screen: VendorScreen,
      navigationOptions: () =>
        ({
          gestureEnabled: false
        })
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: () =>
        ({
          gestureEnabled: false
        })
    },
    RatingAndReviewScreen: {
      screen: RatingAndReviewScreen,
      navigationOptions: () =>
        ({
          gestureEnabled: false
        })
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: () =>
        ({
          gestureEnabled: false
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
