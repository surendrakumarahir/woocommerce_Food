/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/imports-first */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable import/newline-after-import */
import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  Platform,
} from 'react-native'
import {CardStyleInterpolators} from 'react-navigation-stack'
import WooComFetch from '../common/WooComFetch'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ImageLoad from '../common/RnImagePlaceH'
import {connect} from 'react-redux'
import SyncStorage from 'sync-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import themeStyle from '../common/Theme.style'
WIDTH = Dimensions.get('window').width
class CreateAccount extends Component {
  ////////////////////////////////////////////////////////////
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
  ////////////////////////////////////////////////////////////
  // eslint-disable-next-line react/sort-comp
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['Edit Profile'],
    })
  }
  /////////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      myAccountData: {},
      firstName: SyncStorage.get('customerData').first_name,
      lastName: SyncStorage.get('customerData').last_name,
      password: '',
      errorMessage: '',
      spinnerTemp: false,
    }
  }
  //////////////////////////////////////////////////////
  updateInfo = t => {
    t.setState({spinnerTemp: true})
    t.state.myAccountData.first_name = t.state.firstName
    t.state.myAccountData.last_name = t.state.lastName
    if (t.state.password != '')
      t.state.myAccountData.password = t.state.password
    t.UpdateCustomerData1(
      SyncStorage.get('customerData').id,
      t.state.myAccountData,
    )
  }
  //////////////////////////////////////////////////////
  UpdateCustomerData1 = async (id, object) => {
    try {
      const json = await WooComFetch.UpdateCustomerData(
        id,
        object,
        this.props.isLoading.Config.productsArguments,
      )
      SyncStorage.set('customerData', json)
      this.setState({spinnerTemp: false})
      this.props.navigation.navigate('SettingsScreen')
    } catch (err) {
      console.log(err)
      this.setState({spinnerTemp: false})
    }
  }
  //////////////////////////////////////////////////////
  createAccount (t) {
    if (!this.state.email.includes('@')) {
      t.setState({errorMessage: 'Invalid email'})
      return
    }
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
        t.setState({
          errorMessage: 'The Email not Valid exist',
          SpinnerTemp: false,
        })
      })
  }
  /////////////////////////////////////////////
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
          t.setState({
            errorMessage: 'User Created. Login Using your Username & Password',
            spinnerTemp: false,
          })
        } else {
          t.setState({errorMessage: data.error, spinnerTemp: false})
          console.log(data)
        }
      })
      .catch(error => {
        console.log(error)
        t.setState({
          errorMessage: 'Error',
          spinnerTemp: false,
        })
      })
  }

  /////////////////////////////////////////////////////////////
  ////////////////////////////////////////
  getUserData = async (c, type, t) => {
    let id
    if (type === 'simple') id = c.user.id
    if (type === 'fb') id = c.id
    const json = await WooComFetch.getCustomerData(
      id,
      this.props.isLoading.Config.productsArguments,
    )
    SyncStorage.set('customerData', Object.assign({cookie: c.cookie}, json))
    t.setState({spinnerTemp: false})
  }

  /////////
  render () {
    return (
      <KeyboardAwareScrollView style={{backgroundColor: '#f4f4f4'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f4f4f4',

            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Spinner
            visible={this.state.spinnerTemp}
            textStyle={styles.spinnerTextStyle}
          />
          <View>
            <ImageLoad
              key={1}
              style={{marginTop: 22, width: 120, height: 120}}
              loadingStyle={{size: 'large', color: '#557f5f'}}
              placeholder={false}
              ActivityIndicator={true}
              placeholderStyle={{width: 0, height: 0}}
              source={require('../images/avatar.png')}
              borderRadius={60}
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
                width: WIDTH * 0.9,
                borderColor: '#c1c1c1',
                borderWidth: 1,
                fontSize: themeStyle.mediumSize,
                paddingLeft: 6,
                paddingRight: 6,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              }}
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
              style={{
                marginTop: 20,
                height: 38,
                width: WIDTH * 0.9,
                borderColor: '#c1c1c1',
                borderWidth: 1,
                fontSize: themeStyle.mediumSize,
                paddingLeft: 6,
                paddingRight: 6,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              }}
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
              style={{
                marginTop: 15,
                height: 38,
                width: WIDTH * 0.9,
                borderColor: '#c1c1c1',
                borderWidth: 1,
                fontSize: themeStyle.mediumSize,
                paddingLeft: 6,
                paddingRight: 6,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              }}
              secureTextEntry
              selectionColor='#51688F'
              placeholder={this.props.isLoading.Config.languageJson.Password}
              onChangeText={password =>
                this.setState({password, errorMessage: ''})
              }
              value={this.state.password}
            />

            <TouchableOpacity onPress={() => this.updateInfo(this)}>
              <View
                style={{
                  marginTop: 18,
                  alignItems: 'center',
                  height: 38,
                  width: WIDTH * 0.9,
                  backgroundColor: themeStyle.otherBtnsColor,
                  justifyContent: 'center',
                  opacity:
                    this.state.firstName === '' ||
                    this.state.lastName === '' ||
                    this.state.userName === '' ||
                    this.state.email === '' ||
                    (this.state.password === '') === ''
                      ? 0.4
                      : 0.9,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: themeStyle.mediumSize,
                    fontWeight: '500',
                  }}>
                  {this.props.isLoading.Config.languageJson.Update}
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

export default connect(mapStateToProps, null)(CreateAccount)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
