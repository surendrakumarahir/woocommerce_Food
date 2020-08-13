import React, {Component} from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  I18nManager,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native'
import Toast from 'react-native-easy-toast'
import {CardStyleInterpolators} from 'react-navigation-stack'
import WooComFetch from '../common/WooComFetch'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ImageLoad from '../common/RnImagePlaceH'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import SyncStorage from 'sync-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import themeStyle from '../common/Theme.style'
import Icon from 'react-native-vector-icons/FontAwesome';
class CreateAccount extends Component {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerShown: false,
      headerTitle: headerStyle,
      headerTitleAlign: 'center',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerRight: null,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
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
      headerTitle: this.props.isLoading.Config.languageJson[
        'Create an Account'
      ],
    })
  }
  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      errorMessage: '',
      spinnerTemp: false,
      colTemp: false,
    }
  }
  /// ///////////////////////////////////////////////////
  createAccount (t) {
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // if (reg.test(this.state.email) === false) {
    //   t.setState({errorMessage: 'The email address is not valid'})
    //   return
    // }

    t.setState({spinnerTemp: true})
    fetch(
      `${this.props.isLoading.Config.url}/api/get_nonce/?controller=reactappusers&method=react_register`,
    )
      .then(res => res.json())
      .then(data => {
        this.signUp(t, data.nonce)
      })
      .catch(error => {
        console.log(error)
        this.refs.toast.show(
          this.props.isLoading.Config.languageJson['Email is not Valid'],
        )
        t.setState({
          errorMessage: error,
          SpinnerTemp: false,
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
          errorMessage: '',
        })
      })
  }
  /// //////////////////////////////////////////
  signUp = (t, nonce) => {
    this.errorMessage = ''
    const formData = new FormData()
    formData.append('username', t.state.userName)
    formData.append('email', t.state.email)
    formData.append('display_name', `${t.state.firstName} ${t.state.lastName}`)
    formData.append('nonce', nonce)
    formData.append('password', t.state.password)
    formData.append('first_name', t.state.firstName)
    formData.append('last_name', t.state.lastName)
console.log('form data', formData);
    fetch(
      `${this.props.isLoading.Config.url}/api/reactappusers/react_register/?insecure=cool`,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          // this.refs.toast.show('User Created. Login Using your Username & Password')
          t.setState(
            {
              // errorMessage: 'User Created. Login Using your Username & Password',
              spinnerTemp: false,
            },
            () => {
              this.props.navigation.state.params.toastFun()
              this.props.navigation.pop()
            },
          )
        } else {
          this.refs.toast.show(data.error)
          t.setState({
            errorMessage: data.error,
            spinnerTemp: false,
            errorMessage: '',
          })
          console.log(data)
        }
      })
      .catch(error => {
        console.log(error)
        t.setState({
          errorMessage: 'Error',
          spinnerTemp: false,
          errorMessage: '',
        })
      })
  }
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
      t.setState({spinnerTemp: false})
    } catch (e) {
      console.log(e.message)
      t.setState({spinnerTemp: false})
    }
  }
  canBeSubmitted () {
    const {lastName, firstName, userName, email, password} = this.state
    return (
      lastName.length > 0 &&
      firstName.length > 0 &&
      userName.length > 0 &&
      email.length > 0 &&
      password.length > 0
    )
  }
  validate = text => {
    console.log(text)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(text) === false) {
      console.log('Email is Not Correct')
      this.setState({email: text, colTemp: false})
      // errorMessage: ''
      return false
    } else {
      this.setState({email: text, colTemp: true})
      console.log('Email is Correct')
    }
  }
  /// //////
  render () {
    const isEnabled = this.canBeSubmitted()
    return (
      <KeyboardAwareScrollView>
      <ImageBackground source={require('../images/texture.png')} style={styles.image}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Spinner
            visible={this.state.spinnerTemp}
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
           <TouchableOpacity 
               style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              left: 10
              // alignContent: 'center'
              }}
              onPress={() => this.props.navigation.goBack()}
               >
             <Icon
              name="angle-left"
              size={wp(10)}
              //backgroundColor="#3b5998"
            // onPress={this.loginWithFacebook}
            />
            <Text style={{fontSize: wp(5), marginLeft: wp(2)}}>{this.props.isLoading.Config.languageJson['Back']}</Text>
               </TouchableOpacity>
          <View style={{flex:1, alignItems: 'center'}}>
            <Image 
             style={styles.logo}
            source={require('../images/logo.png')} />
          </View>

          <View
            style={styles.fieldContainer}>
            <Text style={styles.loginText}>Create an Account</Text>
            <TextInput
               style={styles.textInput}
              selectionColor='#51688F'
              placeholder={
                this.props.isLoading.Config.languageJson['First Name']
              }
              onChangeText={firstName =>
                this.setState({firstName, errorMessage: ''})
              }
              value={this.state.firstName}
            />
            <TextInput
               style={styles.textInput}
              selectionColor='#51688F'
              placeholder={
                this.props.isLoading.Config.languageJson['Last Name']
              }
              onChangeText={lastName =>
                this.setState({lastName, errorMessage: ''})
              }
              value={this.state.lastName}
            />

            <TextInput
              style={styles.textInput}
              selectionColor='#51688F'
              placeholder={this.props.isLoading.Config.languageJson.Username}
              onChangeText={userName =>
                this.setState({userName, errorMessage: ''})
              }
              value={this.state.userName}
            />

            <TextInput
              style={styles.textInput}
              selectionColor='#51688F'
              placeholder={this.props.isLoading.Config.languageJson.Email}
              onChangeText={email => {
                this.validate(email)
                // this.setState({email, errorMessage: ''})
              }}
              value={this.state.email}
            />

            <TextInput
              style={styles.textInput}
              secureTextEntry
              selectionColor='#51688F'
              placeholder={this.props.isLoading.Config.languageJson.Password}
              onChangeText={password =>
                this.setState({password, errorMessage: ''})
              }
              value={this.state.password}
            />

            {this.state.errorMessage !== '' ? (
              <Text
                style={{
                  marginTop: 15,
                  color:
                    this.state.errorMessage ===
                    'User Created. Login Using your Username & Password'
                      ? 'green'
                      : 'red',
                }}>
                {this.state.errorMessage}
              </Text>
            ) : null}
            <Text
              style={{
                marginTop: 10,
                padding: 5,
                width: wp('90%'),
                fontSize: themeStyle.mediumSize,
              }}>
              {
                this.props.isLoading.Config.languageJson[
                  'Creating an account means you\u2019re okay with our'
                ]
              }
              <Text
                onPress={() => {
                  this.props.navigation.navigate('TermAndServiceScreen')
                }}
                style={{color: '#00F', fontSize: themeStyle.mediumSize}}>
                {` ${this.props.isLoading.Config.languageJson['Term and Services']}`}
              </Text>
              , {''}
              <Text
                onPress={() => {
                  this.props.navigation.navigate('PrivacyPolicyScreen')
                }}
                style={{color: '#00F', fontSize: themeStyle.mediumSize}}>
                {` ${this.props.isLoading.Config.languageJson['Privacy Policy']}`}
              </Text>
              {''} {this.props.isLoading.Config.languageJson.and} {''}
              <Text
                onPress={() => {
                  this.props.navigation.navigate('RefundPolicy')
                }}
                style={{color: '#00F', fontSize: themeStyle.mediumSize}}>
                {` ${this.props.isLoading.Config.languageJson['Refund Policy']}`}
              </Text>
            </Text>
            <TouchableOpacity
              disabled={!isEnabled}
              onPress={() => this.createAccount(this)}>
              <View
                style={{
                  marginTop: wp(2),
                  alignItems: 'center',
                  height: wp(12),
                  width: wp(30),
                  backgroundColor: themeStyle.otherBtnsColor,
                  justifyContent: 'center',
                  borderRadius: wp(6),
                 // opacity: !isEnabled ? 0.4 : 0.9,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    //fontSize: themeStyle.mediumSize + 2,
                    fontSize: wp(4.5),
                    fontWeight: '500',
                  }}>
                  {this.props.isLoading.Config.languageJson.Register}
                </Text>
               </View>
            </TouchableOpacity>
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
                  already have account ? 
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    // color: '#fff',
                    fontSize: themeStyle.mediumSize + 1,
                    color: themeStyle.otherBtnsColor,
                    fontWeight: '500',
                    marginLeft: 6,
                  }}
                  onPress={() => this.props.navigation.navigate('LoginScreen')}
                  >
                  {this.props.isLoading.Config.languageJson.Login}
                </Text>
              </View>
            </TouchableOpacity>
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

export default connect(mapStateToProps, null)(CreateAccount)
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  logo: {
    marginTop: wp(3),
    width: wp(25),
    height: wp(20),
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  spinner: { flex: 1,
     // backgroundColor: themeStyle.backgroundColor,
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  loginText: {
    fontSize: wp(7),
    marginTop: wp(3),
    color: '#000',
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginTop: wp(3),
    height: wp(14),
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