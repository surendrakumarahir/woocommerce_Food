/* eslint-disable no-empty */
/* eslint-disable no-confusing-arrow */
/* eslint-disable import/imports-first */
/* eslint-disable camelcase */
/* eslint-disable global-require */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/sort-comp */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/newline-after-import */
/* eslint-disable semi */
/* eslint-disable no-unused-expressions */

import React, { Component } from 'react'
import { CardStyleInterpolators } from 'react-navigation-stack';
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
  Text,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators';
import HTML from 'react-native-render-html'
import ModalWrapper from 'react-native-modal-wrapper'
import WooComFetch from '../common/WooComFetch'
import { Icon } from 'native-base'
import SyncStorage from 'sync-storage'
import { connect } from 'react-redux'
import ImageLoad from '../common/RnImagePlaceH';
import themeStyle from '../common/Theme.style'
class orderScreen extends Component {
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
      headerTitle: this.props.cartItems2.Config.languageJson.Order
    }) 
    this.onInit()
    this.calculateDiscount()
    this.calculateTotal()
    this.calculateTax()
  }
  constructor(props) {
    super(props)
    this.state = {
      customerNotes: '',
      discount: 0,
      productsTotal: 0,
      totalAmountWithDisocunt: 0,
      paymentMethods: [],
      selectedPaymentMethod: '',
      selectedPaymentMethodTitle: '',
      order: {},
      tax: 0,
      loaderTaxCalculating: true,
      loaderPaymentMethods: true,
      wrapperCondition: false,
      radioButton: [],
      paymentText: '',
      paymentShowCondition: true,
      buttonEnable: false
    }
  }
  /// ///////////////////////////////////
  // placing order
  addOrder = () => {
  
    let customer_id = 0
    if (SyncStorage.get('customerData').id != null) { customer_id = SyncStorage.get('customerData').id }
    let token = null
    if (SyncStorage.get('customerData').cookie != null) { token = SyncStorage.get('customerData').cookie }
    const onePage = this.props.cartItems2.Config.checkOutPage
    const data = {
      token,
      payment_method: this.state.selectedPaymentMethod,
      payment_method_title: this.state.selectedPaymentMethodTitle,
      billing_info: SyncStorage.get('customerData').billing,
      shipping_info: SyncStorage.get('customerData').shipping,
      products: this.getProducts(),
      shipping_ids: SyncStorage.get('customerData').shipping_lines,
      coupons: this.props.cartItems2.cartItems.couponArray,
      customer_note: this.state.customerNotes,
      customer_id,
      one_page: onePage,
      platform: Platform.OS
    }
    console.log('dataaaaa', data);
    this.props.navigation.push('WebViewScreen', {
      onePageCheckOut2: true,
      data //
    })
  }
  /// ////////////////////////////////////
  onInit = async () => {
    const json2 = await WooComFetch.getPaymentGateways(
      this.props.cartItems2.Config.productsArguments
    )
    json2.map((buttonInfo, index) => {
      this.state.radioButton[index] = false
    })
    this.setState({
      loaderPaymentMethods: false,
      paymentMethods: json2,
      paymentShowCondition: false
    })
  }
  /// //////////////////////////////////////////
  // CAlculate Discount total
  calculateDiscount = () => {
    let price = 0
    let subPrice = 0
    let sum = 0
    for (const value of this.props.cartItems2.cartItems.cartProductArray) {
      subPrice += value.subtotal
      price += value.total
    }
    sum = parseFloat(subPrice) - parseFloat(price)
    this.setState({
      discount: parseFloat(sum),
      productsTotal: parseFloat(price)
    })
  }
  /// //////////////////////////////////////
  getProducts() {
    const data = []
    for (const v of this.props.cartItems2.cartItems.cartProductArray) {
      const obj = {
        quantity: v.quantity,
        product_id: v.product_id,
        total: v.total.toString(),
        price: v.price.toString()
      }
      if (v.variation_id) Object.assign(obj, { variation_id: v.variation_id })
      data.push(obj)
    }
    return data
  }
  /// //////////////////////////////////////////
  calculateTax = () => {
    const data = {
      billing_info: SyncStorage.get('customerData').billing,
      shipping_info: SyncStorage.get('customerData').shipping,
      products: this.getProducts(),
      shipping_ids: SyncStorage.get('customerData').shipping_lines
    }
    fetch(
      `${
        this.props.cartItems2.Config.url
      }/api/reactappsettings/react_get_tax/?insecure=cool&order=${encodeURIComponent(
        JSON.stringify(data)
      )}`,
      {
        method: 'GET'
      }
    )
      .then(res => res.json())
      .then(data1 => {
        this.state.loaderTaxCalculating = false
        let res = parseFloat(JSON.stringify(data1))
        if (res) {
        } else {
          res = 0
        }
        this.setState({ tax: res })
        this.calculateTotal()
      })
      .catch(error => {
        console.log(error)
        this.setState({
          errorMessage: 'The Email not Valid exist',
          SpinnerTemp: false
        })
      })
  }
  /// //////////////////////////////////////////
  // CAlculate all total
  calculateTotal = () => {
    console.log(this.state.productsTotal)
    this.setState({
      totalAmountWithDisocunt:
        parseFloat(this.state.productsTotal) +
        parseFloat(SyncStorage.get('customerData').shipping_lines[0].total) +
        parseFloat(this.state.tax)
    })
  }
  /// //////////////////////////////////////////
  singaleRow(placeholderText, name, iconValue, paymentIcon, index, id) {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          padding: 6,
          flexDirection: 'row',
          flex: 1
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: themeStyle.mediumSize,
            color: 'black',
            paddingTop: 3,
          }}
        >
          {placeholderText}
        </Text>
        {paymentIcon ? (
          <Icon
            onPress={() => {
              console.log(index)
              this.state.paymentMethods.map((buttonInfo, index) => {
                this.state.radioButton[index] = false
              })
              this.state.radioButton[index]
                ? (this.state.radioButton[index] = false)
                : (this.state.radioButton[index] = true)
              this.setState({
                radioButton: this.state.radioButton,
                wrapperCondition: false,
                paymentText: placeholderText,
                selectedPaymentMethod: id,
                buttonEnable: true,
                selectedPaymentMethodTitle: placeholderText
              })
            }}
            name={
              !this.state.radioButton[index]
                ? 'radio-button-off'
                : 'radio-button-on'
            }
            style={{ color: '#4d4d4d', fontSize: 25 }}
          />
        ) : iconValue ? (
          <TouchableOpacity
            onPress={() => this.setState({ wrapperCondition: true })}
          >
            <View
              style={{
                justifyContent: 'space-around',
                padding: 3,
                flexDirection: 'row'
              }}
            >
              <Text
                style={{
                  paddingRight: 5,
                  fontSize: themeStyle.mediumSize,
                  paddingTop: 2,
                  color: '#000'
                }}
              >
                {this.state.paymentText}
              </Text>
              <Icon
                name={'arrow-dropdown'}
                style={{ color: '#4d4d4d', fontSize: 22 }}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <HTML
              html={SyncStorage.get('currency')}
              baseFontStyle={{ fontSize: themeStyle.mediumSize, color: '#000' }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: themeStyle.mediumSize,
                color: 'black'
              }}
            >
              {name}
            </Text>
          </View>
        )}
      </View>
    )
  }


   /// //////////////////////////////////////////
   singaleRow3(placeholderText, name, iconValue, paymentIcon, index, id) {
    return (
          <TouchableOpacity
              style={{
                justifyContent: 'space-between',
                 padding: 6,
                flexDirection: 'row',
                flex: 1
              }}
               onPress={() => {
                console.log(index)
                this.state.paymentMethods.map((buttonInfo, index) => {
                  this.state.radioButton[index] = false
                })
                this.state.radioButton[index]
                  ? (this.state.radioButton[index] = false)
                  : (this.state.radioButton[index] = true)
                this.setState({
                  radioButton: this.state.radioButton,
                  wrapperCondition: false,
                  paymentText: placeholderText,
                  selectedPaymentMethod: id,
                  buttonEnable: true,
                  selectedPaymentMethodTitle: placeholderText
                })
              }}
          >
            <View
              style={{
                justifyContent: 'space-around',
                padding: 3,
                flexDirection: 'row'
              }}
            >
        <Text
          style={{
            textAlign: 'center',
            fontSize: themeStyle.mediumSize,
            color: 'black',
            paddingTop: 3,
          }}
        >
          {placeholderText}
        </Text>
        </View>
        <Icon
            onPress={() => {
              console.log(index)
              this.state.paymentMethods.map((buttonInfo, index) => {
                this.state.radioButton[index] = false
              })
              this.state.radioButton[index]
                ? (this.state.radioButton[index] = false)
                : (this.state.radioButton[index] = true)
              this.setState({
                radioButton: this.state.radioButton,
                wrapperCondition: false,
                paymentText: placeholderText,
                selectedPaymentMethod: id,
                buttonEnable: true,
                selectedPaymentMethodTitle: placeholderText
              })
            }}
            name={
              !this.state.radioButton[index]
                ? 'radio-button-off'
                : 'radio-button-on'
            }
            style={{ color: '#4d4d4d', fontSize: 25 }}
        />
          </TouchableOpacity>
     
      
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ModalWrapper
          style={{ width: 280, paddingLeft: 24, paddingRight: 24 }}
          visible={this.state.wrapperCondition}
        >
          <Text
            style={{
              padding: 10,
              fontSize: themeStyle.largeSize,
              fontWeight: '500',
              paddingTop: 20,
              color: '#000'
            }}
          >
            {this.props.cartItems2.Config.languageJson.Payment}
          </Text>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#d9d9d9',
              marginBottom: 12
            }}
          />

          <View>
            <View
              style={{
                paddingLeft: 1,
                flexDirection: 'column',
                paddingRight: 2
              }}
            >
              <FlatList
                data={this.state.paymentMethods}
                horizontal={false}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item =>
                  item.item.enabled
                    ? this.singaleRow3(
                      item.item.title,
                      this.state.discount,
                      true,
                      true,
                      item.index,
                      item.item.id
                    )
                    : null
                }
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#d9d9d9'
            }}
          />
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => this.setState({ wrapperCondition: false })}
          >
            <View
              style={{
                alignItems: 'flex-start',
                padding: 10,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                paddingLeft: 12,
                paddingBottom: 5
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: themeStyle.mediumSize,
                  color: 'black'
                }}
              >
                {this.props.cartItems2.Config.languageJson.Close}
              </Text>
            </View>
          </TouchableOpacity>
        </ModalWrapper>
        <FlatList
          data={['asd']}
          horizontal={false}
          extraData={this.state}
          ListFooterComponent={
            <View style={{ backgroundColor: 'white' }}>
              {this.state.buttonEnable ? (
                <TouchableOpacity
                  style={{
                    margin: 10,
                    marginBottom: 20,
                    marginTop: 5
                  }}
                  onPress={() => this.addOrder()}
                >
                  <View
                    style={{
                      borderColor: '#fff',
                      alignItems: 'center',
                      height: 38,
                      backgroundColor: themeStyle.otherBtnsColor,
                      flex: 1,
                      justifyContent: 'center',
                      elevation: 5,
                      shadowOffset: { width: 1, height: 1 },
                      shadowColor: 'black',
                      shadowOpacity: 0.5
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: themeStyle.mediumSize,
                        fontWeight: '500'
                      }}
                    >
                      {this.props.cartItems2.Config.languageJson.Continue}
                     </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          }
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => (
            <View
              style={{
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 5,
                flex: 1
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  flex: 1,
                  margin: 10,
                  marginTop: 10,
                  marginBottom: 5,
                  elevation: 5
                }}
              >
                <View
                  style={{
                    justifyContent: 'space-between',

                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      backgroundColor: '#d3d3d3',
                      fontSize: themeStyle.largeSize,
                      fontWeight: '500',
                      color: '#000'
                    }}
                  >
                    {
                      this.props.cartItems2.Config.languageJson[
                        'Shipping Address'
                      ]
                    }
                  </Text>

                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      fontSize: themeStyle.mediumSize,
                      color: '#000'
                    }}
                  >
                    {`${SyncStorage.get('customerData').shipping.address_1}, ${
                      SyncStorage.get('customerData').shipping.city
                    }, ${SyncStorage.get('customerData').shipping.state} ${
                      SyncStorage.get('customerData').shipping.postcode
                    },${SyncStorage.get('customerData').shipping.country}`}
                  </Text>
                </View>
                {/* ///////////////////////////////// */}
              </View>
              {/* //////////////////// */}

              <View
                style={{
                  // height: 110,
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  flex: 1,
                  margin: 10,
                  marginTop: 10,
                  marginBottom: 5,
                  elevation: 5
                }}
              >
                <View
                  style={{
                    justifyContent: 'space-between',

                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      backgroundColor: '#d3d3d3',
                      fontSize: themeStyle.largeSize,
                      fontWeight: '500',
                      color: '#000'
                    }}
                  >
                    {
                      this.props.cartItems2.Config.languageJson[
                        'Billing Address'
                      ]
                    }
                  </Text>

                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      fontSize: themeStyle.mediumSize,
                      color: '#000'
                    }}
                  >
                    {`${SyncStorage.get('customerData').billing.address_1}, ${
                      SyncStorage.get('customerData').billing.city
                    }, ${SyncStorage.get('customerData').billing.state} ${
                      SyncStorage.get('customerData').billing.postcode
                    },${SyncStorage.get('customerData').billing.country}`}
                  </Text>
                </View>
                {/* ///////////////////////////////// */}
              </View>

              {/* /////////////////////////////////////// */}

              <View
                style={{
                  // height: 110,
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  flex: 1,
                  margin: 10,
                  marginTop: 10,
                  marginBottom: 5,
                  elevation: 5
                }}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      backgroundColor: '#d3d3d3',
                      fontSize: themeStyle.largeSize,
                      fontWeight: '500',
                      color: '#000'
                    }}
                  >
                    {
                      this.props.cartItems2.Config.languageJson[
                        'Shipping Address'
                      ]
                    }
                  </Text>

                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      fontSize: themeStyle.mediumSize,
                      color: '#000'
                    }}
                  >
                    {
                      SyncStorage.get('customerData').shipping_lines[0]
                        .method_title
                    }
                  </Text>
                </View>
                {/* ///////////////////////////////// */}
              </View>
              {/* /////////////////////// */}
              <View
                style={{
                  // height: 110,
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  flex: 1,
                  margin: 10,
                  marginTop: 10,
                  marginBottom: 5,
                  elevation: 5
                }}
              >
                <View
                  style={{
                    justifyContent: 'space-between',

                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      backgroundColor: '#d3d3d3',
                      fontSize: themeStyle.largeSize,
                      fontWeight: '500',
                      color: '#000'
                    }}
                  >
                    {this.props.cartItems2.Config.languageJson.Products}
                  </Text>

                  {/* //////////////////////////////// */}
                  <FlatList
                    data={this.props.cartItems2.cartItems.cartProductArray}
                    extraData={this.state}
                    listKey={'products'}
                    keyExtractor={(item, index) => index.toString()}
                    // eslint-disable-next-line no-return-assign
                    renderItem={item => (
                      <View
                        style={{
                          backgroundColor: '#fff'
                        }}
                      >
                        <View
                          style={{
                            padding: 6,
                            paddingLeft: 6,
                            fontSize: themeStyle.mediumSize
                          }}
                        >
                          <Text style={{ color: '#000' }}>{item.item.name}</Text>
                        </View>

                        <View
                          style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#d9d9d9'
                          }}
                        />

                        <View
                          style={{
                            justifyContent: 'space-between',
                            padding: 4,
                            paddingLeft: 3,
                            flexDirection: 'row'
                          }}
                        >
                          <ImageLoad
                            key={item.item.id}
                            style={{ height: 125, width: 110 }}
                            loadingStyle={{
                              size: 'large',
                              color: themeStyle.loadingIndicatorColor
                            }}
                            placeholder={false}
                            ActivityIndicator={true}
                            placeholderStyle={{width: 0, height: 0}}
                            source={{
                              uri: item.item.image
                            }}
                          />
                          <View
                            style={{
                              padding: 3,
                              paddingLeft: 8,
                              flexDirection: 'column',
                              flex: 1
                            }}
                          >
                            <View
                              style={{
                                justifyContent: 'space-between',
                                padding: 3,
                                paddingLeft: 8,
                                flexDirection: 'row'
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: themeStyle.mediumSize,
                                  fontWeight: 'normal',
                                  color: '#000'
                                }}
                              >
                                {
                                  this.props.cartItems2.Config.languageJson
                                    .Price
                                }{' '}
                                :
                              </Text>

                              <HTML
                                html={item.item.price_html}
                                baseFontStyle={{
                                  fontSize: themeStyle.mediumSize,
                                  color: '#000'
                                }}
                              />
                            </View>

                            <View
                              style={{
                                justifyContent: 'space-between',
                                padding: 3,
                                paddingLeft: 8,
                                flexDirection: 'row',
                                flex: 1
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: themeStyle.mediumSize,
                                  fontWeight: 'normal',
                                  color: '#000'
                                }}
                              >
                                {
                                  this.props.cartItems2.Config.languageJson
                                    .Quantity
                                }{' '}
                                :
                              </Text>
                              {/* //////// */}
                              <Text
                                style={{
                                  fontSize: themeStyle.mediumSize,
                                  fontWeight: 'normal',
                                  color: '#000'
                                }}
                              >
                                {item.item.quantity}
                              </Text>
                            </View>

                            <View
                              style={{
                                justifyContent: 'space-between',
                                padding: 3,
                                paddingLeft: 8,
                                flexDirection: 'row',
                                flex: 1
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: themeStyle.mediumSize,
                                  fontWeight: 'normal',
                                  color: '#000'
                                }}
                              >
                                {
                                  this.props.cartItems2.Config.languageJson[
                                    'Sub Total'
                                  ]
                                }{' '}
                                :
                              </Text>
                              <View
                                style={{
                                  justifyContent: 'flex-end',

                                  flexDirection: 'row',
                                  flex: 1
                                }}
                              >
                                <HTML
                                  html={SyncStorage.get('currency')}
                                  baseFontStyle={{
                                    fontSize: themeStyle.mediumSize,
                                    color: '#000'
                                  }}
                                />
                                <Text
                                  style={{
                                    fontSize: themeStyle.mediumSize,
                                    color: '#000'
                                  }}
                                >
                                  {`${item.item.subTotal.toFixed(SyncStorage.get('decimals'))}`}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                justifyContent: 'space-between',
                                padding: 3,
                                paddingLeft: 8,
                                flexDirection: 'row',
                                flex: 1
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: themeStyle.largeSize,
                                  fontWeight: 'bold',
                                  color: '#000'
                                }}
                              >
                                {
                                  this.props.cartItems2.Config.languageJson
                                    .Total
                                }{' '}
                                :
                              </Text>
                              <View
                                style={{
                                  justifyContent: 'flex-end',
                                  flexDirection: 'row',
                                  flex: 1
                                }}
                              >
                                <HTML
                                  html={SyncStorage.get('currency')}
                                  baseFontStyle={{
                                    fontSize: themeStyle.largeSize,
                                    color: '#000'
                                  }}
                                />
                                <Text
                                  style={{
                                    fontSize: themeStyle.largeSize,
                                    fontWeight: 'bold',
                                    color: '#000'
                                  }}
                                >
                                  {`${item.item.total.toFixed(SyncStorage.get('decimals'))}`}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#d9d9d9'
                          }}
                        />

                        <View
                          style={{
                            padding: 3,
                            paddingLeft: 8,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            flex: 1,
                            alignItems: 'flex-end'
                          }}
                        />
                      </View>
                    )}
                  />
                  {/* </Text> */}
                </View>
              </View>
              <View
                style={{
                  // height: 110,
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  flex: 1,
                  margin: 10,
                  marginTop: 10,
                  marginBottom: 5,
                  elevation: 5
                }}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      backgroundColor: '#d3d3d3',
                      fontSize: themeStyle.largeSize,
                      fontWeight: '500',
                      color: '#000'
                    }}
                  >
                    {this.props.cartItems2.Config.languageJson.Coupon}
                  </Text>

                  {/* ///////////////////////////////////////// SHow Coupon List */}
                  <FlatList
                    data={this.props.cartItems2.cartItems.couponArray}
                    extraData={this.state}
                    listKey={'coupon'}
                    keyExtractor={(item, index) => index.toString()}
                    // eslint-disable-next-line no-return-assign
                    // eslint-disable-next-line no-shadow
                    renderItem={item =>
                      this.singaleRow(item.item.code, item.item.amount)
                    }
                  />
                </View>
                {/* ///////////////////////////////// */}
              </View>

              {/* ///////////////////////////////// */}

              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  flex: 1,
                  margin: 10,
                  marginTop: 10,
                  marginBottom: 5,
                  elevation: 5
                }}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      backgroundColor: '#d3d3d3',
                      fontSize: themeStyle.largeSize,
                      fontWeight: '500',
                      color: '#000'
                    }}
                  >
                    {this.props.cartItems2.Config.languageJson['Sub Total']}
                  </Text>
                  <View>
                    {this.state.loaderTaxCalculating ? (
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <UIActivityIndicator
                          size={27}
                          color={themeStyle.loadingIndicatorColor}
                        />
                      </View>
                    ) : (
                      <View>
                        {this.singaleRow(
                          this.props.cartItems2.Config.languageJson[
                            'Products Price'
                          ],
                          this.props.cartItems2.cartItems.totalSumPrice
                        )}
                        {this.singaleRow(
                          this.props.cartItems2.Config.languageJson[
                            'Shipping Cost'
                          ],
                          SyncStorage.get('customerData').shipping_lines[0]
                            .total
                        )}
                        {this.singaleRow(
                          this.props.cartItems2.Config.languageJson.Tax,
                          this.state.tax.toFixed(SyncStorage.get('decimals'))
                        )}
                        {this.singaleRow(
                          this.props.cartItems2.Config.languageJson.Discount,
                          `-${this.state.discount.toFixed(SyncStorage.get('decimals'))}`
                        )}
                        {this.singaleRow(
                          this.props.cartItems2.Config.languageJson.Total,
                          this.state.totalAmountWithDisocunt.toFixed(SyncStorage.get('decimals'))
                        )}
                      </View>
                    )}
                  </View>
                </View>

                {/* ///////////////////////////////// */}
              </View>
              {/*
////////////////////////// */}
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  flex: 1,
                  margin: 10,
                  marginTop: 10,
                  marginBottom: 5,
                  elevation: 5
                }}
              >
                <View
                  style={{
                    justifyContent: 'space-between',

                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      justifyContent: 'space-between',
                      padding: 10,
                      flex: 1,
                      backgroundColor: '#d3d3d3',
                      fontSize: themeStyle.largeSize,
                      fontWeight: '500',
                      color: '#000'
                    }}
                  >
                    {this.props.cartItems2.Config.languageJson['Order Notes']}
                  </Text>

                  <TextInput
                    style={{
                      height: 38,
                      borderColor: '#c1c1c1',
                      borderWidth: 1,
                      paddingLeft: 4
                    }}
                    selectionColor={themeStyle.primary}
                    placeholder={`  ${
                      this.props.cartItems2.Config.languageJson[
                        'Note to the buyer'
                      ]
                    }`}
                    onChangeText={customerNotes => {
                      this.setState({ customerNotes })
                    }}
                    value={this.state.customerNotes}
                  />
                </View>
                {/* ///////////////////////////////// */}
              </View>
              {/*
////////////////////////// */}
              {this.state.paymentShowCondition ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <UIActivityIndicator
                    size={27}
                    color={themeStyle.loadingIndicatorColor}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => this.setState({ wrapperCondition: true })}
                  style={{
                    backgroundColor: '#fff',
                    justifyContent: 'space-between',
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    flex: 1,
                    margin: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    elevation: 5
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flex: 1
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flex: 1
                      }}
                    >
                      {this.singaleRow(
                        this.props.cartItems2.Config.languageJson.Payment,
                        this.state.tax.toFixed(SyncStorage.get('decimals')),
                        true
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    )
  }
}
const mapStateToProps = state => ({
  cartItems2: state
})

export default connect(
  mapStateToProps,
  null
)(orderScreen)
