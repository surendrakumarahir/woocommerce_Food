/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  I18nManager
} from 'react-native';
import ImageLoad from './RnImagePlaceH';
import { Icon } from 'native-base';
import theme from './Theme.style';
WIDTH = Dimensions.get('window').width;
Width2 = WIDTH;

export default (Category1 = props => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => props.openSubCategories(props.item)}
  >
    <ImageLoad
      key={props.item.id}
      style={{
        height: 80,
        width: 80,
        overflow: 'hidden',
        marginRight: 8
      }}
      loadingStyle={{ size: 'large', color: theme.loadingIndicatorColor }}
      placeholder={false}
      ActivityIndicator={true}
      placeholderStyle={{width: 0, height: 0}}
      backgroundColor='transparent'
      color='transparent'
      source={{ uri: props.image }}
    />

    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white'
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: theme.largeSize,
          margin: 5,
          marginTop: 0,
          color: '#000',
           width: WIDTH * 0.7,
           textAlign: I18nManager.isRTL ? Platform.OS === 'android' ? 'right' : 'left' : 'left'
        }}
        numberOfLines={1}
      >
        {props.item.title.rendered}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Icon
          name={'time'}
          style={{ color: 'gray', fontSize: 20, paddingRight: 6, paddingLeft: 6 }}
        />
        <Text style={{ fontWeight: 'normal', padding: 1, color: '#51534f' }}>
          {props.item.date}
        </Text>
      </View>
      <View
        style={{
          margin: 5,
          width: WIDTH * 0.7,
          flex: 1,
          marginTop: 0
        }}
      >
        <Text style={{ color: '#51534f', fontSize: theme.mediumSize - 1 }} numberOfLines={4} >
          {props.html}
        </Text>
       
      </View>
    </View>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    width: Width2,
    padding: 10,
    borderColor: 'gray',
    flexDirection: 'row'
  },
});
