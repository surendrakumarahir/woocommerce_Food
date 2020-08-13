import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators'
import {withNavigation, NavigationEvents} from 'react-navigation'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import MenuIcon from '../common/MenuIcon'
import {CardStyleInterpolators} from 'react-navigation-stack'
import {connect} from 'react-redux'
import WooComFetch from '../common/WooComFetch'
import SyncStorage from 'sync-storage'
import {Icon} from 'native-base'
import themeStyle from '../common/Theme.style'
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
class RewardPoints extends Component {
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      headerLeft: () => <MenuIcon navigation={navigation} />,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      // headerRight: () => <ShoppingCartIcon navigation={navigation} />,
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
    }
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['Customer Orders'],
    })
  }
  /// /////////////////
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      orders: [],
      loading: true,
      refreshing: false,
      isRefreshing: false, // for pull to refresh
    }
    this.getOrders()
  }
  /// ////////////////
  addCurrecny = (order, v2) => `${order.currency} ${v2}`
  /// /////////////////
  onRefreshTemp () {
    this.setState({isRefreshing: true, page: 1}, () => {
      this.onRefresh()
    })
  }
  /// //////////
  onRefresh = async () => {
    console.log(SyncStorage.get('customerData').id)
    const data = await WooComFetch.getOrders(
      this.props.isLoading.Config.productsArguments,
      this.state.page,
      SyncStorage.get('customerData').id,
    )
    console.log(data)
    if (data.length !== 0) {
      this.state.orders = []
      for (const value of data) {
        this.state.orders.push(value)
      }
    }
    this.setState({isRefreshing: false, loading: false})
  }
  /// ////////
  getOrders = async () => {
    
    console.log(SyncStorage.get('customerData').id)
    const data = await WooComFetch.getOrders(
      this.props.isLoading.Config.productsArguments,
      this.state.page,
      SyncStorage.get('customerData').id,
    )
    console.log(data)
    if (data.length !== 0) {
      this.state.orders=[];
      for (const value of data) {
        this.state.orders.push(value)
      }
    }
    this.setState({page: this.state.page++, loading: false})
  }

  temp = () => {
    this.setState({refreshing: true, page: this.state.page + 1}, () => {
      this.handler()
    })
  }

  handler = async () => {
    const data = await WooComFetch.getOrders(
      this.props.isLoading.Config.productsArguments,
      this.state.page,
      SyncStorage.get('customerData').id,
    )
    if (data.length !== 0) {
      this.state.orders=[];
      for (const value of data) {
        this.state.orders.push(value)
      }
    }
    this.setState({refreshing: false})
  }
  singaleRow (placeholderText, name, check, Status) {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          padding: 6,
          flexDirection: 'row',
          backgroundColor:
            Status === 'Status' && name === 'pending'
              ? 'yellow'
              : Status === 'Status' && name === 'refunded'
              ? 'orange'
              : Status === 'Status' && name === 'cancelled'
              ? 'red'
              : Status === 'Status' && name === 'failed'
              ? 'gray'
              : Status === 'Status' && name === 'processing'
              ? 'blue'
              : Status === 'Status' && name === 'completed'
              ? 'green'
              : 'white',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: themeStyle.mediumSize,
            fontWeight: Status === 'Status' ? 'bold' : 'normal',
            color:
              Status === 'Status' && name === 'pending'
                ? 'white'
                : Status === 'Status' && name === 'refunded'
                ? 'white'
                : Status === 'Status' && name === 'cancelled'
                ? 'white'
                : Status === 'Status' && name === 'failed'
                ? 'white'
                : Status === 'Status' && name === 'processing'
                ? 'white'
                : Status === 'Status' && name === 'completed'
                ? 'white'
                : 'black',
            paddingTop: 3,
          }}>
          {placeholderText}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            fontSize: themeStyle.mediumSize,
            color:
              Status === 'Status' && name === 'pending'
                ? 'white'
                : Status === 'Status' && name === 'refunded'
                ? 'white'
                : Status === 'Status' && name === 'cancelled'
                ? 'white'
                : Status === 'Status' && name === 'failed'
                ? 'white'
                : Status === 'Status' && name === 'processing'
                ? 'white'
                : Status === 'Status' && name === 'completed'
                ? 'white'
                : 'black',
            fontWeight: check === 1 ? 'bold' : 'normal',
          }}>
          {name}
        </Text>
      </View>
    )
  }
  renderFooter = () => (
    <View
      style={{
        marginBottom: 30,
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
      }}>
      {this.state.refreshing && this.state.orders.length !== 0 ? (
        <View style={{height: 20, marginTop: 30}}>
          <UIActivityIndicator
            size={27}
            count={12}
            color={themeStyle.loadingIndicatorColor}
          />
        </View>
      ) : null}
    </View>
  )

  render () {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: themeStyle.backgroundColor,
          paddingTop: 6,
        }}>
        {this.state.orders.length === 0 &&
        !this.state.loading &&
        !this.state.isRefreshing &&
        !this.state.refreshing ? (
          <View style={styles.container}>
            <NavigationEvents
              onDidFocus={() => {
                this.setState({loading: true, page: 1, orders: []}, () => {
                  this.onRefresh()
                })
              }}
            />
            <Icon name={'basket'} style={{color: 'gray', fontSize: 80}} />
            <View>
              <Text style={styles.welcome}>
                {
                  this.props.isLoading.Config.languageJson[
                    'Your Order List is Empty'
                  ]
                }
              </Text>
              <Text style={styles.textStyle}>
                {this.props.isLoading.Config.languageJson['Continue Shopping']}
              </Text>
              <TouchableOpacity
                style={{paddingTop: 5, width: 90, alignSelf: 'center'}}
                onPress={() =>
                  this.props.navigation.navigate('NewestScreen', {
                    id: undefined,
                    // eslint-disable-next-line no-undef
                    name: undefined,
                    sortOrder: 'Newest',
                  })
                }>
                <View
                  style={{
                    alignItems: 'center',
                    height: 33,
                    width: 90,
                    backgroundColor: themeStyle.otherBtnsColor,
                    justifyContent: 'center',
                    elevation: 0.3,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 16,
                    }}>
                    {this.props.isLoading.Config.languageJson.Explore}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {/* ///////////////////////////////// */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: themeStyle.backgroundColor,
          }}>
          {this.state.loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <UIActivityIndicator
                size={27}
                color={themeStyle.loadingIndicatorColor}
              />
              <NavigationEvents
                onDidFocus={() => {
                  this.setState({loading: true, page: 1, orders: []}, () => {
                    this.onRefresh()
                  })
                }}
              />
            </View>
          ) : (
            <FlatList
              data={this.state.orders}
              extraData={this.state}
              listKey={'products'}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={() => this.renderFooter()}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefreshTemp.bind(this)}
                />
              }
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false
              }}
              onEndReached={() => {
                if (!this.onEndReachedCalledDuringMomentum) {
                  this.temp()
                  this.onEndReachedCalledDuringMomentum = true
                }
              }}
              // eslint-disable-next-line no-return-assign
              renderItem={item => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.push('OrderDetail', {
                      data: item.item,
                    })
                  }}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      justifyContent: 'space-between',
                      shadowOffset: {width: 1, height: 1},
                      shadowColor: 'black',
                      shadowOpacity: 0.5,
                      margin: 10,
                      marginTop: 3,
                      marginBottom: 5,
                      elevation: 5,
                    }}>
                    <NavigationEvents
                      onDidFocus={() => {
                        this.setState(
                          {loading: true, page: 1, orders: []},
                          () => {
                            this.onRefresh()
                          },
                        )
                      }}
                    />
                    <View
                      style={{
                        justifyContent: 'space-between',
                      }}>
                      <View style={{padding: 5}}>
                        {this.singaleRow(
                          this.props.isLoading.Config.languageJson['Orders ID'],
                          `#${item.item.number}`,
                          0,
                        )}
                        {this.singaleRow(
                          this.props.isLoading.Config.languageJson.Date,
                          `${
                            monthNames[
                              new Date(item.item.date_created).getMonth()
                            ]
                          }, ${new Date(
                            item.item.date_created,
                          ).getDate()}, ${new Date(
                            item.item.date_created,
                          ).getUTCFullYear()}`,
                          0,
                        )}
                        {this.singaleRow(
                          this.props.isLoading.Config.languageJson.Price,
                          this.addCurrecny(item.item, item.item.total),
                          0,
                        )}
                        {this.singaleRow(
                          this.props.isLoading.Config.languageJson.Status,
                          item.item.status,
                          1,
                          'Status',
                        )}
                      </View>
                    </View>

                    {/* ///////////////////////////////// */}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  isLoading: state,
})

export default connect(mapStateToProps, null)(RewardPoints)

const styles = StyleSheet.create({
  container: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.backgroundColor,
  },
  welcome: {
    fontSize: themeStyle.largeSize + 2,
    textAlign: 'center',
    margin: 2,
    color: '#000',
  },
  textStyle: {
    fontSize: themeStyle.mediumSize,
    textAlign: 'center',
    margin: 2,
    color: 'gray',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
})
