/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable import/imports-first */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/newline-after-import */
import React, { Component } from 'react';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions, I18nManager, Platform } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { WebView } from 'react-native-webview';
import SyncStorage from 'sync-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation';
import themeStyle from '../common/Theme.style';
import { Icon } from 'native-base';
class WebViewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const backButton2 = navigation.getParam('backButton');
    const props = navigation.getParam('props1');
    const webViewState = navigation.getParam('webViewState');

    const headerTitle2 = navigation.getParam('headerTitle');
    return {
      headerTitle: headerTitle2,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      headerLeft: (
        <Icon
          onPress={() => {
            if (props !== undefined) {
            if (!props.state.canGoBack) {
              props.props.navigation.goBack();
            } else if (
              webViewState.title === 'Mobile Checkout' ||
              webViewState.title === 'Checkout – Woo Shop' ||
              webViewState.title === 'Log in to your PayPal account'
            ) {
              props.props.navigation.goBack();
            } else {
              backButton2.goBack();
            }
          }
          }}
          name={!I18nManager.isRTL ? 'arrow-back' :
          'arrow-forward'}
          style={{ color: '#fff', fontSize: 25, padding: 5, paddingLeft: 16, paddingRight: 16, marginRight: 16 }}
        />
      )
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      uri: '',
      SpinnerTemp: false,
      canGoBack: false,
      firstUri: ''
    };
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson[
        'Place Your Order'
      ]
    });

    console.log('param', this.props.navigation.state.params);
    !this.props.navigation.state.params.onePageCheckOut2
      ? this.onePageCheckOut(this.props.cartItems2)
      : this.onePageCheckOut2(
        this.props.cartItems2,
        this.props.navigation.state.params.data
      );
  }
  /// /////////////////////////////////////////////////////
  onePageCheckOut2 = (globalObject, data) => {
     console.log( `${
      globalObject.Config.url
    }/api/reactappsettings/react_data_link/?insecure=cool`)
    fetch(
      `${
        globalObject.Config.url
      }/api/reactappsettings/react_data_link/?insecure=cool`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .then(id => {
        const url = `${globalObject.Config.url}/react-mobile-checkout/?order_id=${id}`;
       console.log('ussrl', url);
        this.setState({ uri: url, SpinnerTemp: true, firstUri: url });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({ SpinnerTemp: false });
      });
  }
  /// //////////////////////////////////////////////////////////////////
  onePageCheckOut = globalObject => {
    let customer_id = 0;
    let token = null;
    let biling = this.billing;
    let shiping = this.shipping;

    if (SyncStorage.get('customerData').id != null) {
      customer_id = SyncStorage.get('customerData').id;
      token = SyncStorage.get('customerData').cookie;
      biling = SyncStorage.get('customerData').billing;
      shiping = SyncStorage.get('customerData').shipping;
    }
    const onePage = globalObject.Config.checkOutPage;
    const data = {
      token,
      billing_info: biling,
      shipping_info: shiping,
      products: this.getProducts(globalObject),
      coupons: this.getCoupons(globalObject),
      customer_note: '',
      customer_id,
      one_page: onePage,
      platform: ''
    };
    // console.log('hahahahahahahahhahah123')
    fetch(
      `${
        globalObject.Config.url
      }/api/reactappsettings/react_data_link/?insecure=cool`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .then(id => {
        const url = `${globalObject.Config.url}/react-mobile-checkout/?order_id=${id}`;
        this.setState({ uri: url, SpinnerTemp: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ SpinnerTemp: false });
      });
  }
  /// ////////////////////////////////
  getProducts = globalObject => {
    const data = [];
    for (const v of globalObject.cartItems.cartProductArray) {
      const obj = {
        quantity: v.quantity,
        product_id: v.product_id,
        total: v.total.toString()
      };
      if (v.variation_id) Object.assign(obj, { variation_id: v.variation_id });
      data.push(obj);
    }
    return data;
  }
  // <!-- 2.0 updates -->
  getCoupons = globalObject => {
    const data = [];
    for (const v of globalObject.cartItems.couponArray) {
      data.push({ code: v.code, discount: v.amount });
    }
    return data;
  }

  /// //////////////////////////////////////////////
  _onNavigationStateChange = webViewState => {
    if (webViewState.url.indexOf('/order-received/') != -1) {
      this.props.cartItems2.cartItems.cartProductArray = [];
      this.props.cartItems2.cartItems.couponArray = [];
      this.props.cartItems2.cartItems.cartquantity = 0;
      SyncStorage.set('cartProducts', []);
      SyncStorage.set('thanksActive', true);
      const resetAction = StackActions.reset({
        key: null,
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'CartScreen' }),
          NavigationActions.navigate({ routeName: 'ThankUScreen' })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    } else if (webViewState.url.indexOf('cancel_order=true') != -1) {
      this.props.navigation.navigate('Cart');
    }

    this.props.navigation.setParams({
      backButton: this.webview,
      props1: this,
      webViewState
    });
    this.setState({
      canGoBack: webViewState.canGoBack,
      SpinnerTemp: false 
    });
  }
  /// ///////////////
  _refWebView = webview => {
    if (!webview) {
      return;
    }
    this.webview = webview;
  }
  /// /////////////////////////////////////////////////////
  render() {
    return this.state.uri === '' ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <UIActivityIndicator size={27} color={themeStyle.loadingIndicatorColor} />
      </View>
    ) : (
      <View style={styles.container}>
        <Spinner
          visible={this.state.SpinnerTemp}
          textStyle={styles.spinnerTextStyle}
        />

        <WebView
          ref={r => this._refWebView(r)}
          onLoadProgress={() => this.setState({ SpinnerTemp: true })}
          onLoadEnd={() => this.setState({ SpinnerTemp: false })}
          onNavigationStateChange={this._onNavigationStateChange}
          source={{ uri: this.state.uri }}
          style={{ marginTop: 0, flex: 1, width: Dimensions.get('window').width }}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  cartItems2: state
});

export default connect(
  mapStateToProps,
  null
)(WebViewScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
