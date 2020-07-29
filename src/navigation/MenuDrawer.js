/* eslint-disable no-undef */
/* eslint-disable import/newline-after-import */
/* eslint-disable max-len */
/* eslint-disable import/imports-first */
/* eslint-disable no-unused-expressions */
/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import React, {Component} from 'react'
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  UIManager,
  TouchableOpacity,
  Platform,
  Dimensions,
  StatusBar,
  ImageBackground,
  FlatList,
  I18nManager,
} from 'react-native'

import theme from '../common/Theme.style.js'
import RateUsButton from '../screens/RateUs'
import ShareAppButton from '../screens/ShareApp'
import {Container, Content, ListItem, CheckBox, Body, Icon} from 'native-base'
import ExpandableListView from './ExpandableListView'
import {connect} from 'react-redux'
import SyncStorage from 'sync-storage'
import ImageLoad from '../common/RnImagePlaceH'
const pageNumbers = [1]
// eslint-disable-next-line no-undef
WIDTH = Dimensions.get('window').width
// eslint-disable-next-line no-undef
Height = Dimensions.get('window').height
// eslint-disable-next-line no-undef
DrawerWidth2 = WIDTH * 0.78
// eslint-disable-next-line no-undef
DrawerHeight2 = Height * 0.78

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
)
// eslint-disable-next-line react/no-multi-comp
class App extends Component {
  constructor (props) {
    super(props)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    let array = []
    // appInProduction
    if (!this.props.isLoading.Config.appInProduction) {
      array = [
        {
          expanded: false,
          categoryName: {
            id: 3,
            name: 'SHOP',
            iconName: 'cart',
            jsonName: this.props.isLoading.Config.languageJson.Shop,
            imageName: require('../images/LeftMenuIcon/shop.png'),
            imageShow: !this.props.isLoading.Config.defaultIcons,
            subCategory: [
              {
                id: 7,
                jsonName: this.props.isLoading.Config.languageJson.Newest,
                name: 'NEWEST',
                iconName: 'open',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 8,
                jsonName: this.props.isLoading.Config.languageJson.SALE,
                name: 'SALE',
                iconName: 'shirt',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              }, // open arrow-dropup-circle
              {
                id: 9,
                jsonName: this.props.isLoading.Config.languageJson.Featured,
                name: 'FEATURED',
                iconName: 'star',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
            ],
          },
        },
      ]
    } else {
      array = [
        {
          expanded: false,
          categoryName: {
            id: 1,
            name: 'HOME',
            iconName: 'home',
            jsonName: this.props.isLoading.Config.languageJson.Home,
            imageName: require('../images/LeftMenuIcon/home.png'),
            imageShow: !this.props.isLoading.Config.defaultIcons,
            subCategory: [
              {
                id: 1,
                name: 'HOME 1',
                jsonName: this.props.isLoading.Config.languageJson.Home + 1,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 2,
                name: 'HOME 2',
                jsonName: this.props.isLoading.Config.languageJson.Home + 2,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 3,
                name: 'HOME 3',
                jsonName: this.props.isLoading.Config.languageJson.Home + 3,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 4,
                name: 'HOME 4',
                jsonName: this.props.isLoading.Config.languageJson.Home + 4,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 5,
                name: 'HOME 5',
                jsonName: this.props.isLoading.Config.languageJson.Home + 5,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 6,
                name: 'HOME 6',
                jsonName: this.props.isLoading.Config.languageJson.Home + 6,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 7,
                name: 'HOME 7',
                jsonName: this.props.isLoading.Config.languageJson.Home + 7,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 8,
                name: 'HOME 8',
                jsonName: this.props.isLoading.Config.languageJson.Home + 8,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 9,
                name: 'HOME 9',
                jsonName: this.props.isLoading.Config.languageJson.Home + 9,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 10,
                name: 'HOME 10',
                jsonName: this.props.isLoading.Config.languageJson.Home + 10,
                iconName: 'home',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
            ],
          },
        },
        {
          expanded: false,
          categoryName: {
            id: 2,
            name: 'CATEGORIES',
            iconName: 'apps',
            jsonName: this.props.isLoading.Config.languageJson.Categories,
            imageName: require('../images/LeftMenuIcon/apps.png'),
            imageShow: !this.props.isLoading.Config.defaultIcons,
            subCategory: [
              {
                id: 7,
                jsonName:
                  this.props.isLoading.Config.languageJson['Category Page'] + 1,
                name: 'CATEGORY 1',
                iconName: 'apps',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 8,
                jsonName:
                  this.props.isLoading.Config.languageJson['Category Page'] + 2,
                name: 'CATEGORY 2',
                iconName: 'apps',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 9,
                jsonName:
                  this.props.isLoading.Config.languageJson['Category Page'] + 3,
                name: 'CATEGORY 3',
                iconName: 'apps',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 10,
                jsonName:
                  this.props.isLoading.Config.languageJson['Category Page'] + 4,
                name: 'CATEGORY 4',
                iconName: 'apps',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 11,
                jsonName:
                  this.props.isLoading.Config.languageJson['Category Page'] + 5,
                name: 'CATEGORY 5',
                iconName: 'apps',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 12,
                jsonName:
                  this.props.isLoading.Config.languageJson['Category Page'] + 6,
                name: 'CATEGORY 6',
                iconName: 'apps',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
            ],
          },
        },
        {
          expanded: false,
          categoryName: {
            id: 3,
            name: 'SHOP',
            iconName: 'cart',
            jsonName: this.props.isLoading.Config.languageJson.Shop,
            imageName: require('../images/LeftMenuIcon/shop.png'),
            imageShow: !this.props.isLoading.Config.defaultIcons,
            subCategory: [
              {
                id: 7,
                jsonName: this.props.isLoading.Config.languageJson.Newest,
                name: 'NEWEST',
                iconName: 'open',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
              {
                id: 8,
                jsonName: this.props.isLoading.Config.languageJson.SALE,
                name: 'SALE',
                iconName: 'shirt',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              }, // open arrow-dropup-circle
              {
                id: 9,
                jsonName: this.props.isLoading.Config.languageJson.Featured,
                name: 'FEATURED',
                iconName: 'star',
                imageName: require('../images/LeftMenuIcon/minus.png'),
              },
            ],
          },
        },
      ]
    }
    this.state = {AccordionData: [...array], orientation: ''}
  }

  // eslint-disable-next-line react/sort-comp
  getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({orientation: 'portrait'})
    } else {
      this.setState({orientation: 'landscape'})
    }
  }

  componentDidMount () {
    // eslint-disable-next-line no-unused-expressions
    this.getOrientation()
    Dimensions.addEventListener('change', this.getOrientation)
  }

  componentWillUnmount () {
    this.orientation = null
    this.AccordionData = null
    Dimensions.removeEventListener('change', this.getOrientation)
  }

  // eslint-disable-next-line camelcase
  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    const array = [...this.state.AccordionData]
    array[index].expanded = !array[index].expanded
    this.setState(() => ({
      AccordionData: array,
    }))
  }

  navCatFun = item => {
    const string = item
    // eslint-disable-next-line no-undef
    newString = string.replace(/\s+/g, '') // "thiscontainsspaces"
    // eslint-disable-next-line no-undef
    this.props.navigation.navigate(newString)
  }

  categoryFun (text, iconName, tempNo, imageTemp, globalText) {
    return (
      // <View style={{borderBottomWidth: 0.6, borderColor: '#4d4d4d',
      // marginBottom: 2,
      // // borderTopWidth: "MY FAVORITES" === text  ? 0.8 : 0,
      // marginTop: 1}}>
      <ListItem noIndent={true}>
        <TouchableOpacity
          activeOpacity={0.8}
          // style={styles.categoryView}
          onPress={
            tempNo === 0
              ? this.navCatFun.bind(this, text)
              : this.navCatFun.bind(this, `${text} ${tempNo}`)
          }>
          <View
            style={{
              width: WIDTH * 0.4,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // padding: 10,
              justifyContent: 'flex-start',
            }}>
            {!this.props.isLoading.Config.defaultIcons ? (
              <ImageLoad
                key={0}
                style={{
                  width: 22,
                  height: 22,
                  marginRight: I18nManager.isRTL ? 8 : 8,
                  marginLeft: 0,
                }}
                loadingStyle={{size: 'large', color: '#557f5f'}}
                placeholder={false}
                ActivityIndicator={true}
                placeholderStyle={{width: 0, height: 0}}
                source={imageTemp}
              />
            ) : (
              <Icon
                name={iconName}
                size={20}
                style={{
                  color: '#000000',
                  fontSize: 19,
                  padding: 2,
                  paddingLeft: 4,
                  paddingRight: 10,
                }}
              />
            )}
            <Text style={styles.categoryText}>{globalText}</Text>
          </View>
        </TouchableOpacity>
      </ListItem>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <MyStatusBar
          backgroundColor={theme.StatusBarColor}
          barStyle={theme.barStyle}
        />
        <View
          // eslint-disable-next-line no-nested-ternary
          style={{
            height: Platform.OS === 'ios' ? Height * 0.067 : 56,
            backgroundColor: theme.primary,
            borderWidth: Platform.OS === 'ios' ? 0.3 : 0,
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.6,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 0.3,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
              paddingTop: 4,
            }}>
            <View style={{justifyContent: 'flex-start'}}>
              <Text style={styles.headerText}>
                {this.props.isLoading.Config.languageJson.Menu}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              {this.props.isLoading.Config.multiLanguage ? (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Language')}>
                  <View
                    style={{
                      borderColor: '#fff',
                      alignItems: 'center',
                    }}>
                    <View
                      style={[
                        {
                          padding: 5,
                          paddingRight: 2,
                          paddingBottom: Platform.OS === 'android' ? 15 : 3,
                        },
                        Platform.OS === 'android' ? styles.iconContainer : null,
                      ]}>
                      <Icon style={styles.headerIcon} name='globe' />
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
              {this.props.isLoading.Config.multiCurrency ? (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Currency')}>
                  <View
                    style={{
                      borderColor: '#fff',
                      alignItems: 'center',
                    }}>
                    <View
                      style={[
                        {
                          padding: 5,
                          paddingLeft: Platform.OS === 'ios' ? 15 : 5,
                          paddingBottom: Platform.OS === 'android' ? 15 : 3,
                        },
                        Platform.OS === 'android' ? styles.iconContainer : null,
                      ]}>
                      <Icon style={styles.headerIcon} name='logo-usd' />
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            SyncStorage.set('cartScreen', 0)
            SyncStorage.get('customerData') !== '' &&
            !SyncStorage.get('gustLogin')
              ? this.props.navigation.navigate('SettingsScreen')
              : this.props.navigation.navigate('SettingsScreen')
          }}>
          <ImageBackground
            style={{
              height: Platform.OS === 'ios' ? 95 : 97,
              // eslint-disable-next-line no-undef
              width: DrawerWidth2,
              backgroundColor: 'transparent',
            }}
            // eslint-disable-next-line global-require
            source={require('../images/icons_stripe.png')}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                height: Platform.OS === 'ios' ? 95 : 97,
                // eslint-disable-next-line no-undef
                width: DrawerWidth2,
                alignContent: 'center',
                opacity: 0.85,
                backgroundColor: theme.primaryDark,
                zIndex: 9,
                position: 'absolute',
              }}
            />
            <View style={styles.textImageContainer}>
              {SyncStorage.get('gustLogin') ||
              SyncStorage.get('customerData') === '' ? (
                <ImageLoad
                  key={0}
                  backgroundColor='transparent'
                  color='transparent'
                  style={{width: 55, height: 55}}
                  loadingStyle={{size: 'large', color: '#557f5f'}}
                  placeholderSource={require('../images/userImage.png')}
                  placeholderStyle={{width: 55, height: 55}}
                  source={require('../images/userImage.png')}
                  borderRadius={55 / 2}
                />
              ) : (
                <ImageLoad
                  key={0}
                  style={{width: 55, height: 55}}
                  loadingStyle={{size: 'large', color: '#557f5f'}}
                  placeholderSource={require('../images/placeholder.png')}
                  placeholderStyle={{width: 55, height: 55}}
                  source={{uri: SyncStorage.get('customerData').avatar_url}}
                  borderRadius={55 / 2}
                />
              )}
              <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10}}>
                {SyncStorage.get('gustLogin') ||
                SyncStorage.get('customerData') === '' ? (
                  <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.NameText}>
                      {
                        this.props.isLoading.Config.languageJson[
                          'Login & Register'
                        ]
                      }{' '}
                    </Text>
                    <Text style={styles.welcomeText}>
                      {
                        this.props.isLoading.Config.languageJson[
                          'Please login or create an account for free'
                        ]
                      }
                    </Text>
                  </View>
                ) : (
                  <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.NameText}>
                      {`${SyncStorage.get('customerData').first_name} ${
                        SyncStorage.get('customerData').last_name
                      }`}{' '}
                    </Text>
                    <Text style={styles.welcomeText}>
                      {SyncStorage.get('customerData').email}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={pageNumbers}
            showsVerticalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{backgroundColor: 'white'}}
            keyExtractor={pageNumber => pageNumber.toString()}
            extraData={this.state}
            renderItem={() => (
              <View>
                {!this.props.isLoading.Config.appInProduction
                  ? this.props.isLoading.Config.homePage
                    ? this.categoryFun(
                        'HOME',
                        'home',
                        this.props.isLoading.Config.homePage,
                        require('../images/LeftMenuIcon/home.png'),
                        this.props.isLoading.Config.languageJson.Home,
                      )
                    : null
                  : null}
                {!this.props.isLoading.Config.appInProduction
                  ? this.props.isLoading.Config.categoryPage
                    ? this.categoryFun(
                        'CATEGORY',
                        'apps',
                        '',
                        require('../images/LeftMenuIcon/apps.png'),
                        this.props.isLoading.Config.languageJson.Categories,
                      )
                    : null
                  : null}

                {this.state.AccordionData.map((item, key) => (
                  <ExpandableListView
                    key={item.categoryName.id}
                    onClickFunction={this.updateLayout.bind(this, key)}
                    item={item}
                    navigation={this.props.navigation}
                    count={key}
                  />
                ))}
                {/* ////////////////////////////////////////// */}
                {this.props.isLoading.Config.wishListPage
                  ? this.categoryFun(
                      'MY FAVORITES',
                      'heart',
                      0,
                      require('../images/LeftMenuIcon/heart.png'),
                      this.props.isLoading.Config.languageJson['My Wish List'],
                    )
                  : null}
                {this.props.isLoading.Config.editProfilePage &&
                SyncStorage.get('customerData') !== '' &&
                !SyncStorage.get('gustLogin')
                  ? this.categoryFun(
                      'EDIT PROFILE',
                      'lock',
                      0,
                      require('../images/LeftMenuIcon/lock.png'),
                      this.props.isLoading.Config.languageJson['Edit Profile'],
                    )
                  : null}
                {// Billing Shipping Info
                this.props.isLoading.Config.addressPage &&
                SyncStorage.get('customerData') !== '' &&
                !SyncStorage.get('gustLogin')
                  ? this.categoryFun(
                      'ADDRESSES',
                      'locate',
                      0,
                      require('../images/LeftMenuIcon/locate.png'),
                      this.props.isLoading.Config.languageJson.Addresses,
                    )
                  : null}
                {this.props.isLoading.Config.downloadPage &&
                SyncStorage.get('customerData') !== '' &&
                !SyncStorage.get('gustLogin')
                  ? this.categoryFun(
                      'DOWNLOADS',
                      'download',
                      0,
                      require('../images/LeftMenuIcon/download.png'),
                      this.props.isLoading.Config.languageJson.Downloads,
                    )
                  : null}

                {this.props.isLoading.Config.myOrdersPage &&
                SyncStorage.get('customerData') !== '' &&
                !SyncStorage.get('gustLogin')
                  ? this.categoryFun(
                      'MY ORDERS',
                      'list-box',
                      0,
                      require('../images/LeftMenuIcon/list-box.png'),
                      this.props.isLoading.Config.languageJson['My Orders'],
                    )
                  : null}

                {this.props.isLoading.Config.newsPage &&
                SyncStorage.get('customerData') !== '' &&
                !SyncStorage.get('gustLogin')
                  ? this.categoryFun(
                      'RewardPoints',
                      'happy',
                      0,
                      require('../images/LeftMenuIcon/gift.png'),
                      this.props.isLoading.Config.languageJson['Reward Points'],
                    )
                  : null}
                {this.props.isLoading.Config.contactUsPage
                  ? this.categoryFun(
                      'CONTACT US',
                      'contacts',
                      0,
                      require('../images/LeftMenuIcon/contacts.png'),
                      this.props.isLoading.Config.languageJson['Contact Us'],
                    )
                  : null}
                {this.props.isLoading.Config.aboutUsPage
                  ? this.categoryFun(
                      'ABOUT',
                      'alert',
                      0,
                      require('../images/LeftMenuIcon/alert.png'),
                      this.props.isLoading.Config.languageJson['About Us'],
                    )
                  : null}

                {this.props.isLoading.Config.newsPage
                  ? this.categoryFun(
                      'NEWS',
                      'paper',
                      0,
                      require('../images/LeftMenuIcon/paper.png'),
                      this.props.isLoading.Config.languageJson.News,
                    )
                  : null}
                {this.props.isLoading.Config.introPage
                  ? this.categoryFun(
                      'INTRO',
                      'reorder',
                      0,
                      require('../images/LeftMenuIcon/reorder.png'),
                      this.props.isLoading.Config.languageJson.Intro,
                    )
                  : null}
                {this.props.isLoading.Config.shareApp ? (
                  <ShareAppButton
                    packageName={this.props.isLoading.Config.packgeName}
                    value='menu'
                    defaultIcons={this.props.isLoading.Config.defaultIcons}
                    imageTemp={require('../images/LeftMenuIcon/share.png')}
                    text={this.props.isLoading.Config.languageJson.Share}
                    iconName={'share'}
                    style={{
                      fontSize: theme.smallSize,
                      paddingRight: 8,
                      paddingLeft: 8,
                    }}
                    appleId={this.props.isLoading.Config.packgeName}
                  />
                ) : null}
                {this.props.isLoading.Config.rateApp ? (
                  <RateUsButton
                    value='menu'
                    imageTemp={require('../images/LeftMenuIcon/star.png')}
                    text={this.props.isLoading.Config.languageJson['Rate Us']}
                    iconName={'star'}
                    defaultIcons={this.props.isLoading.Config.defaultIcons}
                    appleId={this.props.isLoading.Config.packgeName}
                  />
                ) : null}
                {this.props.isLoading.Config.settingPage
                  ? this.categoryFun(
                      'SETTINGS',
                      'settings',
                      0,
                      require('../images/LeftMenuIcon/settings.png'),
                      this.props.isLoading.Config.languageJson.Settings,
                    )
                  : null}
              </View>
            )}
          />
        </View>
      </View>
    )
  }
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : 0
const mapStateToProps = state => ({
  isLoading: state,
})

export default connect(mapStateToProps, null)(App)
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 2,
  },
  tabComponents: {
    // flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    padding: 10,
    alignItems: 'center',
    paddingLeft: 13,
  },
  textImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? 103 : 97,
    // eslint-disable-next-line no-undef
    width: DrawerWidth2,
    zIndex: 9,
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  categoryText: {
    textAlign: 'left',
    color: '#000000',
    fontSize: theme.mediumSize,
    // paddingLeft: I18nManager.isRTL ? 8 : 4,
    // paddingRight: I18nManager.isRTL ? 8 : 4
  },
  categoryView: {
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 2,
  },
  welcomeText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
  },
  NameText: {
    fontSize: theme.mediumSize,
    fontWeight: '600',
    color: '#fff',
  },
  headerText: {
    textAlign:
      Platform.OS === 'ios' ? 'left' : I18nManager.isRTL ? 'right' : 'left',
    color: theme.headerTintColor,
    fontSize: 21,
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 8 : 10,
    alignSelf: 'center',
  },
  headerIcon: {
    color: theme.headerIconsColor,
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    fontSize: 23,
  },
  iconContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    marginRight: 5,
  },
})
