/* eslint-disable no-empty */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/imports-first */
/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React, {Component} from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  I18nManager
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators'
import {CardStyleInterpolators} from 'react-navigation-stack'
import Toast from 'react-native-easy-toast'
import {Icon} from 'native-base'
import ModalWrapper from 'react-native-modal-wrapper'
import Spinner from 'react-native-loading-spinner-overlay'
import WooComFetch from '../common/WooComFetch'
import {withNavigation, NavigationEvents} from 'react-navigation'
import {connect} from 'react-redux'
import Counter from '../common/Counter'
import SyncStorage from 'sync-storage'
import HTML from 'react-native-render-html'
import ImageLoad from '../common/RnImagePlaceH'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import couponProvider from '../common/CouponClass'
import themeStyle from '../common/Theme.style'
WIDTH = Dimensions.get('window').width
class Cart extends Component {
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    console.log(headerStyle);
    return {
      headerTitle: headerStyle,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      headerForceInset: {top: 'never', vertical: 'never'},
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal',
      },
      headerTitleAlign: 'center',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      stepperArray: [],
      subTotal: [],
      value: [],
      totalSumPrice: 0,
      listTotal: 0,
      total: '',
      subtotal: '',
      c: '',
      couponArray: [],
      products: [],
      loadingServerData: true,
      productTemp: [],
      SpinnerTemp: false,
      couponText: '',
      wrapperCondition: false,
      wrapperAlert: false,
      alertText: '',
      uri: '',
      activityIndicatorTemp: true,
      temp: false,
      updateTemp: false,
      couponTemp: false,
    }
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson['Cart Page'],
      temp: this.props.navigation,
    })
    setTimeout(() => {
      this.setState({activityIndicatorTemp: false})
    }, Math.floor(100 / 360000))
    SyncStorage.set('Country', 'Country')
    SyncStorage.set('cartScreen', 1)
  }
  componentDidUpdate (prevProps) {
    if (
      this.props.cartItems2.cartItems.totalSumPrice !== this.state.total &&
      !this.state.temp &&
      !this.state.couponTemp
    ) {
      console.log('componentDidUpdate')
      this.updateCart()
    }
  }
  //= ===========================================================================================
  // eslint-disable-next-line react/sort-comp
  totalPrice = () => {
    let price = 0
    let subPrice = 0
    for (const value of this.props.cartItems2.cartItems.cartProductArray) {
      if (value.total.toString() == 'NaN') {
        subPrice += 0
        this.state.temp = true
      } else {
        subPrice += value.subtotal
        this.state.temp = false
      }

      if (value.total.toString() == 'NaN') {
        price += 0
        this.state.temp = true
      } else {
        price += value.total
        this.state.temp = false
      }
    }
    this.setState({
      subtotal: subPrice,
      total: price,
      temp: this.state.temp,
    })
  }
  //= ===========================================================================================
  removeCart = id => {
    this.props.cartItems2.cartItems.cartProductArray.forEach((value, index) => {
      if (value.cart_id == id) {
        this.props.cartItems2.cartItems.cartProductArray.splice(index, 1)
        this.setState({SpinnerTemp: true})
        if (this.props.cartItems2.cartItems.cartProductArray.length === 0) {
          this.changingCart()
        }
        console.log('removeCart')
        this.updateCart()
      }
    })
  }
  //= ===========================================================================================
  qunatityPlus = p => {
    this.setState({SpinnerTemp: true})
    if (p.stock_quantity == p.quantity) {
    } else if (p.stock_quantity == null || p.stock_quantity > p.quantity) {
      p.quantity++
      p.subtotal += parseFloat(p.price)
      p.total += parseFloat(p.price)
      console.log('qunatityPlus')
      this.updateCart()
    }
  }
  //= ===========================================================================================
  // function decreasing the quantity
  qunatityMinus = p => {
    this.setState({SpinnerTemp: true})
    if (p.quantity != 1) {
      p.quantity--
      p.subtotal = parseFloat(p.price) * p.quantity
      p.total = parseFloat(p.price) * p.quantity
      console.log('qunatityMinus')
      this.updateCart()
    }
  }

  //= ===========================================================================================
  //  //============================================================================================
  updateCart = async () => {
    console.log('updateCart')
    if (!this.state.updateTemp) {
      this.state.updateTemp = true
      try {
        if (this.props.cartItems2.cartItems.cartProductArray.length != 0) {
          this.state.loadingServerData = false
        }
        let count = 0
        this.props.cartItems2.cartItems.cartProductArray.forEach(
          async (value, index) => {
            let id = value.product_id
            if (value.variation_id !== undefined) id = value.variation_id
            const json2 = await WooComFetch.getVariableProducts(
              id,
              this.props.cartItems2.Config.productsArguments,
            )
            console.log(json2)
            count++
            const p = json2
            if (p.id == undefined) {
              this.props.cartItems2.cartItems.cartProductArray.splice(index, 1)
            } else if (p.status == 'trash') {
              this.props.cartItems2.cartItems.cartProductArray.splice(index, 1)
            } else {
              value.price = p.price
              value.name = p.name
              value.stock_quantity = p.stock_quantity
              value.tax_status = p.tax_status
              value.tax_class = p.tax_class
              value.tax_status = p.tax_status
              value.on_sale = p.on_sale
              value.categories = p.categories

              if (p.stock_quantity == null) {
              } else if (p.stock_quantity < value.quantity) {
                value.quantity = p.stock_quantity
              } else if (p.in_stock == false) {
                this.props.cartItems2.cartItems.cartProductArray.splice(
                  index,
                  1,
                )
              }

              value.subtotal = parseFloat(value.price) * value.quantity
              value.total = parseFloat(value.price) * value.quantity
            }
            if (
              count == this.props.cartItems2.cartItems.cartProductArray.length
            ) {
              this.changingCart()
              this.loadingServerData = true
            }
          },
        )
      } catch (err) {
        console.log(err)

        this.setState({
          SpinnerTemp: false,
          updateTemp: false,
          activityIndicatorTemp: false,
          activityIndicatorTemp: false,
        })
      }
    }
  }
  //= =========================================================================
  //= =========================================================================
  changingCart = () => {
    console.log('ok')
    this.props.cartTotalItems()
    this.props.productTotal()
    SyncStorage.set(
      'cartProducts',
      this.props.cartItems2.cartItems.cartProductArray,
    )
    this.props.cartItems2.cartItems.couponArray.forEach(value => {
      this.props.cartItems2.cartItems.cartProductArray = couponProvider.apply(
        value,
        this.props.cartItems2.cartItems.cartProductArray,
      ) /// /////////////////
    })
    this.totalPrice()
    console.log('finallllllllllllllll')
    this.setState({
      SpinnerTemp: false,
      products: this.props.cartItems2.cartItems.cartProductArray,
      activityIndicatorTemp: false,
      updateTemp: false,
    })
  }
  //= ===========================================================================================
  // getting getMostLikedProducts from the server
  getCoupon = async code => {
    try {
      this.setState({SpinnerTemp: true, temp: true, couponTemp: true})
      const json2 = await WooComFetch.getCoupon(code)
      const d = json2
      const coupon = d[0]
      if (d.length == 0) {
        this.refs.toast.show('Invalid Coupon Code!')
        this.setState({
          SpinnerTemp: false,
          activityIndicatorTemp: false,
          couponTemp: false,
        })
      } else {
        this.applyCouponCart(coupon)
      }
    } catch (err) {
      console.log(err)
      this.setState({
        couponTemp: false,
        SpinnerTemp: false,
        activityIndicatorTemp: false,
        temp: true,
      })
    }
  }
  //= ===========================================================================================
  // applying coupon on the cart
  applyCouponCart = coupon => {
    // checking the coupon is valid or not
    if (
      couponProvider.validateCouponService(
        this.refs.toast,
        coupon,
        this.props.cartItems2.cartItems.cartProductArray,
        this.props.cartItems2.cartItems.couponArray,
      ) === false
    ) {
      this.setState({
        couponTemp: true,
        wrapperAlert: false,
        SpinnerTemp: false,
        activityIndicatorTemp: false,
        temp: true,
      })
      return 0
    }
    if (coupon.individual_use == 1) {
      this.props.cartItems2.cartItems.cartProductArray = JSON.parse(
        JSON.stringify(this.props.cartItems2.cartItems.cartProductArray),
      )
      this.props.cartItems2.cartItems.couponArray = []
    }
    // eslint-disable-next-line vars-on-top
    const v = {}
    v.code = coupon.code
    v.amount = coupon.amount
    v.product_ids = coupon.product_ids
    v.excluded_product_ids = coupon.exclude_product_ids
    v.product_categories = coupon.product_categories
    v.excluded_product_categories = coupon.excluded_product_categories
    v.discount = coupon.amount
    v.individual_use = coupon.individual_use
    v.free_shipping = coupon.free_shipping
    v.discount_type = coupon.discount_type
    this.props.cartItems2.cartItems.couponArray.push(coupon)
    console.log('applyCouponCart')
    this.updateCart()
  }
  //= ===========================================================================================
  // delete Coupon
  deleteCoupon = function (code) {
    this.setState({SpinnerTemp: true, temp: true, couponTemp: true}, () => {
      this.props.cartItems2.cartItems.couponArray.forEach((value, index) => {
        if (value.code == code) {
          this.props.cartItems2.cartItems.couponArray.splice(index, 1)
          return true
        }
      })
      console.log('deleteCoupon')

      this.updateCart()
      // this.state.couponTemp= false;
    })
  }

  //= ===========================================================================================
  // componentDidMount() {
  //   this.props.navigation.setParams({
  //     headerTitle: this.props.cartItems2.Config.languageJson['Cart Page'],
  //     temp: this.props.navigation
  //   });
  //   console.log('componentDidMount')
  //  this.updateCart();
  // }
  //= ===========================================================================================
  componentWillUnmount () {
    clearInterval(this.state.activityIndicatorTemp)
    // this.props.navigation.pop();
  }
  /// ////////////////////////////////////
  wraperTouchButton (text, code) {
    return (
      <TouchableOpacity
        style={{paddingTop: 0}}
        onPress={() =>
          this.setState({wrapperCondition: false, couponText: code})
        }>
        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
            backgroundColor: 'transparent',
          }}>
          <Icon
            name={'arrow-forward'}
            size={20}
            style={{color: '#4d4d4d', paddingTop: 12}}
          />
          <Text
            style={{
              fontSize: themeStyle.mediumSize,
              color: 'black',
              paddingLeft: 10,
              paddingTop: 7,
            }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  //= ===========================================================================================
  //= ===========================================================================================
  proceedToCheckOut = () => {
    SyncStorage.set('webviewActive', true)
    if (
      SyncStorage.get('customerData') == null ||
      SyncStorage.get('customerData') == undefined ||
      SyncStorage.get('customerData') === '' ||
      SyncStorage.get('gustLogin')
    ) {
      SyncStorage.set('cartScreen', 1)
      this.props.navigation.push('LoginScreen')
      this.refs.toast.show('login')
    } else {
      // <!-- 2.0 updates -->
      if (this.props.cartItems2.Config.checkOutPage == 1) {
        this.props.navigation.push('WebViewScreen', {
          onePageCheckOut2: false,
          //
        })
      } else {
        this.props.navigation.navigate('ShippingAddressScreen')
      }
    }
  }

  //= ===========================================================================================
  render () {
    console.log(this.state.total)
    console.log(this.state.temp)

    console.log(this.props.cartItems2.cartItems.totalSumPrice)
    console.log(this.props.cartItems2.cartItems.cartProductArray.length)
    if (
      this.props.cartItems2.cartItems.totalSumPrice !== this.state.total &&
      this.props.cartItems2.cartItems.cartProductArray.length !== 0 &&
      !this.state.temp &&
      !this.state.couponTemp
    ) {
      this.state.activityIndicatorTemp = true
    }
    return this.state.activityIndicatorTemp ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
              <NavigationEvents
          onDidFocus={() => {
            this.setState({updateTemp: false}, () => {
              this.updateCart()
            })
          }}
        />
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : this.props.cartItems2.cartItems.cartProductArray.length === 0 ? (
      <View style={styles.container}>
        <Icon name={'md-cart'} style={{color: 'gray', fontSize: 80}} />
        <View>
          <Text style={styles.welcome}>
            {this.props.cartItems2.Config.languageJson['Your cart is empty']}
          </Text>
          <Text style={styles.textStyle}>
            {this.props.cartItems2.Config.languageJson['Continue Shopping']}
          </Text>
          <TouchableOpacity
            style={{paddingTop: 5, width: 90, alignSelf: 'center'}}
            onPress={() =>
              this.props.navigation.navigate('NewestScreen', {
                id: undefined,
                // eslint-disable-next-line no-undef
                name: undefined,
                sortOrder: 'Newest',
              })
            }>
            <View
              style={{
                borderColor: themeStyle.otherBtnsColor,
                alignItems: 'center',
                height: 33,
                width: 90,
                backgroundColor: themeStyle.otherBtnsColor,
                justifyContent: 'center',
                elevation: 0.3,
                marginTop: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 16,
                }}>
                {this.props.cartItems2.Config.languageJson.Explore}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) : this.state.products.length === 0 ? (
      <View style={{flex: 1, justifyContent: 'center'}}>
            <NavigationEvents
          onDidFocus={() => {
            this.setState({updateTemp: false}, () => {
              this.updateCart()
            })
          }}
        />
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <View style={{flex: 1}}>
        <ModalWrapper
          style={{width: 280, height: 240, paddingLeft: 24, paddingRight: 24}}
          visible={this.state.wrapperAlert}>
          <Text>{this.state.alertText} </Text>
          <TouchableOpacity
            style={{paddingTop: 5}}
            onPress={() => this.setState({wrapperAlert: false})}>
            <View
              style={{
                alignItems: 'flex-start',
                padding: 10,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                paddingLeft: 12,
                paddingBottom: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: themeStyle.mediumSize,
                  color: 'black',
                }}>
                {this.props.cartItems2.Config.languageJson.Close}
              </Text>
            </View>
          </TouchableOpacity>
        </ModalWrapper>

        <ModalWrapper
          style={{width: 290, height: 310, paddingLeft: 24, paddingRight: 24}}
          visible={this.state.wrapperCondition}>
          <Text
            style={{
              fontSize: themeStyle.largeSize,
              padding: 5,
              fontWeight: '600',
              color: '#000',
            }}>
            Demo Coupons{' '}
          </Text>
          <View>
            <View
              style={{
                paddingLeft: 1,
                flexDirection: 'column',
                paddingRight: 2,
              }}>
              {this.wraperTouchButton(
                'Product Fixed (fp). A fixed total discount for selected products only',
                'fp',
              )}
              {this.wraperTouchButton(
                'Cart Fixed (fc). A fixed total discount for the entire cart',
                'fc',
              )}
              {this.wraperTouchButton(
                'Product Percentage (percentage). A percentage discount for selected products only',
                'percentage',
              )}
            </View>
          </View>
          <TouchableOpacity
            style={{paddingTop: 5}}
            onPress={() => this.setState({wrapperCondition: false})}>
            <View
              style={{
                alignItems: 'flex-start',
                margin: 20,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                paddingLeft: 12,
                marginLeft: 10,
                paddingBottom: 5,
                marginBottom: 0,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: themeStyle.mediumSize,
                  color: 'black',
                  fontWeight: '600',
                }}>
                {this.props.cartItems2.Config.languageJson.Close}
              </Text>
            </View>
          </TouchableOpacity>
        </ModalWrapper>

        <NavigationEvents
          onDidFocus={() => {
            this.setState({updateTemp: false}, () => {
              this.updateCart()
            })
          }}
        />
        <Spinner
          visible={this.state.SpinnerTemp}
          textStyle={{
            color: themeStyle.loadingIndicatorColor,
            backgroundColor: themeStyle.loadingIndicatorColor,
          }}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.products}
          contentContainerStyle={{marginBottom: 40}}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          // eslint-disable-next-line no-return-assign
          renderItem={item => (
            <View>
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: {width: 1, height: 1},
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  flex: 1,
                  margin: 10,
                  marginTop: 5,
                  marginBottom: 2,
                  elevation: 5,
                }}>
                <View
                  style={{
                    padding: 3,
                    color: '#000',
                    paddingLeft: 6,
                  }}>
                  <Text
                    style={{textAlign: 'left', fontSize: themeStyle.smallSize}}>
                    {item.item.name}
                  </Text>
                </View>

                <View
                  style={{
                    height: 1,
                    backgroundColor: '#d9d9d9',
                  }}
                />

                <View
                  style={{
                    padding: 4,
                    flexDirection: 'row',
                  }}>
                  <ImageLoad
                    key={item.item.id}
                    style={{height: 100, width: 100}}
                    loadingStyle={{
                      size: 'large',
                      color: themeStyle.loadingIndicatorColor,
                    }}
                    placeholder={false}
                    ActivityIndicator={true}
                    placeholderStyle={{width: 0, height: 0}}
                    source={{
                      uri: item.item.image,
                    }}
                  />
                  <View
                    style={{
                      padding: 3,
                      paddingLeft: 8,
                      flexDirection: 'column',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 3,
                        paddingLeft: 8,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: themeStyle.mediumSize,
                          fontWeight: 'normal',
                          color: '#000',
                        }}>
                        {this.props.cartItems2.Config.languageJson.Price} :
                        {'        '}
                      </Text>
                      <HTML
                        html={item.item.price_html}
                        baseFontStyle={{
                          fontSize: themeStyle.mediumSize,
                          color: '#000',
                        }}
                      />
                    </View>

                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 3,
                        paddingLeft: 8,
                        flexDirection: 'row',
                        flex: 1,
                        paddingTop: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: themeStyle.mediumSize,
                          fontWeight: 'normal',
                          color: '#000',
                          paddingTop: 1,
                        }}>
                        {this.props.cartItems2.Config.languageJson.Quantity} :{' '}
                      </Text>
                      <Counter
                        width={24}
                        height={1}
                        minimumValue={1}
                        innerRef={stepper => {
                          this.state.stepperArray[item.index] = stepper
                        }}
                        initialValue={item.item.quantity}
                        // eslint-disable-next-line no-unused-expressions

                        onIncrement={() => {
                          this.qunatityPlus(item.item)
                        }}
                        onDecrement={() => {
                          this.qunatityMinus(item.item)
                        }}
                      />
                    </View>

                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 3,
                        paddingLeft: 8,
                        flexDirection: 'row',
                        flex: 1,
                        paddingTop: 0,
                      }}>
                      <Text
                        style={{
                          fontSize: themeStyle.mediumSize + 1,
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        {this.props.cartItems2.Config.languageJson['Sub Total']}{' '}
                        :{' '}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                          flex: 1,
                        }}>
                        <HTML
                          html={SyncStorage.get('currency')}
                          baseFontStyle={{
                            fontSize: themeStyle.mediumSize + 1,
                            color: '#000',
                            // fontWeight: 'bold'
                          }}
                        />
                        <Text
                          style={{
                            fontSize: themeStyle.mediumSize + 1,
                            color: '#000',
                            // fontWeight: 'bold'
                          }}>
                          {`${item.item.subTotal.toFixed(
                            SyncStorage.get('decimals'),
                          )}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#d9d9d9',
                  }}
                />

                <View
                  style={{
                    padding: 3,
                    paddingLeft: 8,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flex: 1,
                    alignItems: 'flex-start',
                    paddingTop: 5,
                  }}>
                  <Button
                    onPress={() =>
                      this.props.navigation.push('ProductDetails', {
                        objectArray: this.props.cartItems2.cartItems
                          .cartProductArray[item.index].product,
                        updateCart: () =>
                          this.setState({activityIndicatorTemp: true}, () => {
                            console.log('render')
                            this.updateCart()
                          }),
                      })
                    }
                    title={
                      ' ' + this.props.cartItems2.Config.languageJson.View + ' '
                    }
                    color={themeStyle.otherBtnsColor}
                  />
                  <View
                    style={{
                      marginLeft: 18,
                      marginTop: Platform.OS === 'ios' ? 2 : 0,
                    }}>
                    <TouchableOpacity
                      style={{
                        opacity: !this.state.addToCartButtonValue ? null : 0.6,
                      }}
                      onPress={() => {
                        this.removeCart(item.item.cart_id)
                        for (
                          let i = 0;
                          i <
                          this.props.cartItems2.cartItems.cartProductArray
                            .length;
                          i++
                        ) {
                          this.state.stepperArray[i].setValue(
                            this.props.cartItems2.cartItems.cartProductArray[i]
                              .quantity,
                          )
                        }
                      }}>
                      <View
                        style={{
                          borderColor: '#fff',
                          alignItems: 'center',
                          height: 36,
                          justifyContent: 'center',
                          backgroundColor: 'transparent',
                        }}>
                        <Text
                          style={{
                            color: themeStyle.outOfStockBtnColor,
                            fontSize: themeStyle.mediumSize + 1,
                            fontWeight: '500',
                          }}>
                          {this.props.cartItems2.Config.languageJson.REMOVE}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View>
              {/* ///////////////////////////////////////// SHow Coupon List */}
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.cartItems2.cartItems.couponArray}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                // eslint-disable-next-line no-return-assign
                renderItem={item => (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      justifyContent: 'space-between',
                      shadowOffset: {width: 1, height: 1},
                      shadowColor: 'black',
                      shadowOpacity: 0.5,
                      flex: 1,
                      margin: 10,
                      marginTop: 5,
                      marginBottom: 2,
                      elevation: 5,
                    }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 15,
                        flexDirection: 'row',
                        paddingBottom: 0,
                        paddingTop: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: themeStyle.mediumSize,
                          color: 'black',
                        }}>
                        {
                          this.props.cartItems2.Config.languageJson[
                            'Coupon Code'
                          ]
                        }
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: themeStyle.mediumSize,
                          color: 'black',
                        }}>
                        {item.item.code}
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 15,
                        flexDirection: 'row',
                        paddingBottom: 0,
                        paddingTop: 12,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: themeStyle.mediumSize,
                          color: 'black',
                        }}>
                        {
                          this.props.cartItems2.Config.languageJson[
                            'Coupon Amount'
                          ]
                        }
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <HTML
                          html={SyncStorage.get('currency')}
                          baseFontStyle={{fontSize: 15, color: '#000'}}
                        />
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: themeStyle.mediumSize,
                            color: 'black',
                          }}>
                          {item.item.amount}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 15,
                        paddingTop: 12,
                        flexDirection: 'row',
                        // flex: 1,
                        paddingBottom: 0,
                      }}>
                      <Text
                        style={{
                          fontSize: themeStyle.mediumSize,
                          color: 'black',
                        }}>
                        {item.item.discount_type === 'fixed_product'
                          ? this.props.cartItems2.Config.languageJson[
                              'A fixed total discount for selected products only'
                            ]
                          : null}
                        {item.item.discount_type === 'fixed_cart'
                          ? this.props.cartItems2.Config.languageJson[
                              'A fixed total discount for the entire cart'
                            ]
                          : null}
                        {item.item.discount_type === 'percent_product'
                          ? this.props.cartItems2.Config.languageJson[
                              'A percentage discount for selected products only'
                            ]
                          : null}
                        {item.item.discount_type === 'percent'
                          ? this.props.cartItems2.Config.languageJson[
                              'A percentage discount for the entire cart'
                            ]
                          : null
                        //
                        //
                        //
                        }
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 12,
                        paddingTop: 8,
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        style={{
                          paddingTop: 8,
                          height: 36,
                          width: 80,
                          paddingLeft: 5,
                        }}
                        onPress={() => this.deleteCoupon(item.item.code)}>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            backgroundColor: themeStyle.removeBtnColor,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: themeStyle.mediumSize + 1,
                              color: 'white',
                              fontWeight: '500',
                            }}>
                            {this.props.cartItems2.Config.languageJson.Remove}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
              {/* ///////////////////////////////////////////////////////////////// */}

              <View
                style={{
                  height: 110,
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: {width: 1, height: 1},
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  elevation: 5,
                  flex: 1,
                  margin: 10,
                  marginTop: 5,
                  marginBottom: 5,
                }}>
                <TouchableOpacity
                  style={{paddingTop: 5}}
                  onPress={() => this.setState({wrapperCondition: true})}>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      padding: 10,
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      paddingLeft: 12,
                      paddingBottom: 5,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: themeStyle.mediumSize - 2,
                        color: themeStyle.otherBtnsColor,
                        textDecorationLine: 'underline',
                        fontWeight: 'bold',
                      }}>
                      {
                        this.props.cartItems2.Config.languageJson[
                          'LIST OF COUPON CODES'
                        ]
                      }
                    </Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    justifyContent: 'space-between',
                    padding: 12,
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <TextInput
                    style={{
                      height: 35,
                      borderColor: '#c1c1c1',
                      borderWidth: 1,
                      padding: 4,
                      flex: 2,
                      textAlign: I18nManager.isRTL ? 'right' : 'left',
                      paddingLeft: 6,
                      paddingRight: 6,
                    }}
                    selectionColor='#51688F'
                    placeholder={this.props.cartItems2.Config.languageJson['Coupon Code']}
                    onChangeText={couponText =>
                      this.setState({couponText, errorMessage: ''})
                    }
                    value={this.state.couponText}
                  />

                  <TouchableOpacity
                    disabled={!this.state.couponText}
                    style={{
                      paddingTop: 0,
                      height: 35,
                      width: 60,
                      paddingLeft: 5,
                    }}
                    onPress={() => this.getCoupon(this.state.couponText)}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        opacity: this.state.couponText ? null : 0.4,
                        backgroundColor: themeStyle.otherBtnsColor,
                        justifyContent: 'center',
                        borderRadius: 10 / 2,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: themeStyle.mediumSize,
                          color: 'white',
                          fontWeight: '500',
                        }}>
                        {this.props.cartItems2.Config.languageJson.Apply}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* ///////////////////////////////////////////////////////////////// */}
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  shadowOffset: {width: 1, height: 1},
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  flex: 1,
                  margin: 10,
                  marginTop: 2,
                  elevation: 4,
                  marginBottom: 13,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    padding: 15,
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <Text
                    style={{color: '#707070', fontSize: themeStyle.mediumSize}}>
                    {this.props.cartItems2.Config.languageJson.SubTotal}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <HTML
                      html={SyncStorage.get('currency')}
                      baseFontStyle={{
                        fontSize: themeStyle.mediumSize,
                        color: '#707070',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: themeStyle.mediumSize,
                        fontWeight: '400',
                        color: '#707070',
                      }}>
                      {this.state.subtotal.toFixed(SyncStorage.get('decimals'))}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    padding: 15,
                    paddingTop: 1,
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <Text
                    style={{color: '#707070', fontSize: themeStyle.mediumSize}}>
                    {this.props.cartItems2.Config.languageJson.Discount}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <HTML
                      html={SyncStorage.get('currency')}
                      baseFontStyle={{
                        fontSize: themeStyle.mediumSize,
                        color: '#707070',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: themeStyle.mediumSize,
                        fontWeight: '400',
                        color: '#707070',
                      }}>
                      {`-${(this.state.subtotal - this.state.total).toFixed(
                        SyncStorage.get('decimals'),
                      )}`}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    padding: 15,
                    paddingTop: 1,

                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <Text
                    style={{color: '#707070', fontSize: themeStyle.mediumSize}}>
                    {this.props.cartItems2.Config.languageJson.Total}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <HTML
                      html={SyncStorage.get('currency')}
                      baseFontStyle={{
                        fontSize: themeStyle.mediumSize,
                        color: '#707070',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: themeStyle.mediumSize,
                        fontWeight: '400',
                        color: '#707070',
                      }}>
                      {this.state.total.toFixed(SyncStorage.get('decimals'))}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          }
        />
        <TouchableOpacity onPress={() => this.proceedToCheckOut()}>
          <View
            style={{
              borderColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: themeStyle.otherBtnsColor,
              elevation: 2,
              width: WIDTH,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: themeStyle.mediumSize,
                padding: 10,
              }}>
              {this.props.cartItems2.Config.languageJson.Proceed}
            </Text>
          </View>
        </TouchableOpacity>
        <Toast
          ref='toast'
          style={{backgroundColor: '#c1c1c1'}}
          position='bottom'
          positionValue={200}
          fadeOutDuration={7000}
          textStyle={{color: 'black', fontSize: 15}}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  cartItems2: state,
})

const mapDispatchToProps = dispatch => ({
  removeItemToCart: (productObject, productQuantity) =>
    dispatch({
      type: 'REMOVE_TO_CARTS_QUANTITY',
      product: productObject,
      cartProductQuantity: productQuantity,
      variation: null,
      metaData: null,
    }),
  addItemToCart: (productObject, productQuantity) => {
    dispatch({
      type: 'ADD_TO_CARTS_QUANTITY',
      product: productObject,
      cartProductQuantity: productQuantity,
      variation: null,
      metaData: null,
    })
  },
  removeCardFromCart: productObject =>
    dispatch({
      type: 'REMOVE_CARD_FROM_CART',
      product: productObject,
      variation: null,
      metaData: null,
    }),
  setIndicator: temp => {
    dispatch({
      type: 'SET_INDICATOR',
      value: temp,
      OnScreen: true,
    })
  },
  setIndicator2: temp => {
    dispatch({
      type: 'SET_INDICATOR',
      value: temp,
      OnScreen: false,
    })
  },
  cartTotalItems: () => {
    dispatch({
      type: 'CART_TOTAL_ITEMS',
    })
  },
  productTotal: () => {
    dispatch({
      type: 'PRODUCT_TOTAL',
    })
  },
  spliceItem: temp => {
    dispatch({
      type: 'SPLICE',
      index: temp,
    })
  },
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Cart))
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.backgroundColor,
    fontSize: 25,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textStyle: {
    fontSize: 15,
    textAlign: 'center',
    margin: 2,
    color: 'gray',
  },
})

/// ///////////////////////////////////
