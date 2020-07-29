/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import {View, TouchableOpacity, Text, I18nManager, Platform, StyleSheet} from 'react-native'
import Stars from 'react-native-stars'
import ImageLoad from '../RnImagePlaceH'
import {Icon} from 'native-base'
import Ionicons from 'react-native-vector-icons/FontAwesome'
import HTML from 'react-native-render-html'
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
      marginBottom: 8,
    }}>
    {/* /// ///////////////////////////////////////////////////// 2nd */}
    <View
      style={{
        backgroundColor: 'white',
      }}>
      {t.newMethod3(props, t) === 1 ? (
        t.props.cartItems2.cartItems.recentViewedProducts && props.recent ? (
          <TouchableOpacity
            style={{
              width: btnWidth,
              shadowOffset: {width: 1, height: 1},
              shadowColor: 'black',
              shadowOpacity: 0.5,
              elevation: 3,
              position: 'absolute',
              bottom: 4,
              left: 5,
            }}
            onPress={() => t.removeRecent(props, t)}>
            <View
              style={{
                alignItems: 'center',
                height: Platform.OS === 'android' ? 30 : 28,
                width: btnWidth,
                justifyContent: 'center',
                backgroundColor: '#D81800',
              }}>
              <Text
                style={{
                  color: theme.removeBtnTextColor,
                  fontSize: theme.mediumSize + 1,
                  fontWeight: '500',
                }}>
                {t.props.cartItems2.Config.languageJson.Remove}
              </Text>
            </View>
          </TouchableOpacity>
        ) : props.removeButton ? (
          <TouchableOpacity
            style={{
              width: btnWidth,
              shadowOffset: {width: 1, height: 1},
              shadowColor: 'black',
              shadowOpacity: 0.5,
              elevation: 3,
              position: 'absolute',
              bottom: 4,
              left: 5,
            }}
            onPress={() => t.removeWishlist(props, t)}>
            <View
              style={{
                alignItems: 'center',
                height: Platform.OS === 'android' ? 30 : 28,
                width: btnWidth,
                justifyContent: 'center',

                backgroundColor: '#D81800',
              }}>
              <Text
                style={{
                  color: theme.removeBtnTextColor,
                  fontSize: theme.mediumSize + 1,
                  fontWeight: '500',
                }}>
                {t.props.cartItems2.Config.languageJson.Remove}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null
      ) : null}
      {t.newMethod3(props, t) === 1 ? (
        <View
          style={{
            width: widthPic,
            zIndex: 2,
            position: 'absolute',
          }}>
          <Icon
            style={{
              paddingTop: 90,
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
      <View
        style={{
          backgroundColor: 'white',
          opacity: t.newMethod3(props, t) === 1 ? 0.1 : 1,
        }}>
        <TouchableOpacity
          style={{flex: 2}}
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
            style={{
              height: widthPic,
              width: widthPic,
              backgroundColor: 'rgb(236, 236, 236)',
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{width: 0, height: 0}}
            source={{uri: props.objectArray.images[0].src}}>
    <View style={{right: 7, position: 'absolute', top: 7}}>
              {t.checkWishList(props, t) === 1 ? (
                props.removeButton ? (
                  <Icon
                    style={{
                      color: '#fff',
                      fontSize: 19,
                    }}
                    active
                    name='heart'
                    onPress={() => {
                      if (t.newMethod3(props, t) !== 1) {
                        t.removeWishlist(props, t)
                      }
                    }}
                  />
                ) : (
                  <Icon
                    style={{
                      color: '#fff',
                      fontSize: 19,
                    }}
                    active
                    name='heart'
                    onPress={() => {
                      if (t.newMethod3(props, t) !== 1) {
                        t.removeWishlist(props, t)
                      }
                    }}
                  />
                )
              ) : (
                <Ionicons
                  style={{
                    color: '#fff',
                    fontSize: 17,
                    marginTop: Platform.OS === 'ios' ? 3 : 2,
                    marginBottom: Platform.OS === 'ios' ? 2 : 2,
                  }}
                  active
                  name='heart-o'
                  onPress={() => {
                    if (t.newMethod3(props, t) !== 1) {
                      t.addWishlist(props, t)
                    }
                  }}
                />
              )}
            </View>
          </ImageLoad>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            padding: 1,
            margin: 1,
            marginBottom: 0,
            paddingBottom: 1,
            paddingTop: 0,
            marginTop: 0,
            width: widthPic,
          }}>
          <Text
            style={{
              fontSize: theme.mediumSize - 1,
              fontFamily: 'Roboto',
              textAlign:
                Platform.OS === 'ios'
                  ? 'left'
                  : I18nManager.isRTL
                  ? 'right'
                  : 'left',
              color: '#000',
              margin: 0,
              padding: 5,
              paddingTop: Platform.OS === 'android' ? 1 : 2,
              paddingBottom: 1,
              marginBottom: 0,
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
              marginTop: -2,
              marginBottom: 0,
              padding: 5,
              paddingLeft: 0,
              paddingTop: 0,
              paddingBottom: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                padding: 6,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 1,
                paddingBottom: 2
              }}>
              <HTML
                html={SyncStorage.get('currency')}
                baseFontStyle={{
                  fontSize: theme.mediumSize - 1,
                  color: '#820000',
                }}
              />
              <Text
                style={{
                  fontSize: theme.mediumSize - 1,
                  fontFamily: 'Roboto',
                  textAlign: 'center',
                  color: '#820000',
                  margin: 0,
                  padding: 5,
                  paddingRight: 0,
                  paddingLeft: 0,
                  paddingTop: Platform.OS === 'android' ? 1 : 0,
                  paddingBottom: 0,
                  marginBottom: 0,
                  fontWeight: '400',
                }}
                numberOfLines={1}>
                {props.objectArray.price}
              </Text>

            </View>
            <View style={{flexDirection: 'row'}}>
              <Stars
                disabled
                default={1}
                count={1}
                starSize={12}
                half
                fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                emptyStar={
                  <Icon
                    name={'star-outline'}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
              />
              <Text style={{fontSize: theme.smallSize - 1, padding: 2}}>
                {
                  Number(props.objectArray.average_rating).toFixed(1) }
              </Text>
            </View>
          </View>
          {props.removeButton ? (
            <TouchableOpacity
              style={{
                margin: 5,
                width: btnWidth,
                marginBottom: 3,
                marginTop: 0,
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
                  width: btnWidth,

                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 0,
                  marginBottom: 0,
                  backgroundColor: '#D81800',
                }}>
                <Text
                  style={{
                    color: theme.removeBtnTextColor,
                    fontSize: theme.mediumSize + 1,
                    fontWeight: '500',
                  }}>
                  {t.props.cartItems2.Config.languageJson.Remove}
                </Text>
              </View>
            </TouchableOpacity>
          ) : 
            t.props.cartItems2.cartItems.recentViewedProducts &&
            props.recent ? null : props.objectArray.in_stock === false ? (
              <TouchableOpacity
                style={{
                  margin: 5,
                  width: btnWidth,
                  marginBottom: 3,
                  marginTop: 0,
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
                    width: btnWidth,

                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: theme.outOfStockBtnColor,
                  }}>
                  <Text
                    style={{
                      color: theme.outOfStockBtnTextColor,
                      fontSize: theme.mediumSize + 1,
                      fontWeight: '500',
                    }}>
                    {t.props.cartItems2.Config.languageJson['Out of Stock']}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : props.objectArray.type === 'simple' ? (
              <TouchableOpacity
                style={{
                  margin: 5,
                  width: btnWidth,
                  marginBottom: 3,
                  marginTop: 0,
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
                    width: btnWidth,
                    backgroundColor: theme.primaryDark,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 0,
                    marginBottom: 0,
                  }}>
                  <Text
                    style={{
                      color: theme.addToCartBtnTextColor,
                      fontSize: theme.mediumSize + 1,
                      fontWeight: '500',
                    }}>
                    {t.props.cartItems2.Config.languageJson['Add to Cart']}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : props.objectArray.type === 'external' ||
              props.objectArray.type === 'grouped' ||
              props.objectArray.type === 'variable' ? (
              <TouchableOpacity
                style={{
                  margin: 5,
                  width: btnWidth,
                  marginBottom: 3,
                  marginTop: 0,
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
                    width: btnWidth,
                    backgroundColor: theme.primaryDark,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 0,
                    marginBottom: 0,
                  }}>
                  <Text
                    style={{
                      color: theme.detailsBtnTextColor,
                      fontSize: theme.mediumSize + 1,
                      fontWeight: '500',
                    }}>
                    {t.props.cartItems2.Config.languageJson.Details}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

          {t.props.cartItems2.cartItems.recentViewedProducts && props.recent ? (
            <TouchableOpacity
              style={{
                margin: 5,
                width: btnWidth,
                marginBottom: 3,
                marginTop: 0,
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
                  width: btnWidth,

                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 0,
                  marginBottom: 0,
                  backgroundColor: '#D81800',
                }}>
                <Text
                  style={{
                    color: theme.removeBtnTextColor,
                    fontSize: theme.mediumSize + 1,
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
    {/* )} */}
  </View>
)

////////////////////////////////////////////////
const styles = StyleSheet.create({
  myStarStyle: {
    color: '#FCA800',
    backgroundColor: 'transparent',
    fontSize: 15,
  },
  myEmptyStarStyle: {
    color: '#FCA800',
  },
})
