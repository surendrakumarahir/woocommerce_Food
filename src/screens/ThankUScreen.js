/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/imports-first */

import React, { Component } from 'react';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { Dimensions, StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import themeStyle from '../common/Theme.style';
import { connect } from 'react-redux';
WIDTH = Dimensions.get('window').width;
 class News extends Component {

  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam(
      'headerTitle'
    );
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerRight: null,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' },
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['Cart Page']
    });
  }
  render() {
    return (
      <View style={styles.container}>
      <Icon name={'md-checkbox-outline'} style={{ color: themeStyle.otherBtnsColor, fontSize: 80 }} />
      <View>
      <Text style={styles.welcome}>
          {
            this.props.isLoading.Config.languageJson[
              'Thank You'
            ]
          }
        </Text>
      <Text style={{marginTop: -2, fontSize: themeStyle.smallSize,
      marginBottom: 10, alignSelf: 'center'}}>
          {
            this.props.isLoading.Config.languageJson[
              'Thank you for shopping with us.'
            ]
          }
        </Text>
        <TouchableOpacity 
        style={{backgroundColor: themeStyle.otherBtnsColor,
        padding: 10, justifyContent: 'center',
      alignItems: 'center', borderRadius: 4,
    width: WIDTH* 0.8}}
        onPress={()=>this.props.navigation.navigate("MyOrdersScreen")}
        >
          <Text style={{fontSize: themeStyle.mediumSize,
          color: '#ffffff'}}>
          {    this.props.isLoading.Config.languageJson[
              'My Orders'
            ]}
          </Text>
        </TouchableOpacity>
    </View>
    </View>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state
});

export default connect(
  mapStateToProps,
  null
)(News);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: themeStyle.backgroundColor,
    paddingTop: 50
    // paddingBottom: 80
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textStyle: {
    fontSize: 15,
    textAlign: 'center',
    margin: 2,
    color: 'gray'
  },
});
