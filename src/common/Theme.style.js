/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
import { Dimensions } from 'react-native';
WIDTH = Dimensions.get('window').width;

// set card width according to your requirement
cardWidth= WIDTH * 0.3991
// cardWidth= WIDTH * 0.4191 // card width for two and half card
// cardWidth= WIDTH * 0.6191 // one and half
// cardWidth= WIDTH * 0.42
Height = Dimensions.get('window').height;

export default {

  /// /////////////////////////////////////////////////////////////////////////////////
  homeTitle: 'Becrux',

  // please reset app cache after changing these five values  
  defaultCurrency: '&#36;',
  currencyCode:'USD',
  priceDecimals: 2,
  // by default language for ltr
  ltrlanguageCode: 'en',
  // by default language for rtl 
  rtllanguageCode: 'ar',
  
  url: 'https://www.delimp.com/react', //your site URL
  consumerKey: 'ck_2c5854e1eb3e8f89391a666402fac669f26e603f', // Your consumer secret
  consumerSecret: 'cs_5b743223010c58bc31840cc7fa6d2bb792c12746', // Your consumer secret

  //Banners props
  autoplay:true,
  autoplayDelay:2,
  autoplayLoop: true,

  StatusBarColor: '#f6cf78',
  barStyle: 'light-content', // dark-content, default

  headerTintColor: '#fff',
  headerIconsColor: '#707070',
  // headerCartCounterColor: 'rgba(95,197,123,0.8)',
  headerCartCounterColor: '#ca7302',
  headerCartCounterText: '#fff',

  primaryDark: '#ca7302',
  primary: '#ca7302',

  // backgroundColor: '#fdfcfa',
  backgroundColor: '#ffffff',

  google: '#dd4b39',
  facebook: '#3b5998',

  // Button Colors
  addToCartBtnColor: '#ca7302',
  addToCartBtnTextColor: '#fff',
  addToCartBagBtnColor: '#ca7302',

  outOfStockBtnColor: '#D81800',
  outOfStockBtnTextColor: '#fff',

  detailsBtnColor: '#ca7302',
  detailsBtnTextColor: '#fff',

  removeBtnColor: '#D81800',
  removeBtnTextColor: '#fff',

  wishHeartBtnColor: '#557f5f',
  // backgroundColor: '#557f5f',

  otherBtnsColor: '#557f5f',
  otherBtnsText: '#fff',

  saleBackgroundColor: '#51688F',
  saleTextColor: '#fff',
  // featuredBackgroundColor: '#51688F',
  featuredTextColor: '#fff',
  newBackgroundColor: '#D81800',
  newTextColor: '#fff',

  priceColor: '#000',

  /// ///////// font size

  largeSize: 16,
  mediumSize: 14,
  smallSize: 12,

  /// //////// cartWidth

  singleRowCardWidth: cardWidth,
  twoRowCardWIdth: 0.465,
  loadingIndicatorColor: '#51688F'

};
