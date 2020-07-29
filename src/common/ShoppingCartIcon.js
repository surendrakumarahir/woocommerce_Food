/* eslint-disable max-len */
/* eslint-disable import/imports-first */
/* eslint-disable import/newline-after-import */
import React from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity, Image} from 'react-native'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import {Icon} from 'native-base'
import theme from './Theme.style'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const ShoppingCartIcon = props => (
  <View
    style={[
      {padding: 5, paddingTop: Platform.OS === 'ios' ? 20 : 5, paddingRight: 6},
      styles.maincontainer,
    ]}>
    {/* <TouchableOpacity onPressOut={() => props.navigation.navigate('Search')}>
      <View
        style={{
          alignItems: 'center',
          height: 40,
        }}>
        <View
          style={[
            {padding: 5, paddingRight: 9, paddingTop: 2},
            Platform.OS === 'android' ? styles.iconContainer : null,
          ]}>
          <Icon
            name='search'
            style={{color: theme.headerIconsColor, fontSize: 22}}
          />
        </View>
      </View>
    </TouchableOpacity> */}
    <TouchableOpacity onPressOut={() => props.navigation.navigate('Search')}>
      <View
        style={{
          alignItems: 'center',
          height: 40,
        }}>
        <View
          style={[
            {padding: 5, paddingRight: 9, paddingTop: 2},
            Platform.OS === 'android' ? styles.iconContainer : null,
          ]}>
          <Image style={{flex: 1, width: wp(9), height: wp(9), resizeMode: 'cover'}} source={require('../images/notification.png')} />
        </View>
      </View>
    </TouchableOpacity>
   

    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('Cart')
      }}>
      <View
        style={{
          alignItems: 'center',
          height: 43,
        }}>
        <View
          style={[
            {padding: 5},
            Platform.OS === 'android' ? styles.iconContainer : null,
          ]}>
          <View
            style={{
              position: 'absolute',
              height: 19,
              width: 20,
              borderRadius: 8,
              backgroundColor: theme.headerCartCounterColor,
              right: -2,
              bottom: 16,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
            }}>
            <Text
              style={{
                color: theme.headerCartCounterText,
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              {/* {' '} */}
              {props.cartItems2.cartItems.cartquantity}
              {/* {' '} */}
            </Text>
          </View>
          <Icon
            name='cart'
            style={{color: theme.headerIconsColor, fontSize: wp(6)}}
          />
        </View>
      </View>
    </TouchableOpacity>
  </View>
)

const mapStateToProps = state => ({
  cartItems2: state,
})
export default connect(mapStateToProps, null)(withNavigation(ShoppingCartIcon))

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    marginRight: 5,
  },
})
