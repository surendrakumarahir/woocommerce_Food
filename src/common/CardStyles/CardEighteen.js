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
import Ionicons from 'react-native-vector-icons/FontAwesome'
import theme from '../Theme.style'
import SyncStorage from 'sync-storage'
export default CardOne = ({props, widthPic, t, s, btnWidth}) => (
  <View
    style={{
      backgroundColor: theme.backgroundColor,
      width: widthPic,
      margin: 5,
      marginBottom: 5,
      marginLeft: 5,
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
            borderRadius={0}
            style={{
              height: widthPic * 1.1,
              width: widthPic,
              backgroundColor:
                t.props.cartItems2.Config.card_style === 12
                  ? '#fff'
                  : 'rgb(236, 236, 236)',
              borderRadius: 0,
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{
              width: 0,
              height: 0,
              borderRadius: 0,
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
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              padding: 1,
              margin: 1,
              marginBottom: 0,
              paddingBottom: 0,
              paddingTop: 0,
              marginTop: 0,
              width: widthPic,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: theme.mediumSize - 1,
                fontFamily: 'Roboto',
                textAlign: 'left',
                color: '#000',
                margin: 0,
                padding: 5,
                paddingTop: 0,
                paddingLeft: 3,
                paddingBottom: 0,
                marginBottom: 0,
                fontWeight: '400',
                width: widthPic / 1.2,
              }}
              numberOfLines={1}>
              {props.objectArray.name}
            </Text>
            <View>
              {//////////////////
              props.objectArray.in_stock === false ? (
                <TouchableOpacity>
                  <Icon
                    style={{
                      color: '#404040',
                      fontSize: 18,
                      marginBottom: -4,
                    }}
                    active
                    name='md-add'
                  />
                </TouchableOpacity>
              ) : props.objectArray.type === 'simple' ? (
                <Icon
                  style={{
                    color: '#404040',
                    fontSize: 18,
                    marginBottom: -4,
                  }}
                  active
                  name='md-add'
                  onPress={() => {
                    t.newMethod6(props, t) //add to cart
                  }}
                />
              ) : props.objectArray.type === 'external' ||
                props.objectArray.type === 'grouped' ||
                props.objectArray.type === 'variable' ? (
                <Icon
                  style={{
                    color: '#404040',
                    fontSize: 18,
                    marginBottom: -4,
                  }}
                  active
                  name='md-add'
                  onPress={() => {
                    props.navigation.push('ProductDetails', {
                      objectArray: props.objectArray, //
                    })
                  }}
                />
              ) : null}
            </View>
          </View>
        </View>
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
                  fontSize: theme.mediumSize - 3,
                  fontFamily: 'Roboto',
                  textAlign: 'center',
                  color: '#313131',
                  margin: 0,
                  marginLeft: -4,
                  marginTop: -1,
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
                paddingLeft: 6,
                paddingBottom: 0,
              }}>
              <Text
                style={{
                  fontSize: theme.mediumSize - 3,
                  fontFamily: 'Roboto',
                  textAlign: 'center',
                  color: '#313131',
                  margin: 0,
                  marginLeft: -2,
                  marginTop: -1,
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
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: widthPic,
            paddingLeft: 5,
          }}>
          <HTML
            html={SyncStorage.get('currency')}
            baseFontStyle={{
              fontSize: theme.mediumSize - 3,
              color: '#3A3A3A',
              fontWeight: '400',
            }}
          />
          <Text
            style={{
              fontSize: theme.mediumSize - 3,
              fontFamily: 'Roboto',
              textAlign: 'center',
              color: '#3A3A3A',
              margin: 0,
              padding: 5,
              paddingRight: 0,
              paddingLeft: 0,
              paddingTop: Platform.OS === 'android' ? 1 : 0,
              marginTop: 0,
              paddingBottom: 0,
              marginBottom: 0,
              fontWeight: '400',
            }}
            numberOfLines={1}>
            {props.objectArray.price}
          </Text>
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
)
////////////////////////////////////////////////
