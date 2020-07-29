/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable brace-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable import/imports-first */

import React, {Component} from 'react'
// eslint-disable-next-line import/newline-after-import
import {
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  I18nManager,
  Platform,
} from 'react-native'
import {Icon} from 'native-base'
// eslint-disable-next-line import/newline-after-import
import CardTem from './CardTemplate'
import VendorCard from './VendorCard'
import WooComFetch from '../common/WooComFetch'
// eslint-disable-next-line import/newline-after-import
import {connect} from 'react-redux'
import Loader from 'react-native-easy-content-loader'
import themeStyle from './Theme.style'
const {width, height} = Dimensions.get('screen')
class FlatListView extends Component {
  // eslint-disable-next-line no-useless-constructor
  mounted = false
  constructor (props) {
    super(props)
    this.state = {
      objectArray: [],
      isLoading: true,
      SpinnerTemp: false,
      recent: false,
      loading: false,
      timeValue: 400,
    }
  }
  /// //////
  static getDerivedStateFromProps (props) {
    if (props.dataName === 'RecentlyViewed') {
      return {
        isLoading: false,
        SpinnerTemp: false,
        recent: true,
        objectArray: props.isLoading.cartItems.recentViewedProducts,
      }
    }
    if (
      props.dataName === 'Newest' ||
      props.dataName === 'Deals' ||
      props.dataName === 'Featured' ||
      props.dataName === 'Vendors'
    ) {
      if (
        props.tabArray !== undefined &&
        props.tabArray !== null &&
        props.tabArray.toString() !== 'NaN'
      ) {
        return {
          objectArray: props.tabArray,
        }
      } else {
        return {
          objectArray: [],
        }
      }
    }
    return null
  }

  /// //////////////////////////////////
  componentWillUnmount () {
    this.mounted = false
    this.state.objectArray = []
  }
  /// //////////////////////////////
  componentDidMount () {
    this.mounted = true
    if (this.props.dataName === 'Newest' && this.props.tabArray !== undefined) {
      this.state.objectArray = this.props.tabArray
      this.setState({})
    }
    if (this.props.dataName === 'Deals' && this.props.tabArray !== undefined) {
      this.state.objectArray = this.props.tabArray
      this.setState({})
    }
    if (
      this.props.dataName === 'Featured' &&
      this.props.tabArray !== undefined
    ) {
      this.state.objectArray = this.props.tabArray
      this.setState({})
    }
    if (
      this.props.dataName === 'Vendors' &&
      this.props.tabArray !== undefined
    ) {
      this.state.objectArray = this.props.tabArray
      this.setState({})
    }

    if (this.props.dataName === 'Releated') {
      this.setState({
        SpinnerTemp: true,
      })
      this.getReleated()
    }
    if (this.props.dataName === 'RecentlyViewed') {
      this.setState({
        SpinnerTemp: true,
      })
      this.getRecentlyViewed()
    }
  }

  getRecentlyViewed = () => {
    const json = this.props.isLoading.cartItems.recentViewedProducts
    this.getRecentData(json, true, true)
  }

