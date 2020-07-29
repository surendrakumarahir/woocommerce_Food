/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/imports-first */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable import/newline-after-import */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Switch,
  Dimensions,
  I18nManager
} from 'react-native';
import { CardStyleInterpolators } from 'react-navigation-stack';
import themeStyle from '../common/Theme.style';
import RateUsButton from './RateUs';
import ShareApp from './ShareApp';
import { Icon } from 'native-base';
import WooComFetch from '../common/WooComFetch';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageLoad from '../common/RnImagePlaceH';
import {withNavigation, NavigationEvents} from 'react-navigation'
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';
import ShoppingCartIcon from '../common/ShoppingCartIcon';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-gesture-handler';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest
} from 'react-native-fbsdk';
WIDTH = Dimensions.get('window').width;
class CreateAccount extends Component {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle');
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
    };
  }
  /// /////////////////////////////////////////////////////////
  refresh = () => {
    SyncStorage.get('gustLogin') || SyncStorage.get('customerData') === ''
      ? (this.state = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        errorMessage: '',
        spinnerTemp: false,
        switch1Value: false,
        switch2Value: false
      })
      : null;
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson.Settings
    });
  }
  /// //////////////////////////////////////////////////////////
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      errorMessage: '',
      spinnerTemp: false,
      switch1Value: false,
      switch2Value: false
    };
  }
  /// ////////////////////////////////////////////////////

  toggleSwitch1 = (value, text) => {
    text ===
    this.props.isLoading.Config.languageJson['Turn on/off Local Notifications']
      ? this.setState({ switch1Value: value })
      : this.setState({ switch2Value: value });
    console.log(`Switch 1 is: ${value}`);
  }
  /// ///////////////////////////////////////////////////
  createAccount(t) {
    // this.loading.show();
    if (!this.state.email.includes('@')) {
      t.setState({ errorMessage: 'Invalid email' });
      return;
    }
    t.setState({ spinnerTemp: true });
    fetch(
      `${
        this.props.isLoading.Config.url
      }/api/get_nonce/?controller=reactappusers&method=react_register`
    )
      .then(res => res.json())
      .then(data => {
        console.log('createaccount');
        console.log(data);
        this.signUp(t, data.nonce);
      })
      .catch(error => {
        console.log(error);
        t.setState({
          errorMessage: 'The Email not Valid exist',
          SpinnerTemp: false
        });
      });
  }
  /// //////////////////////////////////////////
  signUp = (t, nonce) => {
    this.errorMessage = '';
    const formData = new FormData();
    formData.append('username', t.state.userName);
    formData.append('email', t.state.email);
    formData.append('display_name', `${t.state.firstName} ${t.state.lastName}`);
    formData.append('nonce', nonce);
    formData.append('password', t.state.password);
    formData.append('first_name', t.state.firstName);
    formData.append('last_name', t.state.lastName);

    fetch(
      `${this.props.isLoading.Config.url}/api/reactappusers/react_register/?insecure=cool`,
      {
        method: 'POST',
        body: formData
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.status === 'ok') {
          t.setState({
            errorMessage: 'User Created. Login Using your Username & Password',
            spinnerTemp: false
          });
        } else {
          t.setState({ errorMessage: data.error, spinnerTemp: false });
        }
      })
      .catch(error => {
        console.log(error);
        t.setState({
          errorMessage: 'Error',
          spinnerTemp: false
        });
      });
  }

  /// //////////////////////////////////////////////////////////
  getUserData = async (c, type, t) => {
    let id;
    if (type === 'simple') id = c.user.id;
    if (type === 'fb') id = c.id;
    const json = await WooComFetch.getCustomerData(
      id,
      this.props.isLoading.Config.productsArguments
    );
    SyncStorage.set('customerData', Object.assign({ cookie: c.cookie }, json));
    t.setState({ spinnerTemp: false });
  }
  /// ////////////////////////////////////////////
  categoryFun(text, iconName, nav) {
    return (
      <View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: 10,
            paddingBottom: 0,
            paddingTop: 0
          }}
        >
          {nav === 'rate' ? (
            <RateUsButton
              text={text}
              iconName={iconName}
              appleId={this.props.isLoading.Config.packgeName}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.categoryView}
              onPress={() => {
                text ===
                this.props.isLoading.Config.languageJson['Official Website']
                  ? Linking.openURL(nav)
                  : this.props.navigation.push(nav);
              }}
            >
              <View style={styles.tabComponents}>
                <Text style={{ fontSize: themeStyle.mediumSize+1,
                color: '#000000', padding: 5 }}>{text}</Text>
                {text ===
                this.props.isLoading.Config.languageJson[
                  'Turn on/off Local Notifications'
                ] ? (
                  <Switch
                      thumbColor={'#4267b2'}
                      onValueChange={value => this.toggleSwitch1(value, text)}
                      value={this.state.switch1Value}
                  />
                  ) : text ===
                  this.props.isLoading.Config.languageJson[
                    'Turn on/off Notifications'
                  ] ? (
                    <Switch
                        thumbColor={'#4267b2'}
                        onValueChange={value => this.toggleSwitch1(value, text)}
                        value={this.state.switch2Value}
                    />
                    ) : (
                      <Icon
                        name={iconName}
                        size={20}
                        style={{ color: '#000000', fontSize: 20 }}
                      />
                    )}
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            marginLeft: 16,
            marginRight: 16,
            width: '96%',
            height: 1,
            backgroundColor: '#4d4d4d'
          }}
        />
      </View>
    );
  }
  /// ///////////////////////////////////////
  logOut() {
    let current_access_token = '';
    AccessToken.getCurrentAccessToken()
      .then(data => {
        current_access_token = data.accessToken.toString();
      })
      .then(() => {
        const logout = new GraphRequest(
          'me/permissions/',
          {
            accessToken: current_access_token,
            httpMethod: 'DELETE'
          },
          error => {
            if (error) {
              console.log(`Error fetching data: ${error.toString()}`);
            } else {
              console.log('Log Out');
              LoginManager.logOut();
            }
          }
        );
        new GraphRequestManager().addRequest(logout).start();
      })
      .catch(error => {
        console.log(error);
      });

    /// ///////////////////////////////
    SyncStorage.set('customerData', '');
    SyncStorage.set('gustLogin', false);
    this.setState({});
  }
  /// /////////////////////////////////////////////
  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: '#f4f4f4' }}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: '#f4f4f4',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Spinner
              // visible={this.props.cartItems2.cartItems.spinerTemp}
              visible={this.state.spinnerTemp}
              textStyle={styles.spinnerTextStyle}
            />
      <NavigationEvents
          onDidFocus={() => {
            this.setState({})
          }}
        />
            <View
              style={{
                flex: 1,
                backgroundColor: themeStyle.primary,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  SyncStorage.set('cartScreen', 0);
                  SyncStorage.get('customerData') !== '' &&
                  !SyncStorage.get('gustLogin')
                    ? null
                    :
                       this.props.navigation.navigate('LoginScreen', {
                      updateCart: () => 
                      this.setState({}) 
                    });
                }}
              >
                <ImageBackground
                  style={{
                    height: 230,
                    // eslint-disable-next-line no-undef
                    width: WIDTH,
                    backgroundColor: 'transparent'
                  }}
                  // eslint-disable-next-line global-require
                  source={require('../images/icons_stripe.png')}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      height: 230,
                      // eslint-disable-next-line no-undef
                      width: WIDTH,
                      alignContent: 'center',
                      opacity: 0.85,
                      backgroundColor: themeStyle.primaryDark,
                      zIndex: 9,
                      position: 'absolute'
                    }}
                  />
                  <View style={styles.textImageContainer}>
                    {SyncStorage.get('gustLogin') ||
                    SyncStorage.get('customerData') === '' ? (
                      <ImageLoad
                          key={0}
                          style={{ width: 60, height: 60 }}
                          loadingStyle={{
                            size: 'large',
                            color: themeStyle.loadingIndicatorColor
                          }}
                          placeholder={false}
                          ActivityIndicator={true}
                          placeholderStyle={{width: 0, height: 0}}
                          source={require('../images/userImage.png')}
                          borderRadius={60 / 2}
                      />
                      ) : (
                        <ImageLoad
                          key={0}
                          style={{ width: 60, height: 60 }}
                          loadingStyle={{
                            size: 'large',
                            color: themeStyle.loadingIndicatorColor
                          }}
                          placeholderSource={require('../images/placeholder.png')}
                          placeholderStyle={{ width: 60, height: 60 }}
                          source={{
                            uri: SyncStorage.get('customerData').avatar_url
                          }}
                          borderRadius={60 / 2}
                        />
                      )}
                    <View>
                      {SyncStorage.get('gustLogin') ||
                      SyncStorage.get('customerData') === '' ? (
                        <View
                            style={{
                              flex: 1,
                              alignItems: 'center'
                            }}
                        >
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

                            {SyncStorage.get('gustLogin') ||
                          SyncStorage.get('customerData') === '' ? null : (
                            <TouchableOpacity
                                  onPress={
                                    () =>
                                      this.props.navigation.navigate(
                                        'CreateAccountScreen'
                                      )
                                  }
                            >
                                  <View
                                style={{
                                      alignItems: 'center',
                                      height: 32,
                                      width: 80,
                                      backgroundColor: 'white',
                                      justifyContent: 'center'
                                    }}
                                  >
                                <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: themeStyle.mediumSize,
                                        color: '#000',
                                        fontWeight: '500'
                                      }}
                                >
                                      {
                                        this.props.isLoading.Config.languageJson[
                                          'Edit Profile'
                                        ]
                                      }
                                    </Text>
                              </View>
                                </TouchableOpacity>
                              )}
                          </View>
                        ) : (
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center'
                            }}
                          >
                            <Text style={styles.NameText}>
                              {`${SyncStorage.get('customerData').first_name} ${
                                SyncStorage.get('customerData').last_name
                              }`}{' '}
                            </Text>
                            <Text style={styles.welcomeText}>
                              {SyncStorage.get('customerData').email}
                            </Text>
                            {SyncStorage.get('customerData') === '' ? null : (
                              <TouchableOpacity
                                style={{ paddingTop: 5 }}
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    'MyAccountScreen'
                                  )
                                }
                              >
                                <View
                                  style={{
                                    alignItems: 'center',
                                    height: 32,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    padding: 5
                                  }}
                                >
                                  <Text
                                    style={{
                                      textAlign: 'center',
                                      color: '#fff',
                                      fontSize: 13,
                                      color: themeStyle.primaryDark
                                    }}
                                  >
                                    {
                                      this.props.isLoading.Config.languageJson[
                                        'Edit Profile'
                                      ]
                                    }
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )}
                          </View>
                        )}
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View height={7} />

            <View height={7} />
            {this.categoryFun(
              this.props.isLoading.Config.languageJson['Official Website'],
              I18nManager.isRTL ? 'arrow-back' : 'arrow-forward',
              this.props.isLoading.Config.siteUrl !== undefined & this.props.isLoading.Config.siteUrl !== null ?
              this.props.isLoading.Config.siteUrl : 'https://www.google.com'
            )}
            {this.categoryFun(
              this.props.isLoading.Config.languageJson['Privacy Policy'],
              I18nManager.isRTL ? 'arrow-back' : 'arrow-forward',
              'PrivacyPolicyScreen'
            )}
            {this.categoryFun(
              this.props.isLoading.Config.languageJson['Refund Policy'],
              I18nManager.isRTL ? 'arrow-back' : 'arrow-forward',
              'RefundPolicy'
            )}
            {this.categoryFun(
              this.props.isLoading.Config.languageJson['Term and Services'],
              I18nManager.isRTL ? 'arrow-back' : 'arrow-forward',
              'TermAndServiceScreen'
            )}
            {this.categoryFun(
              this.props.isLoading.Config.languageJson['Rate Us'],
              'star',
              'rate'
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: 8,
                paddingBottom: 0,
                paddingTop: 0
              }}
            >
              <ShareApp
                packageName={this.props.isLoading.Config.packgeName}
                text={this.props.isLoading.Config.languageJson.Share}
                iconName={'share'}
                appleId={this.props.isLoading.Config.packgeName}
              />
            </View>
            <View height={7} />

            {SyncStorage.get('gustLogin') ||
            SyncStorage.get('customerData') === '' ? null : (
              <TouchableOpacity
                  style={{ paddingTop: 5 }}
                  onPress={() => this.logOut()}
              >
                  <View
                  style={{
                      alignItems: 'center',
                      height: 38,
                      width: 80,
                      backgroundColor: '#557f5f',
                      justifyContent: 'center'
                    }}
                  >
                  <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 13,
                        color: 'white'
                      }}
                  >
                      {this.props.isLoading.Config.languageJson['Log Out']}
                    </Text>
                </View>
                </TouchableOpacity>
              )}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state
});

export default connect(
  mapStateToProps,
  null
)(CreateAccount);

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: themeStyle.mediumSize + 1,
    color: '#fff',
    fontWeight: '400',
    paddingTop: 3,
    paddingBottom: 3
  },
  NameText: {
    fontSize: themeStyle.largeSize + 8,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 8
  },
  textImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: WIDTH,
    zIndex: 9,
    position: 'absolute',
    flex: 1,
    padding: 15,
    marginTop: SyncStorage.get('customerData') === '' ? 75 : 50
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  tabComponents: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    paddingLeft: 13
  }
});
