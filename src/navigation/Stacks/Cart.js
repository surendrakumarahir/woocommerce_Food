/* eslint-disable import/imports-first */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import CartScreen from '../../screens/CartScreen';
import ProductDetails from '../../screens/ProductDetails';
import LoginScreen from '../../screens/LoginScreen';
import ThankUScreen from '../../screens/ThankUScreen';
import NewestScreen from '../../navigation/Stacks/Newest';
import WebViewScreen from '../../screens/WebViewScreen';
import ShippingMethodScreen from '../../screens/ShippingMethodScreen';
import ShippingAddressScreen from '../../screens/ShippingAddressScreen';
import VendorScreen from '../../screens/VendorScreen';
import SearchFilterClass from '../../common/SearchFilterClass';
import OrderScreen from '../../screens/OrderScreen';
import MyOrdersScreen from '../../screens/MyOrdersScreen';
import OrderDetail from '../../screens/OrderDetail';
import RatingAndReviewScreen from '../../screens/RatingAndReviewScreen';
import CreateAccountScreen from '../../screens/CreateAccountScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import MenuIcon from '../../common/MenuIcon';
// eslint-disable-next-line no-unused-vars
  
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
  {
    CartScreen: {
      screen: CartScreen,
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
    MyOrdersScreen: {
      screen: MyOrdersScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    OrderDetail: {
      screen: OrderDetail,
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
    VendorScreen: {
      screen: VendorScreen,
      navigationOptions: () => ({
        gestureEnabled: false
      })
    },
    ProductDetails: {
      screen: ProductDetails,
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
    RatingAndReviewScreen: {
      screen: RatingAndReviewScreen,
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
    WebViewScreen: {
      screen: WebViewScreen,
      navigationOptions: () => ({
        gestureEnabled: false,
        headerRight: null
      })
    },
    ThankUScreen: {
      screen: ThankUScreen,
      navigationOptions: () => ({
        gestureEnabled: false,
        headerRight: null
      })
    },
    ShippingAddressScreen: {
      screen: ShippingAddressScreen,
      navigationOptions: () => ({
        gestureEnabled: false,
        headerRight: null
      })
    },
    ShippingMethodScreen: {
      screen: ShippingMethodScreen,
      navigationOptions: () => ({
        gestureEnabled: false,
        headerRight: null
      })
    },
    SearchFilterClass: {
      screen: SearchFilterClass,
      navigationOptions: () => ({
        gestureEnabled: false,
        headerRight: null
      })
    },
    OrderScreen: {
      screen: OrderScreen,
      navigationOptions: () => ({
        gestureEnabled: false,
        headerRight: null
      })
    }
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
