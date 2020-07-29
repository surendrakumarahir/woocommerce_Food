/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable react/sort-comp */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/newline-after-import */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable import/imports-first */
/* eslint-disable max-len */
/* eslint-disable global-require */
import React, {Component} from 'react'
import {View, Image} from 'react-native'
import {connect} from 'react-redux'
import {withNavigation} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import theme from './Theme.style'
import CardOne from './CardStyles/CardOne'
import CardTwo from './CardStyles/CardTwo'
import CardThree from './CardStyles/CardThree'
import CardFour from './CardStyles/CardFour'
import CardFive from './CardStyles/CardFive'
import CardSix from './CardStyles/CardSix'
import CardSeven from './CardStyles/CardSeven'
import CardEight from './CardStyles/CardEight'
import CardNine from './CardStyles/CardNine'
import CardTenth from './CardStyles/CardTenth'
import CardElev from './CardStyles/CardElev'
import CardTwelve from './CardStyles/CardTwelve'
import CardThirteen from './CardStyles/CardThirteen'
import CardFourteen from './CardStyles/CardFourteen'
import CardFifteen from './CardStyles/CardFifteen'
import CardSixteen from './CardStyles/CardSixteen'
import CardSeventeen from './CardStyles/CardSeventeen'
import CardEighteen from './CardStyles/CardEighteen'
import CardNineteen from './CardStyles/CardNineteen'
import CardTwenty from './CardStyles/CardTwenty'
import CardTOne from './CardStyles/CardTOne'
import CardTtwo from './CardStyles/CardTtwo'
class CardTemplate extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      isLoading: false,
      page: 11,
      refreshing: false,
      temp1: 0,
      counter: 0,
      stepperArray: [],
    }
    global.SampleVar = false
  }
  static getDerivedStateFromProps (props, state) {
    if (props.cartItems2.Config.card_style === 22) {
      if (
        state.stepperArray[props.objectArray.id] !== null &&
        state.stepperArray[props.objectArray.id] !== undefined
      ) {
        props.cartItems2.cartItems.cartProductArray.map((val, key) => {
          if (
            val.product_id === props.objectArray.id &&
            state.stepperArray.length > 0
          ) {
            state.stepperArray[props.objectArray.id].setValue(val.quantity)
            return {counter: val.quantity}
          }
        })
        let temp = 0
        props.cartItems2.cartItems.cartProductArray.map(cartItem => {
          if (cartItem.product_id === props.objectArray.id) {
            temp = 1
          }
        })
        if (state.stepperArray.length > 0 && temp === 0) {
          state.stepperArray[props.objectArray.id].setValue(0)
          return {counter: 0}
        }
        if (
          state.stepperArray.length > 0 &&
          props.cartItems2.cartItems.cartProductArray.length === 0
        )
          state.stepperArray[props.objectArray.id].setValue(0)
        return {counter: 0}
      }
    } else {
      return
    }
  }

  checkProductNew = props => {
    const pDate = new Date(props.objectArray.date_created)
    const date =
      pDate.getTime() +
      this.props.cartItems2.Config.newProductDuration * 86400000
    const todayDate = new Date().getTime()
    if (date > todayDate) {
      return true
    }
    return false
  }

  SingleComponent = (props, widthPic, t, s, btnWidth) =>
    this.props.cartItems2.Config.card_style === 1 ? (
      <CardOne
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 2 ? (
      <CardTwo
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 3 ? (
      <CardThree
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 4 ? (
      <CardFour
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 5 ? (
      <CardFive
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 6 ? (
      <CardSix
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 7 ? (
      <CardSeven
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 8 ? (
      <CardEight
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 9 ? (
      <CardNine
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 10 ? (
      <CardTenth
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 11 ? (
      <CardElev
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 12 ? (
      <CardTwelve
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 13 ? (
      <CardThirteen
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 14 ? (
      <CardFourteen
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 15 ? (
      <CardFifteen
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 16 ? (
      <CardSixteen
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 17 ? (
      <CardSeventeen
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 18 ? (
      <CardEighteen
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 19 ? (
      <CardNineteen
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 20 ? (
      <CardTwenty
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 21 ? (
      <CardTOne
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : this.props.cartItems2.Config.card_style === 22 ? (
      <CardTtwo
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    ) : (
      <CardTwo
        props={props}
        widthPic={widthPic}
        t={t}
        s={s}
        btnWidth={btnWidth}
      />
    )
  ///////////////////////
  getPer = (r, s) => {
    let a = r / 100
    let b = r - s
    return b / a
  }
  //////////////////////

  //////////////////////
  imageIcon = (bagBtn, otherBtn, h, w) => {
    return (
      <Image
        source={require('../images/shopping_bag.png')}
        style={{
          height: h,
          width: w,
          marginBottom: 2,
          tintColor:
            this.newMethod3(this.props, this) === 1 ? otherBtn : bagBtn,
        }}></Image>
    )
  }
  /// ///////////////////////////////////////////////////////////
  removeWishlist = (props, t) => {
    t.setState({isLoading: true})
    setTimeout(() => {
      props.removeWishListProduct(props.objectArray)
      this.setState({isLoading: false})
    }, Math.floor(100 / 360000))
  }
  /// ////////////////////////////////////////////////////////////
  addWishlist = (props, t) => {
    t.setState({isLoading: true})
    setTimeout(() => {
      props.addWishlistProduct(props.objectArray)
      this.setState({isLoading: false})
    }, Math.floor(100 / 360000))
  }
  /// ///////////////////////////////////////////////////////////
  removeRecent = (props, t) => {
    t.setState({isLoading: true})
    setTimeout(() => {
      props.removeRecentItems(props.objectArray)
      this.setState({isLoading: false})
    }, Math.floor(100 / 360000))
  }
  /// //////////////////////////////////////////////////////////
  newMethod6 = (props, t) => {
    t.setState({isLoading: true, counter: t.state.counter + 1})
    setTimeout(() => {
      t.setTimePassed(props, 1)
    }, Math.floor(100 / 360000))
  }
  /// ////////////////////////////////////////////////////////////
  setTimePassed (props, q) {
    props.addItemToCart(props.objectArray, q)
    this.setState({isLoading: false})
  }
  //////////////////////////////////////////////////////////////////
  removeCartitems = (props, t) => {
    let temp = 0
    props.cartItems2.cartItems.cartProductArray.map((val, key) => {
      if (val.product_id === props.objectArray.id && val.quantity === 1) {
        temp = 1
      }
    })
    if (temp == 1) {
      props.cartItems2.cartItems.cartProductArray = props.cartItems2.cartItems.cartProductArray.filter(
        cartItem => cartItem.product_id !== props.objectArray.id,
      )
      t.setState({isLoading: true})
      setTimeout(() => {
        props.cartTotalItems()
        t.setState({isLoading: false})
      }, Math.floor(100 / 360000))
    } else {
      t.setState({isLoading: true, counter: t.state.counter - 1})

      setTimeout(() => {
        t.setTimePassed(props, -1)
      }, Math.floor(100 / 360000))
    }
  }
  /// ////////////////////////////////////////////////////////////
  /// //////////////////////////////////////////////////////////////
  newMethod3 = props => {
    let temp = 0
    props.cartItems2.cartItems.cartProductArray.map(row => {
      if (row.product_id == props.objectArray.id) {
        temp = 1
      }
    })
    if (temp === 1) {
      return 1
    }
    temp = 0
    return 0
  }
  /// ////////////////////////////////////////////////////////////
  checkWishList = props => {
    let temp = 0
    props.cartItems2.cartItems.wishListProducts.map(row => {
      if (row.id === props.objectArray.id) {
        temp = 1
      }
    })
    if (temp === 1) {
      return 1
    }
    temp = 0
    return 0
  }
  /// /////////////////////////////////////////////////////////////
  // eslint-disable-next-line react/sort-comp
  componentWillUnmount () {
    clearInterval(this.state.isLoading)
  }

  render () {
    const s = this.props.objectArray.price_html

    return (
      <View>
        <Spinner visible={this.state.isLoading} />

        {this.props.rows === false
          ? this.SingleComponent(
              this.props,
              this.props.width ? this.props.width : theme.singleRowCardWidth,
              this,
              s,
              this.props.width
                ? this.props.width - 10
                : theme.singleRowCardWidth - 10,
            )
          : this.SingleComponent(
              this.props,
              this.props.width ? this.props.width : theme.singleRowCardWidth,

              this,
              s,
              this.props.width
                ? this.props.width - 10
                : theme.singleRowCardWidth - 10,
            )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  cartItems2: state,
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: (productObject, productQuantity) => {
    dispatch({
      type: 'ADD_TO_CARTS',
      product: productObject,
      cartProductQuantity: productQuantity,
      variation: null,
      metaData: null,
    })
  },
  removeCardFromCart: productObject => {
    dispatch({
      type: 'REMOVE_CARD_FROM_CART',
      product: productObject,
      variation: null,
      metaData: null,
    })
  },
  cartTotalItems: () => {
    dispatch({
      type: 'CART_TOTAL_ITEMS',
    })
  },
  removeItemToCart: (productObject, productQuantity) =>
    dispatch({
      type: 'REMOVE_TO_CARTS_QUANTITY',
      product: productObject,
      cartProductQuantity: productQuantity,
      variation: null,
      metaData: null,
    }),
  removeRecentItems: productArray =>
    dispatch({type: 'REMOVE_RECENT', product: productArray}),
  addWishlistProduct: productArray =>
    dispatch({type: 'ADD_WISHLIST_PRODUCTS', product: productArray}),
  removeWishListProduct: productArray =>
    dispatch({type: 'REMOVE_WISHLIST_PRODUCTS', product: productArray}),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(CardTemplate))
