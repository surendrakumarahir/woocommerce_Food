/* eslint-disable no-useless-escape */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
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
  ScrollView,
  Platform,
  Image,
  I18nManager,
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
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from 'react-native-underline-tabbar'
import FlatListView from '../common/FlatListView'
import CategoryFlatList from '../common/CategoriesFlatList'
import themeStyle from '../common/Theme.style'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import MenuIcon from '../common/MenuIcon'
HEIGHT = Dimensions.get('window').height
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
      cartItems2: true,
      page: 2,
      products:
        this.props.cartItems2.sharedData.products !== undefined &&
        this.props.cartItems2.sharedData.products !== null
          ? this.props.cartItems2.sharedData.products
          : [],
      refreshing: false,
      fabB: false,
      selected: '',
      timeValue: 400,
      length: this.props.cartItems2.cartItems.recentViewedProducts.length,
      selectedTab: '',
      productView: 'grid',
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
          height: 130,
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
          fabB: this.state.products.length > 9,
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
        marginBottom: this.state.refreshing ? 50 : 10,
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
    // }
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
  categoryFun (text, iconName, sort) {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor:
            this.props.cartItems2.Config.card_style === 11 ||
            this.props.cartItems2.Config.card_style === 12 ||
            this.props.cartItems2.Config.card_style === 15
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
              fontSize: themeStyle.smallSize - 1,
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
              sort === 'shop'
                ? this.props.navigation.navigate('Category2')
                : this.props.navigation.navigate('NewestScreen', {
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
                  fontSize: themeStyle.smallSize - 2,
                }}>
                {this.props.cartItems2.Config.languageJson['SHOP MORE']}
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
                // paddingTop: 4,
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
          numColumns={2}
          ref={ref => {
            this.flatListRef = ref
          }}
          ListFooterComponent={() => this.renderFooter()}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={{
            paddingLeft:
              WIDTH >= 375
                ? WIDTH * 0.009
                : WIDTH >= 360 && WIDTH <= 75
                ? WIDTH * 0.008
                : WIDTH * 0.007,
            padding: 2,
            paddingBottom: 0,
            marginBottom: 0,
            paddingTop: 0,
            marginTop: 0,
          }}
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
              <View
                style={{
                  backgroundColor:
                    this.props.cartItems2.Config.card_style === 11 ||
                    this.props.cartItems2.Config.card_style === 12 ||
                    this.props.cartItems2.Config.card_style === 15
                      ? '#F2F2F2'
                      : themeStyle.backgroundColor,
                }}>
                {this.categoryFun(
                  this.props.cartItems2.Config.languageJson.Categories,
                  'apps',
                  'shop',
                )}
                <CategoryFlatList
                  dataSource={this.props.cartItems2.cartItems.categories}
                  products={this.props.cartItems2.Config.languageJson.Products}
                  allCategories={this.props.cartItems2.cartItems.allCategories}
                  props={this.props}
                  noOfCol={3}
                  categoryPage={1}
                  vertical={false}
                  noShadow
                  sizeChange
                />
                <View>
                  <ScrollableTabView
                    style={{
                      height:
                        this.props.cartItems2.Config.card_style === 12
                          ? themeStyle.singleRowCardWidth * 1.62
                          : this.props.cartItems2.Config.card_style === 9 ||
                            this.props.cartItems2.Config.card_style === 10 ||
                            this.props.cartItems2.Config.card_style === 13 ||
                            this.props.cartItems2.Config.card_style === 16 ||
                            this.props.cartItems2.Config.card_style === 19 ||
                            this.props.cartItems2.Config.card_style === 7
                          ? themeStyle.singleRowCardWidth * 1.69
                          : this.props.cartItems2.Config.card_style === 11 ||
                            this.props.cartItems2.Config.card_style === 6
                          ? themeStyle.singleRowCardWidth * 1.66
                          : this.props.cartItems2.Config.cartButton ||
                            this.props.cartItems2.Config.card_style === 8 ||
                            this.props.cartItems2.Config.card_style === 15 ||
                            this.props.cartItems2.Config.card_style === 18
                          ? themeStyle.singleRowCardWidth * 1.88
                          : this.props.cartItems2.Config.card_style === 17
                          ? themeStyle.singleRowCardWidth * 1.93
                          : this.props.cartItems2.Config.card_style === 4 ||
                            this.props.cartItems2.Config.card_style === 20
                          ? themeStyle.singleRowCardWidth * 1.76
                          : this.props.cartItems2.Config.card_style === 3 ||
                            this.props.cartItems2.Config.card_style === 22
                          ? themeStyle.singleRowCardWidth * 1.838
                          : themeStyle.singleRowCardWidth * 1.738,
                    }}
                    tabBarActiveTextColor={themeStyle.primaryDark}
                    locked={I18nManager.isRTL ? true : false}
                    renderTabBar={() => (
                      <TabBar
                        style={{
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                        underlineColor={themeStyle.primaryDark}
                        inactiveTextColor='#707070'
                        backgroundColor={'#fff'}
                        tabBarStyle={{
                          height: 46,
                          marginTop: 0,
                          paddingTop: 12,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: -16,
                          width: '109%',
                        }}
                        tabBarTextStyle={{
                          fontSize: themeStyle.smallSize,
                          width: WIDTH * 0.4182 - 48,
                          textAlign: 'center',
                        }}
                      />
                    )}>
                    {/* Newest Viewed */}
                    <ScrollView
                      tabLabel={{
                        label: this.props.cartItems2.Config.languageJson.NEWEST,
                      }}>
                      <FlatListView
                        vertical
                        viewButton
                        navigation={this.props.navigation}
                        dataName={'Newest'}
                        tabArray={
                          this.props.cartItems2.sharedData.tab1 !== undefined &&
                          this.props.cartItems2.sharedData.tab1 !== null
                            ? this.props.cartItems2.sharedData.tab1
                            : []
                        }
                      />
                    </ScrollView>
                    {/* Deals Viewed */}
                    <ScrollView
                      tabLabel={{
                        label: this.props.cartItems2.Config.languageJson[
                          'ON SALE'
                        ],
                      }}>
                      <FlatListView
                        vertical
                        viewButton
                        navigation={this.props.navigation}
                        dataName={'Deals'}
                        tabArray={
                          this.props.cartItems2.sharedData.tab2 !== undefined &&
                          this.props.cartItems2.sharedData.tab2 !== null
                            ? this.props.cartItems2.sharedData.tab2
                            : []
                        }
                      />
                    </ScrollView>
                    {/* Featured Viewed */}
                    <ScrollView
                      tabLabel={{
                        label: this.props.cartItems2.Config.languageJson
                          .FEATURED,
                      }}>
                      <FlatListView
                        vertical
                        viewButton
                        navigation={this.props.navigation}
                        dataName={'Featured'}
                        tabArray={
                          this.props.cartItems2.sharedData.tab3 !== undefined &&
                          this.props.cartItems2.sharedData.tab3 !== null
                            ? this.props.cartItems2.sharedData.tab3
                            : []
                        }
                      />
                    </ScrollView>
                  </ScrollableTabView>
                </View>

                {/* Recently Viewed */}

                {this.state.length > 0 ? (
                  <View
                    style={{
                      backgroundColor:
                        this.props.cartItems2.Config.card_style === 11 ||
                        this.props.cartItems2.Config.card_style === 12 ||
                        this.props.cartItems2.Config.card_style === 15
                          ? '#F2F2F2'
                          : themeStyle.backgroundColor,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor:
                          this.props.cartItems2.Config.card_style === 11 ||
                          this.props.cartItems2.Config.card_style === 12 ||
                          this.props.cartItems2.Config.card_style === 15
                            ? '#F2F2F2'
                            : themeStyle.backgroundColor,
                        marginLeft: 10,
                      }}>
                      <Icon
                        name={'list'}
                        style={{
                          color: themeStyle.primary,
                          fontSize: 15,
                          paddingTop: 10,
                          padding: 10,
                          paddingLeft: 0,
                          paddingBottom: 4,
                        }}
                      />
                      <Text
                        style={{
                          color: themeStyle.primary,
                          fontSize: themeStyle.smallSize + 1,
                          fontWeight: '400',
                          padding: 10,
                          paddingTop: Platform.OS === 'android' ? 8 : 10,
                          paddingLeft: 0,
                          paddingRight: 5,
                          paddingBottom: 2,
                        }}>
                        {
                          this.props.cartItems2.Config.languageJson[
                            'Recently Viewed'
                          ]
                        }{' '}
                      </Text>
                    </View>
                    <FlatListView vertical dataName={'RecentlyViewed'} />
                  </View>
                ) : null}
                {this.props.cartItems2.Config.vendorEnable !== '0' ? (
                  <View
                    style={{
                      backgroundColor:
                        this.props.cartItems2.Config.card_style === 11 ||
                        this.props.cartItems2.Config.card_style === 12 ||
                        this.props.cartItems2.Config.card_style === 15
                          ? '#F2F2F2'
                          : themeStyle.backgroundColor,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor:
                          this.props.cartItems2.Config.card_style === 11 ||
                          this.props.cartItems2.Config.card_style === 12 ||
                          this.props.cartItems2.Config.card_style === 15
                            ? '#F2F2F2'
                            : themeStyle.backgroundColor,
                        marginLeft: 10,
                      }}>
                      <Icon
                        name={'list'}
                        style={{
                          color: themeStyle.primary,
                          fontSize: 15,
                          paddingTop: 10,
                          padding: 10,
                          paddingLeft: 0,
                          paddingBottom: 4,
                        }}
                      />
                      <Text
                        style={{
                          color: themeStyle.primary,
                          fontSize: themeStyle.smallSize + 1,
                          fontWeight: '400',
                          padding: 10,
                          paddingTop: Platform.OS === 'android' ? 8 : 10,
                          paddingLeft: 0,
                          paddingRight: 5,
                          paddingBottom: 2,
                        }}>
                        {this.props.cartItems2.Config.languageJson.Vendors}{' '}
                      </Text>
                    </View>
                    <FlatListView
                      props={this.props}
                      navigation={this.props.navigation}
                      vertical
                      dataName={'Vendors'}
                      tabArray={
                        this.props.cartItems2.sharedData.vendorData !==
                          undefined &&
                        this.props.cartItems2.sharedData.vendorData !== null
                          ? this.props.cartItems2.sharedData.vendorData
                          : []
                      }
                    />
                  </View>
                ) : // ) : null
                null}
              </View>

              <View style={{height: 38, width: WIDTH}}>
                {this.categoryFun(
                  this.props.cartItems2.Config.languageJson['All Products'],
                  'bookmark',
                  'newest',
                )}
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
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
                    marginTop: 5,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={item => null}
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
/// /////////////////////////////////////////////
