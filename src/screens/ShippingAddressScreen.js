import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Switch,
  Platform,
  I18nManager,
  Picker,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators'
import {CardStyleInterpolators} from 'react-navigation-stack'
import themeStyle from '../common/Theme.style'
import * as global from '../common/LocationData'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import SyncStorage from 'sync-storage'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import Spinner from 'react-native-loading-spinner-overlay'
import DropDownPicker from 'react-native-dropdown-picker'
import ModalSelector from 'react-native-modal-selector'
 //      <Picker.Item label="Address 1" value="" />
    //      <Picker.Item label="" value="Royal empire Apartment" />
    //      <Picker.Item label="" value="Empire Wings Apartment" />
    //      <Picker.Item label="" value="Royal Empire Villas" />
    //      <Picker.Item label="" value="Royal Empire Villas" />
    //      <Picker.Item label="" value="Roya Tower MRF" />
    //      <Picker.Item label="" value="MRF Towers" />
    //      <Picker.Item label="" value="Quattro Towers MRF" />
    //      <Picker.Item label="" value="Lebanees village" />
    //      <Picker.Item label="" value="Italian City 1" />
    //      <Picker.Item label="" value="Italian City 2" />
    //      <Picker.Item label="" value="Park View Apartment" />
    //      <Picker.Item label="" value="Park View Apartment" />
const data = [
  { key: 0, label: 'Address 1'},
   { key: 1, label: 'Royal empire Apartment'},
    { key: 2, label: 'Empire Wings Apartment'},
    { key: 3, label: 'Royal Empire Villas'},
    { key: 4, label: 'Royal Empire Villas'},
    { key: 5, label: 'Roya Tower MRF'},
    { key: 6, label: 'MRF Towers'},
    { key: 7, label: 'Quattro Towers MRF'},
    { key: 8, label: 'Lebanees village'},
    { key: 9, label: 'Italian City 1'},
    { key: 10, label: 'Italian City 2'},
    { key: 11, label: 'Park View Apartment'},
    { key: 12, label: 'Park View Apartment'},
  ]

