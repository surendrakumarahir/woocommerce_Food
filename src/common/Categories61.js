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
  Dimensions
} from 'react-native';
import ImageLoad from './RnImagePlaceH';
import theme from './Theme.style';
WIDTH = Dimensions.get('window').width;
HEIGHT = Dimensions.get('window').height;
Width2 = WIDTH * 0.5;
export default Category1 = props => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => props.openSubCategories(props.item.id, props.item.name)}
  >
    <ImageLoad
      resizeMode='cover'
      key={props.id}
      style={{
        height: HEIGHT * 0.28,
        width: props.viewButton ? WIDTH * 0.473 : WIDTH * 0.43,
        overflow: 'hidden'
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
        marginTop: 1,
        paddingTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        backgroundColor: 'white',
        alignContent: 'center'
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          color: '#000',
          fontSize: theme.smallSize,
          textAlign: 'center'
        }}
      >
        {props.item.name}
      </Text>
      <Text
        style={{
          color: '#000',
          fontSize: theme.smallSize - 2,
          textAlign: 'center'
        }}
      >{`${props.item.count} ${props.products}`}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5
  }
});
