/* eslint-disable no-dupe-keys */
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
  Dimensions
} from 'react-native';
import ImageLoad from './RnImagePlaceH';;
import theme from './Theme.style';
WIDTH = Dimensions.get('window').width;
export default (Category1 = props => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => props.openSubCategories(props.item.id, props.item.name)}
  >
    <ImageLoad
      key={props.id}
      style={{
        height: 250,
        width: WIDTH * 0.95,
      }}
      loadingStyle={{ size: 'large', color: theme.loadingIndicatorColor }}
      placeholder={false}
      ActivityIndicator={true}
      placeholderStyle={{width: 0, height: 0}}
      backgroundColor='transparent'
      color='transparent'
      source={{ uri: props.image }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: WIDTH * 0.95,
          alignContent: 'center',
          opacity: 0.3,
          backgroundColor: theme.primary,
        }}
      />
      <View
         style={{
          height: 250,
          justifyContent: 'center',
         alignItems: 'center',
         alignContent: 'center',
         alignSelf: 'center',
          width: WIDTH * 0.95,
          alignContent: 'center',
          zIndex: 9,
          position: 'absolute',
        }}
      >
      <Text
          style={{ fontWeight: 'bold', fontSize: theme.largeSize + 8, color: '#fff' }}
      >
          {props.item.name}
        </Text>
        <Text
          style={{ fontSize: theme.largeSize, color: '#fff', fontWeight: '500' }}
        >{`${props.item.count} ${props.products}`}</Text>
      </View>
       
    </ImageLoad>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: theme.backgroundColor,
    margin: 4,
    marginTop: 8,
    marginBottom: 0
  },
});
