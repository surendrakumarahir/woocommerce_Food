/* eslint-disable no-useless-escape */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/imports-first */
/* eslint-disable import/newline-after-import */
/* add new test comment */
import React, {Component} from 'react'
import AppContainer from './src/navigation/Index'
// eslint-disable-next-line import/imports-first
import SplashScreen from 'react-native-splash-screen'
import RNRestart from 'react-native-restart'
import WooComFetch from './src/common/WooComFetch'
// eslint-disable-next-line import/imports-first
import {connect} from 'react-redux'
import SyncStorage from 'sync-storage'
// import { NetworkConsumer } from 'react-native-offline';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  I18nManager,
  YellowBox
} from 'react-native'
// eslint-disable-next-line no-undef
WIDTH = Dimensions.get('window').width
// eslint-disable-next-line no-undef
Height = Dimensions.get('window').height
import Spinner from 'react-native-loading-spinner-overlay'
import theme from './src/common/Theme.style'
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
)
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listTotal: 0,
      isLoading: true,
      data: '',
      temp: false,
      SpinnerTemp: false,
    }
  }
  async componentDidMount () {
    console.disableYellowBox = true
    console.reportErrorsAsExceptions = false
    YellowBox.ignoreWarnings(['Animated:', 'FlatList:'])
    const data = await SyncStorage.init()
    console.log('AsyncStorage is ready!', data)
    // if (SyncStorage.get('languageCode') === 'ar') {
    //   I18nManager.forceRTL(true)
    //   // setTimeout(() => {
    //   if (!I18nManager.isRTL) RNRestart.Restart()
    //   // }, 1000)
    // }
    this.props.saveDefaultCurrency()
    //////////////////////////////////
    const val = SyncStorage.getAllKeys().includes('appSettings')
    console.log(val)
    if (val === false) {
      this.props.siteSetting2(this.props, this)
    } else {
      this.props.siteSetting(this)
    }

    ////////////////////////////////
    this.props.saveLocalDataIntoArrays()
    this.props.getAllCategories()
    this.props.getBannersData()
    this.props.getFeaturedData(this.props)
    this.props.getOnSaleData(this.props)
    this.props.getNewestData(this.props)
    this.props.getProductData(this.props)
    this.setState({isLoading: false})
  }
  componentWillUnmount () {
    this.props.cartItems2.sharedData.deepTemp = false
  }

  componentDidUpdate () {
    this.state.isLoading === false ? SplashScreen.hide() : null
  }
  render () {
    if (this.state.temp) {
      this.props.aboutUsPageGetIds(this.props)
      this.props.getVendorData(this.props)
      this.state.temp = false
    }
    return (
      <View style={{flex: 1}}>
        <Spinner
          visible={this.state.SpinnerTemp}
          textStyle={styles.spinnerTextStyle}
        />
        <MyStatusBar
          backgroundColor={theme.StatusBarColor}
          barStyle={theme.barStyle}
        />
        {this.state.isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}></View>
        ) : (
          <AppContainer />
        )}
      </View>
    )
  }
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Height * 0.04 : 0
/// ////////////////////////////////////////////////
const mapDispatchToProps = dispatch => ({
  addItemToCart: (productObject, productQuantity, varr) => {
    dispatch({
      type: 'ADD_TO_CARTS',
      product: productObject,
      cartProductQuantity: productQuantity,
      variation: varr,
      metaData: null,
    })
  },
  aboutUsPageGetIds: props => {
    dispatch(async dispatch => {
      const ids = `${props.cartItems2.Config.about_page_id},${props.cartItems2.Config.privacy_page_id},${props.cartItems2.Config.refund_page_id},${props.cartItems2.Config.terms_page_id}`
      await fetch(
        `${props.cartItems2.Config.url}/wp-json/wp/v2/pages/?include=${ids}`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(data => {
          const d = data
          console.log(data)
          dispatch({
            type: 'ABOUTUSSETTINGS',
            data: d,
          })
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  siteSetting: th => {
    dispatch({
      type: 'siteSetting',
    })
    th.setState({temp: true})
  },
  siteSetting2: (props, th) => {
    th.setState({SpinnerTemp: true}, () => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
      fetch(
        `https://www.e-zooz.com/react/api/reactappsettings/react_get_all_settings/`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('success', responseJson);
        }).catch(error => {
          console.log("error", error);
          console.log(error)
        })
      dispatch(async dispatch => {
        console.log('url', `${props.cartItems2.Config.url}/api/reactappsettings/react_get_all_settings/?insecure=cool`);
         await fetch(
          `${props.cartItems2.Config.url}/api/reactappsettings/react_get_all_settings/?insecure=cool`,
          {
            method: 'GET',
          },
        )
          .then(response => response.json())
          .then(responseJson => {
            dispatch({
              type: 'siteSetting2',
              payloadData: responseJson,
              des: dispatch,
            })
            console.log('getting', responseJson);
            th.setState({temp: true, SpinnerTemp: false})
          })
          .catch(error => {
            console.log('erro', error);
            console.log(error)
          })
      })
    })
  },
  saveDefaultCurrency: () => {
    dispatch({
      type: 'saveDefaultCurrency',
    })
  },
  saveLocalDataIntoArrays: () => {
    dispatch({
      type: 'SAVE_LOCAL_DATA_INTO_ARRAYS',
    })
  },
  getAllCategories: () => {
    dispatch({
      type: 'GET_ALL_CATEGORIES',
    })
  },

  getBannersData: () => {
    dispatch(async dispatch => {
      const json = await WooComFetch.getAllBanners()
      if (json.status === 'ok') {
        dispatch({
          type: 'ADD_BANNERS',
          payload: json.data,
        })
      }
    })
  },
  getFeaturedData: props => {
    dispatch(async dispatch => {
      const json = await WooComFetch.getFeaturedProducts(
        props.cartItems2.Config.productsArguments,
      )
      dispatch({
        type: 'ADD_FEATURED',
        payload3: json,
      })
    })
  },
  getOnSaleData: props => {
    dispatch(async dispatch => {
      const json2 = await WooComFetch.getOnSaleProducts(
        props.cartItems2.Config.productsArguments,
      )
      dispatch({
        type: 'ADD_ONSALE',
        payload2: json2,
      })
    })
  },
  getNewestData: props => {
    dispatch(async dispatch => {
      const json = await WooComFetch.getProducts(
        props.cartItems2.Config.productsArguments,
      )
      dispatch({
        type: 'ADD_NEWEST',
        payload1: json,
      })
    })
  },
  getProductData: props => {
    dispatch(async dispatch => {
      const json = await WooComFetch.getProductsAll(
        props.cartItems2.Config.productsArguments,
        1,
        '',
      )
      dispatch({
        type: 'ADD_Products',
        payload6: json,
      })
    })
  },

  getVendorData: props => {
    dispatch(async dispatch => {
      console.warn(props.cartItems2.Config.showVendorInfo)
      console.warn(props.cartItems2.Config.showWcVendorInfo)
      if (props.cartItems2.Config.showVendorInfo) {
        await fetch(
          `${props.cartItems2.Config.url}/api/reactappsettings/react_get_featured_dokan_vendors_list/?insecure=cool`,
          {
            method: 'GET',
          },
        )
          .then(response => response.json())
          .then(data => {
            dispatch({
              type: 'ADD_VENDORS',
              payload4: data.data,
            })
            console.log('dokan is enabled')
          })
          .catch(error => {
            console.log(error)
          })
      } else if (props.cartItems2.Config.showWcVendorInfo) {
        await fetch(
          `${props.cartItems2.Config.url}/api/reactappsettings/react_get_featured_wcvendors_list/?insecure=cool`,
          {
            method: 'GET',
          },
        )
          .then(response => response.json())
          .then(data => {
            dispatch({
              type: 'ADD_VENDORS',
              payload4: data.data,
            })
            console.log('dokan is disable')
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  },
})
/// ///////////////////////////////////////////////
const mapStateToProps = state => ({
  cartItems2: state,
})
/// //////////////////////////////////////////
export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
})
