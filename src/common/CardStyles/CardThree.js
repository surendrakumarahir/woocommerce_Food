/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import {View, TouchableOpacity, Text, I18nManager, Platform} from 'react-native'
import ImageLoad from '../RnImagePlaceH'
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
      marginBottom: 5,
      borderTopLeftRadius: 20 / 2,
      borderTopRightRadius: 20 / 2,
    }}>
    {/* /// ///////////////////////////////////////////////////// 2nd */}
    <View
      style={{
        backgroundColor: 'white',
        borderTopLeftRadius: 20 / 2,
        borderTopRightRadius: 20 / 2,
      }}>
      {console.log(props.objectArray)}
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
                backgroundColor: theme.removeBtnColor,
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

                backgroundColor: theme.removeBtnColor,
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
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 20 / 2,
          borderTopRightRadius: 20 / 2,
        }}>
        <TouchableOpacity
          style={{
            flex: 2,
            borderTopLeftRadius: 20 / 2,
            borderTopRightRadius: 20 / 2,
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
            borderTopLeftRadius={20 / 2}
            borderTopRightRadius={20 / 2}
            style={{
              height: widthPic,
              width: widthPic,
              backgroundColor: 'rgb(236, 236, 236)',
              borderTopLeftRadius: 20 / 2,
              borderTopRightRadius: 20 / 2,
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{
              width: 0,
              height: 0,
              borderTopLeftRadius: 20 / 2,
              borderTopRightRadius: 20 / 2,
            }}
            source={{uri: props.objectArray.images[0].src}}>
            {props.objectArray.on_sale &&
            t
              .getPer(
                props.objectArray.regular_price,
                props.objectArray.sale_price,
              )
              .toString() !== 'NaN' ? (
              <View
                style={{
                  backgroundColor: theme.saleBackgroundColor,
                  zIndex: 6,
                  textAlign: 'center',
                  padding: 3,
                  paddingBottom: 1,
                  paddingTop: 1,
                  left: 0,
                  top: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  fontWeight: '400',
                  borderRadius: 2,
                  height: 35,
                  width: 37,
                  borderTopLeftRadius: 20 / 2,
                }}>
                <Text style={{color: '#fff', fontSize: 11}}>
                  {Math.floor(
                    t.getPer(
                      props.objectArray.regular_price,
                      props.objectArray.sale_price,
                    ),
                  ) + '%'}
                </Text>
                <Text style={{color: '#fff', fontSize: 11}}>
                  {t.props.cartItems2.Config.languageJson.OFF}
                </Text>
              </View>
            ) : null}
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
              fontSize: theme.mediumSize,
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
              paddingBottom: 0,
              marginBottom: 0,
              fontWeight: 'bold',
              width: widthPic - 20,
            }}
            numberOfLines={1}>
            {props.objectArray.name}
          </Text>

          {props.objectArray !== null && props.objectArray !== undefined ? (
            props.objectArray.categories !== null &&
            props.objectArray.categories !== undefined &&
            props.objectArray.categories.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  padding: 8,
                  paddingTop: 1,
                  paddingBottom: 0,
                }}>
                <Text
                  style={{
                    fontSize: theme.mediumSize - 2,
                    fontFamily: 'Roboto',
                    textAlign:
                      Platform.OS === 'ios'
                        ? 'left'
                        : I18nManager.isRTL
                        ? 'right'
                        : 'left',
                    color: '#6D6D6D',
                    margin: 0,
                    marginLeft: -2,
                    paddingTop: Platform.OS === 'android' ? 0 : 1,
                    paddingBottom: 1,
                    marginBottom: 0,
                  }}
                  numberOfLines={1}>
                  {'(' + props.objectArray.categories[0].name + ')'}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  padding: 8,
                  paddingTop: 1,
                  paddingBottom: 0,
                }}>
                <Text
                  style={{
                    fontSize: theme.mediumSize - 2,
                    fontFamily: 'Roboto',
                    textAlign:
                      Platform.OS === 'ios'
                        ? 'left'
                        : I18nManager.isRTL
                        ? 'right'
                        : 'left',
                    color: '#6D6D6D',
                    margin: 0,
                    marginLeft: -2,
                    paddingTop: Platform.OS === 'android' ? 0 : 1,
                    paddingBottom: 1,
                    marginBottom: 0,
                  }}
                  numberOfLines={1}>
                  {'(Uncategorized' + ')'}
                </Text>
              </View>
            )
          ) : null}

          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 0,
              marginBottom: 0,
              padding: 5,
              paddingLeft: 6,
              paddingTop: 0,
              paddingBottom: 1,
            }}>
            <HTML
              html={s}
              baseFontStyle={{
                fontSize:
                  widthPic < 159 ? theme.mediumSize - 2 : theme.mediumSize - 1,
                color: '#4B4B4B',
                fontFamily: 'Roboto',
              }}
              alterNode={node => {
                const {name} = node
                if (SyncStorage.get('currencyPos') === 'right') {
                  if (
                    name === 'ins' &&
                    node.children[0] !== undefined && node.children[0] !== null
                  ) {
                    if (
                      name === 'ins' &&
                      node.children[0].children[0] !== undefined && node.children[0].children[0] !== null
                    ) {
                  if (
                    name === 'ins' &&
                    node.children[0] !== undefined && node.children[0] !== null
                  ) {
                    if (
                      name === 'ins' &&
                      node.children[0].children[0] !== undefined && node.children[0].children[0] !== null
                    ) {
                  if (
                    name === 'ins' &&
                    node.children[0].children[0].data !== undefined
                  ) {
                    node.children[0].children[0].data = ` ${node.children[0].children[0].data}`
                    return node
                  }
                }
                }
                } else if (
                  name === 'ins' &&
                  node.children[0].children[0].children[0].data !== undefined
                ) {
                  node.children[0].children[0].children[0].data = `  ${node.children[0].children[0].children[0].data}`
                  return node
                }
              }
            }
              }}
              tagsStyles={{
                ins: {
                  color: '#4B4B4B',
                  fontSize:
                    widthPic < 159
                      ? theme.mediumSize - 2
                      : theme.mediumSize - 1,
                },
                del: {
                  textDecorationLine: 'line-through',
                  fontSize:
                    widthPic < 159
                      ? theme.mediumSize - 2
                      : theme.mediumSize - 1,
                  color: '#6D6D6D',
                },
              }}
            />
            <View>
              {//////////////////
              props.objectArray.in_stock === false ? (
                <TouchableOpacity>
                  {t.imageIcon(
                    theme.addToCartBagBtnColor,
                    theme.otherBtnsColor,
                    16,
                    14,
                  )}
                </TouchableOpacity>
              ) : props.objectArray.type === 'simple' ? (
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    if (t.newMethod3(props, t) !== 1) {
                    }
                  }}
                  onPressOut={() => {
                    t.newMethod6(props, t) //add to cart
                    // }
                  }}>
                  {t.imageIcon(
                    theme.addToCartBagBtnColor,
                    theme.otherBtnsColor,
                    16,
                    14,
                  )}
                </TouchableOpacity>
              ) : props.objectArray.type === 'external' ||
                props.objectArray.type === 'grouped' ||
                props.objectArray.type === 'variable' ? (
                <TouchableOpacity
                  onPress={() => {
                    if (t.newMethod3(props, t) !== 1) {
                    }
                  }}
                  onPressOut={() => {
                    props.navigation.push('ProductDetails', {
                      objectArray: props.objectArray, //
                    })
                    // }
                  }}>
                  {t.imageIcon(
                    theme.addToCartBagBtnColor,
                    theme.otherBtnsColor,
                    16,
                    14,
                  )}
                </TouchableOpacity>
              ) : null}
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
                  backgroundColor: theme.removeBtnColor,
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
                  backgroundColor: theme.removeBtnColor,
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
  </View>
)
