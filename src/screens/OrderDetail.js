/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
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
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Text, Icon } from 'native-base'
import SyncStorage from 'sync-storage'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import WooComFetch from '../common/WooComFetch'
import themeStyle from '../common/Theme.style'
class orderScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      headerRight: null,
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      drawerLockMode: 'locked-closed',

      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
          backgroundColor: themeStyle.primary,
        },
        headerTitleStyle: {
          fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
        },
      headerForceInset: { top: 'never', vertical: 'never' },
    }
  }

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson['Order Detail']
    })
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
  //= ===========================================================================================
  // placing order

  singleRow(header, body) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          margin: 10,
          marginTop: 10,
          marginBottom: 5,
          elevation: 5,
          width: '95%'
        }}
      >
        <View
          style={{
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              justifyContent: 'space-between',
              padding: 10,
              fontWeight: 'bold',
              fontSize: themeStyle.largeSize,
              backgroundColor: '#d3d3d3',
              color: '#000'
            }}
          >
            {header}
          </Text>

          <Text
            style={{
              justifyContent: 'space-between',
              padding: 10,
              fontSize: themeStyle.mediumSize,
              color: '#000'
            }}
          >
            {body}
          </Text>
        </View>
        {/* ///////////////////////////////// */}
      </View>
    )
  }

  multipleRow(header, body) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          margin: 10,
          marginTop: 10,
          marginBottom: 5,
          elevation: 5,
          width: '95%'
        }}
      >
        <View
          style={{
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              justifyContent: 'space-between',
              padding: 10,
              fontWeight: 'bold',
              backgroundColor: '#d3d3d3',
              fontSize: themeStyle.largeSize,
              color: '#000'
            }}
          >
            {header}
          </Text>

          <FlatList
            data={body}
            listKey={(item, index) => `D${index.toString()}`}
            keyExtractor={(item, index) => ` 1${index.toString()}`}
            // eslint-disable-next-line no-return-assign
            renderItem={item => (
              <Text
                style={{
                  justifyContent: 'space-between',
                  padding: 10,
                  fontSize: themeStyle.mediumSize,
                  color: '#000'
                }}
              >
                {item.item.method_title}
              </Text>
            )}
          />
        </View>
        {/* ///////////////////////////////// */}
      </View>
    )
  }

  products(header, body) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          margin: 10,
          marginTop: 10,
          marginBottom: 5,
          elevation: 5,
          width: '95%'
        }}
      >
        <View
          style={{
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              justifyContent: 'space-between',
              padding: 10,
              fontWeight: 'bold',
              fontSize: themeStyle.largeSize,
              backgroundColor: '#d3d3d3',
              color: '#000'
            }}
          >
            {header}
          </Text>

          <FlatList
            data={body}
            listKey={(item, index) => `A${index.toString()}`}
            keyExtractor={(item, index) => `2 ${index.toString()}`}
            // eslint-disable-next-line no-return-assign
            renderItem={item => (
              <View>
                {this.singleRowDirection(
                  item.item.name,
                  item.item.categories_name
                )}
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#d9d9d9',
                    marginBottom: 12
                  }}
                />
                {this.singleRowDirection(
                  `${this.props.cartItems2.Config.languageJson.Price} :`,
                  this.addCurrecny(item.item.price)
                )}

                <FlatList
                  data={item.item.meta_data}
                  listKey={(item, index) => `TT${index.toString()}`}
                  keyExtractor={(item, index) => `3 ${index.toString()}`}
                  // eslint-disable-next-line no-return-assign
                  renderItem={item2 =>
                    this.singleRowDirection(
                      `${item2.item.key} :`,
                      item2.item.value
                    )
                  }
                />

                {this.singleRowDirection(
                  `${this.props.cartItems2.Config.languageJson.Quantity} :`,
                  item.item.quantity
                )}
                {this.singleRowDirection(
                  this.props.cartItems2.Config.languageJson.Total,
                  this.addCurrecny(item.item.total)
                )}
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#d9d9d9',
                    marginBottom: 12
                  }}
                />
              </View>
            )}
          />
        </View>
        {/* ///////////////////////////////// */}
      </View>
    )
  }

  singleRowDirection(text1, text2, t) {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          padding: 5,
          paddingLeft: 8,
          flexDirection: 'row',
          flex: 1
        }}
      >
        <Text
          style={{
            fontSize: themeStyle.mediumSize,
            fontWeight:
              text1 === 'Total' || text1 === 'مجموع' ? 'bold' : 'normal',
            color: '#000'
          }}
        >
          {text1}{' '}
        </Text>
        {/* //////// */}
        {t === 'T' ? (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{}}
              onPress={() => {
                Linking.canOpenURL(
                  this.props.cartItems2.Config.trackingUrl +
                    this.getTrackingId()
                )
                  .then(supported => {
                    if (!supported) {
                      console.log(
                        `Can't handle url: ${this.props.cartItems2.Config
                          .trackingUrl + this.getTrackingId()}`
                      )
                    } else {
                      return Linking.openURL(
                        this.props.cartItems2.Config.trackingUrl +
                          this.getTrackingId()
                      )
                    }
                  })
                  .catch(err => console.log('An error occurred', err))
              }}
              disabled={this.state.addToCartButtonValue}
            >
              <View
                style={{
                  borderColor: '#fff',
                  alignItems: 'center',
                  height: 38,

                  backgroundColor: '#557f5f',
                  flexDirection: 'row',
                  padding: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: themeStyle.mediumSize,
                    paddingTop: 1
                  }}
                >
                  Track
                </Text>
                <Icon
                  name={'locate'}
                  style={{
                    color: 'white',
                    fontSize: themeStyle.mediumSize,
                    paddingLeft: 5
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <Text
            style={{
              fontSize: themeStyle.mediumSize,
              fontWeight:
                text1 === 'Total' || text1 === 'مجموع' ? 'bold' : 'normal',
              color: '#000'
            }}
          >
            {text2}
          </Text>
        )}
      </View>
    )
  }

  addCurrecny = v2 =>
    `${this.props.navigation.state.params.data.currency} ${v2}`

  getTrackingId() {
    let id = ''
    for (const v of this.props.navigation.state.params.data.meta_data) {
      if (v.key == '_aftership_tracking_number') {
        id = v.value
      }
    }
    return id
  }

  priceDetailCard(header) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          margin: 10,
          marginTop: 10,
          marginBottom: 5,
          elevation: 5,
          width: '95%'
        }}
      >
        <View
          style={{
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              justifyContent: 'space-between',
              padding: 10,
              fontWeight: 'bold',
              backgroundColor: '#d3d3d3',
              color: '#000'
            }}
          >
            {header}
          </Text>

          {this.singleRowDirection(
            `${this.props.cartItems2.Config.languageJson.Shipping} ${
              this.props.cartItems2.Config.languageJson.Tax
            }`,
            this.addCurrecny(
              this.props.navigation.state.params.data.shipping_tax
            )
          )}

          {this.singleRowDirection(
            this.props.cartItems2.Config.languageJson.Shipping,
            this.addCurrecny(
              this.props.navigation.state.params.data.shipping_total
            )
          )}
          {this.singleRowDirection(
            this.props.cartItems2.Config.languageJson.Tax,
            this.addCurrecny(
              this.props.navigation.state.params.data.discount_total
            )
          )}
          {this.singleRowDirection(
            this.props.cartItems2.Config.languageJson.Total,
            this.addCurrecny(this.props.navigation.state.params.data.total)
          )}
        </View>
        {/* ///////////////////////////////// */}
      </View>
    )
  }
  cancelOrder = async () => {
    let orderCreateDate = new Date(
      this.props.navigation.state.params.data.date_created
    )
    let orderSeconds = orderCreateDate.getTime() / 1000
    let timeknow = new Date()
    let currentTime = timeknow.getTime() / 1000

    let timeToCancelOrder = this.props.cartItems2.Config.cancelOrderTime * 3600
    let timeDiff = currentTime - orderSeconds
    console.log(timeToCancelOrder - timeDiff)
    let result = timeToCancelOrder - timeDiff

    if (result < 0) this.refs.toast.show('Order Cancelation Time Expires!')
    else {
      let dat = {
        status: 'cancelled'
      }
      let data = await WooComFetch.updateShippingAddress(
        this.props.navigation.state.params.data.id,
        dat
      )
      this.refs.toast.show('Order Cancelled')
      console.log(data)
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Toast
          ref='toast'
          style={{ backgroundColor: '#c1c1c1' }}
          position='bottom'
          positionValue={200}
          fadeOutDuration={7000}
          textStyle={{ color: 'black', fontSize: themeStyle.mediumSize }}
        />
        <ScrollView style={styles.container}>
          {this.singleRow(
            this.props.cartItems2.Config.languageJson['Shipping Address'],
            `${this.props.navigation.state.params.data.shipping.address_1}, ${
              this.props.navigation.state.params.data.shipping.city
            }, ${this.props.navigation.state.params.data.shipping.state} ${
              this.props.navigation.state.params.data.shipping.postcode
            }, ${this.props.navigation.state.params.data.shipping.country}`
          )}

          {this.singleRow(
            this.props.cartItems2.Config.languageJson['Billing Address'],
            `${this.props.navigation.state.params.data.billing.address_1}, ${
              this.props.navigation.state.params.data.billing.city
            }, ${this.props.navigation.state.params.data.billing.state} ${
              this.props.navigation.state.params.data.billing.postcode
            }, ${this.props.navigation.state.params.data.billing.country}`
          )}

          {this.multipleRow(
            this.props.cartItems2.Config.languageJson['Shipping Method'],
            this.props.navigation.state.params.data.shipping_lines
          )}

          {this.singleRow(
            `${this.props.cartItems2.Config.languageJson.Shipping} ${
              this.props.cartItems2.Config.languageJson.Total
            }`,
            this.addCurrecny(
              this.props.navigation.state.params.data.shipping_total
            )
          )}

          {this.products(
            this.props.cartItems2.Config.languageJson.Products,
            this.props.navigation.state.params.data.line_items
          )}

          {this.priceDetailCard(
            this.props.cartItems2.Config.languageJson['Price Detail']
          )}

          {this.props.navigation.state.params.data.coupon_lines != 0 ? (
            <View
              style={{
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                margin: 10,
                marginTop: 10,
                marginBottom: 5,
                elevation: 5,
                width: '95%'
              }}
            >
              <View
                style={{
                  justifyContent: 'space-between'
                }}
              >
                <Text
                  style={{
                    justifyContent: 'space-between',
                    padding: 10,
                    fontSize: themeStyle.mediumSize,
                    backgroundColor: '#d3d3d3',
                    color: '#000'
                  }}
                >
                  {this.props.cartItems2.Config.languageJson['Coupons Applied']}
                </Text>
                {this.singleRowDirection(
                  this.props.cartItems2.Config.languageJson['Coupon Code'],
                  `${this.props.cartItems2.Config.languageJson.Coupon} ${
                    this.props.cartItems2.Config.languageJson.Price
                  }`
                )}
                <FlatList
                  data={this.props.navigation.state.params.data.coupon_lines}
                  // extraData={this.state}
                  listKey={(item, index) => `SS${index.toString()}`}
                  keyExtractor={(item, index) => `Q ${index.toString()}`}
                  // eslint-disable-next-line no-return-assign
                  renderItem={item2 => (
                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 8,
                        paddingLeft: 8,
                        flexDirection: 'row',
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          fontSize: themeStyle.mediumSize,
                          fontWeight: 'normal',
                          color: '#000',

                          width: 190
                        }}
                      >
                        {item2.item.code}
                      </Text>
                      {/* //////// */}
                      <Text
                        style={{
                          fontSize: themeStyle.mediumSize,
                          fontWeight: 'normal',
                          color: '#000'
                        }}
                      >
                        {this.addCurrecny(item2.item.discount)}
                      </Text>
                    </View>
                  )}
                />
              </View>
              {/* ///////////////////////////////// */}
            </View>
          ) : null}

          {this.props.navigation.state.params.data.customer_note != ''
            ? this.singleRow(
              this.props.cartItems2.Config.languageJson['Order Notes'],
              this.props.navigation.state.params.data.customer_note
            )
            : null}

          {this.getTrackingId() != '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                margin: 10,
                marginTop: 10,
                marginBottom: 5,
                elevation: 5,
                width: '95%'
              }}
            >
              <View
                style={{
                  justifyContent: 'space-between'
                }}
              >
                <Text
                  style={{
                    justifyContent: 'space-between',
                    padding: 10,
                    fontSize: themeStyle.largeSize,
                    backgroundColor: '#d3d3d3',
                    color: '#000'
                  }}
                >
                  {this.props.cartItems2.Config.languageJson['Track Order']}
                </Text>
                {this.singleRowDirection(this.getTrackingId(), '', 'T')}
              </View>
              {/* ///////////////////////////////// */}
            </View>
          ) : null}

          {this.singleRow(
            this.props.cartItems2.Config.languageJson['Payment Method'],

            this.props.navigation.state.params.data.payment_method_title
          )}
          {this.props.cartItems2.Config.orderCancelButton &&
          this.props.navigation.state.params.data.status != 'cancelled' &&
          this.props.navigation.state.params.data.status != 'completed' &&
          this.props.navigation.state.params.data.status != 'refunded' &&
          this.props.navigation.state.params.data.status != 'failed' &&
          this.props.navigation.state.params.data.status != 'processing' ? (
            <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.cancelOrder()
                }}
            >
                <View
                style={{
                    borderColor: '#fff',
                    alignItems: 'center',
                    height: 38,

                    backgroundColor: '#e02727',
                    flexDirection: 'row',
                    padding: 6,
                    width: '96%',
                    alignSelf: 'center',
                    margin: 7,
                    justifyContent: 'center'
                  }}
                >
                <Text
                    style={{
                      color: '#fff',
                      fontSize: themeStyle.mediumSize,
                      paddingTop: 1,
                      fontWeight: '500',
                    }}
                >
                    {this.props.cartItems2.Config.languageJson['Cancel Order']}
                  </Text>
              </View>
              </TouchableOpacity>
            ) : null}
        </ScrollView>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
