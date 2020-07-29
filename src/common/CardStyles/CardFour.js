/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import {View, TouchableOpacity, Text, Platform} from 'react-native'
import ImageLoad from '../RnImagePlaceH'
import HTML from 'react-native-render-html'
import {Icon} from 'native-base'
import theme from '../Theme.style'
import SyncStorage from 'sync-storage'
export default CardOne = ({props, widthPic, t, s, btnWidth}) => (
  <View
    style={{
      backgroundColor: 'white',
      width: widthPic,
      shadowOffset: {width: 1, height: 1},
      shadowColor: 'black',
      shadowOpacity: 0.3,
      elevation: 3,
      margin: 5,
      marginBottom: 5,
      borderTopLeftRadius: 15 / 2,
      borderTopRightRadius: 15 / 2,
    }}>
    {t.newMethod3(props, t) === 1 ? (
      <View
        style={{
          width: widthPic,
          zIndex: 2,
          position: 'absolute',
        }}>
        <Icon
          style={{
            paddingTop: widthPic * 0.5,
            color: 'green',
            fontSize: 30,
            alignSelf: 'center',
          }}
          name='checkmark-circle'
          size={40}
          onPress={() =>
            props.navigation.push('ProductDetails', {
              objectArray: props.objectArray, //
            })
          }
        />
      </View>
    ) : null}
    {t.newMethod3(props, t) === 1 ? (
      t.props.cartItems2.cartItems.recentViewedProducts && props.recent ? (
        <TouchableOpacity
          style={{
            width: btnWidth / 2,
            shadowOffset: {width: 1, height: 1},
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 3,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
          onPress={() => t.removeRecent(props, t)}>
          <View
            style={{
              alignItems: 'center',
              height: Platform.OS === 'android' ? 30 : 28,
              width: btnWidth / 2,
              justifyContent: 'center',
              backgroundColor: theme.removeBtnColor,
            }}>
            <Text
              style={{
                color: theme.removeBtnTextColor,
                 fontSize: theme.smallSize,
                fontWeight: '500',
              }}>
              {t.props.cartItems2.Config.languageJson.Remove}
            </Text>
          </View>
        </TouchableOpacity>
      ) : props.removeButton ? (
        <TouchableOpacity
          style={{
            width: btnWidth / 2,
            shadowOffset: {width: 1, height: 1},
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 3,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
          onPress={() => t.removeWishlist(props, t)}>
          <View
            style={{
              alignItems: 'center',
              height: Platform.OS === 'android' ? 30 : 28,
              width: btnWidth / 2,
              justifyContent: 'center',

              backgroundColor: theme.removeBtnColor,
            }}>
            <Text
              style={{
                color: theme.removeBtnTextColor,
                 fontSize: theme.smallSize,
                fontWeight: '500',
              }}>
              {t.props.cartItems2.Config.languageJson.Remove}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null
    ) : null}
    {/* /// ///////////////////////////////////////////////////// 2nd */}
    <View
      style={{
        backgroundColor: 'white',
        borderTopLeftRadius: 15 / 2,
        borderTopRightRadius: 15 / 2,
        opacity: t.newMethod3(props, t) === 1 ? 0.1 : 1,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 15 / 2,
          borderTopRightRadius: 15 / 2,
        }}>
        <TouchableOpacity
          style={{
            flex: 2,
            borderTopLeftRadius: 15 / 2,
            borderTopRightRadius: 15 / 2,
          }}
          onPress={() =>
            props.navigation.push('ProductDetails', {
              objectArray: props.objectArray, //
            })
          }>
          <ImageLoad
            placeholder={false}
            ActivityIndicator={true}
            key={props.objectArray.id}
            resizeMode={
              props.objectArray.images[0].src.includes('png')
                ? 'cover'
                : 'cover'
            }
            borderTopLeftRadius={15 / 2}
            borderTopRightRadius={15 / 2}
            style={{
              height: widthPic,
              width: widthPic,
              backgroundColor: 'rgb(236, 236, 236)',
              borderTopLeftRadius: 15 / 2,
              borderTopRightRadius: 15 / 2,
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{
              width: 0,
              height: 0,
              borderTopLeftRadius: 15 / 2,
              borderTopRightRadius: 15 / 2,
            }}
            source={{uri: props.objectArray.images[0].src}}></ImageLoad>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            paddingTop: 0,
            marginTop: 0,
            width: widthPic,
          }}>
          <Text
            style={{
              fontSize: theme.mediumSize,
              fontFamily: 'Roboto',
              textAlign: 'center',
              color: '#2D2D2D',
              margin: 0,
              padding: 5,
              paddingTop: Platform.OS === 'android' ? 3 : 4,
              paddingBottom: 3,
              marginBottom: 0,
              fontWeight: '400',
              width: widthPic,
            }}
            numberOfLines={1}>
            {props.objectArray.name}
          </Text>

          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 3,
              paddingTop: 2,
              width: widthPic,
            }}>
            <View
              style={{
                width: widthPic / 2,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: theme.mediumSize,
                  fontFamily: 'Roboto',
                  textAlign: 'center',
                  color: '#2D2D2D',
                  margin: 0,
                  padding: 5,
                  paddingRight: 0,
                  paddingLeft:0,
                  paddingTop: Platform.OS === 'android' ? 1 : 0,
                  marginTop: -1,
                  paddingBottom: 0,
                  marginBottom: 0,
                  fontWeight: '400',
                }}
                numberOfLines={1}>
                {props.objectArray.price}
              </Text>
              <HTML
                html={SyncStorage.get('currency')}
                baseFontStyle={{
                  fontSize: theme.mediumSize,
                  color: '#000',
                }}
              />
            </View>
            <View>
              {t.props.cartItems2.cartItems.recentViewedProducts &&
              props.recent ? null : props.objectArray.in_stock === false &&
                !props.removeButton ? (
                <TouchableOpacity
                  style={{
                    width: btnWidth / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    elevation: 3,
                  }}>
                  <View
                    style={{
                      padding: 5,
                      margin: 5,
                      width: btnWidth / 2,

                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: theme.outOfStockBtnColor,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: theme.outOfStockBtnTextColor,
                        fontSize: theme.smallSize,
                        fontWeight: '500',
                      }}>
                      {t.props.cartItems2.Config.languageJson['Out of Stock']}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : props.objectArray.type === 'simple' && !props.removeButton ? (
                <TouchableOpacity
                  style={{
                    width: btnWidth / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    elevation: 3,
                  }}
                  onPress={() => {
                    if (t.newMethod3(props, t) !== 1) {
                    }
                  }}
                  onPressOut={() => {
                    if (t.newMethod3(props, t) !== 1) {
                      t.newMethod6(props, t)
                    }
                  }}>
                  <View
                    style={{
                      padding: 5,
                      margin: 5,
                      width: btnWidth / 2,
                      backgroundColor: theme.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginTop: 0,
                      marginBottom: 0,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: theme.addToCartBtnTextColor,
                        fontSize: theme.smallSize,
                        fontWeight: '500',
                      }}>
                      {t.props.cartItems2.Config.languageJson['Add to Cart']}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (props.objectArray.type === 'external' ||
                  props.objectArray.type === 'grouped' ||
                  props.objectArray.type === 'variable') &&
                !props.removeButton ? (
                <TouchableOpacity
                  style={{
                    width: btnWidth / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    elevation: 3,
                  }}
                  onPress={() => {
                    if (t.newMethod3(props, t) !== 1) {
                    }
                  }}
                  onPressOut={() => {
                    if (t.newMethod3(props, t) !== 1) {
                      props.navigation.push('ProductDetails', {
                        objectArray: props.objectArray, //
                      })
                    }
                  }}>
                  <View
                    style={{
                      padding: 5,
                      margin: 5,
                      width: btnWidth / 2,
                      backgroundColor: theme.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginTop: 0,
                      marginBottom: 0,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: theme.detailsBtnTextColor,
                        fontSize: theme.smallSize,
                        fontWeight: '500',
                      }}>
                      {t.props.cartItems2.Config.languageJson.Details}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
              {t.props.cartItems2.cartItems.recentViewedProducts &&
              props.recent ? (
                <TouchableOpacity
                  style={{
                    width: btnWidth / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    elevation: 3,
                  }}
                  onPress={() => t.removeRecent(props, t)}>
                  <View
                    style={{
                      padding: 5,
                      margin: 5,
                      width: btnWidth / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: theme.removeBtnColor,
                    }}>
                    <Text
                      style={{
                        color: theme.removeBtnTextColor,
                         fontSize: theme.smallSize,
                        fontWeight: '500',
                      }}>
                      {t.props.cartItems2.Config.languageJson.Remove}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
              {props.removeButton ? (
                <TouchableOpacity
                  style={{
                    width: btnWidth / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    elevation: 3,
                  }}
                  onPress={() => t.removeWishlist(props, t)}>
                  <View
                    style={{
                      padding: 5,
                      margin: 5,
                      width: btnWidth / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: theme.removeBtnColor,
                    }}>
                    <Text
                      style={{
                        color: theme.removeBtnTextColor,
                         fontSize: theme.smallSize,
                        fontWeight: '500',
                      }}>
                      {t.props.cartItems2.Config.languageJson.Remove}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
)
