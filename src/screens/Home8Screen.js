/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-no-undef */
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
  TouchableOpacity,
  I18nManager,
  Linking,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators'
import {CardStyleInterpolators} from 'react-navigation-stack'
import Spinner from 'react-native-loading-spinner-overlay'
import {NavigationEvents} from 'react-navigation'
import WooComFetch from '../common/WooComFetch'
import FlatListView from '../common/FlatListView'
import {withNavigation} from 'react-navigation'
import {Icon} from 'native-base'
import CategoryFlatList from '../common/CategoriesFlatList'
// eslint-disable-next-line import/newline-after-import
import {connect} from 'react-redux'
import themeStyle from '../common/Theme.style'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import MenuIcon from '../common/MenuIcon'
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
  categoryFun (text, iconName, sort) {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor:
            this.props.isLoading.Config.card_style === 11 ||
            this.props.isLoading.Config.card_style === 12 ||
            this.props.isLoading.Config.card_style === 15
              ? '#F2F2F2'
              : themeStyle.backgroundColor,
          marginLeft: 10,
          justifyContent: 'space-between',
          padding: 3,
          paddingBottom: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Icon
            name={iconName}
            style={{
              fontSize: 14,
              paddingTop: 10,
              padding: 10,
              paddingLeft: 0,
              color: themeStyle.primary,
              paddingBottom: 4,
            }}
          />
          <Text
            style={{
              fontSize: themeStyle.smallSize,
              fontWeight: '400',
              padding: 10,
              paddingTop: Platform.OS === 'android' ? 8 : 10,
              paddingLeft: 0,
              paddingRight: 5,
              paddingBottom: 2,
              color: themeStyle.primary,
            }}>
            {text}{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              margin: 5,
              marginRight: 3,
              marginTop: 6,
              alignItems: 'center',
            }}
            onPress={() =>
              this.props.navigation.navigate('NewestScreen', {
                id: this.props.parentId,
                name: '',
                sortOrder: sort,
              })
            }>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: themeStyle.addToCartBtnColor,
                  fontSize: themeStyle.smallSize - 1,
                }}>
                {this.props.isLoading.Config.languageJson['SHOP MORE']}
              </Text>
              <Icon
                name={
                  !I18nManager.isRTL
                    ? 'md-arrow-dropright'
                    : 'md-arrow-dropleft'
                }
                style={{
                  color: themeStyle.addToCartBtnColor,
                  fontSize: 16,
                  paddingTop: 2,
                  paddingLeft: !I18nManager.isRTL ? 8 : 8,
                  paddingRight: I18nManager.isRTL ? 8 : 8,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  lastElements (text, iconName, textTwo) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name={iconName}
          style={{
            color: themeStyle.addToCartBtnColor,
            fontSize: 22,
            paddingTop: 2,
            paddingLeft: !I18nManager.isRTL ? 8 : 8,
            paddingRight: I18nManager.isRTL ? 8 : 8,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: themeStyle.largeSize,
          }}>
          {text}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: themeStyle.mediumSize - 1,
          }}>
          {textTwo}
        </Text>
      </View>
    )
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
            <Spinner visible={this.state.SpinnerTemp} />

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
            <CategoryFlatList
              dataSource={this.props.isLoading.cartItems.categories}
              products={this.props.isLoading.Config.languageJson.Products}
              allCategories={this.props.isLoading.cartItems.allCategories}
              props={this.props}
              noOfCol={1}
              categoryPage={1}
              vertical
              noShadow
              sizeChange
            />
            <View style={{flex: 1}}>
              {this.categoryFun(
                this.props.isLoading.Config.languageJson.Newest,
                'albums',
                'newest',
              )}
              <FlatListView
                vertical
                dataName={'Newest'}
                viewButton={false}
                navigation={this.props.navigation}
                tabArray={
                  this.props.isLoading.sharedData.tab1 !== undefined &&
                  this.props.isLoading.sharedData.tab1 !== null
                    ? this.props.isLoading.sharedData.tab1
                    : []
                }
              />
              {this.categoryFun(
                this.props.isLoading.Config.languageJson['On Sale'],
                'bookmark',
                'sale',
              )}
              <FlatListView
                vertical
                dataName={'Deals'}
                viewButton={false}
                navigation={this.props.navigation}
                tabArray={
                  this.props.isLoading.sharedData.tab2 !== undefined &&
                  this.props.isLoading.sharedData.tab2 !== null
                    ? this.props.isLoading.sharedData.tab2
                    : []
                }
              />
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
                        fontSize: themeStyle.smallSize,
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
                        fontSize: themeStyle.smallSize,
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
                    viewButton={false}
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
              {this.categoryFun(
                this.props.isLoading.Config.languageJson.Featured,
                'star',
                'featured',
              )}
              <FlatListView
                vertical={false}
                dataName={'Featured'}
                viewButton={false}
                noOfCol={2}
                navigation={this.props.navigation}
                tabArray={
                  this.props.isLoading.sharedData.tab3 !== undefined
                    ? this.props.isLoading.sharedData.tab3
                    : []
                }
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  marginBottom: 20,
                  paddingTop: 5,
                }}>
                {this.lastElements(
                  this.props.isLoading.Config.languageJson['Contact Us'],
                  'aperture',
                  this.props.isLoading.Config.phoneNo,
                )}
                {this.lastElements(
                  this.props.isLoading.Config.languageJson['Safe Payment'],
                  'aperture',
                  this.props.isLoading.Config.languageJson[
                    'Secure Online Payment'
                  ],
                )}
              </View>
            </View>
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
    backgroundColor: themeStyle.backgroundColor,
  },
})
