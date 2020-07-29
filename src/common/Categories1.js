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
export default (Category1 = props => (
  <TouchableOpacity style={props.noShadow ? [styles.container2, { width: !props.sizeChange ? WIDTH * 0.46 : WIDTH * 0.29, padding: !props.sizeChange ? 6 : 0 }] : styles.container} onPress={() => props.openSubCategories(props.item.id, props.item.name)}>
    <ImageLoad
      key={props.id}
      style={{
        height: !props.sizeChange ? 80 : 70,
        width: !props.sizeChange ? 80 : 70,
        borderRadius: !props.sizeChange ? 80 / 2 : 70 / 2,
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
      <Text style={{ fontWeight: 'bold', color: '#000', fontSize: !props.sizeChange ? theme.mediumSize : theme.smallSize, textAlign: 'center' }}>{props.item.name}</Text>
      <Text style={{ color: '#000', fontSize: !props.sizeChange ? theme.smallSize : theme.smallSize - 2 }}>{`${props.item.count} ${
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
    width: WIDTH * 0.5,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
     borderRadius: 1,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: WIDTH * 0.46,
    padding: 10,
    margin: 6,
    marginTop: 12,
    marginBottom: 2,
     borderRadius: 1,
  }
});
