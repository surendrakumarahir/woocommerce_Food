/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
import Rate, {AndroidMarket} from 'react-native-rate'
import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  I18nManager,
  Platform,
} from 'react-native'
import ImageLoad from '../common/RnImagePlaceH'
import {Container, Content, ListItem, CheckBox, Body, Icon} from 'native-base'
import themeStyle from '../common/Theme.style'
export default class rateUs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rated: false,
    }
  }

  render () {
    return this.props.value === 'menu' ? (
      <View>
        <ListItem noIndent={true}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.categoryView}
            onPress={() => {
              const options = {
                AppleAppID: this.props.appleId.toString(),
                GooglePackageName: '', // also require changing
                AmazonPackageName: '',
                OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
                preferredAndroidMarket: AndroidMarket.Google,
                preferInApp: true,
                openAppStoreIfInAppFails: true,
                fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html',
              }
              Rate.rate(options, success => {
                if (success) {
                  this.setState({rated: true})
                }
              })
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                alignItems: 'center',
                padding: !this.props.defaultIcons
                  ? I18nManager.isRTL
                    ? 8
                    : 0
                  : I18nManager.isRTL
                  ? 8
                  : 0,
                paddingBottom: 0,
                paddingTop: 0,
              }}>
              {!this.props.defaultIcons ? (
                <ImageLoad
                  key={0}
                  style={{
                    width: 22,
                    height: 22,
                    paddingLeft: 8,
                    paddingRight: 8,
                  }}
                  loadingStyle={{size: 'large', color: '#557f5f'}}
                  placeholder={false}
                  ActivityIndicator={true}
                  placeholderStyle={{width: 0, height: 0}}
                  source={this.props.imageTemp}
                />
              ) : (
                <Icon
                  name={this.props.iconName}
                  size={20}
                  style={{
                    color: '#000000',
                    fontSize: 19,
                    marginLeft: I18nManager.isRTL ? -6 : 5,
                  }}
                />
              )}
              <Text style={styles.categoryText}>{this.props.text}</Text>
            </View>
          </TouchableOpacity>
        </ListItem>
      </View>
    ) : (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.categoryView}
        onPress={() => {
          const options = {
            AppleAppID: this.props.appleId.toString(),
            GooglePackageName: '', // also require changing
            AmazonPackageName: '',
            OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: true,
            openAppStoreIfInAppFails: true,
            fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html',
          }
          Rate.rate(options, success => {
            if (success) {
              this.setState({rated: true})
            }
          })
        }}>
        <View style={styles.tabComponents}>
          <Text
            style={{
              fontSize: themeStyle.mediumSize + 1,
              color: '#000000',
              padding: 5,
              paddingLeft: 7,
            }}>
            {this.props.text}
          </Text>
          {
            <Icon
              name={this.props.iconName}
              size={20}
              style={{color: '#000000', fontSize: 20}}
            />
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  tabComponents: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    paddingLeft: 13,
    paddingRight: 7,
  },
  categoryText: {
    textAlign: 'left',
    color: '#000000',
    fontSize: themeStyle.mediumSize,
    paddingLeft: 11,
    paddingRight: 11,
  },
})
