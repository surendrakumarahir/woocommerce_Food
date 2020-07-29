/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import {View, TouchableOpacity, Text, I18nManager, Platform} from 'react-native'
import Ionicons from 'react-native-vector-icons/FontAwesome'
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
      borderRadius: 20 / 2,
    }}>
    {/* /// ///////////////////////////////////////////////////// 2nd */}
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 20 / 2,
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
          borderRadius: 20 / 2,
        }}>
        <TouchableOpacity
          style={{
            flex: 2,
            borderRadius: 20 / 2,
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
            borderRadius={20 / 2}
            style={{
              height: widthPic,
              width: widthPic,
              backgroundColor: 'rgb(236, 236, 236)',
              borderRadius: 20 / 2,
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{
              width: 0,
              height: 0,
              borderRadius: 20 / 2,
            }}
            source={{uri: props.objectArray.images[0].src}}>
            {t.checkProductNew(props) ? (
              <View
                style={{
                  backgroundColor: '#1473E6',
                  zIndex: 6,
                  textAlign: 'center',
                  padding: 5,
                  borderBottomRightRadius: props.objectArray.on_sale
                    ? 0
                    : 20 / 2,
                  borderTopLeftRadius: props.objectArray.on_sale ? 0 : 20 / 2,
                  borderBottomRightRadius: 20 / 2,
                  borderTopRightRadius: props.objectArray.on_sale ? 20 / 2 : 0,
                  paddingRight: 7,
                  left: 0,
                  top:
                    props.objectArray.on_sale && props.objectArray.featured
                      ? 55
                      : props.objectArray.on_sale
                      ? 27
                      : 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  fontWeight: '400',
                  borderRadius: 2,
                }}>
                <Text style={{color: '#fff', fontSize: 11}}>
                  {t.props.cartItems2.Config.languageJson.New}
                </Text>
              </View>
            ) : null}
            {props.objectArray.on_sale ? (
              <View
                style={{
                  backgroundColor: '#D50000',
                  zIndex: 6,
                  textAlign: 'center',
                  padding: 5,
                  paddingRight: 7,
                  borderBottomRightRadius: 20 / 2,
                  borderTopLeftRadius: 20 / 2,
                  left: 0,
                  top: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  fontWeight: '400',
                  borderRadius: 2,
                }}>
                <Text style={{color: '#fff', fontSize: 11}}>
                  {t.props.cartItems2.Config.languageJson.Sale}
                </Text>
              </View>
            ) : null}
            {props.objectArray.featured ? (
              <View
                style={{
                  backgroundColor: '#047800',
                  zIndex: 6,
                  textAlign: 'center',
                  padding: 5,
                  borderBottomRightRadius: props.objectArray.on_sale
                    ? 0
                    : 20 / 2,
                  borderTopLeftRadius: props.objectArray.on_sale ? 0 : 20 / 2,
                  borderBottomRightRadius: 20 / 2,
                  borderTopRightRadius: props.objectArray.on_sale ? 20 / 2 : 0,
                  left: 0,
                  top:
                    !props.objectArray.on_sale && !t.checkProductNew(props)
                      ? 0
                      : 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  fontWeight: '400',
                  borderRadius: 2,
                }}>
                <Text style={{color: '#fff', fontSize: 11}}>
                  {t.props.cartItems2.Config.languageJson.Featured}
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
              paddingTop: Platform.OS === 'android' ? 2 : 3,
              paddingBottom: 0,
              marginBottom: 0,
              fontWeight: '400',
              width: widthPic - 20,
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
              marginTop: 2,
              marginBottom: 0,
              padding: 5,
              paddingLeft: 6,
              paddingTop: 0,
              paddingBottom: 3,
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
              {t.checkWishList(props, t) === 1 ? (
                props.removeButton ? (
                  <Icon
                    style={{
                      color: '#DE004B',
                      fontSize: 17,
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
                      color: '#DE004B',
                      fontSize: 17,
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
                    color: '#DE004B',
                    fontSize: Platform.OS === 'ios' ? 14 : 13,
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
////////////////////////////////////////////////
