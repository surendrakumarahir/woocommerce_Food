/* eslint-disable import/newline-after-import */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable react/sort-comp */
/* eslint-disable import/imports-first */

/// /////////
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */

import React, {Component} from 'react'
import {
  StyleSheet, // CSS-like styles
  View,
  Dimensions,
  Text,
  FlatList,
  Platform,
  Linking,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators'
import {CardStyleInterpolators} from 'react-navigation-stack'
import {NavigationEvents} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import FlatListView from '../common/FlatListView'
import WooComFetch from '../common/WooComFetch'
import {withNavigation} from 'react-navigation'
import {Icon} from 'native-base'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import MenuIcon from '../common/MenuIcon'
// eslint-disable-next-line import/newline-after-import
import Banner from '../common/Banner'
import {connect} from 'react-redux'
import themeStyle from '../common/Theme.style'
const {width} = Dimensions.get('window')
const pageNumbers = [1]
class Home1 extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: () => <MenuIcon navigation={navigation} />,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: themeStyle.homeTitle,
    headerRight: () => <ShoppingCartIcon navigation={navigation} />,
    headerTitleAlign: 'center',
    headerTintColor: themeStyle.headerTintColor,
    headerStyle: {
      backgroundColor: themeStyle.primary,
    },
    headerTitleStyle: {
      fontWeight: Platform.OS === 'android' ? 'bold' : 'normal',
    },
    headerForceInset: {top: 'never', vertical: 'never'},
    gestureEnabled: true,
  })
  getOneProduct = async value => {
    try {
      const json2 = await WooComFetch.getOneProduct(
        value,
        this.props.isLoading.Config.productsArguments,
      )
      this.setState({SpinnerTemp: false}, () => {
        this.navigate(json2[0])
      })
    } catch (err) {
      console.log(err)
      this.setState({SpinnerTemp: false})
    }
  }
  handleOpenURL = event => {
    // D
    if (event.url !== '' && event.url !== undefined && event.url !== null) {
      const route = event.url.replace(/.*?:\/\//g, '')
      const id = route.match(/\/([^\/]+)\/?$/)[1]
      if (id !== '' && id !== undefined && id !== null) {
        this.setState({SpinnerTemp: true}, () => {
          this.getOneProduct(id)
        })
      }
    }
  }
  navigate = json => {
    // E
    if (json !== '' && json !== undefined && json !== null) {
      Linking.removeEventListener('url', this.handleOpenURL)
      this.props.navigation.navigate('ProductDetails', {objectArray: json})
    }
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson.Home,
    })
    if (!this.props.isLoading.sharedData.deepTemp) {
      this.props.isLoading.sharedData.deepTemp = true
      if (Platform.OS === 'android') {
        Linking.getInitialURL().then(url => {
          if (url !== '' && url !== undefined && url !== null) {
            const route = url.replace(/.*?:\/\//g, '')
            const id = route.match(/\/([^\/]+)\/?$/)[1]
            if (id !== '' && id !== undefined && id !== null) {
              this.setState({SpinnerTemp: true}, () => {
                this.getOneProduct(id)
              })
            }
          }
        })
      } else {
        Linking.addEventListener('url', this.handleOpenURL)
      }
    }
  }

  static getDerivedStateFromProps (props) {
    return {
      length:
        props.isLoading.cartItems.recentViewedProducts.length !== undefined
          ? props.isLoading.cartItems.recentViewedProducts.length
          : 0,
    }
  }
  // eslint-disable-next-line react/sort-comp
  constructor (props) {
    super(props)
    this.state = {
      scrollEnable: true,
      images: [],
      isLoading: true,
      images2: [],
      jsonObject: [],
      jsonObject2: [],
      temp: 0,
      length: this.props.isLoading.cartItems.recentViewedProducts.length,
      recent: false,
      activityIndicatorTemp: true,
      SpinnerTemp: false,
    }
    setTimeout(() => {
      this.setState({activityIndicatorTemp: false})
    }, Math.floor(100 / 360000))
  }
  componentWillUnmount () {
    clearInterval(this.state.activityIndicatorTemp)
    Linking.removeEventListener('url', this.handleOpenURL)
  }
  render () {
    return this.state.activityIndicatorTemp ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <FlatList
        data={pageNumbers}
        showsVerticalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor:
            this.props.isLoading.Config.card_style === 11 ||
            this.props.isLoading.Config.card_style === 12 ||
            this.props.isLoading.Config.card_style === 15
              ? '#F2F2F2'
              : themeStyle.backgroundColor,
        }}
        keyExtractor={pageNumber => pageNumber.toString()}
        extraData={this.state}
        renderItem={() => (
          <View
            style={
              (styles.container1,
              {
                backgroundColor:
                  this.props.isLoading.Config.card_style === 11 ||
                  this.props.isLoading.Config.card_style === 12 ||
                  this.props.isLoading.Config.card_style === 15
                    ? '#F2F2F2'
                    : themeStyle.backgroundColor,
              })
            }>
            <Spinner
              visible={this.state.SpinnerTemp}
              // textStyle={styles.spinnerTextStyle}
            />
            <NavigationEvents
              onDidFocus={() => {
                this.props.navigation.setParams({
                  headerRight: () => (
                    <ShoppingCartIcon navigation={navigation} />
                  ),
                })
                this.setState({})
              }}
            />
            {/* <View style={styles.container}> */}
            <View>
              <Banner
                navigation={this.props.navigation}
                bannerSelect={
                  this.props.isLoading.Config.appInProduction
                    ? 1
                    : this.props.isLoading.Config.banner_style
                }
              />
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Icon
                  name={'albums'}
                  style={{
                    color: themeStyle.primary,
                    fontSize: 14,
                    paddingTop: 10,
                    padding: 10,
                    paddingBottom: 4,
                  }}
                />
                <Text
                  style={{
                    color: themeStyle.primary,
                    fontSize: themeStyle.smallSize + 1,
                    padding: 10,
                    paddingTop: Platform.OS === 'android' ? 7 : 8,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 2,
                  }}>
                  {this.props.isLoading.Config.languageJson.Newest}{' '}
                </Text>
              </View>

              <FlatListView
                vertical
                dataName={'Newest'}
                viewButton
                navigation={this.props.navigation}
                tabArray={
                  this.props.isLoading.sharedData.tab1 !== undefined &&
                  this.props.isLoading.sharedData.tab1 !== null
                    ? this.props.isLoading.sharedData.tab1
                    : []
                }
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Icon
                  name={'bookmark'}
                  style={{
                    color: themeStyle.primary,
                    fontSize: 14,
                    paddingTop: 10,
                    padding: 10,
                    paddingBottom: 4,
                  }}
                />
                <Text
                  style={{
                    color: themeStyle.primary,
                    fontSize: themeStyle.smallSize + 1,
                    padding: 10,
                    paddingTop: Platform.OS === 'android' ? 7 : 8,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 2,
                  }}>
                  {this.props.isLoading.Config.languageJson.Deals}{' '}
                </Text>
              </View>
              <FlatListView
                vertical
                dataName={'Deals'}
                viewButton
                navigation={this.props.navigation}
                tabArray={
                  this.props.isLoading.sharedData.tab2 !== undefined &&
                  this.props.isLoading.sharedData.tab2 !== null
                    ? this.props.isLoading.sharedData.tab2
                    : []
                }
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Icon
                  name={'star'}
                  style={{
                    color: themeStyle.primary,
                    fontSize: 15,
                    paddingTop: 10,
                    padding: 10,
                    paddingBottom: 4,
                    paddingRight: 5,
                  }}
                />
                <Text
                  style={{
                    color: themeStyle.primary,
                    fontSize: themeStyle.smallSize + 1,
                    padding: 10,
                    paddingTop: Platform.OS === 'android' ? 8 : 8,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 2,
                  }}>
                  {this.props.isLoading.Config.languageJson.Featured}{' '}
                </Text>
              </View>

              <FlatListView
                vertical
                dataName={'Featured'}
                viewButton
                navigation={this.props.navigation}
                tabArray={
                  this.props.isLoading.sharedData.tab3 !== undefined
                    ? this.props.isLoading.sharedData.tab3
                    : []
                }
              />
              {this.props.isLoading.Config.vendorEnable !== '0' ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name={'person'}
                      style={{
                        color: themeStyle.primary,
                        fontSize: 19,
                        paddingTop: 10,
                        padding: 10,
                        paddingBottom: 4,
                      }}
                    />
                    <Text
                      style={{
                        color: themeStyle.primary,
                        fontSize: themeStyle.smallSize + 1,
                        padding: 10,
                        paddingTop: Platform.OS === 'android' ? 7 : 8,
                        paddingLeft: 0,
                        paddingRight: 0,
                        paddingBottom: 2,
                      }}>
                      {this.props.isLoading.Config.languageJson.Vendors}{' '}
                    </Text>
                  </View>
                  <FlatListView
                    props={this.props}
                    navigation={this.props.navigation}
                    vertical
                    dataName={'Vendors'}
                    tabArray={
                      this.props.isLoading.sharedData.vendorData !==
                        undefined &&
                      this.props.isLoading.sharedData.vendorData !== null
                        ? this.props.isLoading.sharedData.vendorData
                        : []
                    }
                  />
                </View>
              ) : null}
            </View>

            {this.state.length > 0 ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={'list'}
                    style={{
                      color: themeStyle.primary,
                      fontSize: 19,
                      paddingTop: 10,
                      padding: 10,
                      paddingBottom: 4,
                    }}
                  />
                  <Text
                    style={{
                      color: themeStyle.primary,
                      fontSize: themeStyle.smallSize + 1,
                      padding: 10,
                      paddingTop: Platform.OS === 'android' ? 8 : 8,
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingBottom: 2,
                    }}>
                    {
                      this.props.isLoading.Config.languageJson[
                        'Recently Viewed'
                      ]
                    }{' '}
                  </Text>
                </View>
                <FlatListView vertical dataName={'RecentlyViewed'} />
              </View>
            ) : null}
          </View>
        )}
      />
    )
  }
}
const mapStateToProps = state => ({
  isLoading: state,
})
export default connect(mapStateToProps, null)(withNavigation(Home1))

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    width,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
