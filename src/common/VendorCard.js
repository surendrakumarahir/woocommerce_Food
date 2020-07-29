/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ImageLoad from './RnImagePlaceH';
import theme from './Theme.style';
WIDTH = Dimensions.get('window').width;
Width2 = WIDTH;
export default (vendorCard = props => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => {
      props.navigation.navigate('VendorScreen', {
        data: props.objectArray
      });
    }}
  >
    {props.objectArray.banner === false ? (
      <ImageLoad
        key={props.objectArray.user_id}
        style={{
          height: theme.singleRowCardWidth, //WIDTH * 0.4182 - 10
          width: theme.singleRowCardWidth,
        }}
        resizeMode='cover'
        loadingStyle={{ size: 'large', color: theme.loadingIndicatorColor }}
        placeholder={false}
        ActivityIndicator={true}
        placeholderStyle={{width: 0, height: 0}}
        source={require('../images/placeholder.png')}
      />
    ) : (
      <ImageLoad
        key={props.objectArray.user_id}
        style={{
          height: theme.singleRowCardWidth,
          width: theme.singleRowCardWidth,
        }}
        placeholder={false}
        ActivityIndicator={true}
        resizeMode={'cover'}
        loadingStyle={{ size: 'large', color: theme.loadingIndicatorColor }}
        placeholderStyle={{width: 0, height: 0}}
        source={{ uri: props.objectArray.banner }}
      />
    )}
    {props.objectArray.meta.pv_shop_name === undefined ? (
      <Text style={{ fontWeight: 'normal', padding: 6, color: '#000', fontSize: theme.mediumSize + 1 }}>
        {props.objectArray.meta[0].store_name}
      </Text>
    ) : (
      <Text style={{ fontWeight: 'normal', padding: 6, color: '#000', fontSize: theme.mediumSize + 1 }}>
        {props.objectArray.meta.pv_shop_name}
      </Text>
    )}
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    marginTop: 3,
    marginBottom: 5,
    elevation: 2,
    margin: 5,

  },
});
