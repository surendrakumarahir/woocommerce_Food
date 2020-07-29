import React, {Component} from 'react'
import {Dimensions, View, TouchableOpacity} from 'react-native'
import theme from './Theme.style'
import ImageLoad from './RnImagePlaceH'
import {connect} from 'react-redux'
import WooComFetch from './WooComFetch'
import Toast from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import Carousel, {Pagination} from 'react-native-snap-carousel'
class MyCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      labels:
        this.props.props.banners.length > 0 ? this.props.props.banners : [],
      activeSlide: this.props.props.banners.length > 0 ? 0 : 0,
      SpinnerTemp: false,
    }
  }
  static getDerivedStateFromProps (props, state) {
    if (props.props.banners.length > 0) {
      return {
        labels: props.props.banners,
      }
    } else {
      return
    }
  }
  //getting single product data
  getOneProduct = async value => {
    try {
      this.setState({SpinnerTemp: true})
      console.log(value)
      const json2 = await WooComFetch.getOneProduct2(
        value,
        this.props.cartItems2.Config.productsArguments,
      )
      if (json2.message !== undefined) {
        this.setState({SpinnerTemp: false})
        this.refs.toast.show(
          json2.message +
            this.props.cartItems2.Config.languageJson['No Product ID Match'],
        )
      } else {
        this.setState({SpinnerTemp: false})
        this.props.navigation.navigate('ProductDetails', {
          objectArray: json2, //
        })
      }
      this.setState({SpinnerTemp: false})
    } catch (err) {
      console.log(err)
      this.refs.toast.show(err)
      this.refs.toast.show('Item not Available!')
      this.setState({SpinnerTemp: false})
    }
  }
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.type == 'category') {
            this.props.navigation.navigate('NewestScreen', {
              id: parseInt(item.banners_url),
              name: '',
              sortOrder: item.type,
            })
          } else if (item.type == 'product') {
            this.getOneProduct(parseInt(item.banners_url))
          } else {
            this.props.navigation.navigate('NewestScreen', {
              id: '',
              name: '',
              sortOrder: item.type,
            })
          }
        }}>
        <ImageLoad
          placeholder={false}
          ActivityIndicator={true}
          key={index}
          resizeMode={'contain'}
          style={{width: width - 75, height: 183}}
          loadingStyle={{
            size: 'large',
            color: theme.loadingIndicatorColor,
          }}
          placeholderStyle={{width: 0, height: 0}}
          source={{
            uri:
              item.banners_image !== undefined
                ? item.banners_image.toString().startsWith('https')
                  ? item.banners_image.toString()
                  : item.banners_image.toString().replace('http', 'https')
                : '',
          }}
        />
      </TouchableOpacity>
    )
  }
  get pagination () {
    const {labels, activeSlide} = this.state
    return (
      <Pagination
        dotsLength={labels.length}
        activeDotIndex={activeSlide}
        dotStyle={{height: 2}}
        containerStyle={{
          backgroundColor:
            this.props.cartItems2.Config.card_style === 11
              ? '#F2F2F2'
              : theme.backgroundColor,
          paddingTop: 8,
          paddingBottom: 2,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 1,
          backgroundColor: theme.otherBtnsColor,
        }}
        inactiveDotStyle={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    )
  }
  render () {
    return (
      <View>
        <Spinner
          visible={this.state.SpinnerTemp}
          // textStyle={styles.spinnerTextStyle}
        />
        <Toast
          ref='toast'
          style={{
            backgroundColor: theme.otherBtnsColor,
            position: 'absolute',
            top: -39,
            zIndex: 12,
          }}
          position='top'
          positionValue={200}
          fadeOutDuration={1000}
          textStyle={{color: '#fff', fontSize: 15}}
        />
        <Carousel
          ref={c => {
            this._carousel = c
          }}
          loop={theme.autoplayLoop}
          autoplay={theme.autoplay}
          autoplayDelay={theme.autoplayDelay * 1000}
          autoplayInterval={3000}
          layout={'default'}
          data={this.state.labels}
          firstItem={this.props.props.banners.length > 0 ? 0 : 0}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={index => this.setState({activeSlide: index})}
        />
        {this.pagination}
      </View>
    )
  }
}
export const {width, height} = Dimensions.get('window')
const horizontalMargin = 20
const slideWidth = Dimensions.get('window').width * 0.6789
const sliderWidth = Dimensions.get('window').width
const itemWidth = slideWidth + horizontalMargin * 2

const mapStateToProps = state => ({
  cartItems2: state,
})
/// //////////////////////////////////////////
export default connect(mapStateToProps, null)(MyCarousel)
