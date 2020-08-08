import React, {Component} from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  Platform,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native'
import Toast from 'react-native-easy-toast'
import {CardStyleInterpolators} from 'react-navigation-stack'
import WooComFetch from '../common/WooComFetch'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ImageLoad from '../common/RnImagePlaceH'
import {connect} from 'react-redux'
import SyncStorage from 'sync-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import FBLoginButton from '../common/FBLoginButton'
import themeStyle from '../common/Theme.style'
WIDTH = Dimensions.get('window').width
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Login extends Component {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerShown: false,
      headerTitle: headerStyle,
      headerRight: null,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal',
      },
      headerForceInset: {top: 'never', vertical: 'never'},
    }
  }
  /// /////////////////////////////////////////////////////////
  // eslint-disable-next-line react/sort-comp
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson.Login,
    })
  }
  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      errorMessage: '',
      SpinnerTemp: false,
    }
  }

  login = t => {
    t.setState({SpinnerTemp: true})
    const formData = new FormData()
    formData.append('username', this.state.userName)
    formData.append('password', this.state.password)
    fetch(
      `${this.props.isLoading.Config.url}/api/reactappusers/react_generate_cookie/?insecure=cool`,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(res => res.json())
      .then(data => {
        if (
          data.status === 'ok' &&
          data.cookie !== '' &&
          data.cookie !== undefined &&
          data.cookie !== null
        ) {
          t.getUserData(data, 'simple', t)
        } else {
          t.setState({errorMessage: data.error, SpinnerTemp: false})
          console.log(data)
        }
      })
      .catch(error => {
        console.log(error)
        t.setState({
          errorMessage: 'Invalid Username or Password',
          SpinnerTemp: false,
        })
      })
  }

  /// //////////////////////////////////////////////////////////
  /// /////////////////////////////////////
  getUserData = async (c, type, t) => {
    try {
      let id
      if (type === 'simple') id = c.user.id
      if (type === 'fb') id = c.id
      const json = await WooComFetch.getCustomerData(
        id,
        this.props.isLoading.Config.productsArguments,
      )
      SyncStorage.set('customerData', Object.assign({cookie: c.cookie}, json))
      SyncStorage.set('gustLogin', false)
      t.setState({SpinnerTemp: false})
      if (SyncStorage.get('cartScreen') === 1) {
        SyncStorage.set('cartScreen', 0)
        if (this.props.navigation.state.params.updateCart !== undefined) {
          this.props.navigation.state.params.updateCart()
        }
        this.props.navigation.goBack()
      } else {
        if (this.props.navigation.state.params.updateCart !== undefined) {
          this.props.navigation.state.params.updateCart()
        }
        this.props.navigation.navigate('SettingsScreen')
      }
    } catch (e) {
      console.log(e.message)
      t.setState({SpinnerTemp: false})
    }
  }
  /// //////////////////////////////////////
  createAccount (info, type) {
    if (type === 'fb') {
      this.setState({SpinnerTemp: true})
    }
    /// ///////
    fetch(
      `${this.props.isLoading.Config.url}/api/reactappusers/react_fb_connect/?insecure=cool&access_token=${info}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.getUserData(responseJson, 'fb', this)
      })
      .catch(error => {
        console.log(error)
      })
  }
  toastFun = () => {
    this.refs.toast.show(
      this.props.isLoading.Config.languageJson[
        'User Created. Login Using your Username & Password'
      ],
    )
  }
  /// //////
  render () {
    return (
      <KeyboardAwareScrollView>
        <ImageBackground source={require('../images/texture.png')} style={styles.image}>
        <View style={styles.spinner}>
          <Spinner
            visible={this.state.SpinnerTemp}
            textStyle={{
              backgroundColor: themeStyle.loadingIndicatorColor,
              color: themeStyle.loadingIndicatorColor,
            }}
          />
          <Toast
            ref='toast'
            style={{backgroundColor: '#c1c1c1'}}
            position='bottom'
            positionValue={200}
            fadeOutDuration={7000}
            textStyle={{color: 'black', fontSize: 15}}
          />
          <View style={{flex:1, alignItems: 'center'}}>
            <Image 
             style={styles.logo}
            source={require('../images/logo.png')} />
          </View>

          <View
            style={styles.fieldContainer}>
            <Text style={styles.loginText}>Log In</Text>
            <TextInput
              style={styles.textInput}
              selectionColor={themeStyle.primaryDark}
              placeholder={
                this.props.isLoading.Config.languageJson['Email or Username']
              }
              onChangeText={userName =>
                this.setState({userName, errorMessage: ''})
              }
              value={this.state.userName}
            />

            <TextInput
              style={styles.textInput}
              secureTextEntry
              selectionColor={themeStyle.primaryDark}
              placeholder={this.props.isLoading.Config.languageJson.Password}
              onChangeText={password =>
                this.setState({password, errorMessage: ''})
              }
              value={this.state.password}
            />

            <Text
              onPress={() => {
                this.props.navigation.navigate('ForgotPasswordScreen')
              }}
              style={styles.forgotPass}>
              {
                this.props.isLoading.Config.languageJson[
                  "I've forgotten my password?"
                ]
              }
            </Text>

            {this.state.errorMessage !== '' ? (
              <Text
                style={{
                  marginTop: 18,
                  color: 'red',
                }}>
                {this.state.errorMessage}
              </Text>
            ) : null}
            <TouchableOpacity
              disabled={
                !!(this.state.userName === '' || this.state.password === '')
              }
              onPress={() => this.login(this)}>
              <View
                style={{
                  marginTop: wp(7),
                  alignItems: 'center',
                  height: wp(12),
                  width: wp(30),
                  backgroundColor: themeStyle.otherBtnsColor,
                  justifyContent: 'center',
                  borderRadius: wp(6),
                  // opacity:
                  //   this.state.userName === '' || this.state.password === ''
                  //     ? 0.4
                  //     : 0.9,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    //fontSize: themeStyle.mediumSize + 2,
                    fontSize: wp(4.5),
                    fontWeight: '500',
                  }}>
                  {this.props.isLoading.Config.languageJson.Login}
                  {/* Sign In */}
                </Text>
              </View>
            </TouchableOpacity>

            
            {this.props.isLoading.Config.fbButton === 1 ? (
              <FBLoginButton
                onRef={ref => (this.parentReference = ref)}
                parentReference={this.createAccount.bind(this)}
              />
            ) : null}

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CreateAccountScreen', {
                  toastFun: () => this.toastFun(),
                })
              }>
              <View
                style={{
                   marginTop: wp(5),
                   flexDirection: 'row'
                  // // borderRadius: 20,
                  // borderWidth: 0.6,
                  // borderColor: '#000000',
                  // alignItems: 'center',
                  // height: 38,
                  // width: WIDTH * 0.9,
                  // backgroundColor: themeStyle.backgroundColor,
                  // justifyContent: 'center',
                  // borderRadius: 4,
                  // marginBottom: 2,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    // color: '#fff',
                    fontSize: themeStyle.mediumSize + 1,
                    color: '#000',
                    fontWeight: '500',
                  }}>
                  Don't have an account ? 
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    // color: '#fff',
                    fontSize: themeStyle.mediumSize + 1,
                    color: themeStyle.otherBtnsColor,
                    fontWeight: '500',
                    marginLeft: 6,
                  }}>
                  {this.props.isLoading.Config.languageJson.Register}
                </Text>
              </View>
            </TouchableOpacity>
            {SyncStorage.get('cartScreen') === 1 &&
            this.props.isLoading.Config.guestCheckOut ? (
              <TouchableOpacity
                onPress={() => {
                  const temp = {}
                  temp.id = 0
                  temp.billing = {
                    first_name: '',
                    last_name: '',
                    company: '',
                    address_1: '',
                    address_2: '',
                    city: '',
                    state: '',
                    postcode: '',
                    country: '',
                    email: '',
                    phone: '',
                  }
                  temp.billingCountryName = ''
                  temp.billingStateName = ''
                  temp.shipping = {
                    first_name: '',
                    last_name: '',
                    company: '',
                    address_1: '',
                    address_2: '',
                    city: '',
                    state: '',
                    postcode: '',
                    country: '',
                  }
                  temp.shippingCountryName = ''
                  temp.shippingStateName = ''
                  SyncStorage.set('customerData', temp)
                  SyncStorage.set('gustLogin', true)

                  if (this.props.isLoading.Config.checkOutPage == 1) {
                    this.props.navigation.push('WebViewScreen', {
                      onePageCheckOut2: false,
                      //
                    })
                  } else {
                    this.props.navigation.navigate('ShippingAddressScreen')
                  }
                }}>
                <View
                  style={{
                    marginTop: 18,
                    // borderRadius: 20,
                    borderWidth: 1,
                    borderColor: themeStyle.primaryDark,
                    alignItems: 'center',
                    height: 38,
                    width: WIDTH * 0.9,
                    backgroundColor: themeStyle.primaryDark,
                    justifyContent: 'center',
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#ffffff',
                      fontSize: themeStyle.mediumSize + 2,

                      fontWeight: '500',
                    }}>
                    {
                      this.props.isLoading.Config.languageJson[
                        'Continue as a Guest'
                      ]
                    }
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      
       </ImageBackground>
       </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state,
})

export default connect(mapStateToProps, null)(Login)

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  logo: {
    marginTop: 15,
    width: wp(28),
    height: wp(25),
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  spinner: { flex: 1,
     // backgroundColor: themeStyle.backgroundColor,
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  loginText: {
    fontSize: wp(8),
    marginTop: wp(5),
    marginBottom: wp(5),
    color: '#000',
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginTop: wp(5),
    height: wp(15),
    width: wp(80),
    paddingHorizontal: 40,
    borderColor: '#c1c1c1',
    backgroundColor: '#fff',
    borderRadius: wp(8),
    paddingLeft: wp(3),
    paddingRight: wp(3),
    borderWidth: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: themeStyle.mediumSize + 2,
  },
  forgotPass: {
    marginTop: wp(5),
    paddingBottom: 7,
    fontSize: themeStyle.mediumSize + 1,
    marginBottom: 6,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'right',
    alignSelf: 'flex-end',
    width: wp(80),
    marginRight: wp(5),
  }
})