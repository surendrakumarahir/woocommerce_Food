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
Width2 = WIDTH;
export default (Category3 = props => (
  <TouchableOpacity style={styles.container} onPress={() => props.openSubCategories(props.item.id, props.item.name)}>
    <ImageLoad
      key={props.id}
      style={{
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
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
        backfaceVisibility: 'hidden',
        backgroundColor: 'white',
        alignContent: 'center'
      }}
    >
      <Text style={{ fontWeight: 'bold', color: '#000', fontSize: theme.mediumSize }}>{props.item.name}</Text>
      <Text style={{ color: '#000', fontSize: theme.smallSize }}>{`${props.item.count} ${
        props.products
      }`}</Text>
    </View>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Width2,
    padding: 8,
    borderColor: 'gray',
    flexDirection: 'row'
  },
  button: {
    borderWidth: 1,
    padding: 25,
    borderColor: 'black'
  }
});
