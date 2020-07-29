/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import NewestScreen from './Newest';
import Home6Screen from '../../screens/Home6Screen';
import SubCategory from '../../screens/SubCategory';
import Category from '../../screens/Category1Screen';
import ProductDetails from '../../screens/ProductDetails';
 import RatingAndReviewScreen from '../../screens/RatingAndReviewScreen';
import VendorScreen from '../../screens/VendorScreen';
import SaleScreen from '../../screens/SaleScreen';
import FeaturedScreen from '../../screens/FeaturedScreen';
import MenuIcon from '../../common/MenuIcon';
import LoginScreen from '../../screens/LoginScreen';
import CreateAccountScreen from '../../screens/CreateAccountScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
// eslint-disable-next-line no-unused-vars
  
import theme from '../../common/Theme.style';
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
  {
    Home6Screen: {
      screen: Home6Screen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: true,
        headerLeft: () => <MenuIcon navigation={navigation} />
      })
    },
    SubCategory: {
      screen: SubCategory,
      navigationOptions: () => ({
        gestureEnabled: true,
        // headerLeft: () => <MenuIcon navigation={navigation} />
      })
    },
    Category: {
      screen: Category,
      navigationOptions: () => ({
        gestureEnabled: true,
      //  headerLeft: () => <MenuIcon navigation={navigation} />
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
          gestureEnabled: false
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
