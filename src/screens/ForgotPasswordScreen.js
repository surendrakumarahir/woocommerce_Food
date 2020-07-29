/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/imports-first */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable import/newline-after-import */
import React, {Component} from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  I18nManager,
} from 'react-native'
import {CardStyleInterpolators} from 'react-navigation-stack'
import WooComFetch from '../common/WooComFetch'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ImageLoad from '../common/RnImagePlaceH'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import SyncStorage from 'sync-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import themeStyle from '../common/Theme.style'
class ForgotPassword extends Component {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
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
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  }
  /// /////////////////////////////////////////////////////////
  // eslint-disable-next-line react/sort-comp
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['Forgot Password'],
    })
  }
  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      errorMessage: '',
      SpinnerTemp: false,
    }
  }
  /// ///////////////////////////////////////
  forgetPassword = t => {
    t.setState({SpinnerTemp: true})
    const formData = new FormData()
    formData.append('email', this.state.email)
    console.log(formData)
    fetch(
      `${this.props.isLoading.Config.url}/api/reactappusers/react_forgot_password/?insecure=cool&email=`,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.status === 'error') {
          t.setState({
            errorMessage: 'The Email not Valid exist',
            SpinnerTemp: false,
          })
        } else {
          t.setState({errorMessage: data, SpinnerTemp: false})
        }
      })
      .catch(error => {
        console.log(error)
        t.setState({
          errorMessage: 'The Email not Valid exist',
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
      t.setState({SpinnerTemp: false})
    } catch (e) {
      console.log(e.message)
      t.setState({SpinnerTemp: false})
    }
  }

  canBeSubmitted () {
    const {email} = this.state
    return email.length > 0
  }
  render () {
    const isEnabled = this.canBeSubmitted()
    return (
      <KeyboardAwareScrollView style={{backgroundColor: '#f4f4f4'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: themeStyle.backgroundColor,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Spinner
            visible={this.state.SpinnerTemp}
            textStyle={{
              backgroundColor: themeStyle.loadingIndicatorColor,
              color: themeStyle.loadingIndicatorColor,
            }}
          />
          <View style={{opacity: 0.2}}>
            <ImageLoad
              key={1}
              style={{marginTop: 50, width: 150, height: 150}}
              loadingStyle={{
                size: 'large',
                color: themeStyle.loadingIndicatorColor,
              }}
              placeholder={false}
              ActivityIndicator={true}
              placeholderStyle={{width: 0, height: 0}}
              source={require('../images/icons_stripe.png')}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                marginTop: 20,
                height: 38,
                width: wp('90%'),
                borderColor: '#c1c1c1',
                borderBottomWidth: 1,
                fontSize: themeStyle.mediumSize+2,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
                paddingLeft: 6,
                paddingRight: 6,
              }}
              selectionColor='#51688F'
              placeholder={this.props.isLoading.Config.languageJson.Email}
              onChangeText={email => this.setState({email, errorMessage: ''})}
              value={this.state.email}
            />

            {this.state.errorMessage ? (
              <Text
                style={{
                  marginTop: 15,
                  color:
                    this.state.errorMessage !== 'The Email not Valid exist'
                      ? 'green'
                      : 'red',
                }}>
                {this.state.errorMessage}
              </Text>
            ) : null}
            <TouchableOpacity
              disabled={!isEnabled}
              onPress={() => this.forgetPassword(this)}>
              <View
                style={{
                  marginTop: 15,
                  alignItems: 'center',
                  height: 38,
                  width: wp('90%'),
                  backgroundColor: '#557f5f',
                  justifyContent: 'center',
                  opacity: !isEnabled ? 0.4 : 0.9,
                }}>
                <Text
                  style={{textAlign: 'center', color: '#fff', fontSize: 13}}>
                  {this.props.isLoading.Config.languageJson.Send}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state,
})

export default connect(mapStateToProps, null)(ForgotPassword)
