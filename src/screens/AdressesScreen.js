import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  I18nManager,
} from 'react-native'
import {CardStyleInterpolators} from 'react-navigation-stack'
import Toast from 'react-native-easy-toast'
import theme from '../common/Theme.style'
import WooComFetch from '../common/WooComFetch'
import * as global from '../common/LocationData'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import SyncStorage from 'sync-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
class ShippingAddress extends Component {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      headerForceInset: {top: 'never', vertical: 'never'},
      headerTintColor: theme.headerTintColor,
      headerStyle: {
        backgroundColor: theme.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal',
      },
      headerTitleAlign: 'center',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  }
  /// /////////////////////////////////////////////////////////
  // eslint-disable-next-line react/sort-comp
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson.Address,
    })
  }
  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: '',
      spinnerTemp: false,
      shippingArray: [],
      billingArray: [],
      placeholderArray: [
        this.props.cartItems2.Config.languageJson['First Name'],
        this.props.cartItems2.Config.languageJson['Last Name'],
        this.props.cartItems2.Config.languageJson.Compnay,
        `${this.props.cartItems2.Config.languageJson.Address} 1`,
        `${this.props.cartItems2.Config.languageJson.Address} 2`,
        this.props.cartItems2.Config.languageJson.Country,
        this.props.cartItems2.Config.languageJson.State,
        this.props.cartItems2.Config.languageJson.City,
        this.props.cartItems2.Config.languageJson['Post code'],
      ],

      placeholderArray2: [
        this.props.cartItems2.Config.languageJson['First Name'],
        this.props.cartItems2.Config.languageJson['Last Name'],
        this.props.cartItems2.Config.languageJson.Compnay,
        `${this.props.cartItems2.Config.languageJson.Address} 1`,
        `${this.props.cartItems2.Config.languageJson.Address} 2`,
        this.props.cartItems2.Config.languageJson.Country,
        this.props.cartItems2.Config.languageJson.State,
        this.props.cartItems2.Config.languageJson.City,
        this.props.cartItems2.Config.languageJson['Post code'],
      ],
      disableCondition: true,
      billingDisableConditions: true,
      shippingDisableConditions: true,
      billingCountry:
        SyncStorage.get('customerData').billingCountryName === undefined ||
        SyncStorage.get('customerData').billingCountryName === ''
          ? 'Country'
          : this.getCountryNameReverse(
              SyncStorage.get('customerData').billingCountryName,
            ),
      billingState:
        SyncStorage.get('customerData').billingStateName === undefined ||
        SyncStorage.get('customerData').billingStateName === ''
          ? 'State'
          : this.getStateNameReverse(
              SyncStorage.get('customerData').billingCountryName,
              SyncStorage.get('customerData').billingStateName,
            ),
      shippingCountry:
        SyncStorage.get('customerData').shippingCountryName === undefined ||
        SyncStorage.get('customerData').shippingCountryName === ''
          ? 'Country'
          : this.getCountryNameReverse(
              SyncStorage.get('customerData').shippingCountryName,
            ),
      shippingState:
        SyncStorage.get('customerData').shippingStateName === undefined ||
        SyncStorage.get('customerData').shippingStateName === ''
          ? 'State'
          : this.getStateNameReverse(
              SyncStorage.get('customerData').shippingCountryName,
              SyncStorage.get('customerData').shippingStateName,
            ),
      otherArray: [{value: 'other', name: 'other'}],
    }
    const tempC = SyncStorage.get('customerData')
    tempC.sameAddress = false
    SyncStorage.set('customerData', tempC)
    this.state.shippingArray[0] = SyncStorage.get(
      'customerData',
    ).shipping.first_name
    this.state.shippingArray[1] = SyncStorage.get(
      'customerData',
    ).shipping.last_name
    this.state.shippingArray[2] = SyncStorage.get(
      'customerData',
    ).shipping.company
    this.state.shippingArray[3] = SyncStorage.get(
      'customerData',
    ).shipping.address_1
    this.state.shippingArray[4] = SyncStorage.get(
      'customerData',
    ).shipping.address_2
    this.state.shippingArray[5] = this.getCountryNameReverse(
      SyncStorage.get('customerData').shipping.country,
    )
    this.state.shippingArray[6] = this.getStateNameReverse(
      SyncStorage.get('customerData').shipping.country,
      SyncStorage.get('customerData').shipping.state,
    )
    this.state.shippingArray[7] = SyncStorage.get('customerData').shipping.city
    this.state.shippingArray[8] = SyncStorage.get(
      'customerData',
    ).shipping.postcode

    /// /////////////////////

    this.state.billingArray[0] = SyncStorage.get(
      'customerData',
    ).billing.first_name
    this.state.billingArray[1] = SyncStorage.get(
      'customerData',
    ).billing.last_name
    this.state.billingArray[2] = SyncStorage.get('customerData').billing.company
    this.state.billingArray[3] = SyncStorage.get(
      'customerData',
    ).billing.address_1
    this.state.billingArray[4] = SyncStorage.get(
      'customerData',
    ).billing.address_2
    this.state.billingArray[5] = this.getCountryNameReverse(
      SyncStorage.get('customerData').billing.country,
    )
    this.state.billingArray[6] = this.getStateNameReverse(
      SyncStorage.get('customerData').billing.country,
      SyncStorage.get('customerData').billing.state,
    )
    this.state.billingArray[7] = SyncStorage.get('customerData').billing.city
    this.state.billingArray[8] = SyncStorage.get(
      'customerData',
    ).billing.postcode
    this.shippingInput = ['', '', '', '', '', '', '', '', '']
    this.billingInput = ['', '', '', '', '', '', '', '', '']
    this.billingInput1 = ['', '', '', '', '', '', '', '', '']
  }
  /// //////////////////////////////////////// when country or state is select this function is called from child class
  refresh = (name, selectedValue) => {
    const tempC = SyncStorage.get('customerData')

    if (selectedValue === 'shipping') {
      this.state.shippingArray[5] = name
      this.state.shippingArray[6] = ''
      this.state.shippingArray[7] = ''
      this.state.shippingArray[8] = ''
      tempC.shipping.Country = name

      SyncStorage.set('customerData', tempC)
      this.setState({
        shippingCountry: name,
        shippingArray: this.state.shippingArray,
      })
    } else if (selectedValue === 'billing') {
      this.state.billingArray[5] = name
      this.state.billingArray[6] = ''
      this.state.billingArray[7] = ''
      this.state.billingArray[8] = ''
      tempC.billing.Country = name
      SyncStorage.set('customerData', tempC)
      this.setState({
        billingCountry: name,
        billingArray: this.state.billingArray,
      })
    }
    if (selectedValue === 'shippingState') {
      this.state.shippingArray[6] = name
      tempC.shipping.State = name
      SyncStorage.set('customerData', tempC)
      this.setState({
        shippingState: name,
        shippingArray: this.state.shippingArray,
      })
    } else if (selectedValue === 'billingState') {
      this.state.billingArray[6] = name
      tempC.billing.State = name
      SyncStorage.set('customerData', tempC)
      this.setState({
        billingState: name,
        billingArray: this.state.billingArray,
      })
    }
    this.setState({})
  }
  isEmptyArray () {
    let temp = 0
    for (let i = 0; i <= 8; i++) {
      if (this.state.shippingArray[i] !== undefined) {
        temp++
      }
    }
    if (temp === 9) {
      temp = 0
      this.setState({shippingDisableConditions: false, errorMessage: ''})
    } else {
      this.setState({shippingDisableConditions: true, errorMessage: ''})
    }
  }

  isEmptyArray2 () {
    let temp = 0
    for (let i = 0; i <= 8; i++) {
      if (this.state.billingArray[i] !== undefined) {
        temp++
      }
    }
    if (temp === 9) {
      temp = 0
      this.setState({billingDisableConditions: false, errorMessage: ''})
    } else {
      this.setState({billingDisableConditions: true, errorMessage: ''})
    }
  }
  getCountryName (val) {
    let name = ''
    for (const v of global.data.countries) {
      if (val.toString() === v.name.toString()) {
        name = v.value
      }
    }
    return name
  }

  /// //////////
  getCountryNameReverse (val) {
    let name = ''
    for (const v of global.data.countries) {
      if (val.toString() === v.value.toString()) {
        name = v.name
      }
    }
    return name
  }

  getStateNameReverse (val, val2) {
    let name = ''
    if (global.data.states[val]) {
      for (const v of global.data.states[val]) {
        if (val2 === v.value) name = v.name
      }
    } else {
      name = 'other'
    }

    return name
  }

  /// ///////////
  getCountryNameArray () {
    const name = []
    for (const v of global.data.countries) {
      name.push(v.name)
      // }
    }
    return name
  }
  /// ///////////////////////////

  getStateName (val, val2) {
    let name = ''
    if (global.data.states[val]) {
      for (const v of global.data.states[val]) {
        if (val2 === v.name) name = v.value
      }
    } else {
      name = 'other'
    }

    return name
  }

  /// ///////////////////////////////////////////
  updateShippingAddress = async () => {
    let customerData = SyncStorage.get('customerData')
    if (SyncStorage.get('customerData').id != null) {
      customerData.shipping.first_name = this.state.shippingArray[0]
      customerData.shipping.last_name = this.state.shippingArray[1]
      customerData.shipping.postcode = this.state.shippingArray[8]
      customerData.shipping.address_1 = this.state.shippingArray[3]
      customerData.shipping.address_2 = this.state.shippingArray[4]
      customerData.shipping.city = this.state.shippingArray[7]
      customerData.shipping.company = this.state.shippingArray[2]
      customerData.country = this.state.shippingArray[5]
      customerData.state = this.state.shippingArray[6]

      customerData.shippingStateName = this.getStateName(
        this.getCountryName(this.state.shippingArray[5]),
        this.state.shippingArray[6],
      )
      customerData.shippingCountryName = this.getCountryName(
        this.state.shippingArray[5],
      )
      customerData.shipping.state = this.getStateName(
        this.getCountryName(this.state.shippingArray[5]),
        this.state.shippingArray[6],
      )
      customerData.shipping.country = this.getCountryName(
        this.state.shippingArray[5],
      )
      this.setState({
        shippingCountry: customerData.shippingCountryName,
        shippingState: customerData.shippingStateName,
        spinnerTemp: true,
      })
      SyncStorage.set('customerData', customerData)
    }
    const data = await WooComFetch.updateShippingAddress(
      customerData.id,
      customerData,
    )
    if (data !== undefined && data !== null && data !== '') {
      this.refs.toast2.show('successfully updated')
    } else {
      this.refs.toast2.show('Server Error')
    }
    this.setState({spinnerTemp: false})
  }
  /// ///////////////////////////////////////////

  /// ///////////////////////////////////////////
  updateBillingAddress = async () => {
    let customerData = SyncStorage.get('customerData')
    if (SyncStorage.get('customerData').id != null) {
      customerData.billing.first_name = this.state.billingArray[0]
      customerData.billing.last_name = this.state.billingArray[1]
      customerData.billing.state = this.state.billingArray[6]
      customerData.billing.postcode = this.state.billingArray[8]
      customerData.billing.country = this.state.billingArray[5]
      customerData.billing.address_1 = this.state.billingArray[3]
      customerData.billing.address_2 = this.state.billingArray[4]
      customerData.billing.city = this.state.billingArray[7]
      customerData.billing.company = this.state.billingArray[2]
      customerData.billing.phone = this.state.billingArray[10]

      customerData.billingCountryName = this.getCountryName(
        this.state.billingArray[5],
      )
      customerData.billingStateName = this.getStateName(
        this.getCountryName(this.state.billingArray[5]),
        this.state.billingArray[6],
      )
      customerData.billing.state = customerData.billingStateName
      customerData.billing.country = customerData.billingCountryName
      SyncStorage.set('customerData', customerData)
    }

    this.setState({spinnerTemp: true})
    const data = await WooComFetch.updateShippingAddress(
      customerData.id,
      customerData,
    )
    if (data !== undefined && data !== null && data !== '') {
      this.refs.toast.show('successfully updated')
    } else {
      this.refs.toast.show('Server Error')
    }
    this.setState({spinnerTemp: false})
  }
  /// ///////////////////////////////////////////
  // <!-- 2.0 updates -->
  setBillingAddress = () => {
    if (SyncStorage.get('customerData').id != null) {
      let customerData = SyncStorage.get('customerData')
      customerData.billing.first_name = this.state.billingArray[0]
      customerData.billing.last_name = this.state.billingArray[1]
      customerData.billing.state = this.state.billingArray[6]
      customerData.billing.postcode = this.state.billingArray[8]
      customerData.billing.country = this.state.billingArray[5]
      customerData.billing.address_1 = this.state.billingArray[3]
      customerData.billing.address_2 = this.state.billingArray[4]
      customerData.billing.city = this.state.billingArray[7]
      customerData.billing.company = this.state.billingArray[2]
      customerData.billing.phone = this.state.billingArray[10]

      customerData.billingCountryName = this.getCountryName(
        this.state.billingArray[5],
      )
      customerData.billingStateName = this.getStateName(
        this.getCountryName(this.state.billingArray[5]),
        this.state.billingArray[6],
      )
      customerData.billing.state = customerData.billingStateName
      customerData.billing.country = customerData.billingCountryName
      SyncStorage.set('customerData', customerData)
    }
  }
  /// ///////////////////////////////////////
  // <!-- 2.0 updates -->
  setShippingAddress = () => {
    if (SyncStorage.get('customerData').id != null) {
      let customerData = SyncStorage.get('customerData')
      customerData.shipping.first_name = this.state.shippingArray[0]
      customerData.shipping.last_name = this.state.shippingArray[1]
      customerData.shipping.postcode = this.state.shippingArray[8]
      customerData.shipping.address_1 = this.state.shippingArray[3]
      customerData.shipping.address_2 = this.state.shippingArray[4]
      customerData.shipping.city = this.state.shippingArray[7]
      customerData.shipping.company = this.state.shippingArray[2]
      customerData.country = this.state.shippingArray[5]
      customerData.state = this.state.shippingArray[6]

      customerData.shippingStateName = this.getStateName(
        this.getCountryName(this.state.shippingArray[5]),
        this.state.shippingArray[6],
      )
      customerData.shippingCountryName = this.getCountryName(
        this.state.shippingArray[5],
      )
      customerData.shipping.state = this.getStateName(
        this.getCountryName(this.state.shippingArray[5]),
        this.state.shippingArray[6],
      )
      customerData.shipping.country = this.getCountryName(
        this.state.shippingArray[5],
      )
      this.setState({
        shippingCountry: customerData.shippingCountryName,
        shippingState: customerData.shippingStateName,
        spinnerTemp: true,
      })
      SyncStorage.set('customerData', customerData)
    }
  }
  // <!-- 2.0 updates -->
  setAddress () {
    if (SyncStorage.get('customerData').id != null) {
      let customerData = SyncStorage.get('customerData')
      customerData.shipping.first_name = this.state.shippingArray[0]
      customerData.shipping.last_name = this.state.shippingArray[1]
      customerData.shipping.postcode = this.state.shippingArray[8]
      customerData.shipping.address_1 = this.state.shippingArray[3]
      customerData.shipping.address_2 = this.state.shippingArray[4]
      customerData.shipping.city = this.state.shippingArray[7]
      customerData.shipping.company = this.state.shippingArray[2]
      customerData.country = this.state.shippingArray[5]
      customerData.state = this.state.shippingArray[6]
      customerData.shipping.state = this.getStateName(
        this.getCountryName(this.state.shippingArray[5]),
        this.state.shippingArray[6],
      )
      customerData.shipping.country = this.getCountryName(
        this.state.shippingArray[5],
      )
      customerData.billing.first_name = this.state.billingArray[0]
      customerData.billing.last_name = this.state.billingArray[1]
      customerData.billing.postcode = this.state.billingArray[8]
      customerData.billing.address_1 = this.state.billingArray[3]
      customerData.billing.address_2 = this.state.billingArray[4]
      customerData.billing.city = this.state.billingArray[7]
      customerData.billing.company = this.state.billingArray[2]
      customerData.billing.phone = this.state.billingArray[10]
      customerData.billingCountryName = this.getCountryName(
        this.state.billingArray[5],
      )
      customerData.billingStateName = this.getStateName(
        this.getCountryName(this.state.billingArray[5]),
        this.state.billingArray[6],
      )
      customerData.billing.state = customerData.billingStateName
      customerData.billing.country = customerData.billingCountryName
      customerData.billing.email = this.state.billingArray[9]
      SyncStorage.set('customerData', customerData)
    }
  }
  /// ///////////////////////////////////////
  searchFilterFun (text, name, selection) {
    return (
      <TouchableOpacity
        style={{
          marginRight: 20,
          marginLeft: 20,
          marginTop: 20,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 4,
          width: wp('90%'),
          borderRadius: 1,
          borderWidth: 1,
          borderColor: '#c0c0c0',
        }}
        onPress={() =>
          this.props.navigation.navigate('SearchFilterClass', {
            data: text,
            onSelectionBase: selection,
            onGoBack: (name, selectedValue) =>
              this.refresh(name, selectedValue),
          })
        }>
        <Text
          style={{
            color: name === 'Country' || name === 'State' ? '#c0c0c0' : 'black',
            fontSize: theme.mediumSize,
            paddingLeft: 6,
            paddingRight: 6,
            writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
            textAlign:"justify",
          }}>
          {name}
        </Text>
      </TouchableOpacity>
    )
  }
  /// ////////////////////////////////////////
  customTextView (placeholderText, index) {
    return placeholderText ===
      this.props.cartItems2.Config.languageJson.Country ? (
      <View>
        {this.searchFilterFun(
          global.data.countries,
          this.state.shippingCountry === ''
            ? placeholderText
            : this.state.shippingCountry,
          'shipping',
        )}
      </View>
    ) : placeholderText === this.props.cartItems2.Config.languageJson.State ? (
      <View>
        {this.searchFilterFun(
          this.state.shippingCountry === 'Country'
            ? this.state.otherArray
            : global.data.states[
                this.getCountryName(this.state.shippingCountry)
              ] !== undefined
            ? global.data.states[
                this.getCountryName(this.state.shippingCountry)
              ]
            : this.state.otherArray,
          this.state.shippingState,
          'shippingState',
        )}
      </View>
    ) : (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.shippingInput[index].focus()}>
        <View pointerEvents='none'>
          <TextInput
            style={{
              marginTop: 20,
              height: 38,
              paddingLeft: 6,
              paddingRight: 6,
              width: wp('90%'),
              borderColor: '#c1c1c1',
              borderWidth: 1,
              marginLeft: 20,
              fontSize: theme.mediumSize,
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            ref={input => (this.shippingInput[index] = input)}
            selectionColor='#51688F'
            placeholder={` ${placeholderText}`}
            onChangeText={text => {
              this.state.shippingArray[index] = text
              this.setState({shippingArray: this.state.shippingArray})
            }}
            value={this.state.shippingArray[index]}
          />
        </View>
      </TouchableOpacity>
    )
  }
  //= ===========================================================================================
  billingCustomTextView2 (placeholderText, index) {
    return placeholderText ===
      this.props.cartItems2.Config.languageJson.Country ? (
      <View>
        {this.searchFilterFun(
          global.data.countries,
          this.state.billingArray[5] === ''
            ? placeholderText
            : this.state.billingArray[5],
          'billing',
        )}
      </View>
    ) : placeholderText === this.props.cartItems2.Config.languageJson.State ? (
      <View>
        {this.searchFilterFun(
          this.state.billingCountry === 'Country'
            ? this.state.otherArray
            : global.data.states[
                this.getCountryName(this.state.billingArray[5])
              ] !== undefined
            ? global.data.states[
                this.getCountryName(this.state.billingArray[5])
              ]
            : this.state.otherArray,
          this.state.billingArray[6] === ''
            ? placeholderText
            : this.state.billingArray[6],
          'billingState',
        )}
      </View>
    ) : (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.billingInput[index].focus()}>
        <View pointerEvents='none'>
          <TextInput
            style={{
              marginTop: 20,
              height: 38,
              width: wp('90%'),
              borderColor: '#c1c1c1',
              borderWidth: 1,
              marginLeft: 20,
              fontSize: theme.mediumSize,
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              paddingLeft: 6,
              paddingRight: 6,
            }}
            ref={input => (this.billingInput[index] = input)}
            selectionColor='#51688F'
            placeholder={` ${placeholderText}`}
            onChangeText={text => {
              if (text === '') {
                this.state.billingArray[index] = undefined
                this.setState({
                  billingDisableConditions: true,
                  errorMessage: '',
                })
              } else {
                this.state.billingArray[index] = text
                this.setState({billingArray: this.state.billingArray})
                console.log('helo')
                this.isEmptyArray2()
              }
            }}
            value={this.state.billingArray[index]}
          />
        </View>
      </TouchableOpacity>
    )
  }
  /// //////////////////////////////////
  //= ===========================================================================================
  ShippingCustomTextView3 (placeholderText, index) {
    return placeholderText ===
      this.props.cartItems2.Config.languageJson.Country ? (
      <View>
        {this.searchFilterFun(
          global.data.countries,
          this.state.shippingArray[5] === ''
            ? placeholderText
            : this.state.shippingArray[5],
          'shipping',
        )}
      </View>
    ) : placeholderText === this.props.cartItems2.Config.languageJson.State ? (
      <View>
        {this.searchFilterFun(
          this.state.shippingCountry === 'Country'
            ? this.state.otherArray
            : global.data.states[
                this.getCountryName(this.state.shippingArray[5])
              ] !== undefined
            ? global.data.states[
                this.getCountryName(this.state.shippingArray[5])
              ]
            : this.state.otherArray,
          this.state.shippingArray[6] === ''
            ? placeholderText
            : this.state.shippingArray[6],
          'shippingState',
        )}
      </View>
    ) : (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.billingInput1[index].focus()}>
        <View pointerEvents='none'>
          <TextInput
            style={{
              marginTop: 20,
              height: 38,
              width: wp('90%'),
              borderColor: '#c1c1c1',
              borderWidth: 1,
              marginLeft: 20,
              fontSize: theme.mediumSize,
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              paddingLeft: 6,
              paddingRight: 6,
            }}
            ref={input => (this.billingInput1[index] = input)}
            selectionColor='#51688F'
            placeholder={` ${placeholderText}`}
            // underlineColorAndroid="#51688F"
            onChangeText={text => {
              if (text === '') {
                this.state.shippingArray[index] = undefined
                this.isEmptyArray()
              } else {
                this.state.shippingArray[index] = text
                this.isEmptyArray()
              }
            }}
            value={this.state.shippingArray[index]}
          />
        </View>
      </TouchableOpacity>
    )
  }
  /// ///////////////////////////////////
  canBeUpdatingBilling () {
    const {billingArray} = this.state
    console.log(billingArray)
    let temp = 0
    console.log('isEMpty')
    for (let i = 0; i <= 8; i++) {
      if (i !== 2 && i !== 4) {
        if (
          this.state.billingArray[i] !== undefined &&
          this.state.billingArray[i] !== ''
        ) {
          temp++
        }
      }
    }
    console.log(temp)
    if (temp === 7) {
      console.log(`temp ${temp}`)
      temp = 0
      return true
    }
    return false
  }

  canBeUpdatingShipping () {
    const {shippingArray} = this.state
    let temp = 0
    for (let i = 0; i <= 8; i++) {
      if (i !== 2 && i !== 4) {
        if (
          this.state.shippingArray[i] !== undefined &&
          this.state.shippingArray[i] !== ''
        ) {
          temp++
        }
      }
    }
    if (temp === 7) {
      temp = 0
      return true
    }
    return false
  }
  /// ///////////////////////////////////
  render () {
    const canBeUpdatingBillings = this.canBeUpdatingBilling()
    const canBeUpdatingShippings = this.canBeUpdatingShipping()
    return (
      <ScrollView
        keyboardShouldPersistTaps='always'
        style={{backgroundColor: '#f4f4f4'}}>
        <Toast
          ref='toast'
          style={{backgroundColor: '#c1c1c1'}}
          position='bottom'
          positionValue={-300}
          fadeOutDuration={7000}
          textStyle={{color: 'black', fontSize: 15}}
        />
        <Toast
          ref='toast2'
          style={{backgroundColor: '#c1c1c1'}}
          position='bottom'
          positionValue={200}
          fadeOutDuration={7000}
          textStyle={{color: 'black', fontSize: 15}}
        />
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

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: theme.mediumSize + 3,
                color: '#000',
                paddingTop: 10,
              }}>
              {this.props.cartItems2.Config.languageJson['Shipping Address']}
            </Text>

            <FlatList
              data={this.state.placeholderArray}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              // eslint-disable-next-line no-return-assign
              renderItem={item =>
                this.ShippingCustomTextView3(
                  this.state.placeholderArray[item.index],
                  item.index,
                )
              }
            />

            <TouchableOpacity
              onPress={() => this.updateShippingAddress()}
              disabled={!canBeUpdatingShippings}>
              <View
                style={{
                  marginBottom: 20,
                  marginTop: 18,
                  borderColor: '#557f5f',
                  alignItems: 'center',
                  height: 38,
                  width: wp('90%'),
                  backgroundColor: '#557f5f',
                  justifyContent: 'center',
                  opacity: !canBeUpdatingShippings ? 0.4 : 0.9,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: theme.mediumSize + 1,
                  }}>
                  {this.props.cartItems2.Config.languageJson['Update Shipping']}
                </Text>
              </View>
            </TouchableOpacity>

            <Text
              style={{
                color: '#000',
                paddingTop: 20,
                fontSize: theme.mediumSize + 3,
              }}>
              {this.props.cartItems2.Config.languageJson['Billing Address']}
            </Text>

            <FlatList
              data={this.state.placeholderArray2}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              // eslint-disable-next-line no-return-assign
              renderItem={item =>
                this.billingCustomTextView2(
                  this.state.placeholderArray2[item.index],
                  item.index,
                )
              }
            />

            <TouchableOpacity
              onPress={() => this.updateBillingAddress()}
              disabled={!canBeUpdatingBillings}>
              <View
                style={{
                  marginBottom: 20,
                  marginTop: 18,
                  borderColor: '#557f5f',
                  alignItems: 'center',
                  height: 38,
                  width: wp('90%'),
                  backgroundColor: '#557f5f',
                  justifyContent: 'center',
                  opacity: !canBeUpdatingBillings ? 0.4 : 0.9,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: theme.mediumSize + 1,
                  }}>
                  {this.props.cartItems2.Config.languageJson['Update Billing']}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  cartItems2: state,
})

export default connect(mapStateToProps, null)(ShippingAddress)

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
