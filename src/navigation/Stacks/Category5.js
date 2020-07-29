/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Category5Screen from '../../screens/Category5Screen';
import SubCategory from '../../screens/SubCategory';
import NewestScreen from '../../navigation/Stacks/Newest';
import SaleScreen from '../../screens/SaleScreen';
import FeaturedScreen from '../../screens/FeaturedScreen';
import ProductDetails from '../../screens/ProductDetails';
import RatingAndReviewScreen from '../../screens/RatingAndReviewScreen';
import VendorScreen from '../../screens/VendorScreen';
import CreateAccountScreen from '../../screens/CreateAccountScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import MenuIcon from '../../common/MenuIcon';
// eslint-disable-next-line no-unused-vars
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
  {
    Category5Screen: {
      screen: Category5Screen,
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
    ProductDetails: {
      screen: ProductDetails,
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
    VendorScreen: {
      screen: VendorScreen,
      navigationOptions: () =>
        ({
          gestureEnabled: false
        })
    },
    SubCategory: {
      screen: SubCategory,
      navigationOptions: () =>
        ({
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
