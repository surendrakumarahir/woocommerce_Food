/* eslint-disable no-useless-escape */
/* eslint-disable global-require */
/* eslint-disable no-empty */
/* eslint-disable import/imports-first */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */

// eslint-disable-next-line import/newline-after-import

import React, {Component} from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators'
import {CardStyleInterpolators} from 'react-navigation-stack'
import {NavigationEvents} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import {connect} from 'react-redux'
import WooComFetch from '../common/WooComFetch'
import CardTem from '../common/CardTemplate'
import {Icon} from 'native-base'
import Loader from 'react-native-easy-content-loader'
// eslint-disable-next-line import/newline-after-import
import Banner from '../common/Banner'
import ImageLoad from '../common/RnImagePlaceH'
import themeStyle from '../common/Theme.style'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import MenuIcon from '../common/MenuIcon'
WIDTH = Dimensions.get('window').width
attributesGlobal = ''
class Newest extends Component {
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
  static getDerivedStateFromProps (props) {
    return {
      length:
        props.cartItems2.cartItems.recentViewedProducts.length !== undefined
          ? props.cartItems2.cartItems.recentViewedProducts.length
          : 0,
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      page: 2,
      products:
        this.props.cartItems2.sharedData.products !== undefined &&
        this.props.cartItems2.sharedData.products !== null
          ? this.props.cartItems2.sharedData.products
          : [],
      selected: '',
      refreshing: false,
      fabB: false,
      timeValue: 400,
      length: this.props.cartItems2.cartItems.recentViewedProducts.length,
      selectedTab: '',
      type: '',
      tempBox: [],
      loading: false,
      activityIndicatorTemp: true,
      temp: 1,
      SpinnerTemp: false,
    }
    attributesGlobal = ''
    setTimeout(() => {
      this.setState({activityIndicatorTemp: false})
    }, Math.floor(100 / 360000))
  }
  getOneProduct = async value => {
    try {
      const json2 = await WooComFetch.getOneProduct(
        value,
        this.props.cartItems2.Config.productsArguments,
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
      headerTitle: this.props.cartItems2.Config.languageJson.Home,
    })
    if (!this.props.cartItems2.sharedData.deepTemp) {
      // SyncStorage.set('uri', 'a');
      this.props.cartItems2.sharedData.deepTemp = true
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

  componentWillUnmount () {
    clearInterval(this.state.activityIndicatorTemp)
    Linking.removeEventListener('url', this.handleOpenURL)
  }
  getProducts = async () => {
    if (this.state.tempBox.includes(this.state.page)) {
    } else {
      this.state.tempBox.push(this.state.page)
      const dat = await WooComFetch.getProductsAll(
        this.props.cartItems2.Config.productsArguments,
        this.state.page,
        this.state.selected != '' ? this.state.selected : '',
      )
      if (dat.length !== 0) {
        this.state.page = this.state.page + 1
        for (const value of dat) {
          this.state.products.push(value)
        }
      }
      this.setState({refreshing: false})
    }
  }

  // changing tab
  changeTab (c) {
    this.state.page = 1
    if (c === '') {
      this.state.selected = c
      this.state.selectedTab = c
    } else {
      this.state.selected = c.id
      this.state.selectedTab = c.id
    }
    this.setState({products: [], tempBox: [], fabB: false}, () => {
      this.getProducts()
    })
  }

  renderItem = (item, index) => (
    <View>
      <Loader
        secondaryColor='rgba(208, 205, 205, 1)'
        primaryColor='rgba(218, 215, 215, 1)'
        animationDuration={this.state.timeValue}
        active
        loading={this.state.loading}
        containerStyles={{
          backgroundColor: '#fff',
          height: this.props.cartItems2.Config.cartButton
            ? Platform.OS === 'android'
              ? 260
              : 230
            : Platform.OS === 'android'
            ? 240
            : 210,
          width: WIDTH * themeStyle.twoRowCardWIdth,
          shadowOffset: {width: 1, height: 1},
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 3,
          margin: 5,
        }}
        pRows={this.props.cartItems2.Config.cartButton ? 3 : 2}
        pWidth={['100%', '100%', '80%']}
        pHeight={30}
        titleStyles={{
          height: 110,
          width: WIDTH * themeStyle.twoRowCardWIdth,
          alignSelf: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 0,
          borderWidth: 0,
          flex: 1,
        }}
        paragraphStyles={{
          paddingTop: 7,
          padding: 6,
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <CardTem
          objectArray={item.item}
          rows={this.props.vertical}
          recent={this.state.recent}
          width={WIDTH * themeStyle.twoRowCardWIdth}
        />
      </Loader>
    </View>
  )

  renderSeparator = () => (
    <View style={{height: 1, width: '100%', backgroundColor: '#ddd'}} />
  )

  handleLoadMore () {
    if (this.state.products.length % 10 === 0) {
      this.setState(
        {
          refreshing: true,
          fabB: this.state.products.length > 10,
        },
        () => {
          this.getProducts()
        },
      )
    } else {
      this.setState({
        refreshing: false,
      })
    }
  }
  renderFooter = () => (
    <View
      style={{
        marginBottom: this.state.refreshing ? 40 : 10,
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
      }}>
      {this.state.refreshing ? (
        <View
          style={{
            height: 10,
            marginTop: 25,
          }}>
          <UIActivityIndicator
            size={27}
            count={12}
            color={themeStyle.loadingIndicatorColor}
          />
        </View>
      ) : null}
    </View>
  )
  onEndReached = () => {
    this.handleLoadMore()
    this.onEndReachedCalledDuringMomentum = true
  }
  handleScroll (event) {
    if (
      this.state.fabB &&
      event.nativeEvent.contentOffset.y >= 0 &&
      event.nativeEvent.contentOffset.y < 300
    ) {
      this.setState({fabB: false})
    }
  }
  render () {
    if (
      this.props.cartItems2.sharedData.products !== undefined &&
      this.props.cartItems2.sharedData.products !== null &&
      this.props.cartItems2.sharedData.products !== [] &&
      this.props.cartItems2.sharedData.products !== '' &&
      this.state.temp === 1
    ) {
      if (this.props.cartItems2.sharedData.products.length > 0) {
        this.state.products = this.props.cartItems2.sharedData.products
        this.state.temp = 0
      }
    }

    if (this.state.products.length > 0) {
      this.state.loading = false
      this.state.timeValue = 400
      if (this.state.products.length % 10 === 0) {
        this.state.refreshing = true
      } else {
        this.state.refreshing = false
      }
      // this.state.refreshing = true;
    } else {
      this.state.loading = true
      this.state.timeValue = 400
      this.state.refreshing = false
    }
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
      <View
        style={{
          backgroundColor:
            this.props.cartItems2.Config.card_style === 11 ||
            this.props.cartItems2.Config.card_style === 12 ||
            this.props.cartItems2.Config.card_style === 15
              ? '#F2F2F2'
              : themeStyle.backgroundColor,
          flex: 1,
        }}>
        <Spinner visible={this.state.SpinnerTemp} />
        <NavigationEvents
          onDidFocus={() => {
            this.props.navigation.setParams({
              headerRight: () => <ShoppingCartIcon navigation={navigation} />,
            })
            this.setState({})
          }}
        />
        {this.state.fabB ? (
          <TouchableOpacity
            style={{
              zIndex: 5,
              position: 'absolute',
              right: 0,
              bottom: 0,
              marginRight: 25,
              marginBottom: 50,
            }}
            onPress={() => {
              this.flatListRef.scrollToOffset({animated: true, offset: 0})
              this.setState({fabB: false})
            }}>
            <View
              style={{
                alignItems: 'center',
                height: 48,
                width: 48,
                borderRadius: 400,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: themeStyle.primary,
              }}>
              <Icon
                name={'md-arrow-up'}
                style={{
                  color: '#fff',
                  paddingTop: Platform.OS === 'ios' ? 2 : 0,
                  fontSize: 22,
                }}
              />
            </View>
          </TouchableOpacity>
        ) : null}

        <FlatList
          showsVerticalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={
            this.state.products !== undefined &&
            this.state.products !== null &&
            this.state.products.length > 0
              ? this.state.products
              : ['', '', '', '', '', '', '', '', '', '']
          }
          key={this.state.productView}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ref={ref => {
            this.flatListRef = ref
          }}
          columnWrapperStyle={{
            padding: 2,
            paddingLeft:
              WIDTH >= 375
                ? WIDTH * 0.009
                : WIDTH >= 360 && WIDTH <= 75
                ? WIDTH * 0.008
                : WIDTH * 0.007,
            paddingBottom: 0,
            marginBottom: 0,
            paddingTop: 0,
            marginTop: 0,
          }}
          ListFooterComponent={() => this.renderFooter()}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            backgroundColor:
              this.props.cartItems2.Config.card_style === 11 ||
              this.props.cartItems2.Config.card_style === 12 ||
              this.props.cartItems2.Config.card_style === 15
                ? '#F2F2F2'
                : themeStyle.backgroundColor,
          }}
          extraData={this.state}
          renderItem={this.renderItem}
          ListHeaderComponent={
            <View style={{marginBottom: 5}}>
              <View>
                <View>
                  <Banner
                    navigation={this.props.navigation}
                    bannerSelect={
                      this.props.cartItems2.Config.appInProduction
                        ? 2
                        : this.props.cartItems2.Config.banner_style
                    }
                  />
                </View>
              </View>

              <View style={{height: 68, width: WIDTH}}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={this.props.cartItems2.cartItems.allCategories}
                  extraData={this.state}
                  horizontal
                  style={{
                    borderColor: '#000',
                    backgroundColor: '#fff',
                    elevation: 5,
                    shadowOffset: {width: 5, height: 1},
                    shadowColor: 'black',
                    shadowOpacity: 0.8,
                  }}
                  ListHeaderComponent={
                    this.props.cartItems2.cartItems.allCategories !== null ? (
                      <TouchableOpacity
                        disabled={this.state.selectedTab === ''}
                        onPress={() => this.changeTab('')}
                        style={{
                          borderBottomColor:
                            this.state.selectedTab === ''
                              ? themeStyle.primary
                              : 'black',
                          borderBottomWidth:
                            this.state.selectedTab === '' ? 2 : 0,
                        }}>
                        <View
                          style={{
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 5,
                            marginTop: 7,
                          }}>
                          <ImageLoad
                            key={999}
                            style={{
                              height: 30,
                              width: 30,
                              overflow: 'hidden',
                              opacity: this.state.selectedTab === '' ? 1 : 0.3,
                            }}
                            loadingStyle={{
                              size: 'large',
                              color: themeStyle.loadingIndicatorColor,
                            }}
                            placeholder={false}
                            ActivityIndicator={true}
                            placeholderStyle={{width: 0, height: 0}}
                            backgroundColor='transparent'
                            color='transparent'
                            source={require('../images/LeftMenuIcon/apps.png')}
                          />

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              fontFamily: 'Roboto',
                              padding: 10,
                              paddingBottom: 0,
                              paddingTop: 5,
                              color:
                                this.state.selectedTab === ''
                                  ? themeStyle.primary
                                  : '#707070',
                            }}>
                            {this.props.cartItems2.Config.languageJson.All}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : null
                  }
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={item => (
                    <TouchableOpacity
                      disabled={this.state.selectedTab === item.item.id}
                      onPress={() => this.changeTab(item.item)}
                      style={{
                        borderBottomColor:
                          this.state.selectedTab === item.item.id
                            ? themeStyle.primary
                            : 'black',
                        borderBottomWidth:
                          this.state.selectedTab === item.item.id ? 2 : 0,
                        marginBottom: 0,
                      }}>
                      <View
                        style={{
                          margin: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 2,
                          marginTop: 7,
                        }}>
                        <ImageLoad
                          key={
                            item.item.id !== null &&
                            item.item.id !== undefined &&
                            item.item.id !== ''
                              ? item.item.id
                              : item.index
                          }
                          style={{
                            height: 30,
                            width: 30,
                            overflow: 'hidden',
                            opacity:
                              this.state.selectedTab === item.item.id ? 1 : 0.5,
                          }}
                          loadingStyle={{
                            size: 'large',
                            color: themeStyle.loadingIndicatorColor,
                          }}
                          placeholder={false}
                          ActivityIndicator={true}
                          placeholderStyle={{width: 0, height: 0}}
                          backgroundColor='transparent'
                          color='transparent'
                          source={{
                            uri:
                              item.item.image !== null &&
                              item.item.image !== undefined &&
                              item.item.image !== ''
                                ? item.item.image.src
                                : '',
                          }}
                        />

                        <Text
                          style={{
                            // textDecorationLine:
                            //   this.state.selectedTab === item.item.id
                            //     ? 'underline'
                            //     : 'none',
                            fontSize: 14,
                            fontWeight: '400',
                            fontFamily: 'Roboto',
                            padding: 10,
                            paddingBottom: 0,
                            paddingTop: 5,

                            color:
                              this.state.selectedTab === item.item.id
                                ? themeStyle.primary
                                : '#707070',
                          }}>
                          {item.item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          }
          onScroll={this.handleScroll.bind(this)}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false
          }}
        />
      </View>
    )
  }
}
/// ///////////////////////////////////////////////
const mapStateToProps = state => ({
  cartItems2: state,
})
/// //////////////////////////////////////////
export default connect(mapStateToProps, null)(Newest)
