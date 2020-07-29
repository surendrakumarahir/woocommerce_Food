/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable prefer-template */
/* eslint-disable import/newline-after-import */
/* eslint-disable semi */
/* eslint-disable no-unused-expressions */

import React, { Component } from 'react'
import {
  View,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators';
import { Container, Content, ListItem, CheckBox, Text, Body } from 'native-base'
import { CardStyleInterpolators } from 'react-navigation-stack';
import SyncStorage from 'sync-storage'
import RNRestart from 'react-native-restart'
import { connect } from 'react-redux'
import themeStyle from '../common/Theme.style'
import ShoppingCartIcon from '../common/ShoppingCartIcon';

class currencyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
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
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: 'Select Currency'
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      currency: {},
      currencyList: [],
      currentCurrencySymbol: SyncStorage.get('currency'),
      temp: 0,
      tick: [],
      isLoading: true
    }
    this.getListOfCurrency()
  }

  getListOfCurrency = () => {
    fetch(
      this.props.isLoading.Config.url +
        '/api/reactappsettings/react_get_all_currencies/?insecure=cool',
      {
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.state.currencyList = responseJson.data
        this.state.currencyList.forEach(val => {
          if (val.symbol === this.state.currentCurrencySymbol) {
            this.state.currency = val
          }
        })
        this.setState({ isLoading: false })
      })
      .catch(error => {
        console.log(error)
      })
  }
  /// //////////////////////////////////////////
  updateCurrency(item, index) {
    if (this.state.currentCurrencySymbol !== item.code) {
      SyncStorage.set('currencyObject', item)
      SyncStorage.set('currency', item.symbol)
      SyncStorage.set('currencyCode', item.name)
      SyncStorage.set('currencyPos', item.position)
      SyncStorage.set('decimals', item.decimals)
      if (item.languageCode !== undefined) {
        SyncStorage.set('languageCode', item.languageCode)
      }
      SyncStorage.set('wishListProducts', [])
      SyncStorage.set('recentViewedProducts', [])
      SyncStorage.set('cartProducts', [])
      this.state.tick[index] = true
      this.setState({ temp: 0 })
      setTimeout(() => {
        RNRestart.Restart()
      }, 200)
    }
  }

  render() {
    return this.state.isLoading ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: themeStyle.backgroundColor
        }}
      >
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <Container>
        <Content>
          <FlatList
            data={this.state.currencyList}
            horizontal={false}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <View>
                <ListItem>
                  <TouchableOpacity
                    onPress={() => this.updateCurrency(item.item, item.index)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{ uri: item.item.flag }}
                      resizeMode={'contain'}
                    />
                    <Body>
                      <Text>{item.item.name}</Text>
                    </Body>
                    <CheckBox
                      onPress={() => this.updateCurrency(item.item, item.index)}
                      checked={
                        !!(
                          this.state.tick[item.index] ||
                          SyncStorage.get('currency') === item.item.symbol
                        )
                      }
                    />
                  </TouchableOpacity>
                </ListItem>
              </View>
            )}
          />
        </Content>
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  isLoading: state
})

export default connect(
  mapStateToProps,
  null
)(currencyScreen)
