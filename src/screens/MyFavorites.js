/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/imports-first */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
/* eslint-disable import/newline-after-import */
/* eslint-disable semi */
/* eslint-disable no-unused-expressions */

import React, { Component } from 'react'
import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native'
import { CardStyleInterpolators } from 'react-navigation-stack';
import CardTem from '../common/CardTemplate'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import themeStyle from '../common/Theme.style'
import ShoppingCartIcon from '../common/ShoppingCartIcon';
import MenuIcon from '../common/MenuIcon';
WIDTH = Dimensions.get('window').width
class wishListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      gestureEnabled: true,
    }
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['My Wish List']
    })
  }
  static getDerivedStateFromProps(props) {
    return {
      wishListProducts: props.isLoading.cartItems.wishListProducts
    };
}

  constructor(props) {
    super(props)

    this.state = {
      wishListProducts: this.props.isLoading.cartItems.wishListProducts
    }
  }
  /// //////////////////////////////////////////

  render() {
    return (
      this.state.wishListProducts.length <= 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
        >
          <Icon name={'basket'} style={{ color: 'gray', fontSize: 80 }} />
          <View>
            <Text style={{ fontSize: themeStyle.largeSize + 2 }}>
              {
                this.props.isLoading.Config.languageJson[
                  'Your wish List is empty'
                ]
              }
            </Text>
            <Text
              style={{ fontSize: themeStyle.mediumSize, alignSelf: 'center' }}
            >
              {this.props.isLoading.Config.languageJson['Continue Shopping']}
            </Text>
            <TouchableOpacity
              style={{ paddingTop: 5, width: 90, alignSelf: 'center' }}
              onPress={() =>
                this.props.navigation.navigate('NewestScreen', {
                  id: undefined,
                  // eslint-disable-next-line no-undef
                  name: undefined,
                  sortOrder: 'Newest'
                })
              }
            >
              <View
                style={{
                  alignItems: 'center',
                  height: 33,
                  width: 90,
                  backgroundColor: themeStyle.otherBtnsColor,
                  justifyContent: 'center',
                  elevation: 0.3,
                  marginTop: 5
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: themeStyle.mediumSize,
                    fontWeight: '500'
                  }}
                >
                  {this.props.isLoading.Config.languageJson.Explore}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: themeStyle.backgroundColor,
            
          }}
          contentContainerStyle={{
            backgroundColor: themeStyle.backgroundColor,
            marginTop: 5
          }}
          columnWrapperStyle={{
            alignContent: 'flex-start',
             alignItems: 'flex-start',
             padding: 0,
            paddingLeft: WIDTH >= 375 ? WIDTH * 0.009 : WIDTH >= 360 && WIDTH <= 75 ? WIDTH * 0.008 : WIDTH * 0.007,
            paddingBottom: 0,
            marginBottom: 0,
            paddingTop: 0,
            marginTop: 0
          }}
          data={this.state.wishListProducts}
          horizontal={false}
          extraData={this.state}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <View>
              <CardTem
                objectArray={this.state.wishListProducts[item.index]}
                rows={false}
                removeButton
                width={WIDTH * themeStyle.twoRowCardWIdth}
              />
            </View>
          )}
        />
      )
    )
  }
}
const mapStateToProps = state => ({
  isLoading: state
})

export default connect(
  mapStateToProps,
  null
)(wishListScreen)
