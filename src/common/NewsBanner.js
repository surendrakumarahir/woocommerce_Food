/* eslint-disable import/newline-after-import */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable import/imports-first */
/* eslint-disable max-len */
/* eslint-disable global-require */
import React, {Component} from 'react'
import {View, Dimensions} from 'react-native'
import ImageLoad from './RnImagePlaceH';
import Swiper from '../common/Swiper'
import theme from './Theme.style'
const {width} = Dimensions.get('window')
class Banner extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      newsBannerData: [],
    }
  }
  static getDerivedStateFromProps (props) {
    if (props.newsBannerData.length != 0) {
      return {
        newsBannerData: props.newsBannerData,
      }
    }
    return null
  }
  render () {
    console.log(this.state.newsBannerData)
    return this.state.isLoading && this.state.newsBannerData.length > 0 ? (
      <View>
        <Swiper
          navigation={this.props.navigation}
          type='Home'
          news={this.props.news}>
          {this.state.newsBannerData.map((val, key) => (
            <ImageLoad
              key={key}
              style={{width, height: 200}}
              loadingStyle={{size: 'large', color: theme.loadingIndicatorColor}}
              placeholderStyle={{width: 0, height: 0}}
              placeholder={false}
              ActivityIndicator={true}
              source={{
                uri: val.image !== undefined ? val.image.toString() : '',
              }}
            />
          ))}
        </Swiper>
      </View>
    ) : null
  }
}

export default Banner
