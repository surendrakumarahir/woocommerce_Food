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
import Icon from 'react-native-vector-icons/FontAwesome'
import Counter from '../CounterCard'
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
        }}>
        <TouchableOpacity
          style={{
            flex: 2,
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
            style={{
              height: widthPic,
              width: widthPic,
              backgroundColor: 'rgb(236, 236, 236)',
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{
              width: 0,
              height: 0,
            }}
            source={{uri: props.objectArray.images[0].src}}>
            <View style={{right: 7, position: 'absolute', top: 7}}>
              {t.checkWishList(props, t) === 1 ? (
                props.removeButton ? (
                  <Icon
                    style={{
                      color: '#2E2E2E',
                      fontSize: 19,
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
                      color: '#2E2E2E',
                      fontSize: 19,
                    }}
                    active
                    name='heart'
                    onPress={() => {
                        t.removeWishlist(props, t)
                    }}
                  />
                )
              ) : (
                <Icon
                  style={{
                    color: '#2E2E2E',
                    fontSize: 17,
                    marginTop: Platform.OS === 'ios' ? 3 : 2,
                    marginBottom: Platform.OS === 'ios' ? 2 : 2,
                  }}
                  active
                  name='heart-o'
                  onPress={() => {
                      t.addWishlist(props, t)
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
              marginLeft: -2,
              width: widthPic,
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
                    marginLeft: -4,
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
                    marginLeft: -4,
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
              paddingBottom: 3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 2,
              }}>
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
              <HTML
                html={SyncStorage.get('currency')}
                baseFontStyle={{
                  fontSize: theme.mediumSize - 1,
                  color: '#000',
                }}
              />
            </View>

            {//////////////////
            props.objectArray.in_stock === false ? (
              <TouchableOpacity
                style={{
                  width: 16,
                  height: 17,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#2E2E2E',
                  borderRadius: 16 / 2,
                  marginBottom: 2,
                  marginTop: 3,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: theme.largeSize,
                    height: Platform.OS === 'ios' ? 20 : 23,
                  }}>
                  {'+'}
                </Text>
              </TouchableOpacity>
            ) : props.objectArray.type === 'simple' ? (
              <Counter
                width={24}
                height={1}
                minimumValue={0}
                innerRef={stepper => {
                  t.state.stepperArray[props.objectArray.id] = stepper
                }}
                initialValue={t.state.counter}
                onIncrement={() => {
                  t.newMethod6(props, t)
                }}
                onDecrement={() => {
                  t.removeCartitems(props, t)
                }}
              />
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
                }}>
                <TouchableOpacity
                  style={{
                    width: 16,
                    height: 17,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#000000',
                    borderRadius: 16 / 2,
                    marginBottom: 2,
                    marginTop: Platform.OS === 'android' ? 2.5 : 0,
                  }}
                  onPress={() => {
                    props.navigation.push('ProductDetails', {
                      objectArray: props.objectArray, //
                    })
                  }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: theme.largeSize,
                      height: Platform.OS === 'ios' ? 20 : 23,
                    }}>
                    {'+'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ) : null}
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
