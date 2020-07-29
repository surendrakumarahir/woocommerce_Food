/* eslint-disable no-unused-vars */
/* eslint-disable import/imports-first */
import { createStackNavigator } from 'react-navigation-stack';
import Home1Screen from '../../screens/Home';
  
/// ////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
  {
    Home1Screen: {
      screen: Home1Screen,
    },
  },
);
export default HomeStackNavigator;
