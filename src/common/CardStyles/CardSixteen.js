/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native'
import ImageLoad from '../RnImagePlaceH'
import HTML from 'react-native-render-html'
import Stars from 'react-native-stars'
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
      marginBottom:
        (t.props.cartItems2.cartItems.recentViewedProducts && props.recent) ||
        props.removeButton
          ? 22
          : 6,
    }}>
    {/* /// ///////////////////////////////////////////////////// 2nd */}
    <View
      style={{
        backgroundColor: theme.backgroundColor,
        borderRadius: 30 / 2,
      }}>
      {console.log(props.objectArray)}
      {t.newMethod3(props, t) === 1 ? (
        t.props.cartItems2.cartItems.recentViewedProducts && props.recent ? (
          <TouchableOpacity
            style={{
              width: btnWidth,
              position: 'absolute',
              bottom: 4,
              left: 5,
              borderRadius: 30 / 2,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            onPress={() => t.removeRecent(props, t)}>
            <View
              style={{
                alignItems: 'center',
                height: Platform.OS === 'android' ? 30 : 28,
                width: btnWidth,
                justifyContent: 'center',
                backgroundColor: theme.removeBtnColor,
                borderRadius: 30 / 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
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
              position: 'absolute',
              bottom: 4,
              left: 5,
              borderRadius: 30 / 2,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            onPress={() => t.removeWishlist(props, t)}>
            <View
              style={{
                alignItems: 'center',
                height: Platform.OS === 'android' ? 30 : 28,
                width: btnWidth,
                justifyContent: 'center',
                borderRadius: 30 / 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
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
          backgroundColor: theme.backgroundColor,
          borderRadius: 30 / 2,
          height: widthPic * 1.27,
          backgroundColor: 'transparent',
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
            width: widthPic * 0.93,
            position: 'absolute',
            zIndex: 30,
            bottom:
              (t.props.cartItems2.cartItems.recentViewedProducts &&
                props.recent) ||
              props.removeButton
                ? -18
                : 0,
            backgroundColor: '#fff',
            borderRadius: 20 / 2,
            shadowOffset: {width: 0, height: 3},
            shadowColor: 'black',
            shadowOpacity: 0.2,
            elevation: 3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 6,
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 2,
              borderRadius: 20 / 2,
            }}>
            <HTML
              html={s}
              baseFontStyle={{
                fontSize:
                  widthPic < 159 ? theme.mediumSize - 2 : theme.mediumSize - 1,
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
                      ? theme.mediumSize - 2
                      : theme.mediumSize - 1,
                },
                del: {
                  textDecorationLine: 'line-through',
                  fontSize:
                    widthPic < 159
                      ? theme.mediumSize - 3
                      : theme.mediumSize - 2,
                  color: '#646464',
                },
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 1,
              marginBottom: 6,
              padding: 5,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 0,
              paddingBottom: -1,
            }}>
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
            <View>
              {t.checkWishList(props, t) === 1 ? (
                props.removeButton ? (
                  <Icon
                    style={{
                      color: '#707070',
                      fontSize: 16,
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
                      color: '#707070',
                      fontSize: 16,
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
                    color: '#707070',
                    fontSize: 13,
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
          </View>
          {props.removeButton ? (
            <TouchableOpacity
              style={{
                margin: 5,
                width: btnWidth,
                marginBottom: 0,
                marginTop: 0,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 20 / 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
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
                  borderRadius: 20 / 2,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  marginBottom: -1,
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
                marginBottom: 0,
                marginTop: 0,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 20 / 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                paddingBottom: 0,
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
                  marginBottom: -1,
                  backgroundColor: theme.removeBtnColor,
                  borderRadius: 20 / 2,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
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
        <TouchableOpacity
          style={{
            flex: 2,
            borderRadius: 30 / 2,
            height: widthPic * 1.27,
            backgroundColor: 'transparent',
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
              height: widthPic * 1.15,
              width: widthPic,
              backgroundColor: 'rgb(236, 236, 236)',
              borderRadius: 30 / 2,
            }}
            loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
            placeholderStyle={{
              width: 0,
              height: 0,
              borderRadius: 30 / 2,
            }}
            source={{uri: props.objectArray.images[0].src}}></ImageLoad>
        </TouchableOpacity>
      </View>
    </View>
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
    color: '#cccccc',
  },
})
