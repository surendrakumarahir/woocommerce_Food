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
export default (Category2 = props => (
  <TouchableOpacity style={styles.container} onPress={() => props.openSubCategories(props.item.id, props.item.name)}>
    <ImageLoad
      key={props.id}
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
        backfaceVisibility: 'hidden',
        backgroundColor: 'white',
        alignContent: 'center'
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: theme.mediumSize, color: '#000' }}>{props.item.name}</Text>
      <Text style={{ color: '#000', fontSize: theme.smallSize, paddingTop: 3 }}>{`${props.item.count} ${
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
});
