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
  Dimensions
} from 'react-native';
import ImageLoad from './RnImagePlaceH';;
import theme from './Theme.style';
WIDTH = Dimensions.get('window').width;
Width2 = WIDTH;
export default (Category5 = props => (
  <TouchableOpacity
    style={{
      justifyContent: 'space-between',
       alignItems: 'center',
      backgroundColor: props.header ? '#d3d3d3' : 'white',
      width: WIDTH,
      padding: 8,
      borderColor: 'gray',
      flexDirection: 'row'
    }}
    onPress={() => props.openSubCategories(props.item.id, props.item.name)}
  >
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backfaceVisibility: 'hidden',
        backgroundColor: props.header ? '#d3d3d3' : 'white',
        alignContent: 'center'
      }}
    >
      <Text
        style={{
          fontSize: props.header ? theme.largeSize : theme.mediumSize,
          color: '#000',
          fontWeight: props.header ? 'bold' : '600'
        }}
      >
        {props.item.name}
      </Text>
      {!props.header ? (
        <Text style={{ color: '#000', fontSize: theme.smallSize, paddingTop: 3, fontWeight: '400' }}>{`${
          props.item.count
        } ${props.products}`}</Text>
      ) : null}
    </View>
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
  </TouchableOpacity>
));
