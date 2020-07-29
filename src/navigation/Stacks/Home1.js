/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home1Screen from '../../screens/Home';
import LoginScreen from '../../screens/LoginScreen';
import Home2Screen from '../../screens/Home2Screen';
import SubCategory from '../../screens/SubCategory';
import Home4Screen from '../../screens/Home4Screen';
import Home5Screen from '../../screens/Home5Screen';
import ProductDetails from '../../screens/ProductDetails';
import RatingAndReviewScreen from '../../screens/RatingAndReviewScreen';
import VendorScreen from '../../screens/VendorScreen';
import CreateAccountScreen from '../../screens/CreateAccountScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import MenuIcon from '../../common/MenuIcon';
import NewestScreen from '../../navigation/Stacks/Newest';
import SaleScreen from '../../screens/SaleScreen';
import FeaturedScreen from '../../screens/FeaturedScreen';
// eslint-disable-next-line no-unused-vars
  
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
  {
    Home1Screen: {
      screen: Home1Screen,
      navigationOptions: ({ navigation }) => ({
         gestureEnabled: false,
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
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    SubCategory: {
      screen: SubCategory,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    Home1: {
      screen: Home2Screen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: true,
        headerLeft: () => <MenuIcon navigation={navigation} />
      })
    },
    Home3: {
      screen: Home4Screen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: true,
        headerLeft: () => <MenuIcon navigation={navigation} />
      })
    },
    Home5: {
      screen: Home5Screen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: true,
        headerLeft: () => <MenuIcon navigation={navigation} />
      })
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    RatingAndReviewScreen: {
      screen: RatingAndReviewScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    NewestScreen: {
      screen: NewestScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    SaleScreen: {
      screen: SaleScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    FeaturedScreen: {
      screen: FeaturedScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    VendorScreen: {
      screen: VendorScreen,
      navigationOptions: () => ({
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
