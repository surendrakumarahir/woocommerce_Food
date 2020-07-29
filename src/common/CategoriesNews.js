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
Width2 = WIDTH * 0.5;
export default (Category1 = props => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => props.openSubCategories2(props.item)}
  >
    <ImageLoad
      key={props.id}
      style={{
        height: 170,
        width: Width2 * 0.93,
        overflow: 'hidden'
      }}
      loadingStyle={{ size: 'large', color: theme.loadingIndicatorColor }}
      placeholder={false}
      ActivityIndicator={true}
      placeholderStyle={{width: 0, height: 0}}
      backgroundColor='transparent'
      color='transparent'
      source={{ uri: props.posts2[props.id].image }}
    />

    <View
      style={{
        paddingTop: 3,
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
          fontSize: theme.mediumSize + 2
        }}
      >
        {props.item.slug}
      </Text>
      <Text
        style={{ color: 'gray', fontSize: theme.smallSize, fontWeight: '600' }}
      >{`${props.item.count} ${'Posts'}`}</Text>
    </View>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Width2 * 0.93,
    padding: 16,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 5,
    margin: 5,
    paddingTop: 0,
    paddingBottom: 3
  }
});
