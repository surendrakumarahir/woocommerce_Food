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
      backgroundColor: 'white',
      width: widthPic,
      margin: 5,
      marginBottom: 2,
      borderRadius: 0,
    }}>
    {/* /// ///////////////////////////////////////////////////// 2nd */}
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 0,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 0,
        }}>
        <TouchableOpacity
          style={{
            flex: 2,
            borderRadius: 0,
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
              height: widthPic,
              width: widthPic,
              backgroundColor: 'rgb(236, 236, 236)',
              borderRadius: 0,
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{
              width: 0,
              height: 0,
              borderRadius: 0,
            }}
            source={{uri: props.objectArray.images[0].src}}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                position: 'absolute',
                paddingTop: 3,
                width: widthPic,
                bottom: 0,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 1,
                  margin: 1,
                  marginBottom: 0,
                  paddingBottom: 1,
                  paddingTop: 0,
                  marginTop: 0,
                }}>
                {props.removeButton ? (
                  <TouchableOpacity onPress={() => t.removeWishlist(props, t)}>
                    <View
                      style={{
                        padding: 6,
                        margin: 2,
                        marginRight: 0,
                        width: btnWidth * 0.59,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 0,
                        paddingBottom: Platform.OS === 'ios' ? 7 : 5.1,
                        marginBottom: 7,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#000000',
                          fontSize: theme.mediumSize - 2,
                          fontWeight: '500',
                        }}>
                        {t.props.cartItems2.Config.languageJson.Remove}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : t.props.cartItems2.cartItems.recentViewedProducts &&
                  props.recent ? null : props.objectArray.in_stock === false ? (
                  <TouchableOpacity
                    style={{
                      margin: 5,
                      width: btnWidth * 0.5,
                      marginBottom: 3,
                      marginTop: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        padding: 6,
                        margin: 5,
                        width: btnWidth * 0.59,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 0,
                        paddingBottom: 7,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#000000',
                          fontSize: theme.mediumSize - 2,
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
                      width: btnWidth * 0.5,
                      marginBottom: 3,
                      marginTop: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                    onPressOut={() => {
                      t.newMethod6(props, t)
                    }}>
                    <View
                      style={{
                        padding: Platform.OS === 'ios' ? 5 : 5.2,
                        margin: 5,
                        width: btnWidth * 0.63,
                        backgroundColor: '#ffffff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 0,
                        flexDirection: 'row',
                        marginLeft: -2,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#000000',
                          fontSize: theme.mediumSize - 3,
                          fontWeight: '500',
                          paddingRight: 3,
                        }}>
                        {t.props.cartItems2.Config.languageJson['Add to Cart']}
                      </Text>
                      <Icon
                        style={{
                          color: '#1D1D1D',
                          fontSize: 16,
                          backgroundColor: '#fff',
                          paddingRight: 3,
                        }}
                        active
                        name='cart'
                      />
                    </View>
                  </TouchableOpacity>
                ) : props.objectArray.type === 'external' ||
                  props.objectArray.type === 'grouped' ||
                  props.objectArray.type === 'variable' ? (
                  <TouchableOpacity
                    style={{
                      margin: 5,
                      width: btnWidth * 0.5,
                      marginBottom: 3,
                      marginTop: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                    onPressOut={() => {
                      props.navigation.push('ProductDetails', {
                        objectArray: props.objectArray, //
                      })
                    }}>
                    <View
                      style={{
                        padding: 6,
                        margin: 5,
                        width: btnWidth * 0.59,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 0,
                        paddingBottom: Platform.OS === 'ios' ? 7 : 5,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#000000',
                          fontSize: theme.mediumSize - 2,
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
                      margin: 5,
                      width: btnWidth * 0.5,
                      marginBottom: 3,
                      marginTop: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                    onPress={() => t.removeRecent(props, t)}>
                    <View
                      style={{
                        padding: 6,
                        margin: 5,
                        width: btnWidth * 0.59,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 0,
                        paddingBottom: Platform.OS === 'ios' ? 7 : 5.2,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#000000',
                          fontSize: theme.mediumSize - 2,
                          fontWeight: '500',
                        }}>
                        {t.props.cartItems2.Config.languageJson.Remove}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>

              <View>
                {t.checkWishList(props, t) === 1 ? (
                  props.removeButton ? (
                    <Icon
                      style={{
                        color: '#1D1D1D',
                        fontSize: 16,
                        backgroundColor: '#fff',
                        padding: 6,
                        paddingBottom: Platform.OS === 'ios' ? 3 : 4.5,
                        paddingLeft: 8,
                        paddingRight: 8,
                        marginLeft: 3,
                      }}
                      active
                      name='heart'
                      onPress={() => {
                        t.removeWishlist(props, t)
                      }}
                    />
                  ) : (
                    <Icon
                      style={{
                        color: '#1D1D1D',
                        fontSize: 16,
                        backgroundColor: '#fff',
                        padding: 6,
                        paddingBottom: Platform.OS === 'ios' ? 3 : 4.5,
                        paddingLeft: 8,
                        paddingRight: 8,
                        marginLeft: 3,
                      }}
                      active
                      name='heart'
                      onPress={() => {
                        t.removeWishlist(props, t)
                      }}
                    />
                  )
                ) : (
                  <Ionicons
                    style={{
                      color: '#1D1D1D',
                      fontSize: 16,
                      backgroundColor: '#fff',
                      padding: 6,
                      paddingBottom: 5,
                      paddingLeft: 7,
                      paddingRight: 7,
                      marginLeft: 3,
                    }}
                    active
                    name='heart-o'
                    onPress={() => {
                      t.addWishlist(props, t)
                    }}
                  />
                )}
              </View>
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
            paddingBottom: 0,
            paddingTop: 1,
            marginTop: 0,
            width: widthPic,
          }}>
          {props.objectArray !== null && props.objectArray !== undefined ? (
            props.objectArray.categories !== null &&
            props.objectArray.categories !== undefined &&
            props.objectArray.categories.length > 0 ? (
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 8,
                  paddingTop: 1,
                  paddingBottom: 0,
                }}>
                <Text
                  style={{
                    fontSize: theme.mediumSize - 2,
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    color: '#313131',
                    margin: 0,
                    marginLeft: -4,
                    marginTop: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                  }}
                  numberOfLines={1}>
                  {props.objectArray.categories[0].name}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 8,
                  paddingTop: 1,
                  paddingLeft: 6,
                  paddingBottom: 0,
                }}>
                <Text
                  style={{
                    fontSize: theme.mediumSize - 2,
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    color: '#313131',
                    margin: 0,
                    marginLeft: -2,
                    marginTop: -1,
                    paddingBottom: 0,
                    marginBottom: 0,
                  }}
                  numberOfLines={1}>
                  {'Uncategorized'}
                </Text>
              </View>
            )
          ) : null}
          <Text
            style={{
              fontSize: theme.mediumSize - 1,
              fontFamily: 'Roboto',
              textAlign: 'center',
              color: '#000',
              margin: 0,
              padding: 2,
              paddingTop: 0,
              paddingBottom: 0,
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
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 0,
              marginBottom: 0,
              padding: 2,
              paddingLeft: 2,
              paddingTop: 0,
              paddingBottom: 3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <HTML
                html={SyncStorage.get('currency')}
                baseFontStyle={{
                  fontSize: theme.smallSize,
                  color: '#3A3A3A',
                  fontWeight: '400',
                }}
              />
              <Text
                style={{
                  fontSize: theme.smallSize,
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
          </View>
        </View>
      </View>
    </View>
  </View>
)
////////////////////////////////////////////////
