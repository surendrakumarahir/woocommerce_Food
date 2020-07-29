import React from 'react'
import {Animated, Dimensions, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import ImageLoad from './RnImagePlaceH'
import {ParallaxSwiper, ParallaxSwiperPage} from './index'
import theme from './Theme.style'
import WooComFetch from './WooComFetch'
import Toast from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay'
const {width, height} = Dimensions.get('window')

class myCros extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      SpinnerTemp: false,
    }
  }
  myCustomAnimatedValue = new Animated.Value(0)

  getPageTransformStyle = index => ({
    transform: [
      {
        scale: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8), // Add 8 for dividerWidth
            index * (width + 8),
            (index + 1) * (width + 8),
          ],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        rotate: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8),
            index * (width + 8),
            (index + 1) * (width + 8),
          ],
          outputRange: ['180deg', '0deg', '-180deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  })
  //getting single product data
  getOneProduct = async value => {
    try {
      this.setState({SpinnerTemp: true})
      console.log(value)
      const json2 = await WooComFetch.getOneProduct2(
        value,
        this.props.bannersArray.Config.productsArguments,
      )
      if (json2.message !== undefined) {
        this.setState({SpinnerTemp: false})
        this.refs.toast.show(
          json2.message +
            this.props.bannersArray.Config.languageJson['No Product ID Match'],
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

        <ParallaxSwiper
          speed={0.5}
          animatedValue={this.myCustomAnimatedValue}
          dividerWidth={8}
          dividerColor={'black'}
          backgroundColor='black'
          onMomentumScrollEnd={activePageIndex => console.log(activePageIndex)}
          showProgressBar={true}
          progressBarBackgroundColor='rgba(0,0,0,0.25)'
          progressBarValueBackgroundColor={theme.otherBtnsColor}
          progressBarThickness={4}>
          {this.props.props.banners.length > 0
            ? this.props.props.banners.map((val, key) => (
                <ParallaxSwiperPage
                  scrollToIndex={0}
                  BackgroundComponent={
                    <TouchableOpacity
                      onPress={() => {
                        if (val.type == 'category') {
                          this.props.navigation.navigate('NewestScreen', {
                            id: parseInt(val.banners_url),
                            name: '',
                            sortOrder: val.type,
                          })
                        } else if (val.type == 'product') {
                          this.getOneProduct(parseInt(val.banners_url))
                        } else {
                          this.props.navigation.navigate('NewestScreen', {
                            id: '',
                            name: '',
                            sortOrder: val.type,
                          })
                        }
                      }}>
                      <ImageLoad
                        placeholder={false}
                        ActivityIndicator={true}
                        key={key}
                        resizeMode={'cover'}
                        style={{width, height: 210}}
                        loadingStyle={{
                          size: 'large',
                          color: theme.loadingIndicatorColor,
                        }}
                        placeholderStyle={{width: 0, height: 0}}
                        source={{
                          uri:
                            val.banners_image !== undefined
                              ? val.banners_image.toString().startsWith('https')
                                ? val.banners_image.toString()
                                : val.banners_image
                                    .toString()
                                    .replace('http', 'https')
                              : '',
                        }}
                      />
                    </TouchableOpacity>
                  }
                />
              ))
            : null}
        </ParallaxSwiper>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  bannersArray: state,
})

export default connect(mapStateToProps, null)(myCros)
