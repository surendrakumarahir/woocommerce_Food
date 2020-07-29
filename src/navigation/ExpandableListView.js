/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, {Component} from 'react'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  Platform,
} from 'react-native'
import {Container, Content, ListItem, CheckBox, Body, Icon} from 'native-base'
import {connect} from 'react-redux'
import ImageLoad from '../common/RnImagePlaceH'
import themeStyle from '../common/Theme.style'
// eslint-disable-next-line no-undef
WIDTH = Dimensions.get('window').width
// eslint-disable-next-line no-undef
Height = Dimensions.get('window').height
// eslint-disable-next-line no-undef
DrawerWidth = WIDTH * 0.78
// eslint-disable-next-line no-undef
DrawerHeight = Height * 0.78
class ExpandableListView extends Component {
  constructor () {
    super()
    this.state = {
      layoutHeight: 0,
      dropdownValue: 0,
      dropdownValue1: [0, 0, 0],
    }
  }
  static getDerivedStateFromProps (props) {
    if (props.item.expanded) {
      return {
        layoutHeight: null,
      }
    } else {
      return {
        layoutHeight: 0,
      }
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true
    }
    return false
  }
  showSelectedCategory = item => {
    // subcategory
    // Write your code here which you want to execute on sub category selection.
    // eslint-disable-next-line no-param-reassign
    const string = item
    // eslint-disable-next-line no-undef
    newString = string.replace(/\s+/g, '') // "thiscontainsspaces"
    // eslint-disable-next-line no-undef
    console.log(newString)
    if (newString == 'HOME3') {
      console.log(newString)
      this.props.navigation.navigate('Home3Screen', {
        id: undefined,
        // eslint-disable-next-line no-undef
        name: undefined, /// ////////////////////////////////////////////////
        sortOrder:
          newString === 'NEWEST'
            ? 'Newest'
            : newString === 'SALE'
            ? 'sale'
            : 'featured',
      })
    } else if (
      newString === 'NEWEST' ||
      newString === 'SALE' ||
      newString === 'FEATURED'
    ) {
      this.props.navigation.navigate('NewestScreen', {
        id: undefined,
        // eslint-disable-next-line no-undef
        name: undefined, /// ////////////////////////////////////////////////
        sortOrder:
          newString === 'NEWEST'
            ? 'Newest'
            : newString === 'SALE'
            ? 'sale'
            : 'featured',
      })
    } else if (newString !== 'HOME3') {
      this.props.navigation.navigate(newString)
    }
  }

  dropdownValueFun = () => {}

  render () {
    if (this.state.dropdownValue1[this.props.count] == 0) {
      this.state.dropdownValue1[this.props.count] = 1
    } else {
      this.state.dropdownValue1[this.props.count] = 0
    }
    return (
      <View
        style={{
          // borderBottomWidth: 0.5,
          // borderColor: '#4d4d4d',
          // marginBottom: 1
          padding: 0,
        }}>
        <ListItem noIndent={true}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPressIn={this.dropdownValueFun}
            onPress={this.props.onClickFunction}
            style={styles.categoryView}>
            <View style={styles.tabComponents}>
              {!this.props.isLoading.Config.defaultIcons ? (
                <ImageLoad
                  key={0}
                  style={{
                    width: 18,
                    height: 18,
                    marginRight: I18nManager.isRTL ? 8 : 0,
                    marginLeft: 0,
                  }}
                  loadingStyle={{size: 'large', color: '#557f5f'}}
                  placeholder={false}
                  ActivityIndicator={true}
                  placeholderStyle={{width: 0, height: 0}}
                  source={this.props.item.categoryName.imageName}
                />
              ) : (
                <Icon
                  name={this.props.item.categoryName.iconName}
                  size={20}
                  style={{
                    color: '#000000',
                    fontSize: 19,
                    paddingLeft: I18nManager.isRTL ? 3 : 1,
                    paddingRight: 3,
                  }}
                />
              )}

              <Text style={styles.categoryText}>
                {this.props.item.categoryName.jsonName}{' '}
              </Text>
            </View>

            <Icon
              name={
                this.state.dropdownValue1[this.props.count] === 0
                  ? 'arrow-dropup'
                  : 'arrow-dropdown'
              }
              style={{
                color: '#000000',
                paddingRight: 12,
                paddingLeft: 12,
                fontSize: 19,
              }}
            />
          </TouchableOpacity>
        </ListItem>
        <View style={{height: this.state.layoutHeight, overflow: 'hidden'}}>
          {this.props.item.categoryName.subCategory.map((item, key) => (
            <View
              // style={{
              //   borderTopWidth: 0 === key ? 0.7 : 0,
              //   borderBottomWidth:
              //     (this.props.item.categoryName.subCategory.length - 1) === key
              //       ? 0
              //       : 0.7,
              //       marginBottom: 0,
              //   borderColor: '#4d4d4d',
              // }}
              key={key}>
              <ListItem noIndent={true}>
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.8}
                  onPress={this.showSelectedCategory.bind(this, item.name)}
                  style={styles.categoryView}>
                  <View style={styles.tabComponents}>
                    {!this.props.isLoading.Config.defaultIcons ? (
                      <ImageLoad
                        key={0}
                        style={{
                          width: 18,
                          height: 18,
                          marginRight: I18nManager.isRTL ? 8 : 8,
                          marginLeft: 8,
                        }}
                        loadingStyle={{size: 'large', color: '#557f5f'}}
                        placeholderSource={require('../images/placeholder.png')}
                        placeholderStyle={{
                          width: 18,
                          height: 18,
                          marginRight: I18nManager.isRTL
                            ? 8
                            : Platform.OS === 'android'
                            ? 8
                            : 0,
                          marginLeft: Platform.OS === 'android' ? 8 : 0,
                        }}
                        source={item.imageName}
                      />
                    ) : (
                      <Icon
                        name={item.iconName}
                        size={20}
                        style={{
                          color: '#000000',
                          paddingLeft: I18nManager.isRTL ? 8 : 8,
                          paddingRight: I18nManager.isRTL ? 8 : 8,
                          fontSize: 19,
                        }}
                      />
                    )}

                    <Text style={styles.subCategoryText}>{item.jsonName}</Text>
                  </View>
                </TouchableOpacity>
              </ListItem>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  isLoading: state,
})

export default connect(mapStateToProps, null)(ExpandableListView)
const styles = StyleSheet.create({
  tabComponents: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    // padding: 10,
    alignItems: 'center',
    // paddingLeft: 13,
  },
  subCategoryText: {
    textAlign: 'left',
    color: '#000000',
    fontSize: themeStyle.smallSize,
    paddingLeft: 8,
  },
  categoryText: {
    textAlign: 'left',
    color: '#000000',
    fontSize: themeStyle.mediumSize,
    paddingLeft: 7,
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 2,
  },
})
