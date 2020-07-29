/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  I18nManager,
  Platform,
  StyleSheet,
} from 'react-native'
import ImageLoad from '../RnImagePlaceH'
import HTML from 'react-native-render-html'
import Stars from 'react-native-stars'
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
      marginBottom: 4,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    }}>
    {/* /// ///////////////////////////////////////////////////// 2nd */}
    <View
      style={{
        backgroundColor: 'white',
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
          backgroundColor: 'white',
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
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            style={{
              height: widthPic,
              width: widthPic,
              backgroundColor: 'rgb(236, 236, 236)',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{
              width: 0,
              height: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            source={{uri: props.objectArray.images[0].src}}>
            {//////////////////
            props.objectArray.in_stock === false ? (
              <TouchableOpacity
                style={{
                  zIndex: 6,
                  textAlign: 'center',
                  padding: 3,
                  paddingBottom: 1,
                  paddingTop: 1,
                  right: 4,
                  shadowOffset: {width: 1, height: 1},
                  shadowColor: 'black',
                  shadowOpacity: 0.2,
                  elevation: 2,
                  bottom: -10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  borderWidth: 5,
                  borderColor:
                    t.newMethod3(t.props, t) === 1
                      ? theme.otherBtnsColor
                      : '#FF4E00',
                  backgroundColor:
                    t.newMethod3(t.props, t) === 1
                      ? theme.otherBtnsColor
                      : '#FF4E00',
                  borderRadius: 20,
                }}>
                {t.imageIcon('#fff', '#fff', 12, 10)}
              </TouchableOpacity>
            ) : props.objectArray.type === 'simple' ? (
              <TouchableOpacity
                style={{
                  zIndex: 6,
                  textAlign: 'center',
                  padding: 3,
                  paddingBottom: 1,
                  paddingTop: 1,
                  right: 4,
                  shadowOffset: {width: 1, height: 1},
                  shadowColor: 'black',
                  shadowOpacity: 0.2,
                  elevation: 2,
                  bottom: -10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  borderWidth: 5,
                  borderColor:
                    t.newMethod3(t.props, t) === 1
                      ? theme.otherBtnsColor
                      : '#FF4E00',
                  backgroundColor:
                    t.newMethod3(t.props, t) === 1
                      ? theme.otherBtnsColor
                      : '#FF4E00',
                  borderRadius: 20,
                }}
                onPress={() => {
                  if (t.newMethod3(props, t) !== 1) {
                  }
                }}
                onPressOut={() => {
                  t.newMethod6(props, t) //add to cart
                  // }
                }}>
                {t.imageIcon('#fff', '#fff', 12, 10)}
              </TouchableOpacity>
            ) : props.objectArray.type === 'external' ||
              props.objectArray.type === 'grouped' ||
              props.objectArray.type === 'variable' ? (
              <TouchableOpacity
                style={{
                  zIndex: 6,
                  textAlign: 'center',
                  padding: 3,
                  paddingBottom: 1,
                  paddingTop: 1,
                  right: 4,
                  shadowOffset: {width: 1, height: 1},
                  shadowColor: 'black',
                  shadowOpacity: 0.2,
                  elevation: 2,
                  bottom: -10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  borderWidth: 5,
                  borderColor:
                    t.newMethod3(t.props, t) === 1
                      ? theme.otherBtnsColor
                      : '#FF4E00',
                  backgroundColor:
                    t.newMethod3(t.props, t) === 1
                      ? theme.otherBtnsColor
                      : '#FF4E00',
                  borderRadius: 20,
                }}
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
                {t.imageIcon('#fff', '#fff', 12, 10)}
              </TouchableOpacity>
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
                  widthPic < 159 ? theme.smallSize - 3 : theme.smallSize - 2,
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
                    widthPic < 159 ? theme.smallSize - 3 : theme.smallSize - 2,
                },
                del: {
                  textDecorationLine: 'line-through',
                  fontSize:
                    widthPic < 159 ? theme.smallSize - 3 : theme.smallSize - 2,
                  color: '#6D6D6D',
                },
              }}
            />
            <View style={{marginTop: -1}}>
              <Stars
                disabled
                default={parseFloat(props.objectArray.average_rating)}
                count={5}
                starSize={12}
                half
                fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                emptyStar={
                  <Icon
                    name={'star-outline'}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon name={'star-half'} style={[styles.myStarStyle]} />
                }
              />
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
const styles = StyleSheet.create({
  myStarStyle: {
    color: '#FCA800',
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  myEmptyStarStyle: {
    color: '#cccccc',
  },
})
