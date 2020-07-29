/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import {View, TouchableOpacity, Text, I18nManager, Platform} from 'react-native'
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
            {t.checkProductNew(props) ? (
              <ImageLoad
                placeholder={false}
                ActivityIndicator={true}
                resizeMode={'cover'
                }
                key={props.objectArray.id}
                style={{
                  height: 38,
                  zIndex: 6,
                  width: 38,
                  fontSize: 13,
                  left: 0,
                  top: 0,
                  backgroundColor: 'transparent',
                  color: '#fff',
                  position: 'absolute',
                  backgroundColor: 'rgb(236, 236, 236)',
                }}
                backgroundColor={'transparent'}
                isShowActivity={false}
                loadingStyle={{
                  size: 'large',
                  color: theme.loadingIndicatorColor,
                }}
                placeholderSource={require('../../images/badge_new.png')}
                placeholderStyle={{
                  height: 40,
                  width: 40,
                  backgroundColor: 'transparent',
                }}
                source={require('../../images/badge_new.png')}
              />
            ) : null}
            {props.objectArray.on_sale ? (
              <View
                style={{
                  backgroundColor: theme.otherBtnsColor,
                  zIndex: 6,
                  textAlign: 'center',
                  padding: 3,
                  paddingBottom: 1,
                  paddingTop: 1,
                  right: 0,
                  top: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  fontWeight: '400',
                  borderRadius: 2,
                }}>
                <Text style={{color: '#fff', fontSize: 11}}>
                  {t.props.cartItems2.Config.languageJson.SALE}
                </Text>
              </View>
            ) : null}
            {props.objectArray.featured ? (
              <View
                style={{
                  backgroundColor: theme.otherBtnsColor,
                  zIndex: 6,
                  textAlign: 'center',
                  padding: 3,
                  paddingBottom: 1,
                  paddingTop: 1,
                  right: 0,
                  top: !props.objectArray.on_sale ? 0 : 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  fontWeight: '400',
                  borderRadius: 2,
                }}>
                <Text style={{color: '#fff', fontSize: 11}}>
                  {t.props.cartItems2.Config.languageJson.FEATURED}
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
              fontSize: theme.mediumSize - 2,
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
              marginTop: 0,
              marginBottom: 0,
              padding: 5,
              paddingTop: 0,
              paddingBottom: 1,
            }}>
            <HTML
              html={s}
              baseFontStyle={{
                fontSize:
                  widthPic < 159 ? theme.mediumSize - 2 : theme.mediumSize - 1,
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
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
                  color: '#000',
                  fontSize:
                    widthPic < 159
                      ? theme.mediumSize - 2
                      : theme.mediumSize - 1,
                  fontWeight: 'bold',
                },
                del: {
                  textDecorationLine: 'line-through',
                  fontSize:
                    widthPic < 159
                      ? theme.mediumSize - 2
                      : theme.mediumSize - 1,
                  color: '#4E4E4E',
                  fontWeight: '500',
                },
              }}
            />

            <View>
              {t.checkWishList(props, t) === 1 ? (
                props.removeButton ? (
                  <Icon
                    style={{
                      color: theme.wishHeartBtnColor,
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
                      color: theme.wishHeartBtnColor,
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
                    color: theme.wishHeartBtnColor,
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
