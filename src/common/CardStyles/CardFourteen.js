/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native'
import ImageLoad from '../RnImagePlaceH'
import HTML from 'react-native-render-html'
import {Icon} from 'native-base'
import Ionicons from 'react-native-vector-icons/FontAwesome'
import theme from '../Theme.style'
import SyncStorage from 'sync-storage'
export default CardOne = ({props, widthPic, t, s, btnWidth}) => (
  <View
    style={{
      backgroundColor: theme.backgroundColor,
      width: widthPic * 0.96,
      margin: 5,
      marginBottom: 5,
      marginLeft: 7,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    }}>
    {/* /// ///////////////////////////////////////////////////// 2nd */}
    <View
      style={{
        backgroundColor: theme.backgroundColor,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
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
          backgroundColor: '#fff',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}>
        <TouchableOpacity
          style={{
            flex: 2,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
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
            borderRadius={30 / 2}
            style={{
              height: widthPic * 1.1,
              width: widthPic,
              backgroundColor:
                t.props.cartItems2.Config.card_style === 12
                  ? '#fff'
                  : 'rgb(236, 236, 236)',
              borderRadius: 30 / 2,
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{
              width: 0,
              height: 0,
              borderRadius: 30 / 2,
            }}
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
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
            padding: 1,
            margin: 0,
            marginBottom: 0,
            paddingBottom: 0,
            paddingTop: 0,
            marginTop: 0,
            width: widthPic,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              padding: 1,
              margin: 1,
              marginBottom: 0,
              paddingBottom: 0,
              paddingTop: 0,
              marginTop: 0,
              width: widthPic,
            }}>
            <Text
              style={{
                fontSize: theme.mediumSize,
                fontFamily: 'Roboto',
                textAlign: 'center',
                color: '#000',
                margin: 0,
                padding: 5,
                paddingTop: Platform.OS === 'android' ? 1 : 2,
                paddingBottom: 0,
                marginBottom: 0,
                fontWeight: '400',
                width: widthPic,
              }}
              numberOfLines={1}>
              {props.objectArray.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <HTML
              html={s}
              baseFontStyle={{
                fontSize:
                  widthPic < 159 ? theme.mediumSize - 1 : theme.mediumSize - 0,
                color: '#820000',
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
                  color: '#820000',
                  fontSize:
                    widthPic < 159
                      ? theme.mediumSize - 1
                      : theme.mediumSize - 0,
                },
                del: {
                  textDecorationLine: 'line-through',
                  fontSize:
                    widthPic < 159
                      ? theme.mediumSize - 2
                      : theme.mediumSize - 1,
                  color: '#646464',
                },
              }}
            />
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
