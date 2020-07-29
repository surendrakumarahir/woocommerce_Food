/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/newline-after-import */
/* eslint-disable max-len */
/* eslint-disable import/imports-first */
/* eslint-disable no-unused-expressions */
/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  FlatList,
  I18nManager,
  TouchableWithoutFeedback,
} from 'react-native'

import themeStyle from '../common/Theme.style.js'
import {Icon} from 'native-base'
import {connect} from 'react-redux'
import {withNavigation} from 'react-navigation'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import {ScrollView} from 'react-native-gesture-handler'
// eslint-disable-next-line no-undef
WIDTH = Dimensions.get('window').width
// eslint-disable-next-line no-undef
Height = Dimensions.get('window').height
// eslint-disable-next-line no-undef
DrawerWidth2 = WIDTH * 0.78
// eslint-disable-next-line no-undef
DrawerHeight2 = Height * 0.78

// eslint-disable-next-line react/no-multi-comp
class App extends Component {
  // eslint-disable-next-line react/sort-comp
  constructor (props) {
    super(props)

    this.state = {
      attributes: [],
      tempmYarray: [0, 999],
      tempmYarray2: [0, 999],
      maxAmount: 999,
      minAmount: 0,
      price: {lower: 0, upper: 999},
      on_sale: '',
      featured: '',
    }
  }
  render () {
    console.log(this.props.navigation)
    console.log(this.props.navigation.state.isDrawerOpen)
    return (
      <View style={styles.mainContainer}>
        <View style={{flex: 1}}>
          <View
            // eslint-disable-next-line no-nested-ternary
            style={{
              height: Platform.OS === 'android' ? 50 : 50,
              backgroundColor: themeStyle.primary,
              borderWidth: Platform.OS === 'ios' ? 0.3 : 0,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 2,
              shadowRadius: 3,
            }}>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.closeDrawer()}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingLeft: 15,
                }}>
                <Icon
                  onPress={() => this.props.navigation.closeDrawer()}
                  name={'md-close'}
                  style={{
                    color: '#fff',
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    paddingLeft: 20,
                    textAlign: 'center',
                    fontSize: 18,
                    color: 'white',
                  }}>
                  {this.props.cartItems2.Config.languageJson.Filters}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontWeight: '700',
                padding: 8,
                alignSelf: 'flex-start',
              }}>
              {' '}
              {`${this.props.cartItems2.Config.languageJson.by} ${this.props.cartItems2.Config.languageJson.Price}`}{' '}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10, padding: 5}}>
              {/* {this.props.navigation.state.routes[0].routes[0].toString() ===
                'NaN' ||
              this.props.navigation.state.routes[0].routes[0] === undefined ||
              this.props.navigation.state.routes[0].routes[0].params ===
                undefined ||
              this.props.navigation.state.routes[0].routes[0] === null ? (
                <Text style={{marginRight: 12}}>
                  {Number(this.state.minAmount)}
                </Text>
              ) : (
                <Text style={{marginRight: 12}}>
                  {Number(
                    this.props.navigation.state.routes[0].routes[0].params
                      .minAmount,
                  )}
                </Text>
              )} */}
              <MultiSlider
                sliderLength={Number(WIDTH * 0.58)}
                isMarkersSeparated={true}
                values={[
                  this.props.navigation.state.routes[0].routes[0].toString() !==
                    'NaN' &&
                  this.props.navigation.state.routes[0].routes[0] !==
                    undefined &&
                  this.props.navigation.state.routes[0].routes[0].params !==
                    undefined &&
                  this.props.navigation.state.routes[0].routes[0] !== null
                    ? Number(
                        this.props.navigation.state.routes[0].routes[0].params
                          .tempmYarray[0],
                      )
                    : Number(this.state.tempmYarray[0]),
                  this.props.navigation.state.routes[0].routes[0].toString() !==
                    'NaN' &&
                  this.props.navigation.state.routes[0].routes[0] !==
                    undefined &&
                  this.props.navigation.state.routes[0].routes[0].params !==
                    undefined &&
                  this.props.navigation.state.routes[0].routes[0] !== null
                    ? Number(
                        this.props.navigation.state.routes[0].routes[0].params
                          .tempmYarray[1],
                      )
                    : Number(this.state.tempmYarray[1]),
                ]}
                touchDimensions={{
                  height: 200,
                  width: 300,
                  borderRadius: 200/2,
                  slipDisplacement: 800,
                }}
                markerStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: themeStyle.primaryDark,
                
                }}
                selectedStyle={{backgroundColor: themeStyle.primary}}
                unselectedStyle={{backgroundColor: '#f618'}}
                snapped={false}
                containerStyle={{paddingTop: 4,  marginLeft: WIDTH * 0.08}}
                minMarkerOverlapDistance={3}
                customMarkerLeft={e => {
                  return (
                    <View style={{marginBottom: 13}}>
                      <TouchableWithoutFeedback
                        style={{borderRadius: 8, height: 8, width: 8}}>
                        <Text style={{fontSize: 10}}>{e.currentValue}</Text>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback>
                        <Text
                          style={{
                            overflow: 'hidden',
                            borderRadius: 15/2,
                            height: 15,
                            width: 15,
                            backgroundColor: themeStyle.primaryDark,
                          }}>
                          {''}
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                  )
                }}
                customMarkerRight={e => {
                  return (
                    <View style={{marginBottom: 13}}>
                      <TouchableWithoutFeedback
                        style={{borderRadius: 8, height: 8, width: 8}}>
                        <Text style={{fontSize: 10}}>{e.currentValue}</Text>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback>
                        <Text
                          style={{
                            borderRadius: 15/2,
                            overflow: 'hidden',
                            height: 15,
                            width: 15,
                            backgroundColor: themeStyle.primaryDark,
                          }}>
                          {''}
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                  )
                }}
                min={
                  this.props.navigation.state.routes[0].routes[0].toString() ===
                    'NaN' ||
                  this.props.navigation.state.routes[0].routes[0] ===
                    undefined ||
                  this.props.navigation.state.routes[0].routes[0].params ===
                    undefined ||
                  this.props.navigation.state.routes[0].routes[0] === null
                    ? Number(this.state.minAmount)
                    : Number(
                        this.props.navigation.state.routes[0].routes[0].params.minAmount
                      )
                }
                max={
                  this.props.navigation.state.routes[0].routes[0].toString() ===
                    'NaN' ||
                  this.props.navigation.state.routes[0].routes[0] ===
                    undefined ||
                  this.props.navigation.state.routes[0].routes[0].params ===
                    undefined ||
                  this.props.navigation.state.routes[0].routes[0] === null
                    ? Number(this.state.maxAmount)
                    : 
                      Number(this.props.navigation.state.routes[0].routes[0].params.maxAmount) + 1
                    
                }
                onValuesChangeFinish={() => {
                  this.props.navigation.state.routes[0].routes[0].params.onChangeRange(
                    Object.create({
                      lower: this.props.navigation.state.routes[0].routes[0]
                        .params.tempmYarray2[0],
                      upper: this.props.navigation.state.routes[0].routes[0]
                        .params.tempmYarray2[1],
                    }),
                  )
                  // this.props.navigation.closeDrawer()
                }}
                onValuesChange={values => {
                  this.props.navigation.state.routes[0].routes[0].params.tempmYarray2[0] =
                    values[0]
                  this.props.navigation.state.routes[0].routes[0].params.tempmYarray2[1] =
                    values[1]
                }}
              />

              {/* {this.props.navigation.state.routes[0].routes[0].toString() ===
                'NaN' ||
              this.props.navigation.state.routes[0].routes[0] === undefined ||
              this.props.navigation.state.routes[0].routes[0].params ===
                undefined ||
              this.props.navigation.state.routes[0].routes[0] === null ? (
                <Text style={{marginLeft: 12}}>
                  {<Text>{Number(this.state.maxAmount)}</Text>}
                </Text>
              ) : (
                <Text style={{marginLeft: 12}}>
                  {Number(
                    this.props.navigation.state.routes[0].routes[0].params
                      .maxAmount,
                  )}
                </Text>
              )} */}
            </View>
            <View style={{height: 1, width: '100%', backgroundColor: '#ddd'}} />
          </View>
          <ScrollView style={{marginBottom: 20}}>
            {this.props.navigation.state.routes[0].routes[0].toString() !==
              'NaN' &&
            this.props.navigation.state.routes[0].routes[0] !== undefined &&
            this.props.navigation.state.routes[0].routes[0].params !==
              undefined &&
            this.props.navigation.state.routes[0].routes[0] !== null &&
            this.props.navigation.state.routes[0].routes[0].params.featured &&
            this.props.navigation.state.routes[0].routes[0].toString() !==
              'NaN' &&
            this.props.navigation.state.routes[0].routes[0] !== undefined &&
            this.props.navigation.state.routes[0].routes[0].params !==
              undefined &&
            this.props.navigation.state.routes[0].routes[0] !== null &&
            this.props.navigation.state.routes[0].routes[0].params.on_sale ? (
              <View style={{justifyContent: 'flex-start'}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#000',
                    fontWeight: '700',
                    padding: 8,
                    alignSelf: 'flex-start',
                  }}>
                  {' '}
                  {`${this.props.cartItems2.Config.languageJson.by} ${this.props.cartItems2.Config.languageJson.SALE}/ ${this.props.cartItems2.Config.languageJson.Featured}`}
                </Text>

                {this.props.navigation.state.routes[0].routes[0].toString() !==
                  'NaN' &&
                this.props.navigation.state.routes[0].routes[0] !== undefined &&
                this.props.navigation.state.routes[0].routes[0].params !==
                  undefined &&
                this.props.navigation.state.routes[0].routes[0] !== null &&
                this.props.navigation.state.routes[0].routes[0].params.on_sale
                  ? this.props.navigation.state.routes[0].routes[0].params.singaleRow(
                      this.props.cartItems2.Config.languageJson.SALE,
                      'sale',
                    )
                  : null}
                {this.props.navigation.state.routes[0].routes[0].toString() !==
                  'NaN' &&
                this.props.navigation.state.routes[0].routes[0] !== undefined &&
                this.props.navigation.state.routes[0].routes[0].params !==
                  undefined &&
                this.props.navigation.state.routes[0].routes[0] !== null &&
                this.props.navigation.state.routes[0].routes[0].params.featured
                  ? this.props.navigation.state.routes[0].routes[0].params.singaleRow(
                      this.props.cartItems2.Config.languageJson.Featured,
                      'featured',
                    )
                  : null}
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#ddd',
                  }}
                />
              </View>
            ) : null}

            {console.log(this.state.attributes)}
            {this.props.navigation.state.routes[0].routes[0].toString() !==
              'NaN' &&
            this.props.navigation.state.routes[0].routes[0] !== undefined &&
            this.props.navigation.state.routes[0].routes[0].params !==
              undefined &&
            this.props.navigation.state.routes[0].routes[0] !== null &&
            this.props.navigation.state.routes[0].routes[0].params
              .attributes !== undefined ? (
              this.props.navigation.state.routes[0].routes[0].params.attributes
                .length != 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={
                    this.props.navigation.state.routes[0].routes[0].params
                      .attributes.length === 0
                      ? []
                      : this.props.navigation.state.routes[0].routes[0].params
                          .attributes
                  }
                  ref={ref => {
                    this.flatListRef = ref
                  }}
                  keyExtractor={(_item, index) => index.toString()}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: '#ddd',
                      }}
                    />
                  )}
                  renderItem={item => (
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#000',
                          fontWeight: '700',
                          padding: 8,
                          alignSelf: 'flex-start',
                        }}>
                        {' By '}
                        {item.item.attribute_name}{' '}
                        {item.item.attribute_name.charAt(0).toUpperCase() +
                          item.item.attribute_name.substring(1)}{' '}
                      </Text>

                      <FlatList
                        data={item.item.attribute_terms}
                        keyExtractor={(_item, index) => index.toString()}
                        ItemSeparatorComponent={() => (
                          <View
                            style={{
                              height: 1,
                              width: '100%',
                              backgroundColor: '#ddd',
                            }}
                          />
                        )}
                        renderItem={item2 => (
                          <View>
                            {this.props.navigation.state.routes[0].routes[0].params.singaleRow2(
                              item.item,
                              item2.item,
                            )}
                          </View>
                        )}
                      />
                    </View>
                  )}
                />
              ) : null
            ) : null}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  cartItems2: state,
})
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : 0
export default connect(mapStateToProps, null)(withNavigation(App))
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 2,
  },
  tabComponents: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    paddingLeft: 13,
  },
  textImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? 103 : 97,
    // eslint-disable-next-line no-undef
    width: DrawerWidth2,
    zIndex: 9,
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  categoryText: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#4d4d4d',
    fontSize: themeStyle.mediumSize,
    paddingLeft: 7,
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
  },
  NameText: {
    fontSize: themeStyle.mediumSize,
    fontWeight: '600',
    color: '#fff',
  },
  headerText: {
    textAlign:
      Platform.OS === 'ios' ? 'left' : I18nManager.isRTL ? 'right' : 'left',
    color: themeStyle.headerTintColor,
    fontSize: 21,
    padding: 10,
    paddingTop: 12,
  },
  headerIcon: {
    color: themeStyle.headerIconsColor,
    paddingTop: Platform.OS === 'ios' ? 6 : 10,
  },
  iconContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    marginRight: 5,
  },
})
