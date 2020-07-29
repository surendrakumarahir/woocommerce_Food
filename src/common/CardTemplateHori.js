/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/sort-comp */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/newline-after-import */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable import/imports-first */
/* eslint-disable max-len */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  I18nManager
} from 'react-native';
import ImageLoad from './RnImagePlaceH';
import theme from './Theme.style';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Text, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import HTML from 'react-native-render-html';
WIDTH = Dimensions.get('window').width;
class CardTemplate extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: false,
      page: 11,
      refreshing: false,
      temp1: 0
    };
    global.SampleVar = false;
  }

  checkProductNew = props => {
    const pDate = new Date(props.objectArray.date_created);
    const date =
      pDate.getTime() +
      this.props.cartItems2.Config.newProductDuration * 86400000;
    const todayDate = new Date().getTime();
    if (date > todayDate) {
      return true;
    }
    return false;
  }

  SingleComponent = (props, widthBtn, t, s) => (
    <View style={{ marginTop: 6 }}>
      {t.newMethod3(props, t) === 1 ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: WIDTH,
            backgroundColor: '#fff',
            shadowOffset: { width: 1, height: 1 },
            shadowColor: 'black',
            shadowOpacity: 0.2,
            elevation: 2,
            padding: 5
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              width: WIDTH,
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              zIndex: 6,
              position: 'absolute'
            }}
          >
            <Icon
              style={{
                color: 'green'
              }}
              name='checkmark-circle'
              size={40}
              onPress={() =>
                props.navigation.push('ProductDetails', {
                  objectArray: props.objectArray //
                })
              }
            />
          </View>
          <TouchableOpacity
            style={{ flex: 1, opacity: 0.1 }}
            onPress={() =>
              props.navigation.push('ProductDetails', {
                objectArray: props.objectArray //
              })
            }
          >
            <ImageLoad
              placeholder={false}
              ActivityIndicator={true}
              key={props.objectArray.id}
              style={{ height: 106, width: 105, backgroundColor: 'rgb(236, 236, 236)', }}
              loadingStyle={{
                size: 'large',
                color: theme.loadingIndicatorColor
              }}
               placeholderStyle={{width: 0, height: 0}}
              source={{ uri: props.objectArray.images[0].src }}
            >
              {this.checkProductNew(props) ? (
                <Text
                  style={{
                    zIndex: 6,
                    textAlign: 'center',

                    fontSize: theme.smallSize + 1,
                    paddingLeft: 2,
                    paddingRight: 2,

                    backgroundColor: theme.newBackgroundColor,
                    color: theme.newTextColor,
                    position: 'absolute'
                  }}
                >
                  {this.props.cartItems2.Config.languageJson.New}
                </Text>
              ) : null}
            </ImageLoad>
          </TouchableOpacity>

          <View
            style={{
              flex: 2,
              justifyContent: 'space-between',
              padding: 8,
              paddingLeft: 1,
              paddingBottom: 0
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                opacity: 0.1
              }}
            >
               <Text style={{ fontSize: theme.largeSize, fontWeight: '400', width: props.objectArray.on_sale || props.objectArray.featured ? WIDTH * 0.48 : WIDTH }} numberOfLines={1}>
                {props.objectArray.name}
              </Text>
              <View
                style={{
                  alignContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                {props.objectArray.on_sale ? (
                  <Text
                    style={{
                      fontSize: theme.smallSize + 1,
                      backgroundColor: theme.otherBtnsColor,
                      color: theme.saleTextColor,
                      margin: 1,
                      padding: 2,
                      zIndex: 3,
                      position: 'absolute'
                    }}
                  >
                    {this.props.cartItems2.Config.languageJson.SALE}
                  </Text>
                ) : null}
                {props.objectArray.featured ? (
                  <Text
                    style={{
                      fontSize: theme.smallSize + 1,
                      backgroundColor: theme.otherBtnsColor,
                      color: theme.featuredTextColor,
                      margin: 1,
                      padding: 2,
                      zIndex: 3,
                      position: 'absolute',
                      marginTop: props.objectArray.on_sale ? 25 : 0
                    }}
                  >
                    {this.props.cartItems2.Config.languageJson.Featured}
                  </Text>
                ) : null}
              </View>
            </View>

            <View
              style={{
                alignSelf: I18nManager.allowRTL ? 'flex-start' : 'flex-end',
                marginTop: 8,
                opacity: 0.1
              }}
            >
              <HTML
                html={s}
                baseFontStyle={{
                  fontSize: theme.mediumSize,
                  fontWeight: '400',
                  color: theme.priceColor
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 0,
                paddingTop: 18,
                paddingBottom: 0,
                margin: 0,
                opacity: 0.1
              }}
            >
              {props.removeButton ? (
                <TouchableOpacity
                  disabled
                  onPress={() => t.removeWishlist(props, t)}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      height: 28,
                      width: widthBtn,
                      backgroundColor: theme.removeBtnColor,
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      style={{
                        color: theme.removeBtnTextColor,
                        fontSize: theme.mediumSize
                      }}
                    >
                      {this.props.cartItems2.Config.languageJson.Remove}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : this.props.cartItems2.Config.cartButton ? (
                <View
                  style={{
                    width: widthBtn,
                    backgroundColor: '#fff',
                    paddingTop: 5
                  }}
                >
                  {this.props.cartItems2.cartItems.recentViewedProducts &&
                  props.recent ? (
                    <TouchableOpacity
                        disabled
                        onPress={() => t.removeRecent(props, t)}
                    >
                        <View
                        style={{
                            alignItems: 'center',
                            height: 28,
                            width: widthBtn,
                            backgroundColor: theme.removeBtnColor,
                            justifyContent: 'center'
                          }}
                        >
                        <Text
                            style={{
                              color: theme.removeBtnTextColor,
                              fontSize: theme.mediumSize
                            }}
                        >
                            {this.props.cartItems2.Config.languageJson.Remove}
                          </Text>
                      </View>
                      </TouchableOpacity>
                    ) : props.objectArray.in_stock === false ? (
                      <TouchableOpacity disabled>
                        <View
                          style={{
                            alignItems: 'center',
                            height: 28,
                            width: widthBtn,
                            backgroundColor: theme.outOfStockBtnColor,
                            justifyContent: 'center'
                          }}
                        >
                          <Text
                            style={{
                              color: theme.outOfStockBtnTextColor,
                              fontSize: theme.mediumSize
                            }}
                          >
                            {
                              this.props.cartItems2.Config.languageJson[
                                'Out of Stock'
                              ]
                            }
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : props.objectArray.type === 'simple' ? (
                      <TouchableOpacity
                        disabled
                        onPress={() => t.newMethod6(props, t)}
                      >
                        <View
                          style={{
                            alignItems: 'center',
                            height: 28,
                            width: widthBtn,
                            backgroundColor: theme.addToCartBtnColor,
                            justifyContent: 'center'
                          }}
                        >
                          <Text
                            style={{
                              color: theme.addToCartBtnTextColor,
                              fontSize: theme.mediumSize
                            }}
                          >
                            {
                              this.props.cartItems2.Config.languageJson[
                                'Add to Cart'
                              ]
                            }
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : props.objectArray.type === 'external' ||
                    props.objectArray.type === 'grouped' ||
                    props.objectArray.type === 'variable' ? (
                        <TouchableOpacity
                        disabled
                        onPress={() =>
                            props.navigation.push('ProductDetails', {
                              objectArray: props.objectArray //
                            })
                          }
                        >
                        <View
                            style={{
                              alignItems: 'center',
                              height: 28,
                              width: widthBtn,
                              backgroundColor: theme.detailsBtnColor,
                              justifyContent: 'center'
                            }}
                        >
                            <Text
                            style={{
                                color: theme.detailsBtnTextColor,
                                fontSize: theme.mediumSize
                              }}
                            >
                            {this.props.cartItems2.Config.languageJson.DETAILS}
                          </Text>
                          </View>
                      </TouchableOpacity>
                      ) : null}
                </View>
              ) : null}

              {t.checkWishList(props, t) === 1 ? (
                props.removeButton ? (
                  <Icon
                    disabled
                    style={styles.iconStyle2}
                    active
                    name='heart'
                    onPress={() => t.removeWishlist(props, t)}
                  />
                ) : (
                  <Icon
                    style={styles.iconStyle2}
                    active
                    disabled
                    name='heart'
                    onPress={() => t.removeWishlist(props, t)}
                  />
                )
              ) : (
                <Icon
                  disabled
                  style={styles.iconStyle}
                  active
                  name='heart'
                  onPress={() => t.addWishlist(props, t)}
                />
              )}
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: WIDTH,
            backgroundColor: '#fff',
            shadowOffset: { width: 1, height: 1 },
            shadowColor: 'black',
            shadowOpacity: 0.2,
            elevation: 2,
            padding: 5
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
              props.navigation.push('ProductDetails', {
                objectArray: props.objectArray //
              })
            }
          >
            <ImageLoad
              placeholder={false}
              ActivityIndicator={true}
              key={props.objectArray.id}
              style={{ height: 106, width: 105, backgroundColor: 'rgb(236, 236, 236)', }}
              loadingStyle={{
                size: 'large',
                color: theme.loadingIndicatorColor
              }}
               placeholderStyle={{width: 0, height: 0}}
              source={{ uri: props.objectArray.images[0].src }}
            >
              {this.checkProductNew(props) ? (
                <Text
                  style={{
                    zIndex: 6,
                    textAlign: 'center',

                    fontSize: theme.smallSize + 1,
                    paddingLeft: 2,
                    paddingRight: 2,

                    backgroundColor: theme.newBackgroundColor,
                    color: theme.newTextColor,
                    position: 'absolute'
                  }}
                >
                  {this.props.cartItems2.Config.languageJson.New}
                </Text>
              ) : null}
            </ImageLoad>
          </TouchableOpacity>

          <View
            style={{
              flex: 2,
              justifyContent: 'space-between',
              padding: 8,
              paddingLeft: 1,
              paddingBottom: 0
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text style={{ fontSize: theme.largeSize, fontWeight: '400', width: props.objectArray.on_sale || props.objectArray.featured ? WIDTH * 0.48 : WIDTH }} numberOfLines={1}>
                {props.objectArray.name}
              </Text>
              <View
                style={{
                  alignContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                {props.objectArray.on_sale ? (
                  <Text
                    style={{
                      fontSize: theme.smallSize + 1,
                      backgroundColor: theme.otherBtnsColor,
                      color: theme.saleTextColor,
                      margin: 1,
                      padding: 2,
                      zIndex: 3,
                      position: 'absolute'
                    }}
                  >
                    {this.props.cartItems2.Config.languageJson.SALE}
                  </Text>
                ) : null}
                {props.objectArray.featured ? (
                  <Text
                    style={{
                      fontSize: theme.smallSize + 1,
                      backgroundColor: theme.otherBtnsColor,
                      color: theme.featuredTextColor,
                      margin: 1,
                      padding: 2,
                      zIndex: 3,
                      position: 'absolute',
                      marginTop: props.objectArray.on_sale ? 25 : 0
                    }}
                  >
                    {this.props.cartItems2.Config.languageJson.Featured}
                  </Text>
                ) : null}
              </View>
            </View>

            <View
              style={{
                alignSelf: I18nManager.allowRTL ? 'flex-start' : 'flex-end',
                marginTop: 8
              }}
            >
              <HTML
                html={s}
                baseFontStyle={{
                  fontSize: theme.mediumSize,
                  fontWeight: '400',
                  color: theme.priceColor
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 0,
                paddingTop: 18,
                paddingBottom: 0,
                margin: 0
              }}
            >
              {props.removeButton ? (
                <TouchableOpacity onPress={() => t.removeWishlist(props, t)}>
                  <View
                    style={{
                      alignItems: 'center',
                      height: 28,
                      width: widthBtn,
                      backgroundColor: theme.removeBtnColor,
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      style={{
                        color: theme.removeBtnTextColor,
                        fontSize: theme.mediumSize
                      }}
                    >
                      {this.props.cartItems2.Config.languageJson.Remove}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : this.props.cartItems2.Config.cartButton ? (
                <View
                  style={{
                    width: widthBtn,
                    backgroundColor: '#fff',
                    paddingTop: 5
                  }}
                >
                  {this.props.cartItems2.cartItems.recentViewedProducts &&
                  props.recent ? (
                    <TouchableOpacity onPress={() => t.removeRecent(props, t)}>
                        <View
                        style={{
                            alignItems: 'center',
                            height: 28,
                            width: widthBtn,
                            backgroundColor: theme.removeBtnColor,
                            justifyContent: 'center'
                          }}
                        >
                        <Text
                            style={{
                              color: theme.removeBtnTextColor,
                              fontSize: theme.mediumSize
                            }}
                        >
                            {this.props.cartItems2.Config.languageJson.Remove}
                          </Text>
                      </View>
                      </TouchableOpacity>
                    ) : props.objectArray.in_stock === false ? (
                      <TouchableOpacity>
                        <View
                          style={{
                            alignItems: 'center',
                            height: 28,
                            width: widthBtn,
                            backgroundColor: theme.outOfStockBtnColor,
                            justifyContent: 'center'
                          }}
                        >
                          <Text
                            style={{
                              color: theme.outOfStockBtnTextColor,
                              fontSize: theme.mediumSize
                            }}
                          >
                            {
                              this.props.cartItems2.Config.languageJson[
                                'Out of Stock'
                              ]
                            }
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : props.objectArray.type === 'simple' ? (
                      <TouchableOpacity onPress={() => t.newMethod6(props, t)}>
                        <View
                          style={{
                            alignItems: 'center',
                            height: 28,
                            width: widthBtn,
                            backgroundColor: theme.addToCartBtnColor,
                            justifyContent: 'center'
                          }}
                        >
                          <Text
                            style={{
                              color: theme.addToCartBtnTextColor,
                              fontSize: theme.mediumSize
                            }}
                          >
                            {
                              this.props.cartItems2.Config.languageJson[
                                'Add to Cart'
                              ]
                            }
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : props.objectArray.type === 'external' ||
                    props.objectArray.type === 'grouped' ||
                    props.objectArray.type === 'variable' ? (
                        <TouchableOpacity
                        onPress={() =>
                            props.navigation.push('ProductDetails', {
                              objectArray: props.objectArray //
                            })
                          }
                        >
                        <View
                            style={{
                              alignItems: 'center',
                              height: 28,
                              width: widthBtn,
                              backgroundColor: theme.detailsBtnColor,
                              justifyContent: 'center'
                            }}
                        >
                            <Text
                            style={{
                                color: theme.detailsBtnTextColor,
                                fontSize: theme.mediumSize
                              }}
                            >
                            {this.props.cartItems2.Config.languageJson.DETAILS}
                          </Text>
                          </View>
                      </TouchableOpacity>
                      ) : null}
                </View>
              ) : null}

              {t.checkWishList(props, t) === 1 ? (
                props.removeButton ? (
                  <Icon
                    style={styles.iconStyle2}
                    active
                    name='heart'
                    onPress={() => t.removeWishlist(props, t)}
                  />
                ) : (
                  <Icon
                    style={styles.iconStyle2}
                    active
                    name='heart'
                    onPress={() => t.removeWishlist(props, t)}
                  />
                )
              ) : (
                <Icon
                  style={styles.iconStyle}
                  active
                  name='heart'
                  onPress={() => t.addWishlist(props, t)}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  )
  /// ///////////////////////////////////////////////////////////
  removeWishlist = (props, t) => {
    t.setState({ isLoading: true });
    setTimeout(() => {
      props.removeWishListProduct(props.objectArray);
      this.setState({ isLoading: false });
    }, Math.floor(100 / 360000));
  }
  /// ////////////////////////////////////////////////////////////
  addWishlist = (props, t) => {
    t.setState({ isLoading: true });
    setTimeout(() => {
      console.log('addwishlist Timer');
      props.addWishlistProduct(props.objectArray);
      this.setState({ isLoading: false });
    }, Math.floor(100 / 360000));
  }
  /// ///////////////////////////////////////////////////////////
  removeRecent = (props, t) => {
    t.setState({ isLoading: true });
    setTimeout(() => {
      props.removeRecentItems(props.objectArray);
      this.setState({ isLoading: false });
      console.log('removeRecentItems Timer');
      // t.setTimePassed2(props);
    }, Math.floor(100 / 360000));
  }
  /// //////////////////////////////////////////////////////////
  newMethod6 = (props, t) => {
    t.setState({ isLoading: true });
    setTimeout(() => {
      console.log('newmethod6 timers');
      t.setTimePassed(props);
    }, Math.floor(100 / 360000));
  }
  /// ////////////////////////////////////////////////////////////
  setTimePassed(props) {
    props.addItemToCart(props.objectArray, 1);
    this.setState({ isLoading: false });
  }
  /// //////////////////////////////////////////////////////////////
  newMethod3 = (props, t) => {
    let temp = 0;
    props.cartItems2.cartItems.cartProductArray.map(row => {
      if (row.product_id == props.objectArray.id) {
        temp = 1;
      }
    });
    if (temp === 1) {
      return 1;
    }
    temp = 0;
    return 0;
  }
  /// ////////////////////////////////////////////////////////////
  checkWishList = (props, t) => {
    let temp = 0;
    props.cartItems2.cartItems.wishListProducts.map(row => {
      if (row.id === props.objectArray.id) {
        temp = 1;
      }
    });
    if (temp === 1) {
      console.log(`whishlistCHeeckkkk${temp}`);
      return 1;
    }
    temp = 0;
    return 0;
  }
  /// /////////////////////////////////////////////////////////////
  // eslint-disable-next-line react/sort-comp
  componentWillUnmount() {
    console.log('componentWillUnmount recent temp');
    clearInterval(this.state.isLoading);
  }
  render() {
    let s = this.props.objectArray.price_html;
    s = s.replace(/<del>/, '<s>');
    s = s.replace(/<\/del>/, '</s>');
    return (
      <View>
        <Spinner
          visible={this.state.isLoading}
          textStyle={styles.spinnerTextStyle}
        />
        {this.props.rows === false  
          ? this.SingleComponent(this.props, 100, this, s)
          : this.SingleComponent(this.props, 100, this, s)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cartItems2: state
});

const mapDispatchToProps = dispatch => ({
  addItemToCart: (productObject, productQuantity) => {
    dispatch({
      type: 'ADD_TO_CARTS',
      product: productObject,
      cartProductQuantity: productQuantity,
      variation: null,
      metaData: null
    });
  },
  removeRecentItems: productArray =>
    dispatch({ type: 'REMOVE_RECENT', product: productArray }),
  addWishlistProduct: productArray =>
    dispatch({ type: 'ADD_WISHLIST_PRODUCTS', product: productArray }),
  removeWishListProduct: productArray =>
    dispatch({ type: 'REMOVE_WISHLIST_PRODUCTS', product: productArray })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(CardTemplate));

const styles = StyleSheet.create({
  iconStyle: {
    paddingLeft: 16,
    color: '#cccccc',
    marginTop: 3,
    marginBottom: 0,
    paddingBottom: 0
  },
  iconStyle2: {
    paddingLeft: 16,
    color: theme.wishHeartBtnColor,
    marginTop: 3,
    marginBottom: 0,
    paddingBottom: 0
  }
});