class ShippingAddress extends Component {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
      myAccountData: {},
      password: '',
      errorMessage: '',
      errorEmailMessage: '',
      errorPhoneMessage: '',
      spinnerTemp: false,
      shippingArray: [],
      billingArray: [],
      defaultAddress: false,
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
        this.props.cartItems2.Config.languageJson.Email,
        this.props.cartItems2.Config.languageJson.Phone,
      ],
      switch2Value: true,
      disableCondition: true,
      currentLabel: '',
      currency: '',
      billingCountry:
        SyncStorage.get('customerData').billing.country === undefined ||
        SyncStorage.get('customerData').billing.country === ''
          ? 'Country'
          : this.getCountryNameReverse(
              SyncStorage.get('customerData').billing.country,
            ),
      billingState:
        SyncStorage.get('customerData').billing.state === undefined ||
        SyncStorage.get('customerData').billing.state === ''
          ? 'State'
          : this.getStateNameReverse(
              SyncStorage.get('customerData').billing.country,
              SyncStorage.get('customerData').billing.state,
            ),
      shippingCountry:
        SyncStorage.get('customerData').shipping.country === undefined ||
        SyncStorage.get('customerData').shipping.country === ''
          ? 'Country'
          : this.getCountryNameReverse(
              SyncStorage.get('customerData').shipping.country,
            ),
      shippingState:
        SyncStorage.get('customerData').shipping.state === undefined ||
        SyncStorage.get('customerData').shipping.state === ''
          ? 'State'
          : this.getStateNameReverse(
              SyncStorage.get('customerData').shipping.country,
              SyncStorage.get('customerData').shipping.state,
            ),
      otherArray: [{value: 'other', name: 'other'}],
      activityIndicatorTemp: true,
    }
    this.shippingInput = ['', '', '', '', '', '', '', '', '']
    this.billingInput = ['', '', '', '', '', '', '', '', '', '', '']
    setTimeout(() => {
      this.setState({activityIndicatorTemp: false})
    }, Math.floor(50 / 160000))

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
    this.state.billingArray[9] = SyncStorage.get('customerData').email

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
    this.state.billingArray[10] = SyncStorage.get('customerData').billing.phone
  }
  /// ////////////////////////////////////////

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

    let temp2 = 0
    for (let i = 0; i <= 10; i++) {
      if (this.state.billingArray[i] !== undefined) {
        temp++
      }
    }
    for (let i = 0; i <= 8; i++) {
      if (this.state.shippingArray[i] !== undefined) {
        temp2++
      }
    }
    if (temp === 11 && temp2 === 9) {
      temp = 0
      this.setState({disableCondition: false, errorMessage: ''})
    } else {
      this.setState({disableCondition: true, errorMessage: ''})
    }
  }
  // return false;
  getCountryName (val) {
    let name = ''
    for (const v of global.data.countries) {
      if (val.toString() === v.name.toString()) {
        name = v.value
      }
    }
    return name
  }
  getCountryNameArray () {
    const name = []
    for (const v of global.data.countries) {
      name.push(v.name)
    }
    return name
  }
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
  // <!-- 2.0 updates -->
  async setAddress () {
   await this.toggleSwitch1();
   console.log(this.state.billingArray);
   console.log(this.state.shippingArray);
    if (SyncStorage.get('customerData').id != null) {
      const customerData = SyncStorage.get('customerData')
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
      customerData.billing.first_name = this.state.shippingArray[0]
      customerData.billing.last_name = this.state.shippingArray[1]
      customerData.billing.postcode = this.state.shippingArray[8]
      customerData.billing.address_1 = this.state.shippingArray[3]
      customerData.billing.address_2 = this.state.shippingArray[4]
      customerData.billing.city = this.state.shippingArray[7]
      customerData.billing.company = this.state.shippingArray[2]
      customerData.billing.phone = this.state.billingArray[10]

      // console.log(
      //   this.getStateName(
      //     this.state.billingArray[5],
      //     this.state.billingArray[6],
      //   ),
      // )
      customerData.billingCountryName = this.getCountryName(
        this.state.shippingArray[5],
      )
      customerData.billingStateName = this.getStateName(
        this.getCountryName(this.state.shippingArray[5]),
        this.state.shippingArray[6],
      )
      customerData.billing.state = this.getStateName(
        this.getCountryName(this.state.shippingArray[5]),
        this.state.shippingArray[6],
      )
      customerData.billing.country = this.getCountryName(
        this.state.shippingArray[5],
      )
      customerData.billing.email = this.state.billingArray[9]
      SyncStorage.set('customerData', customerData)
    }
    this.props.navigation.navigate('ShippingMethodScreen')
  }
  /// ///////////////////////////////////////
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
            fontSize: themeStyle.mediumSize,

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
    ) : placeholderText === 'Address 1' ? (
    //   <DropDownPicker
    //     items={[
    //         {label: 'Royal empire Apartment', value: 'royalempireapartement'},
    //         {label: 'Empire Wings Apartment', value: 'empirewingsapartment'},
    //         {label: 'Royal Empire Villas', value: 'royalempirevillas'},
    //         {label: 'Roya Tower MRF', value: 'royatowermrf'},
    //         {label: 'MRF Towers', value: 'mrftowers'},
    //         {label: 'Quattro Towers MRF', value: 'quattrotowersmrf'},
    //         {label: 'Lebanees village', value: 'lebaneesvillage'},
    //         {label: 'Italian City 1', value: 'italiancity1'},
    //         {label: 'Italian City 2', value: 'italiancity2'},
    //         {label: 'Park View Apartment', value: 'parkviewapartment'},
    //         {label: 'English Village', value: 'englishvillage'}
    //     ]}
    //     defaultValue={'royalempireapartement'}
    //     containerStyle={{
    //       //height: 40,
    //           marginTop: 20,
    //           height: 38,
    //           width: wp('90%'),
    //           borderColor: '#c1c1c1',
    //           borderWidth: 1,
    //           marginLeft: 20,
    //           backgroundColor: '#fff',
    //           fontSize: themeStyle.mediumSize,
    //           textAlign: I18nManager.isRTL ? 'right' : 'left',
    //           paddingLeft: 6,
    //           paddingRight: 6,
    //           zIndex: 99,
    //           }}
    //     style={{backgroundColor: '#fff', zIndex: 999}}
    //     itemStyle={{
    //         justifyContent: 'flex-start',
    //         backgroundColor: '#fff',
    //         zIndex: 9999
    //     }}
    //     dropDownStyle={{backgroundColor: '#fff'}}
    //     onChangeItem={item => this.setState({
    //         country: item.value
    //     })}
    // />

    // <View style={{borderColor: '#ccc', 
    //  width: wp('90%'),
    // borderWidth: 1, marginTop: 20,  marginLeft: 20,}}>
    //     <Picker
    //     selectedValue={this.state.shippingArray[index]}
    //       style={{ 
    //                 height: 38,
    //                 borderColor: '#c1c1c1',
    //                 borderWidth: 1,
    //                 backgroundColor: '#fff',
    //                 fontSize: themeStyle.mediumSize,
    //                 textAlign: I18nManager.isRTL ? 'right' : 'left',
    //                 paddingLeft: 6,
    //                 paddingRight: 6,
    //                 //zIndex: 99,
    //                 borderColor: '#ccc', borderWidth: 1
    //                 }}
    //      onValueChange={(itemValue, itemIndex) => {
    //       console.log(itemValue, itemIndex)
    //        this.state.shippingArray[index] = itemValue
    //      }}
    //      //ref={input => (this.shippingInput[index] = input)}
    //     > 
    //      <Picker.Item label="Address 1" value="" />
    //      <Picker.Item label="Royal empire Apartment" value="Royal empire Apartment" />
    //      <Picker.Item label="Empire Wings Apartment" value="Empire Wings Apartment" />
    //      <Picker.Item label="Royal Empire Villas" value="Royal Empire Villas" />
    //      <Picker.Item label="Royal Empire Villas" value="Royal Empire Villas" />
    //      <Picker.Item label="Roya Tower MRF" value="Roya Tower MRF" />
    //      <Picker.Item label="MRF Towers" value="MRF Towers" />
    //      <Picker.Item label="Quattro Towers MRF" value="Quattro Towers MRF" />
    //      <Picker.Item label="Lebanees village" value="Lebanees village" />
    //      <Picker.Item label="Italian City 1" value="Italian City 1" />
    //      <Picker.Item label="Italian City 2" value="Italian City 2" />
    //      <Picker.Item label="Park View Apartment" value="Park View Apartment" />
    //      <Picker.Item label="Park View Apartment" value="Park View Apartment" />
    //    </Picker>
    // </View>

     <ModalSelector
      style={{     marginLeft: 20,
                   marginRight: 20,
                    height: 38,
                    marginTop: 20,
                    color: '#000'
                    // borderColor: '#c1c1c1',
                    // borderWidth: 1,
                    // backgroundColor: '#fff',
                    // fontSize: themeStyle.mediumSize,
                    // textAlign: I18nManager.isRTL ? 'right' : 'left',
                    // paddingLeft: 6,
                    // paddingRight: 6,
                    //zIndex: 99,
                 //   borderColor: '#ccc', borderWidth: 1
                    }}
                    data={data}
                    initValue="Address 1"
                    onChange={(option)=>{ this.state.shippingArray[index] = option.label }} />
 
    ) : (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.shippingInput[index].focus()}>
        <View pointerEvents='none'>
          <TextInput
            style={{
              marginTop: 20,
              height: 38,
              width: wp('90%'),
              borderColor: '#c1c1c1',
              borderWidth: 1,
              marginLeft: 20,
              fontSize: themeStyle.mediumSize,
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              paddingLeft: 6,
              paddingRight: 6,
              zIndex: -1,
            }}
            ref={input => (this.shippingInput[index] = input)}
            selectionColor={themeStyle.primaryDark}
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
  customTextView2 (placeholderText, index) {
    //console.log('billign index', index);
    //this.toggleSwitch1();
   
     //placeholderText ===
    //   this.props.cartItems2.Config.languageJson.Country ? (
    //   <View>
    //     {this.searchFilterFun(
    //       global.data.countries,
    //       this.state.billingArray[5] === ''
    //         ? placeholderText
    //         : this.state.billingArray[5],
    //       'billing',
    //     )}
    //   </View>
    // ) : placeholderText === this.props.cartItems2.Config.languageJson.State ? (
    //   <View>
    //     {this.searchFilterFun(
    //       this.state.billingCountry === 'Country'
    //         ? this.state.otherArray
    //         : global.data.states[
    //             this.getCountryName(this.state.billingArray[5])
    //           ] !== undefined
    //         ? global.data.states[
    //             this.getCountryName(this.state.billingArray[5])
    //           ]
    //         : this.state.otherArray,
    //       this.state.billingArray[6] === ''
    //         ? placeholderText
    //         : this.state.billingArray[6],
    //       'billingState',
    //     )}
    //   </View>
    // ) : (
      return  index > 8 ? 
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
              marginLeft: 0,
              fontSize: themeStyle.mediumSize,
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              paddingLeft: 6,
              paddingRight: 6,
            }}
            ref={input => (this.billingInput[index] = input)}
            selectionColor={themeStyle.primaryDark}
            placeholder={` ${placeholderText}`}
            onChangeText={text => {
              if (text === '') {
                this.state.billingArray[index] = undefined
                this.setState({disableCondition: true, errorMessage: ''})
              } else {
                this.state.billingArray[index] = text
                this.setState({billingArray: this.state.billingArray})
                this.isEmptyArray()
              }
            }}
            value={this.state.billingArray[index]}
          />
        </View>
      </TouchableOpacity> : null
  //  )
  }
  /////////////////////////////////////
  toggleSwitch1 = () => {
   // if (!this.state.switch2Value) {
      const tempC = SyncStorage.get('customerData')
      tempC.sameAddress = true
      SyncStorage.set('customerData', tempC)
      if(!this.state.billingArray[9]) {
        this.state.billingArray[9] = SyncStorage.get('customerData').email
      }
      
      for (let i = 0; i <= 10; i++) {
        // if (i === 9) {
        //   this.state.billingArray.push(SyncStorage.get('customerData').email)
        // }
        if (i < 9) {
          this.state.billingArray[i] = this.state.shippingArray[i]
        }
        // if (i > 9) {
        //   this.state.billingArray[i] = undefined
        // }
        if (i === 5) {
          this.state.billingCountry = this.state.shippingCountry
          this.state.billingArray[i] = this.state.billingCountry
        }
        if (i === 6) {
          this.state.billingState = this.state.shippingState
          this.state.billingArray[i] = this.state.billingState
        }
      }
    // } else if (
    //   this.state.billingArray[0] !== '' ||
    //   this.state.billingArray[0] !== undefined
    // ) {
    //   this.state.billingArray[0] = SyncStorage.get(
    //     'customerData',
    //   ).billing.first_name
    //   this.state.billingArray[1] = SyncStorage.get(
    //     'customerData',
    //   ).billing.last_name
    //   this.state.billingArray[2] = SyncStorage.get(
    //     'customerData',
    //   ).billing.company
    //   this.state.billingArray[3] = SyncStorage.get(
    //     'customerData',
    //   ).billing.address_1
    //   this.state.billingArray[4] = SyncStorage.get(
    //     'customerData',
    //   ).billing.address_2
    //   this.state.billingArray[5] = SyncStorage.get(
    //     'customerData',
    //   ).billing.country
    //   this.state.billingArray[6] = SyncStorage.get('customerData').billing.state
    //   this.state.billingArray[7] = SyncStorage.get('customerData').billing.city
    //   this.state.billingArray[8] = SyncStorage.get(
    //     'customerData',
    //   ).billing.postcode
    //   this.state.billingArray[10] = SyncStorage.get(
    //     'customerData',
    //   ).billing.phone
    //   this.state.billingArray[9] = SyncStorage.get('customerData').email
    // } else {
    //   const tempC = SyncStorage.get('customerData')
    //   tempC.sameAddress = false
    //   SyncStorage.set('customerData', tempC)
    //   this.state.billingArray[9] = SyncStorage.get('customerData').email
    //   for (let i = 0; i <= 10; i++) {
    //     if (i === 9) {
    //       this.state.billingArray[i] = SyncStorage.get('customerData').email
    //     } else if (i === 5) {
    //       this.state.billingCountry = 'Country'
    //       this.state.billingArray[i] = this.state.billingCountry
    //     } else if (i === 6) {
    //       this.state.billingState = 'State'
    //       this.state.billingArray[i] = this.state.billingState
    //     } else {
    //       this.state.billingArray[i] = ''
    //     }
    //   }
    // }
    // this.setState({
    //   disableCondition: true,
    //   switch2Value: !this.state.switch2Value,
    // })
  }
  /// ////////////////////////////////////
  pickerChange (index) {
    global.data.countries.map((v, i) => {
      if (index === i) {
        this.setState({
          currentLabel: v.name,
          currency: v.value,
        })
      }
    })
  }
  /// ///////////////////////////////////
  /// ////////////////////////////////////
  pickerChange2 (index, country) {
    global.data.states[country].map((v, i) => {
      if (index === i) {
        this.setState({
          currentLabel: v.name,
          currency: v.value,
        })
      }
    })
  }
  /// ///////////////////////////////////
  /// ///////////////////////////////////
  canBeUpdatingBilling () {
    const {billingArray} = this.state
    console.log(billingArray)
    let temp = 0
    for (let i = 0; i <= 10; i++) {
      if (i !== 2 && i !== 4) {
        if (
          this.state.billingArray[i] !== undefined &&
          this.state.billingArray[i] !== ''
        ) {
          temp++
        }
      }
    }
    if (temp === 9) {
      temp = 0
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (reg.test(this.state.billingArray[9]) === false) {
        console.log('Email is Not Correct')
        this.state.errorEmailMessage = 'The email address is not valid'
        return false
      }

      if (!this.phonenumber(this.state.billingArray[10])) {
        this.state.errorPhoneMessage = 'The phoneNumber is not valid'
        return false
      }

      this.state.errorPhoneMessage = ''
      this.state.errorEmailMessage = ''
      console.log('Email is Correct')
      return true
    }
    return false
  }

  phonenumber (inputtxt) {
    if (!isNaN(inputtxt)) {
      return true
    }
    return false
  }

  canBeUpdatingShipping () {
    const {shippingArray} = this.state
    console.log('shiddd', shippingArray);
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
    const {billingArray} = this.state;
   console.log('fksdkf', billingArray);
    if(billingArray[9] == undefined || billingArray[9] == '' || billingArray[10] == undefined || billingArray[10] == '' ) {
       return false
    }
    if (temp === 7) {
      temp = 0
      return true
    }
    return false
  }
  /// ///////////////////////////////////
  componentWillUnmount () {
    clearInterval(this.state.activityIndicatorTemp)
  }
  /// ///////////////////////////////////
  render () {
   // const canBeUpdatingBillings = this.canBeUpdatingBilling()
    const canBeUpdatingShippings = this.canBeUpdatingShipping()
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
      <ScrollView
        keyboardShouldPersistTaps='always'
        style={{backgroundColor: '#f4f4f4'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: themeStyle.backgroundColor,

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
                fontSize: themeStyle.largeSize + 1,
                color: '#000',
                paddingTop: 10,
              }}>
              {this.props.cartItems2.Config.languageJson['Shipping Address']}
            </Text>

            <FlatList
            style={{zIndex: 1}}
              data={this.state.placeholderArray}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              // eslint-disable-next-line no-return-assign
              renderItem={item =>
                this.customTextView(
                  this.state.placeholderArray[item.index],
                  item.index,
                )
              }
            />

            {/* <Text
              style={{
                fontSize: themeStyle.largeSize + 1,
                color: '#000',
                paddingTop: 20,
              }}>
              {this.props.cartItems2.Config.languageJson['Billing Address']}
            </Text> */}

            {/* <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                paddingRight: 120,
                paddingTop: 10,
              }}>
              <Switch
                thumbColor={themeStyle.primaryDark}
                onValueChange={() => this.toggleSwitch1()}
                value={this.state.switch2Value}
              />
              <Text
                style={{
                  fontSize: themeStyle.mediumSize,
                  color: 'black',
                  paddingLeft: 10,
                  paddingTop: 7,
                }}>
                {
                  this.props.cartItems2.Config.languageJson[
                    'Same as Shipping Address'
                  ]
                }
              </Text>
            </View> */}

            <FlatList
              data={this.state.placeholderArray2}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              // eslint-disable-next-line no-return-assign
              renderItem={item =>
                this.customTextView2(
                  this.state.placeholderArray2[item.index],
                  item.index,
                )
              }
            />
            {this.state.errorEmailMessage !== '' ? (
              <Text style={{padding: 10, paddingBottom: 0, color: 'red'}}>
                {this.state.errorEmailMessage}
              </Text>
            ) : null}
            {this.state.errorPhoneMessage !== '' ? (
              <Text style={{padding: 10, paddingBottom: 0, color: 'red'}}>
                {this.state.errorPhoneMessage}
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={() => this.setAddress()}
              disabled={!canBeUpdatingShippings}>
              <View
                style={{
                  marginBottom: 20,
                  marginTop: 22,
                  borderWidth: 1,
                  borderColor: themeStyle.otherBtnsColor,
                  alignItems: 'center',
                  height: 38,
                  width: wp('80%'),
                  backgroundColor: themeStyle.otherBtnsColor,
                  justifyContent: 'center',
                  opacity:
                     !canBeUpdatingShippings
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
                  {this.props.cartItems2.Config.languageJson.Next}
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
    backgroundColor: themeStyle.backgroundColor,
  },
})
