/* eslint-disable no-shadow */
/* eslint-disable no-useless-concat */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable react/sort-comp */
/* eslint-disable import/imports-first */
/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable import/newline-after-import */
/* eslint-disable semi */
/* eslint-disable no-unused-expressions */

import React, { Component } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { Container, Content, ListItem, CheckBox, Text, Body } from 'native-base'
import SyncStorage from 'sync-storage'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import WooComFetch from '../common/WooComFetch'
import * as global from '../common/LocationData'
import HTML from 'react-native-render-html'
import themeStyle from '../common/Theme.style'
class ShippingMethod extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
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
      gestureEnabled: true,
    }
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson['Shipping Method']
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      currency: {},
      currentCurrencySymbol: SyncStorage.get('currency'),
      temp: 0,
      tick: [],
      isloading: true,
      shippingMethod: [],
      shippingLocations: [],
      buttonEnable: true
    }
    this.getShippingZones()
  }
  /// ///////////////////////////////////////////////////////////////////////////////////////////////
  //= ================================================================================================================================
  getShippingZones = async () => {
    const json = await WooComFetch.getShippingZone(
      this.props.cartItems2.Config.productsArguments
    )
    this.getShippingLocations(json)
  }
  //= ================================================================================================================================
  getShippingLocations = async array => {
    let count = 0
    for (const v of array) {
      count++
      const d = await WooComFetch.getShippingZoneLocations(
        v.id,
        this.props.cartItems2.Config.productsArguments
      )
      for (const v2 of d) {
        this.state.shippingLocations.push(Object.assign(v2, { zoneId: v.id }))
      }
      if (array.length == count) {
        this.sortArray(this.state.shippingLocations)
      }
    }
  }
  //= ================================================================================================================================
  sortArray(array) {
    const tempArray = []
    for (const value of array) {
      if (value.type == 'postcode') {
        tempArray.push(value)
      }
    }
    for (const value of array) {
      if (value.type == 'state') {
        tempArray.push(value)
      }
    }
    for (const value of array) {
      if (value.type == 'country') {
        tempArray.push(value)
      }
    }
    for (const value of array) {
      if (value.type == 'continent') {
        tempArray.push(value)
      }
    }
    this.findZoneId(tempArray)
  }
  //= ================================================================================================================================
  findZoneId(array) {
    let zoneId = ''
    for (const value of array) {
      if (value.type == 'postcode') {
        if (this.matchPostCode(value)) {
          zoneId = value.zoneId
          break
        }
      } else if (value.type == 'state') {
        if (this.matchState(value)) {
          zoneId = value.zoneId
          break
        }
      } else if (value.type == 'country') {
        if (this.matchCountry(value)) {
          zoneId = value.zoneId
          break
        }
      } else if (value.type == 'continent') {
        if (this.matchContinent(value)) {
          zoneId = value.zoneId
          break
        }
      }
    }
    this.getShippingMethods(zoneId)
  }
  //= ================================================================================================================================
  matchPostCode(value) {
    const postcode = SyncStorage.get('customerData').shipping.postcode
    if (value.code.toUpperCase() == postcode.toUpperCase()) return true
    if (value.code.indexOf('*') > 0) {
      const ind = value.code.indexOf('*')
      const s1 = postcode.substring(0, ind - 1)
      const s2 = value.code.substring(0, ind - 1)

      if (s1.toUpperCase() == s2.toUpperCase()) {
        return true
      }
    }
    if (value.code.indexOf('.') > 0) {
      const i = value.code.indexOf('.')
      let min = value.code.substring(0, i)
      let max = value.code.substring(i + 3, value.code.length)

      min = parseInt(min)
      const p = parseInt(postcode)
      max = parseInt(max)

      if (p >= min && p <= max) {
        return true
      }
    }
  }
  //= ================================================================================================================================
  matchState(value) {
    const s = `${SyncStorage.get('customerData').shipping.country}:${
      SyncStorage.get('customerData').shipping.state
    }`
    if (s == value.code) {
      return true
    }
  }
  //= ================================================================================================================================
  matchCountry(value) {
    const s = SyncStorage.get('customerData').shipping.country
    if (s == value.code) {
      return true
    }
  }
  //= ================================================================================================================================
  matchContinent(value) {
    const s = this.getContientCode(
      SyncStorage.get('customerData').shipping.country
    )
    if (s == value.code) return true
  }

  getContientCode(con) {
    return global.data.continent[con]
  }
  //= ================================================================================================================================
  getShippingMethods = async id => {
    if (id == '') id = 0
    this.state.shippingMethod = await WooComFetch.getShippingZoneLocationsMethods(
      id,
      this.props.cartItems2.Config.productsArguments
    )
    this.setState({ isloading: false })
  }
  //= ================================================================================================================================
  setMethod(data, index) {
    let tempLInes = SyncStorage.get('customerData')
    tempLInes.shipping_lines = []
    SyncStorage.set('customerData', tempLInes)
    let s = {}
    if (data.method_id == 'flat_rate') {
      s = {
        ship_id: data.id,
        method_id: data.method_id,
        method_title: data.title,
        total: this.calculateFlatRate(data)
      }
    } else if (data.settings.cost) {
      let cal = data.settings.cost.value.toString()
      if (cal == '') cal = '0'
      s = {
        ship_id: data.id,
        method_id: data.method_id,
        method_title: data.title,
        total: cal
      }
    } else {
      s = {
        ship_id: data.id,
        method_id: data.method_id,
        method_title: data.title,
        total: '0'
      }
    }
    tempLInes = SyncStorage.get('customerData')
    tempLInes.shipping_lines.push(s)
    SyncStorage.set('customerData', tempLInes)
    this.state.tick = []
    this.state.tick[index] = true
    this.setState({ buttonEnable: false })
  }
  //= ==============================================================================
  calculateFlatRate(data) {
    let cal = data.settings.cost.value.toString()
    if (cal == '') cal = '0'
    return cal
  }
  //= ====================================================================================================================
  checkFreeShipping(data) {
    if (data.method_id != 'free_shipping') {
      return true
    }

    if (data.settings.requires.value == '') {
      return true
    }

    if (data.settings.requires.value == 'coupon') {
      if (this.findFreeShippingCoupon()) return true
      return false
    }
    if (data.settings.requires.value == 'both') {
      if (
        this.productsTotal() >= data.settings.min_amount.value &&
        this.findFreeShippingCoupon()
      ) {
        return true
      } else return false
    }
    if (data.settings.requires.value == 'either') {
      if (
        this.productsTotal() >= data.settings.min_amount.value ||
        this.findFreeShippingCoupon()
      ) {
        return true
      }
      return false
    }
    if (data.settings.requires.value == 'min_amount') {
      if (this.productsTotal() >= data.settings.min_amount.value) {
        return true
      }
      return false
    }
  }
  /// //////////////////////////////
  productsTotal() {
    let total = 0
    for (const value of this.props.cartItems2.cartItems.cartProductArray) {
      total += parseFloat(value.total)
    }
    return total
  }
  //= ====================================================================================================================
  findFreeShippingCoupon() {
    let found = false
    if (this.props.cartItems2.cartItems.couponArray.length == 0) return false
    for (const value of this.props.cartItems2.cartItems.couponArray) {
      if (value.free_shipping == true) found = true
    }
    if (found == true) return true
    return false
  }
  proceedOrder() {
    if (this.props.cartItems2.Config.checkOutPage == 2) {
      this.props.navigation.push('OrderScreen')
    } else {
      this.openOrderPage()
    }
  }
  //= ====================================================================================================================
  openOrderPage() {
    let customer_id = 0 // <!-- 2.0 updates -->
    if (SyncStorage.get('customerData').id != null) { customer_id = SyncStorage.get('customerData').id } // <!-- 2.0 updates -->
    let token = null // <!-- 2.0 updates -->
    if (SyncStorage.get('customerData').cookie != null) { token = SyncStorage.get('customerData').cookie } // <!-- 2.0 updates -->
    const onePage = this.props.cartItems2.Config.checkOutPage
    const data = {
      token, // <!-- 2.0 updates -->
      billing_info: SyncStorage.get('customerData').billing,
      shipping_info: SyncStorage.get('customerData').shipping,
      products: this.getProducts(),
      shipping_ids: SyncStorage.get('customerData').shipping_lines,
      coupons: this.getCoupons(),
      customer_note: '',
      customer_id, // <!-- 2.0 updates -->
      sameAddress: SyncStorage.get('customerData').sameAddress,
      one_page: onePage,
      platform: Platform.OS
    }
    this.props.navigation.push('WebViewScreen', {
      onePageCheckOut2: true,
      data //
    })
  }
  //= ================================================================================================================================
  getProducts() {
    const data = []
    for (const v of SyncStorage.get('cartProducts')) {
      const obj = {
        quantity: v.quantity,
        product_id: v.product_id,
        total: v.total.toString()
      }
      if (v.variation_id) Object.assign(obj, { variation_id: v.variation_id })
      data.push(obj)
    }
    return data
  }
  //= ================================================================================================================================
  getCoupons() {
    const data = []
    for (const v of this.props.cartItems2.cartItems.couponArray) {
      data.push({ code: v.code, discount: v.amount })
    }
    return data
  }
  //= ================================================================================================================================
  getShippingLines() {
    const data = []
    for (const v of SyncStorage.get('customerData').shipping_lines) {
      data.push({ code: v.code, discount: v.amount })
    }
    return data
  }
  //= ================================================================================================================================
  updateUser() {
    const data = {
      billing: SyncStorage.get('customerData').billing,
      shipping: SyncStorage.get('customerData').shipping
    }
    this.config.Woocommerce.putAsync(
      `customers/${SyncStorage.get('customerData').id}`,
      data
    ).then(data => {
      const dat = JSON.parse(data.body)
      SyncStorage.get('customerData').billing = dat.billing
      SyncStorage.get('customerData').shipping = dat.shipping
      this.storage.set('customerData', SyncStorage.get('customerData'))
    })
  }
  //= ================================================================================================================================
  ionViewWillEnter() {
    SyncStorage.get('customerData').shipping_lines = []
  }
  /// //////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return this.state.isloading ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <Container>
        <Content>
          <FlatList
            data={this.state.shippingMethod}
            horizontal={false}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <View>
                {item.item.enabled && this.checkFreeShipping(item.item) ? (
              
                    <ListItem>
                          <TouchableOpacity 
                            style={{
                              flexDirection: 'row'
                            }}
                  onPress={() => this.setMethod(item.item, item.index)}
                          >
                      <Body>
                        <View
                          style={{
                            flexDirection: 'row'
                          }}
                        >
                          <Text>{item.item.title} </Text>
                          {item.item.settings.cost != undefined ? (
                            <View style={{marginTop: 1}}>
                            {/* <HTML
                              html={SyncStorage.get('currency')}
                              baseFontStyle={{
                                fontSize: themeStyle.mediumSize + 1,
                                color: '#000',
                                
                              }}
                            /> */}
                            </View>
                          ) : null}
                          <Text style={{marginLeft: 0}}>
                          {item.item.settings.cost != undefined ? 'ع.د' :  null }
                            {item.item.settings.cost != undefined
                              ? item.item.settings.cost.value !== ''
                                ? Number(item.item.settings.cost.value).toFixed(SyncStorage.get('decimals'))
                                : '0.00'
                              : ''}{' '}
                          </Text>
                          </View>
                      </Body>
                      <CheckBox
                        onPress={() => this.setMethod(item.item, item.index)}
                        checked={
                          !!(
                            this.state.tick[item.index] ||
                            SyncStorage.get('currency') === item.item.symbol
                          )
                        }
                      />
                      </TouchableOpacity>
                    </ListItem>
             
                ) : (
                  <View />
                )}
              </View>
            )}
          />
        </Content>

        <TouchableOpacity
          onPress={() => this.proceedOrder()}
          disabled={this.state.buttonEnable}
        >
          <View
            style={{
              borderColor: themeStyle.otherBtnsColor,
              alignItems: 'center',
              height: 40,
              width: wp('100%'),
              backgroundColor: themeStyle.otherBtnsColor,
              justifyContent: 'center',
              opacity: this.state.buttonEnable ? 0.4 : 0.9
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: themeStyle.mediumSize,
                fontWeight: '500'
              }}
            >
              {this.props.cartItems2.Config.languageJson.Next}
            </Text>
          </View>
        </TouchableOpacity>
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  cartItems2: state
})

export default connect(
  mapStateToProps,
  null
)(ShippingMethod)
