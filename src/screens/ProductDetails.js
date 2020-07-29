/* eslint-disable no-empty */
/* eslint-disable guard-for-in */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-continue */
/* eslint-disable space-in-parens */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable import/imports-first */
/* eslint-disable react/sort-comp */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */

import React, {Component} from 'react'
import {
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Linking,
  Dimensions,
  I18nManager,
  Platform,
  Share,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators'
import {CardStyleInterpolators} from 'react-navigation-stack'
import ImageLoad from '../common/RnImagePlaceH'
import ProductsBanner from '../common/ProductsBanner'
// eslint-disable-next-line max-len
import Stars from 'react-native-stars'
import FlatListView from '../common/FlatListView'
// eslint-disable-next-line import/newline-after-import
import HTML from 'react-native-render-html'
import SyncStorage from 'sync-storage'
import {connect} from 'react-redux'
import {withNavigation} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
// import {Dropdown} from 'react-native-material-dropdown'
// import ModalDropdown from 'react-native-modal-dropdown';
// import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {Icon} from 'native-base'
import Ionicons from 'react-native-vector-icons/FontAwesome'
import Counter from '../common/Counter'
import WooComFetch from '../common/WooComFetch'
import themeStyle from '../common/Theme.style'
const pageNumbers = [1]
WIDTH = Dimensions.get('window').width

class ProductDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      headerRight: null,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
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
    }
  }
  mounted = false
  // _menu = null;
 
  // setMenuRef = ref => {
  //   this._menu = ref;
  // };
 
  hideMenu = (form, value, name,index) => {
    //  form.hide();
    
     this.fillAttributes(
      value,
      name,
      index,
    )
  };
 
  // showMenu = (form) => {
  //    form.show();
  // };
 
  constructor (props) {
    super(props)
    const s = this.convertHtmlTag(
      this.props.navigation.state.params.objectArray.price_html,
    )
    this.state = {
      totalObjectArray: [],
      relatedObjectArray: [],
      activityIndicatorTemp: true,
      isLoading: true,
      relatedImages: [],
      relatedProductImages2: [],
      cartProductQuantity: [],
      cartTotal: this.props.cartItems2.cartItems.cartquantity,
      variations: [],
      allVariableAttributes: [],
      selectAttributes: [],
      tempAllVariableAttributes: [],
      disableCartButton: false,
      language: '',
      singlePickerVisible: true,
      singlePickerSelectedItem: '',
      selectedDropDownValue: [],
      selectedVariation: false,
      select: 'Select',
      selectedImages: this.props.navigation.state.params.objectArray.images,
      SpinnerTemp: false,
      htmlPriceTemp: s,
      nameTemp: this.props.navigation.state.params.objectArray.name,
      priceValue: this.props.navigation.state.params.objectArray.price,
      clearButton: false,
      addToCartButtonValue:
        this.props.navigation.state.params.objectArray.type === 'simple' ||
        this.props.navigation.state.params.objectArray.type === 'external' ||
        this.props.navigation.state.params.objectArray.type === 'variation'
          ? false
          : true,
      selectedProduct: this.props.navigation.state.params.objectArray,
      initialValue: 1,
      cartButtonCounter: 0,
      variableItemselected: false,
      variationsAvailable: true,
      variationsAvailableLength: this.props.navigation.state.params.objectArray
        .variations.length,
      wcVendorInfo: [],
      loaderWcVendorInfo: true,
    }
    this.stepper = ''
    this.form = []
    if (this.props.cartItems2.Config.showWcVendorInfo) {
      this.setState({loaderWcVendorInfo: true})
      this.getWcVendorInfo()
    }
    this.state.cartProductQuantity[0] = 1 // set one for default quantity at least one item should be selected
    setTimeout(() => {
      this.setState({activityIndicatorTemp: false})
    }, Math.floor(100 / 360000))
    setTimeout(() => {
      this.props.addRecentItems(this.props.navigation.state.params.objectArray)
    }, Math.floor(200 / 360000))
  }

  /////////////////////////////

  handleClearFields = () => {
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.form) {
      this.form[key].state.value = 'Select'
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////
  componentWillUnmount () {
    if (this.props.navigation.state.params.updateCart !== undefined) {
      this.props.navigation.state.params.updateCart()
    }
    this.mounted = false
    this.state.isLoading = false
    this.state.priceValue = 0
    clearInterval(this.state.activityIndicatorTemp)

    // this.props.navigation.state.params.updateCart();
  }
  //////////////////////////////////
  componentDidMount () {
    this.props.navigation.state.params.objectArray.type === 'simple' ||
    this.props.navigation.state.params.objectArray.type === 'variable' ||
    this.props.navigation.state.params.objectArray.type === 'variation'
      ? this.state.totalObjectArray.push(
          this.props.navigation.state.params.objectArray,
        )
      : null
    if (
      this.props.navigation.state.params.objectArray.grouped_products.length > 0
    ) {
      this.props.navigation.state.params.objectArray.grouped_products.map(
        item => this.state.relatedImages.push(item),
      )
    }
    this.getVariations()
    if (Platform.OS === 'ios') {
      this.props.navigation.setParams({
        headerTitle: this.props.cartItems2.Config.languageJson[
          'Product Details'
        ],
      })
    } else {
      this.props.navigation.setParams({
        headerTitle: `${this.props.cartItems2.Config.languageJson['Product Details']}`,
      })
    }
    this.mounted = true
    if (
      this.props.navigation.state.params.objectArray.grouped_products.length > 0
    ) {
      // get groups of  products
      this.getReleated()
    }
  }
  ///////////////////////////////
  getWcVendorInfo () {
    fetch(
      `${this.props.cartItems2.Config.url}/api/reactappsettings/react_get_vendor_info/?insecure=cool&product_id=${this.props.navigation.state.params.objectArray.id}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data !== undefined) {
          if (data.status !== undefined) {
            if (data.status === 'ok') {
              this.state.wcVendorInfo.push(data.data[0])
            }
          }
        }
        // }
        this.setState({loaderWcVendorInfo: false})
      })
      .catch(error => {
        console.log(error)
      })
  }
  //===============================================================================================================================
  getVariations () {
    for (const value of this.props.navigation.state.params.objectArray
      .variations) {
      this.getReleated2(value)
    }
  }
  /////////////////////////////////////////////////////// get variations of products
  getReleated2 = async value => {
    try {
      const json2 = await WooComFetch.getVariableProducts(
        value,
        this.props.cartItems2.Config.productsArguments,
      )
      if (this.mounted) {
        this.state.variations.push(json2)
        this.initializeAllVariationAttributes(json2)
      }
      // eslint-disable-next-line no-undef
      this.setState({
        variationsAvailableLength: this.state.variationsAvailableLength - 1,
      })
      if (this.state.variationsAvailableLength === 1) {
        this.setState({variationsAvailable: false})
      }
    } catch (err) {
      console.log(err)
      this.setState({SpinnerTemp: false})
    }
  }
  // option;
  //===============================================================================================================================
  initializeAllVariationAttributes (p) {
    const ob = {}
    ob.id = p.id
    ob.select = false
    for (const val of this.props.navigation.state.params.objectArray
      .attributes) {
      if (val.variation == false) continue
      ob[val.name] = 'any'
      for (const v2 of p.attributes) {
        if (val.name.toUpperCase() == v2.name.toUpperCase()) {
          ob[val.name] = v2.option
        }
      }
    }
    this.state.allVariableAttributes.push(ob)
    if (
      this.state.allVariableAttributes.length ==
      this.props.navigation.state.params.objectArray.variations.length
    ) {
      this.sortAllVariationAttributes()
    }
  }
  // ===============================================================================================================================
  sortAllVariationAttributes () {
    const array = []
    for (const val of this.props.navigation.state.params.objectArray
      .variations) {
      for (const v2 of this.state.allVariableAttributes) {
        if (val == v2.id) array.push(v2)
      }
    }
    this.state.allVariableAttributes = array
  }

  availableOption (name, val) {
    if (this.state.selectAttributes.length == 0) return true
    for (const value of this.state.tempAllVariableAttributes) {
      if (value.select == true) {
        if (value[name] == 'any') return true
        if (value[name] == val) return true
      }
    }
  }
  //checking avalability of option in all variations
  sortAttributes () {
    this.state.tempAllVariableAttributes = JSON.parse(
      JSON.stringify(this.state.allVariableAttributes),
    )
    let count = 0
    for (const x of this.state.selectAttributes) {
      for (const y of this.state.tempAllVariableAttributes) {
        if (y[x.key] == x.value || y[x.key] == 'any') {
          if (count == 0) {
            y.select = true
          } else if (y.select == true) y.select = true
          else y.select = false
        } else y.select = false
      }
      count++
    }
  }
  // reset attributes and selection
  resetAttributes () {
    const s = this.convertHtmlTag(
      this.props.navigation.state.params.objectArray.price_html,
    )
    this.stepper.resetValue()
    this.handleClearFields()
    this.setState({
      tempAllVariableAttributes: this.state.allVariableAttributes,
      selectAttributes: [],
      attributes: this.props.navigation.state.params.objectArray.attributes,
      selectedVariation: null,
      selectedImages: this.props.navigation.state.params.objectArray.images,
      htmlPriceTemp: s,
      nameTemp: this.props.navigation.state.params.objectArray.name,
      priceValue: this.props.navigation.state.params.objectArray.price,
      selectedProduct: this.props.navigation.state.params.objectArray,
      initialValue: 1,
      addToCartButtonValue: true,
      variableItemselected: false,
    })
  }
  resetAttributes1 () {
    const s = this.convertHtmlTag(
      this.props.navigation.state.params.objectArray.price_html,
    )
    this.stepper.resetValue()
    this.handleClearFields()
    this.setState({
      clearButton: false,
      tempAllVariableAttributes: this.state.allVariableAttributes,
      selectAttributes: [],
      attributes: this.props.navigation.state.params.objectArray.attributes,
      selectedVariation: null,
      selectedImages: this.props.navigation.state.params.objectArray.images,
      htmlPriceTemp: s,
      nameTemp: this.props.navigation.state.params.objectArray.name,
      priceValue: this.props.navigation.state.params.objectArray.price,
      initialValue: 1,
      addToCartButtonValue: true,
      variableItemselected: false,
      //
    })
    this.state.totalObjectArray.push(
      this.props.navigation.state.params.objectArray,
    )
    console.log(this.state.nameTemp)
  }
  //===============================================================================================================================
  getAttributesLength () {
    let count = 0
    for (const a of this.props.navigation.state.params.objectArray.attributes) {
      if (a.variation) count++
    }
    return count
  }
  //===============================================================================================================================
  enableDisbaleCartButton () {
    if (
      this.props.navigation.state.params.objectArray.type != 'variable' &&
      this.props.navigation.state.params.objectArray.in_stock
    ) {
      this.state.disableCartButton = false
    } else if (
      this.state.selectAttributes.length == this.getAttributesLength() &&
      this.props.navigation.state.params.objectArray.in_stock
    ) {
      this.state.disableCartButton = false
    } else this.state.disableCartButton = true
  }
  //===============================================================================================================================
  //===============================================================================================================================
  //function adding attibute into array
  fillAttributes = function (val, key, position) {
    let count = 0
    console.log(val)
    console.log(key)
    console.log(position)
    this.state.selectAttributes.forEach((value, index) => {
      if (value.position == position) {
        value.value = val
        count++
      }
      if (val == 'choose' && value.position == position) {
        this.state.selectAttributes.splice(index, 1)
      }
    })
    if (count == 0 && val != 'choose') {
      this.state.selectAttributes.push({
        key,
        value: val,
        position,
      })
    }

    this.sortAttributes()
    if (this.getAttributesLength() === this.state.selectAttributes.length) {
      this.selectVariation()
    }

    if (this.state.selectAttributes.length !== this.getAttributesLength()) {
      this.variationPrice = null
    }
    this.stepper.resetValue()
    this.setState({
      selectedDropDownValue: [],
      clearButton: true,
    }) // this render is use to show clear button
  }

  //===============================================================================================================================
  selectVariation () {
    let pId = null
    for (const i of this.state.tempAllVariableAttributes) {
      if (i.select == true) {
        pId = i.id
        break
      }
    }
    for (const i of this.state.variations) {
      if (i.id == pId) {
        this.state.selectedVariation = i
        break
      }
    }
    if (this.state.selectAttributes != null) {
      this.updateProductDetail(this.state.selectedVariation)
    }
  }
  //===============================================================================================================================
  updateProductDetail (p) {
    const oldProduct = this.props.navigation.state.params.objectArray
    let k = []
    if (p.images[0].src.indexOf('placeholder') == -1) {
      k = this.removeDuplication(p.images.concat(oldProduct.images))
    }
    const s = this.convertHtmlTag(p.price_html)
    this.state.selectedImages = []
    this.setState({
      selectedImages: k,
      htmlPriceTemp: s,
      nameTemp: p.name,
      priceValue: p.price,
      selectedProduct: p,
      addToCartButtonValue: false,
      variableItemselected: true,
    })
    this.state.totalObjectArray = []
    this.state.totalObjectArray.push(p)
  }
  removeDuplication (array) {
    console.log('removeDuplication')
    const a = array.concat()
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i].src === a[j].src) a.splice(j--, 1)
      }
    }
    return a
  }

  getReleated = async () => {
    try {
      const json2 = await WooComFetch.getReleatedProducts(
        this.props.navigation.state.params.objectArray.grouped_products,
        this.props.cartItems2.Config.productsArguments,
      )
      if (this.mounted) {
        this.newMethod2(json2)

        this.setState({
          isLoading: false,
        })
      }
    } catch (err) {
      console.log(err)
      this.setState({SpinnerTemp: false})
    }
  }
  /////////////////////////////////
  newMethod2 (j) {
    this.getData(j)
  }
  ////////////////////////////////
  getData = j => {
    j.map(val => {
      val.price_html = this.convertHtmlTag(val.price_html)
      this.state.relatedObjectArray.push(val)
      val.images.map((val2, key) => {
        if (key === 0) {
          this.state.relatedProductImages2.push(val2.src)
        }
      })
    })
  }
  /////////////////////////////////////

  check = () => {
    if (this.props.navigation.state.params.objectArray.in_stock === true) {
      if (
        this.props.navigation.state.params.objectArray ===
          this.state.totalObjectArray[0] ||
        this.props.navigation.state.params.objectArray.type === 'grouped'
      ) {
        this.state.totalObjectArray.map((val, key) =>
          this.props.addItemToCart(
            this.state.totalObjectArray[key],
            this.state.cartProductQuantity[key],
            null,
          ),
        )
      } else {
        this.state.totalObjectArray.map((val, key) =>
          this.props.addItemToCart(
            this.state.totalObjectArray[key],
            this.state.cartProductQuantity[key],
            this.state.selectedVariation,
          ),
        )
      }
         ///////////////////////////////////
    this.setState({
      totalObjectArray: [],
      tempValue: 0,
      cartNameArray: [],
      cartProductQuantity: [],
      cartImageArray: [],
      cartHtmlArray: [],
      cartPriceArray: [],
      initialValue: 1,
      SpinnerTemp: false,
    })
    this.props.setSpiner(false)
    this.props.navigation.pop()
    }else{
      this.setState({SpinnerTemp: false})
    }

 
  }
  /////////////////////////////////////////
  // eslint-disable-next-line no-unused-vars
  RempveitemsIntoArray = (value, object, index) => {
    if (this.props.navigation.state.params.objectArray.type === 'variable') {
      this.setState({
        addToCartButtonValue: this.state.variableItemselected ? false : true,
      })
    }
    if (
      this.props.navigation.state.params.objectArray.type === 'grouped' &&
      this.state.cartButtonCounter === 1
    ) {
      this.setState({
        addToCartButtonValue: true,
      })
    }
    this.setState({
      cartButtonCounter: this.state.cartButtonCounter - 1,
    })
    if (value >= 0) {
      this.state.cartProductQuantity[index] =
        this.state.cartProductQuantity[index] - 1
      this.setState({
        priceValue: object.price * value,
        tempValue: value,
      })
      if (value === 0) {
        // use this condition to remove last item from cart wich has zero quantity
        var array = this.state.totalObjectArray // make a separate copy of the array
        var index2 = array.indexOf(object)
        if (index2 !== -1) {
          array.splice(index2, 1)
          this.setState({totalObjectArray: array})
        }
      }
    }
  }
  //////////////////////////////////////
  AdditemsIntoArray = (value, object, index) => {
    if (value > 0) {
      ///////////////////////////////////////////////
      this.state.totalObjectArray[index] = object
      this.state.cartProductQuantity[index] = value * 1
      ///////////////////////////////////////////////
      if (this.props.navigation.state.params.objectArray.type === 'variable') {
        this.setState({
          priceValue: object.price * value,
          tempValue: value,
          addToCartButtonValue: this.state.variableItemselected ? false : true,
          cartButtonCounter: this.state.cartButtonCounter + 1,
        })
      }
      if (
        this.props.navigation.state.params.objectArray.type === 'simple' ||
        this.props.navigation.state.params.objectArray.type === 'grouped' ||
        this.props.navigation.state.params.objectArray.type === 'variation'
      ) {
        this.setState({
          priceValue: object.price * value,
          tempValue: value,
          addToCartButtonValue: false,
          cartButtonCounter: this.state.cartButtonCounter + 1,
        })
      }
    }
  }
  ////////////////////////////////////////
  onClickDropdown = (data, index) => {
    this.setState(prevState => {
      const value = Object.assign({}, prevState.selectedDropDownValue, {
        [index]: data,
      })
      return {selectedDropDownValue: value}
    })
  }

  loadData = item => {
    const temp = []
    console.log(item)
     item.options.map((value2, index) => {
      if (this.availableOption(item.name, value2)) {
        temp.push(
          value2
          // Object.create({
          //   label: value2,
          //   value: value2,
          // }),
        )
      }
    })
    return temp
  }
  check2 = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
        } else {
          return Linking.openURL(url)
        }
      })
      .catch(err => console.log('An error occurred', err))
  }
  ///////////
  convertHtmlTag = htmlprice => {
    let s = htmlprice
    s = s.replace(/<del>/, '<s>')
    s = s.replace(/<\/del>/, '</s>')
    return s
  }
  onShare = async () => {
    try {
      const result = await Share.share({
        message: `${this.props.navigation.state.params.objectArray.permalink}`,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message)
    }
  }

  /// ////////////////////////////////////////////////////////////
  checkWishList = props => {
    let temp = 0
    if (props.cartItems2.cartItems.wishListProducts.length > 0) {
      props.cartItems2.cartItems.wishListProducts.map(row => {
        if (row.id === this.props.navigation.state.params.objectArray.id) {
          temp = 1
        }
      })
      if (temp === 1) {
        return 1
      }
      temp = 0
      return 0
    } else {
      return 0
    }
  }
  /// /////////////////////////////////////////////////////////////
  /// ///////////////////////////////////////////////////////////
  removeWishlist = (props, t) => {
    t.setState({SpinnerTemp: true})
    setTimeout(() => {
      props.removeWishListProduct(
        this.props.navigation.state.params.objectArray,
      )
      this.setState({SpinnerTemp: false})
    }, Math.floor(100 / 360000))
  }
  /// ////////////////////////////////////////////////////////////
  addWishlist = (props, t) => {
    t.setState({SpinnerTemp: true})
    setTimeout(() => {
      props.addWishlistProduct(this.props.navigation.state.params.objectArray)
      this.setState({SpinnerTemp: false})
    }, Math.floor(100 / 360000))
  }



//    availableOption = ((name, val) => {

// console.log("availableOption(name: any, val: any)");
// console.log("name", name);
// console.log("value", val);
// if (this.state.selectAttributes.length === 0) {
//   return true;
// }
// console.log("tempAllVariableAttributes", this.state.tempAllVariableAttributes);
// for (let value of this.state.tempAllVariableAttributes) {
//   if (value.select === true) {
//     console.log("In IF True,,,,,,,,,,,,,,,,,,,,,,,,,,")
//     if (value[name] === 'any') return true;
//     if ( value[name].toUpperCase() == val.toUpperCase()) return true;
//   }
// }
// });


// For Select Attributes Check Badge
 checkOptionSelected = (value, key, ind) => {
let color = themeStyle.primary;
this.state.selectAttributes.forEach((e) => {
  if (e.key.toUpperCase() == key.toUpperCase() &&
    e.value.toUpperCase() == value.toUpperCase()
  )
    color = themeStyle.otherBtnsColor;
});
return color;
} 
  /// ///////////////////////////////////////////////////////////
  render () {
    return this.state.activityIndicatorTemp ? (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={{paddingBottom: 42}}>
          <Spinner
            visible={this.state.SpinnerTemp}
            textStyle={styles.spinnerTextStyle}
          />
          {this.state.clearButton ? (
            <TouchableOpacity
              style={{
                height: 33,
                zIndex: 5,
                width: 40,
                position: 'absolute',
                bottom: 80,
                right: 30,
                shadowOffset: {width: 1, height: 1},
                shadowColor: 'black',
                shadowOpacity: 0.4,
                elevation: 3,
              }}
              onPressIn={() => this.resetAttributes()}
              onPressOut={() => this.resetAttributes1()}>
              <View
                style={{
                  alignItems: 'center',
                  height: 55,
                  width: 55,
                  borderRadius: 400,
                  backgroundColor: 'red',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: themeStyle.mediumSize,
                    fontWeight: '500',
                  }}>
                  {this.props.cartItems2.Config.languageJson.Clear}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pageNumbers}
            vertical
            extraData={this.state}
            keyExtractor={pageNumber => pageNumber.toString()}
            renderItem={({item: pageNumber}) => (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    zIndex: 12,
                    right: 0,
                    position: 'absolute',
                    top: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 33,
                      height: 30,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {this.checkWishList(this.props, this) === 1 ? (
                      this.props.cartItems2.Config.removeButton ? (
                        <Icon
                          style={{
                            color: '#000',
                            fontSize: 19,
                            paddingLeft: 1,
                            paddingRight: 1,
                            marginBottom: -1,
                          }}
                          active
                          name='heart'
                          onPress={() => {
                            this.removeWishlist(this.props, this)
                          }}
                        />
                      ) : (
                        <Icon
                          style={{
                            color: '#000',
                            fontSize: 19,
                            paddingLeft: 1,
                            paddingRight: 1,
                            marginBottom: -1,
                          }}
                          active
                          name='heart'
                          onPress={() => {
                            this.removeWishlist(this.props, this)
                          }}
                        />
                      )
                    ) : (
                      <Ionicons
                        style={{
                          color: '#000',
                          fontSize: 19,
                          marginBottom: -2,
                          marginLeft: -1,
                          marginRight: -1,
                        }}
                        active
                        name='heart-o'
                        onPress={() => {
                          this.addWishlist(this.props, this)
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.onShare}
                    style={{
                      width: 33,
                      height: 30,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name={'share'}
                      style={{
                        textAlign: 'center',
                        fontSize: themeStyle.largeSize + 8,
                        color: '#bed13c',
                        paddingRight: 5,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {this.props.navigation.state.params.objectArray.featured ? (
                  <View
                    style={{
                      backgroundColor: themeStyle.otherBtnsColor,
                      height: 27,
                      zIndex: 11,
                      left: 10,
                      top: 7,
                      position: 'absolute',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        padding: 5,
                        zIndex: 11,
                        color: '#fff',
                      }}>
                      {this.props.cartItems2.Config.languageJson.Featured}
                    </Text>
                  </View>
                ) : null}
                <ProductsBanner
                  productImage={this.state.selectedImages}
                  navigation={this.props.navigation}
                  onSale={
                    this.props.navigation.state.params.objectArray.on_sale
                  }
                  reset={() => this.setState({visible: false})}
                  featured={
                    this.props.navigation.state.params.objectArray.featured
                  }
                  objectArray={this.props.navigation.state.params.objectArray}
                />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: themeStyle.backgroundColor,
                  }}>
                  {this.props.navigation.state.params.objectArray !==
                    undefined &&
                  this.props.navigation.state.params.objectArray !== null ? (
                    this.props.navigation.state.params.objectArray.on_sale ? (
                      <View
                        style={{
                          backgroundColor: themeStyle.otherBtnsColor,
                          height: 27,
                          zIndex: 2,
                          left: 10,
                          top: -16,
                          position: 'absolute',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: '#fff', padding: 5, zIndex: 2}}>
                          {this.props.cartItems2.Config.languageJson.SALE}
                        </Text>
                      </View>
                    ) : null
                  ) : null}

                  <View
                    style={{
                      backgroundColor: themeStyle.backgroundColor,
                      justifyContent: 'space-between',
                      padding: 8,
                      flexDirection: 'row',
                      paddingBottom: 0,
                      marginTop: 8
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <HTML
                        html={this.state.htmlPriceTemp}
                        baseFontStyle={{
                          fontSize: themeStyle.smallSize + 3,
                          color: '#000',
                          fontWeight: 'bold',
                        }}
                        alterNode={node => {
                          const {name} = node
                          if (SyncStorage.get('currencyPos') === 'right') {
                            if (
                              name === 'ins' &&
                              node.children[0] !== undefined && node.children[0] !== null
                            ) {
                              if (
                                name === 'ins' &&
                                node.children[0].children[0] !== undefined && node.children[0].children[0] !== null
                              ) {
                            if (
                              name === 'ins' &&
                              node.children[0] !== undefined && node.children[0] !== null
                            ) {
                              if (
                                name === 'ins' &&
                                node.children[0].children[0] !== undefined && node.children[0].children[0] !== null
                              ) {
                            if (
                              name === 'ins' &&
                              node.children[0].children[0].data !== undefined
                            ) {
                              node.children[0].children[0].data = ` ${node.children[0].children[0].data}`
                              return node
                            }
                          }
                          }
                          } else if (
                            name === 'ins' &&
                            node.children[0].children[0].children[0].data !== undefined
                          ) {
                            node.children[0].children[0].children[0].data = `  ${node.children[0].children[0].children[0].data}`
                            return node
                          }
                        }
                      }
                        }}
                        tagsStyles={{
                          ins: {
                            color: '#000',
                            fontSize: themeStyle.largeSize + 4,
                          },
                          del: {
                            textDecorationLine: 'line-through',
                            fontSize: themeStyle.smallSize + 3,
                            color: 'gray',
                            fontWeight: '300',
                          },
                        }}
                      />
                    </View>

                    {this.props.navigation.state.params.objectArray.in_stock ===
                    false ? (
                      <Text
                        style={{
                          color: 'red',
                          paddingTop: 3,
                          fontWeight: '100',
                        }}>
                        {
                          this.props.cartItems2.Config.languageJson[
                            'Out of Stock'
                          ]
                        }
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: '#000',
                          paddingTop: 3,
                          fontWeight: '100',
                        }}>
                        {' '}
                        {this.props.cartItems2.Config.languageJson['In Stock']}
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      backgroundColor: themeStyle.backgroundColor,
                      padding: 8,
                      paddingTop: 1,
                      paddingBottom: 0,
                    }}>
                    <Text
                      style={{
                        fontSize: themeStyle.largeSize - 2,
                        color: '#000',
                        fontWeight: Platform.OS === 'android' ? '600' : '400',
                      }}>
                      {this.state.nameTemp}
                    </Text>
                  </View>
                  {this.props.navigation.state.params.objectArray !== null &&
                  this.props.navigation.state.params.objectArray !==
                    undefined ? (
                    this.props.navigation.state.params.objectArray
                      .categories !== null &&
                    this.props.navigation.state.params.objectArray
                      .categories !== undefined ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: themeStyle.backgroundColor,
                          padding: 8,
                          paddingTop: 1,
                          paddingBottom: 0,
                        }}>
                        {this.props.navigation.state.params.objectArray.categories.map(
                          item => (
                            <Text
                              style={{
                                fontSize: themeStyle.smallSize - 1,
                                color: '#707070',
                                fontWeight:
                                  Platform.OS === 'android' ? '600' : '400',
                              }}>
                              {item.name + ' '}
                            </Text>
                          ),
                        )}
                      </View>
                    ) : null
                  ) : null}
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('RatingAndReviewScreen', {
                        ratingCountArray: this.props.navigation.state.params
                          .objectArray.rating_count,
                        averageRatingArray: this.props.navigation.state.params
                          .objectArray.average_rating,
                        objectArray: this.props.navigation.state.params
                          .objectArray,
                      })
                    }>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 8,
                        paddingBottom: 2,
                        paddingTop: 0,
                        marginTop: -1,
                      }}>
                      <Stars
                        disabled
                        default={parseFloat(
                          this.props.navigation.state.params.objectArray
                            .average_rating,
                        )}
                        count={5}
                        starSize={50}
                        half
                        fullStar={
                          <Icon name={'star'} style={[styles.myStarStyle]} />
                        }
                        emptyStar={
                          <Icon
                            name={'star-outline'}
                            style={[
                              styles.myStarStyle,
                              styles.myEmptyStarStyle,
                            ]}
                          />
                        }
                        halfStar={
                          <Icon
                            name={'star-half'}
                            style={[styles.myStarStyle]}
                          />
                        }
                      />
                      <Text
                        style={{
                          padding: 6,
                          fontSize: themeStyle.largeSize - 2,
                          color: themeStyle.primaryDark,
                          paddingTop: 7,
                          fontWeight: Platform.OS === 'android' ? '600' : '400',
                        }}>
                        {
                          this.props.navigation.state.params.objectArray
                            .rating_count
                        }{' '}
                        {
                          this.props.cartItems2.Config.languageJson[
                            'Ratings & Reviews'
                          ]
                        }
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {this.props.navigation.state.params.objectArray.grouped_products
                  .length > 0 ? (
                  this.state.isLoading ? (
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <UIActivityIndicator
                        size={27}
                        color={themeStyle.loadingIndicatorColor}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: themeStyle.backgroundColor,
                        padding: 3,
                      }}>
                      {this.props.navigation.state.params.objectArray !==
                        undefined &&
                      this.props.navigation.state.params.objectArray !==
                        null ? (
                        this.props.navigation.state.params.objectArray.sku !==
                          undefined &&
                        this.props.navigation.state.params.objectArray.sku !==
                          null &&
                        this.props.navigation.state.params.objectArray.sku !==
                          '' ? (
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: themeStyle.backgroundColor,
                              padding: 7,
                            }}>
                            <Text
                              style={{
                                fontSize: themeStyle.largeSize,
                                color: '#000',
                              }}>
                              {
                                this.props.navigation.state.params.objectArray
                                  .sku
                              }
                            </Text>
                          </View>
                        ) : null
                      ) : null}
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={
                          this.state.relatedImages !== undefined &&
                          this.state.relatedImages !== null &&
                          this.state.relatedImages.toString() !== 'NaN'
                            ? this.state.relatedImages
                            : []
                        }
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={item => (
                          <View
                            style={{
                              backgroundColor: themeStyle.backgroundColor,
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                padding: 2,
                                backgroundColor: '#fff',
                                shadowOffset: {width: 1, height: 1},
                                shadowColor: 'black',
                                shadowOpacity: 0.4,
                                elevation: 3,
                                width: WIDTH * 0.95,
                                margin: 5,
                              }}>
                              <View style={{padding: 3, paddingLeft: 6}}>
                                <Text style={{fontSize: themeStyle.smallSize}}>
                                  {
                                    this.state.relatedObjectArray[item.index]
                                      .name
                                  }
                                </Text>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  height: 1,
                                  backgroundColor: '#d9d9d9',
                                }}
                              />

                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  padding: 4,
                                  paddingLeft: 3,
                                  flexDirection: 'row',
                                }}>
                                <ImageLoad
                                  key={item.index}
                                  style={{height: 100, width: 100}}
                                  loadingStyle={{
                                    size: 'large',
                                    color: themeStyle.loadingIndicatorColor,
                                  }}
                                  placeholder={false}
                                  ActivityIndicator={true}
                                  placeholderStyle={{width: 0, height: 0}}
                                  source={{
                                    uri: this.state.relatedProductImages2[
                                      item.index
                                    ],
                                  }}
                                />

                                <View
                                  style={{
                                    justifyContent: 'space-between',
                                    padding: 3,
                                    paddingLeft: 8,
                                    flexDirection: 'column',
                                    flex: 1,
                                  }}>
                                  <View
                                    style={{
                                      justifyContent: 'space-between',
                                      padding: 3,
                                      paddingLeft: 8,
                                      flexDirection: 'row',
                                      flex: 1,
                                      alignItems: 'flex-end',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: themeStyle.mediumSize,
                                        fontWeight: 'normal',
                                        color: '#000',
                                      }}>
                                      {
                                        this.props.cartItems2.Config
                                          .languageJson.Price
                                      }{' '}
                                      :{' '}
                                    </Text>

                                    <HTML
                                      html={
                                        this.state.relatedObjectArray[
                                          item.index
                                        ].price_html
                                      }
                                      baseFontStyle={{
                                        fontSize: themeStyle.mediumSize,
                                        color: '#000',
                                      }}
                                      alterNode={node => {
                                        const {name} = node
                                        console.log(
                                          SyncStorage.get('currencyPos'),
                                        )
                                        if (
                                          SyncStorage.get('currencyPos') ===
                                          'right'
                                        ) {
                                          if (
                                            name === 'ins' &&
                                            node.children[0].children[0]
                                              .data !== undefined
                                          ) {
                                            node.children[0].children[0].data = ` ${node.children[0].children[0].data}`
                                            return node
                                          }
                                        } else {
                                          console.log(node)
                                          if (
                                            name === 'ins' &&
                                            node.children[0].children[0]
                                              .children[0].data !== undefined
                                          ) {
                                            node.children[0].children[0].children[0].data = `  ${node.children[0].children[0].children[0].data}`
                                            return node
                                          }
                                        }
                                      }}
                                      tagsStyles={{
                                        ins: {
                                          color: '#000',
                                          fontSize: themeStyle.mediumSize,
                                        },
                                        del: {
                                          textDecorationLine: 'line-through',
                                          fontSize: themeStyle.mediumSize,
                                          color: 'gray',
                                          fontWeight: '300',
                                        },
                                      }}
                                    />
                                  </View>

                                  <View
                                    style={{
                                      justifyContent: 'space-between',
                                      padding: 3,
                                      paddingLeft: 8,
                                      flexDirection: 'row',
                                      flex: 1,
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: themeStyle.mediumSize,
                                        fontWeight: '100',
                                        color: '#000',
                                        paddingTop: 13,
                                      }}>
                                      {
                                        this.props.cartItems2.Config
                                          .languageJson.Quantity
                                      }{' '}
                                      :{' '}
                                    </Text>
                                    {console.log(
                                      this.state.relatedObjectArray[item.index],
                                    )}
                                    {/* ///////////// */}
                                    {/* {console.log(this.props.navigation.state.params.objectArray)} */}
                                    {this.state.relatedObjectArray[item.index]
                                      .type === 'variable' ? (
                                      <TouchableOpacity
                                        style={{
                                          marginTop: 10,
                                          borderColor: '#fff',
                                          alignItems: 'center',
                                          height: 26,
                                          justifyContent: 'center',
                                          backgroundColor:
                                            themeStyle.otherBtnsColor,
                                          shadowOffset: {width: 1, height: 1},
                                          shadowColor: 'black',
                                          shadowOpacity: 0.3,
                                          elevation: 3,
                                        }}
                                        onPress={() =>
                                          this.props.navigation.push(
                                            'ProductDetails',
                                            {
                                              objectArray: this.state
                                                .relatedObjectArray[item.index],
                                            },
                                          )
                                        }>
                                        <Text
                                          style={{
                                            color: '#fff',
                                            fontSize: themeStyle.smallSize + 1,
                                            fontWeight: '500',
                                            padding: 4,
                                            paddingBottom: 0,
                                            paddingTop: 0,
                                          }}>
                                          {
                                            this.props.cartItems2.Config
                                              .languageJson.View
                                          }
                                        </Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <Counter
                                        minimumValue={0}
                                        initialValue={0}
                                        width={24}
                                        height={1}
                                        onIncrement={value =>
                                          this.AdditemsIntoArray(
                                            value,
                                            this.state.relatedObjectArray[
                                              item.index
                                            ],
                                            item.item,
                                          )
                                        }
                                        onDecrement={value =>
                                          this.RempveitemsIntoArray(
                                            value,
                                            this.state.relatedObjectArray[
                                              item.index
                                            ],
                                            item.item,
                                          )
                                        }
                                      />
                                    )}
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          // </View>
                        )}
                      />
                    </View>
                  )
                ) : (
                  <View style={{backgroundColor: '#f4f5f8'}}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 8,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: themeStyle.smallSize,
                          fontWeight: '100',
                          color: '#000',
                        }}>
                        {this.props.cartItems2.Config.languageJson.QUANTITY}
                      </Text>
                      <Text
                        style={{
                          fontSize: themeStyle.smallSize,
                          fontWeight: '100',
                          color: '#000',
                        }}>
                        {this.props.cartItems2.Config.languageJson.TOTAL +
                          ' ' +
                          this.props.cartItems2.Config.languageJson.PRICE}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 8,
                        flexDirection: 'row',
                        paddingTop: 0,
                        marginTop: -1,
                        marginBottom: 1,
                      }}>
                      <Counter
                        minimumValue={1}
                        initialValue={1}
                        width={32}
                        height={3}
                        innerRef={stepper => {
                          this.stepper = stepper
                        }}
                        onIncrement={value =>
                          this.AdditemsIntoArray(
                            value,
                            this.state.selectedProduct,
                            0,
                          )
                        }
                        onDecrement={value =>
                          this.RempveitemsIntoArray(
                            value,
                            this.state.selectedProduct,
                            0,
                          )
                        }
                      />
                      {this.props.navigation.state.params.objectArray
                        .in_stock === false ? null : (
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                          }}>
                          <HTML
                            html={SyncStorage.get('currency')}
                            baseFontStyle={{
                              fontSize: themeStyle.largeSize + 3,
                              color: '#000',
                              fontWeight: 'bold',
                            }}
                            alterNode={node => {
                              const {name} = node
                              console.log(SyncStorage.get('currencyPos'))
                              if (SyncStorage.get('currencyPos') === 'right') {
                                if (
                                  name === 'ins' &&
                                  node.children[0].children[0].data !==
                                    undefined
                                ) {
                                  node.children[0].children[0].data = ` ${node.children[0].children[0].data}`
                                  return node
                                }
                              } else if (
                                name === 'ins' &&
                                node.children[0].children[0].children[0]
                                  .data !== undefined
                              ) {
                                node.children[0].children[0].children[0].data = `  ${node.children[0].children[0].children[0].data}`
                                return node
                              }
                            }}
                            tagsStyles={{
                              ins: {
                                color: '#000',
                                fontSize: themeStyle.largeSize + 3,
                                fontWeight: 'bold',
                              },
                              del: {
                                textDecorationLine: 'line-through',
                                fontSize: themeStyle.largeSize + 2,
                                color: 'gray',
                                fontWeight: 'bold',
                              },
                            }}
                          />
                          {this.state.priceValue.toString().includes(".") ?
                          <Text
                            style={{
                              fontSize: themeStyle.largeSize + 3,
                              color: '#000',
                              fontWeight: 'bold',
                            }}>{Number(this.state.priceValue)}</Text>
                            :
                            <Text
                            style={{
                              fontSize: themeStyle.largeSize + 3,
                              color: '#000',
                              fontWeight: 'bold',
                            }}>{Number(this.state.priceValue).toFixed(SyncStorage.get('decimals'))}</Text>
                          }
                        </View>
                      )}
                    </View>
                  
                    {this.props.navigation.state.params.objectArray.type ===
                    'variable' ? (
                      <View
                        style={{
                          justifyContent: 'space-between',
                          padding: 8,
                          flexDirection: 'row',
                          paddingTop: 0,
                        }}>
                        <Text
                          style={{
                            fontSize: themeStyle.mediumSize,
                            color: '#000',
                          }}>
                          {
                            this.props.cartItems2.Config.languageJson[
                              'Please select all product options before adding this product to your cart'
                            ]
                          }
                        </Text>
                      </View>
                    ) : null}
                  </View>
                )}
                {/* ///////////////////////////////////////////////////////////////////////////////////// */}

                <View />

                {this.props.navigation.state.params.objectArray.type ===
                'variable' ? (
                  this.state.variationsAvailable ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingTop: 12,
                      }}>
                      <UIActivityIndicator
                        size={27}
                        color={themeStyle.loadingIndicatorColor}
                      />
                    </View>
                  ) : (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      data={
                        this.props.navigation.state.params.objectArray
                          .attributes
                      }
                      horizontal={false}
                      extraData={this.state}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={item =>
                        item.item.variation ? (
                          <View>
                                  <Text
                              style={{
                                fontSize: themeStyle.largeSize,
                                paddingTop: 4,
                                margin: 8,
                                color: '#000',
                              }}>
                              {item.item.name}
                            </Text>
                          <View
                            style={{
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              // paddingTop: 10,
                              // paddingLeft: 8,
                              flexDirection: 'row',
                               flexWrap: 'wrap',
                               width: WIDTH
                            }}>
                             { item.item.options.map((value2, index) => (
                 this.availableOption(item.item.name, value2) ? (
                    // temp.push(
                    //   Object.create({
                    //     label: value2,
                    //     value: value2,
                    //   }),
                    // )
                    // onChangeText={value => {
                    //   this.fillAttributes(
                    //     value,
                    //     item.item.name,
                    //     item.index,
                    //   )
                    // }}
                  
                    <TouchableOpacity style={{backgroundColor: 
                      this.checkOptionSelected(value2, item.item.name, item.index) 
                    , margin: 8, borderRadius: 8, alignItems: 'center',
                  justifyContent: 'center'}} onPress={()=>this.hideMenu(this.form[item.index], value2, item.item.name,
                      item.index)}>
                     <Text style={{fontSize: themeStyle.mediumSize,
                    color: '#ffffff', padding: 6, textAlign: 'center'}}>{value2}</Text> 
                      </TouchableOpacity>
                 ): null
                ))
                 }


                            {/* <Menu
          // ref={this.setMenuRef}
          ref={c => {
            this.form[item.index] = c
          }}
          button={<Text onPress={()=>this.showMenu(this.form[item.index])}> { this.props.cartItems2.cartItems.spinnerArray[
            item.index
          ] || 'Select'}</Text>}
        >
          {
                item.item.options.map(value2 => (
                 this.availableOption(item.name, value2) ? (
                    // temp.push(
                    //   Object.create({
                    //     label: value2,
                    //     value: value2,
                    //   }),
                    // )
                    <MenuItem onPress={()=>this.hideMenu(this.form[item.index], value2, item)}>{value2}</MenuItem>
                 ): null
                ))
          }
          {/* <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem> */}
          {/* <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider /> */}
          {/* <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem> */}
        {/* </Menu> */} 
   

 
        {/* <ModalDropdown    ref={c => {
                                this.form[item.index] = c
                              }}
                              defaultValue={  this.props.cartItems2.cartItems.spinnerArray[
                                item.index
                              ] || 'Select'}
                              onSelect={ value => {
                                this.fillAttributes(
                                  value,
                                  item.item.name,
                                  item.index,
                                )
                              }}
                               options={this.loadData(item.item)}/>  */}
                            {/* <Dropdown
                              containerStyle={{width: 120}}
                              dropdownOffset={{top: 0, left: 1}}
                              fontSize={themeStyle.largeSize}
                              labelFontSize={themeStyle.largeSize}
                              onChangeText={value => {
                                this.fillAttributes(
                                  value,
                                  item.item.name,
                                  item.index,
                                )
                              }}
                              value={
                                this.props.cartItems2.cartItems.spinnerArray[
                                  item.index
                                ] || 'Select'
                              }
                              data={this.loadData(item.item)}
                              ref={c => {
                                this.form[item.index] = c
                              }}
                            /> */}
                          </View>
                          </View>
                        ) : null
                      }
                    />
                  )
                ) : null}

                {/* /////////////////////////////////////////////////////////////// */}
                {this.props.navigation.state.params.objectArray.store !=
                  undefined &&
                this.props.cartItems2.Config.vendorEnable === '1' ? (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#fff',
                      marginBottom: 8,
                    }}>
                    <View style={{backgroundColor: '#e0e0e0'}}>
                      <View style={{padding: 8, paddingTop: 4}}>
                        <Text
                          style={{
                            justifyContent: 'flex-start',
                            fontSize: themeStyle.largeSize,
                            color: '#000',
                          }}>
                          {
                            this.props.cartItems2.Config.languageJson[
                              'Seller Information'
                            ]
                          }
                        </Text>
                        <Text
                          style={{
                            textAlign: 'left',
                            fontSize: themeStyle.mediumSize,
                            color: '#000',
                          }}>{`Sold by ${this.props.navigation.state.params.objectArray.store.name}`}</Text>
                      </View>

                      <Button
                        color={themeStyle.primaryDark}
                        onPress={() => {
                          this.props.navigation.navigate('VendorScreen', {
                            data: this.props.navigation.state.params.objectArray
                              .store,
                          })
                        }}
                        title={
                          this.props.cartItems2.Config.languageJson[
                            'View Store'
                          ]
                        }
                      />
                    </View>
                  </View>
                ) : null}

                {this.state.wcVendorInfo.length > 0 &&
                this.props.cartItems2.Config.vendorEnable === '2' ? (
                  this.state.wcVendorInfo[0].meta.pv_shop_name !== undefined &&
                  this.props.cartItems2.Config.showWcVendorInfo &&
                  !this.state.loaderWcVendorInfo ? (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        marginTop: 8,
                        marginBottom: 8,
                      }}>
                      <View style={{backgroundColor: '#e0e0e0'}}>
                        <View style={{padding: 8, paddingTop: 4}}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: themeStyle.largeSize,
                              color: '#000',
                            }}>
                            {
                              this.props.cartItems2.Config.languageJson[
                                'Seller Information'
                              ]
                            }
                          </Text>
                          <Text
                            style={{
                              fontSize: themeStyle.mediumSize,
                              color: '#000',
                            }}>{`Sold by ${this.state.wcVendorInfo[0].meta.pv_shop_name}`}</Text>
                        </View>

                        <Button
                          color={themeStyle.primaryDark}
                          onPress={() => {
                            this.props.navigation.navigate('VendorScreen', {
                              data: this.state.wcVendorInfo[0],
                            })
                          }}
                          title={
                            this.props.cartItems2.Config.languageJson[
                              'View Store'
                            ]
                          }
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        marginTop: 8,
                        marginBottom: 8,
                      }}>
                      <View style={{backgroundColor: '#e0e0e0'}}>
                        <View style={{padding: 8, paddingTop: 4}}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: themeStyle.largeSize,
                              color: '#000',
                            }}>
                            {
                              this.props.cartItems2.Config.languageJson[
                                'Seller Information'
                              ]
                            }
                          </Text>
                          <Text
                            style={{
                              fontSize: themeStyle.mediumSize,
                              color: '#000',
                            }}>{`Sold by ${this.state.wcVendorInfo[0].display_name}`}</Text>
                        </View>

                        <Button
                          color={themeStyle.primaryDark}
                          onPress={() => {
                            this.props.navigation.navigate('VendorScreen', {
                              data: this.state.wcVendorInfo[0],
                            })
                          }}
                          title={
                            this.props.cartItems2.Config.languageJson[
                              'View Store'
                            ]
                          }
                        />
                      </View>
                    </View>
                  )
                ) : this.props.cartItems2.Config.vendorEnable === '2' ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 15,
                      marginBottom: 8,
                    }}>
                    <UIActivityIndicator
                      size={27}
                      color={themeStyle.loadingIndicatorColor}
                    />
                  </View>
                ) : null}
                {this.props.navigation.state.params.objectArray.description ? (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: themeStyle.backgroundColor,
                      padding: 8,
                      paddingBottom: 2,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name={'list'}
                        style={{
                          color: themeStyle.primary,
                          fontSize: 14,
                          paddingRight: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: themeStyle.smallSize + 1,
                          color: themeStyle.primary,
                          textAlign:
                            Platform.OS === 'ios'
                              ? 'left'
                              : !I18nManager.isRTL
                              ? 'left'
                              : 'right',
                          marginBottom: 2,
                          paddingTop: 2,
                        }}>
                        {
                          this.props.cartItems2.Config.languageJson[
                            'Product Description'
                          ]
                        }
                      </Text>
                    </View>
                    <HTML
                      html={
                        this.props.navigation.state.params.objectArray
                          .description
                      }
                      baseFontStyle={{
                        fontSize: themeStyle.mediumSize,
                        color: '#000',
                      }}
                      alterNode={node => {
                        const {name} = node
                        console.log(SyncStorage.get('currencyPos'))
                        if (SyncStorage.get('currencyPos') === 'right') {
                          if (
                            name === 'ins' &&
                            node.children[0].children[0].data !== undefined
                          ) {
                            node.children[0].children[0].data = ` ${node.children[0].children[0].data}`
                            return node
                          }
                        } else {
                          console.log(node)
                          if (
                            name === 'ins' &&
                            node.children[0].children[0].children[0].data !==
                              undefined
                          ) {
                            node.children[0].children[0].children[0].data = `  ${node.children[0].children[0].children[0].data}`
                            return node
                          }
                        }
                      }}
                      tagsStyles={{
                        ins: {color: '#000', fontSize: themeStyle.mediumSize},
                        del: {
                          textDecorationLine: 'line-through',
                          fontSize: themeStyle.mediumSize,
                          color: 'gray',
                          fontWeight: '300',
                        },
                      }}
                    />
                  </View>
                ) : null}

                {this.props.navigation.state.params.objectArray.related_ids !==
                undefined ? (
                  <View style={{backgroundColor: themeStyle.backgroundColor}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name={'albums'}
                        style={{
                          color: themeStyle.primary,
                          fontSize: 14,
                          paddingRight: 5,
                          paddingLeft: 8,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: themeStyle.smallSize + 1,
                          padding: 8,
                          color: themeStyle.primary,
                          paddingLeft: 0,
                          textAlign:
                            Platform.OS === 'ios'
                              ? 'left'
                              : !I18nManager.isRTL
                              ? 'left'
                              : 'right',
                          justifyContent: 'flex-start',
                        }}>
                        {
                          this.props.cartItems2.Config.languageJson[
                            'Releated Items'
                          ]
                        }
                      </Text>
                    </View>
                    <FlatListView
                      vertical
                      dataName={'Releated'}
                      relatedIdsArray={
                        this.props.navigation.state.params.objectArray
                          .related_ids !== undefined &&
                        this.props.navigation.state.params.objectArray !==
                          undefined &&
                        this.props.navigation.state.params.objectArray !==
                          null &&
                        this.props.navigation.state.params !== undefined &&
                        this.props.navigation.state !== undefined &&
                        this.props.navigation !== undefined &&
                        this.props.navigation.state.params.objectArray
                          .related_ids !== null
                          ? this.props.navigation.state.params.objectArray
                              .related_ids
                          : []
                      }
                    />
                  </View>
                ) : null}
              </View>
            )}
          />
        </View>

        {this.props.navigation.state.params.objectArray.external_url ? (
          <View style={{width: WIDTH, position: 'absolute', bottom: 0}}>
            <TouchableOpacity
              onPress={() =>
                this.check2(
                  this.props.navigation.state.params.objectArray.external_url,
                )
              }
              disabled={this.state.addToCartButtonValue}>
              <View
                style={{
                  borderColor: '#fff',
                  alignItems: 'center',
                  height: 42,
                  backgroundColor: themeStyle.otherBtnsColor,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: themeStyle.mediumSize,
                    fontWeight: '500',
                  }}>
                  {this.props.navigation.state.params.objectArray.button_text}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{width: WIDTH, position: 'absolute', bottom: 0}}>
                 <TouchableOpacity
              style={{
                opacity: !this.state.addToCartButtonValue &&
                this.props.navigation.state.params.objectArray.in_stock === true ? null : 0.6,
              }}
              onPressIn={() => this.setState({SpinnerTemp: 
                this.props.navigation.state.params.objectArray.in_stock === true ? true : false})}
              onPressOut={() => this.check()}
              disabled={this.state.addToCartButtonValue}>
              <View
                style={{
                  borderColor: '#fff',
                  alignItems: 'center',
                  height: 42,
                  justifyContent: 'center',
                  backgroundColor: themeStyle.otherBtnsColor,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: themeStyle.mediumSize,
                    fontWeight: '500',
                  }}>
                  {this.props.cartItems2.Config.languageJson['Add to Cart']}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}
///////////////////////////////////////////////////
const mapDispatchToProps = dispatch => ({
  addItemToCart: (productObject, productQuantity, varr) => {
    dispatch({
      type: 'ADD_TO_CARTS',
      product: productObject,
      cartProductQuantity: productQuantity,
      variation: varr,
      metaData: null,
    })
  },
  setSpiner: temp => {
    dispatch({
      type: 'SET_SPINNER',
      value: temp,
    })
  },
  mySpiner: (temp, index) => {
    dispatch({
      type: 'MY_SPINNER',
      value: temp,
      index1: index,
    })
  },
  removeSpiner: () => {
    dispatch({
      type: 'REMOVE_SPINNER',
    })
  },
  addRecentItems: productObject => {
    dispatch({
      type: 'ADD_RECENT',
      product: productObject,
    })
  },
  addWishlistProduct: productArray =>
    dispatch({type: 'ADD_WISHLIST_PRODUCTS', product: productArray}),
  removeWishListProduct: productArray =>
    dispatch({type: 'REMOVE_WISHLIST_PRODUCTS', product: productArray}),
})
//////////////////////////////////////////////////
const mapStateToProps = state => ({
  cartItems2: state,
})
/////////////////////////////////////////////
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(ProductDetail))
////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.backgroundColor,
  },

  myStarStyle: {
    color: themeStyle.primaryDark,
    backgroundColor: 'transparent',

    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: '#cccccc',
  },
})