  getReleated = async () => {
    try {
      const json2 = await WooComFetch.getReleatedProducts(
        this.props.relatedIdsArray,
        this.props.isLoading.Config.productsArguments,
      )
      if (json2 !== undefined && json2 !== null && json2.toString() !== 'NaN') {
        this.newMethod2(json2, true, false)
      } else {
        this.newMethod2([], true, false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  getData = (j, temp, re) => {
    this.state.objectArray = []
    this.state.objectArray = j
    if (this.mounted) {
      this.setState({
        isLoading: false,
        SpinnerTemp: false,
        recent: re,
        loading: false,
        timeValue: 400,
      })
    }
  }

  getRecentData = (j, temp, re) => {
    if (this.mounted) {
      this.setState({
        isLoading: false,
        SpinnerTemp: false,
        recent: re,
        objectArray: j,
      })
    }
  }

  newMethod2 (j, temp, recent) {
    this.getData(j, temp, recent)
  }

  render () {
    let {loading, timeValue} = this.state
    if (this.state.objectArray.length > 0 && loading === false) {
      loading = false
      timeValue = 400
    } else {
      loading = true
      timeValue = 400
    }

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        listKey={(item, index) => `C${index.toString()}`}
        scrollEnabled={this.props.scrollEnabled ? false : true}
        contentContainerStyle={{
          backgroundColor:
            this.props.isLoading.Config.card_style === 11 ||
            this.props.isLoading.Config.card_style === 12 ||
            this.props.isLoading.Config.card_style === 15
              ? '#F2F2F2'
              : themeStyle.backgroundColor,
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
          alignItems: 'flex-start',
          alignContent: 'flex-start',
          flexDirection: 'row',
          flexGrow: 1,
        }}
        data={
          this.state.objectArray.length === 0
            ? ['', '', '', '', '', '', '', '', '', '']
            : this.state.objectArray
        }
        tabLabel={this.props.tabLabel}
        horizontal={this.props.vertical}
        numColumns={this.props.noOfCol}
        style={{
          paddingLeft: !this.props.vertical
            ? WIDTH >= 375
              ? WIDTH * 0.009
              : WIDTH >= 360 && WIDTH <= 75
              ? WIDTH * 0.008
              : WIDTH * 0.007
            : 0,
        }}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          this.props.viewButton ? (
            <TouchableOpacity
              style={{
                paddingTop: 80,
                justifyContent: 'center',
                margin: 12,
                alignItems: 'center',
                // alignSelf: 'center',
                // alignContent: 'center'
              }}
              onPress={() =>
                this.props.navigation.navigate('NewestScreen', {
                  id: this.props.parentId,
                  // eslint-disable-next-line no-undef
                  name: '',
                  sortOrder:
                    this.props.dataName === 'Newest'
                      ? 'newest'
                      : this.props.dataName === 'Deals'
                      ? 'sale'
                      : 'featured',
                })
              }>
              <View
                style={{
                  alignItems: 'center',
                  height: 38,
                  width: 100,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#557f5f',
                    fontSize: themeStyle.smallSize,
                  }}>
                  {this.props.isLoading.Config.languageJson['SHOP MORE']}
                </Text>
                <Icon
                  name={
                    !I18nManager.isRTL
                      ? 'md-arrow-dropright'
                      : 'md-arrow-dropleft'
                  }
                  style={{
                    color: '#557f5f',
                    fontSize: 22,
                    paddingTop: 2,
                    paddingLeft: !I18nManager.isRTL ? 8 : 8,
                    paddingRight: I18nManager.isRTL ? 8 : 8,
                  }}
                />
              </View>
            </TouchableOpacity>
          ) : null
        }
        renderItem={item =>
          this.props.dataName === 'Vendors' ? (
            <Loader
              secondaryColor='rgba(208, 205, 205, 1)'
              primaryColor='rgba(218, 215, 215, 1)'
              animationDuration={timeValue}
              active
              loading={loading}
              containerStyles={{
                backgroundColor: '#fff',
                height: 160,
                width: themeStyle.singleRowCardWidth,
                shadowOffset: {width: 1, height: 1},
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 3,
                margin: 5,
              }}
              pRows={1}
              pWidth={[themeStyle.singleRowCardWidth]}
              pHeight={30}
              titleStyles={{
                height: 100,
                width: themeStyle.singleRowCardWidth,
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 0,
                borderWidth: 0,
                marginBottom: 5,
                flex: 1,
              }}
              paragraphStyles={{
                paddingTop: 5,
                marginTop: 0,
                padding: 6,
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <VendorCard
                objectArray={item.item}
                navigation={this.props.navigation}
                props={this.props}
              />
            </Loader>
          ) : (
            <Loader
              secondaryColor='rgba(208, 205, 205, 1)'
              primaryColor='rgba(218, 215, 215, 1)'
              animationDuration={timeValue}
              active
              loading={loading}
              containerStyles={{
                backgroundColor: '#fff',
                height:
                  this.props.isLoading.Config.card_style === 12
                    ? themeStyle.singleRowCardWidth + 34
                    : this.props.isLoading.Config.card_style === 10 ||
                      this.props.isLoading.Config.card_style === 13 ||
                      this.props.isLoading.Config.card_style === 14 ||
                      this.props.isLoading.Config.card_style === 16 ||
                      this.props.isLoading.Config.card_style === 19 ||
                      this.props.isLoading.Config.card_style === 21 ||
                      this.props.isLoading.Config.card_style === 7
                    ? themeStyle.singleRowCardWidth + 43
                    : this.props.isLoading.Config.card_style === 4 ||
                      this.props.isLoading.Config.card_style === 9 ||
                      this.props.isLoading.Config.card_style === 5
                    ? themeStyle.singleRowCardWidth + 48
                    : this.props.isLoading.Config.cartButton ||
                      this.props.isLoading.Config.card_style === 3 ||
                      this.props.isLoading.Config.card_style === 8 ||
                      this.props.isLoading.Config.card_style === 15 ||
                      this.props.isLoading.Config.card_style === 17 ||
                      this.props.isLoading.Config.card_style === 18 ||
                      this.props.isLoading.Config.card_style === 22
                    ? themeStyle.singleRowCardWidth + 65
                    : this.props.isLoading.Config.card_style === 20
                    ? themeStyle.singleRowCardWidth + 48
                    : themeStyle.singleRowCardWidth + 37,
                width: this.props.vertical
                  ? themeStyle.singleRowCardWidth
                  : WIDTH * themeStyle.twoRowCardWIdth,
                shadowOffset: {width: 1, height: 1},
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 3,
                margin: 5,
              }}
              pRows={
                this.props.isLoading.Config.cartButton ||
                this.props.isLoading.Config.card_style === 3 ||
                // this.props.isLoading.Config.card_style === 4 ||
                this.props.isLoading.Config.card_style === 8 ||
                this.props.isLoading.Config.card_style === 15 ||
                this.props.isLoading.Config.card_style === 17 ||
                this.props.isLoading.Config.card_style === 18 ||
                this.props.isLoading.Config.card_style === 20 ||
                this.props.isLoading.Config.card_style === 22
                  ? 3
                  : 2
              }
              pWidth={['100%', '100%', '80%']}
              pHeight={30}
              titleStyles={{
                height: 100,
                width: this.props.vertical
                  ? themeStyle.singleRowCardWidth
                  : WIDTH * themeStyle.twoRowCardWIdth,
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 0,
                borderWidth: 0,
                flex: 1,
              }}
              paragraphStyles={{
                paddingTop: 6,
                padding: 6,
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <CardTem
                objectArray={this.state.objectArray[item.index]}
                index={item.index}
                rows={this.props.vertical}
                recent={this.state.recent}
                width={
                  this.props.vertical
                    ? this.props.width
                    : WIDTH * themeStyle.twoRowCardWIdth
                }
              />
            </Loader>
          )
        }
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state,
})

export default connect(mapStateToProps, null)(FlatListView)
