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
import ImageLoad from './RnImagePlaceH';;
import theme from './Theme.style';
WIDTH = Dimensions.get('window').width;
Width2 = WIDTH * 0.5;
export default (Category1 = props => (
  <TouchableOpacity style={styles.container} onPress={() => props.openSubCategories(props.item.id, props.item.name)}>
    <ImageLoad
      key={props.id}
      style={{
        height: 70,
        width: 70,
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
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        backgroundColor: 'white',
        alignContent: 'center'
      }}
    >
      <Text style={{ fontWeight: 'bold', color: '#000', fontSize: theme.mediumSize, textAlign: 'center' }}>{props.item.name}</Text>
      <Text style={{ color: '#000', fontSize: theme.smallSize, textAlign: 'center' }}>{`${props.item.count} ${
        props.products
      }`}</Text>
    </View>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Width2,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
    borderRadius: 1,
  },
});
