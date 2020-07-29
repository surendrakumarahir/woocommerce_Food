/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import {View, TouchableOpacity, Text, Platform} from 'react-native'
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
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                padding: 6,
                width: 65,
                borderBottomRightRadius: 15,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -1,
              }}>
              <HTML
                html={SyncStorage.get('currency')}
                baseFontStyle={{
                  fontSize: theme.mediumSize - 1,
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: theme.mediumSize - 1,
                  fontFamily: 'Roboto',
                  textAlign: 'center',
                  color: '#2D2D2D',
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
          </ImageLoad>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            padding: 1,
            margin: 1,
            marginBottom: 0,
            paddingBottom: 3,
            paddingTop: 2,
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
                    fontSize: theme.mediumSize - 3,
                    fontFamily: 'Roboto',
                    textAlign: 'center',
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
                    fontSize: theme.mediumSize - 3,
                    fontFamily: 'Roboto',
                    textAlign: 'center',
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
