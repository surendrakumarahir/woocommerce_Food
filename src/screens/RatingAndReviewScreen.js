/* eslint-disable react/sort-comp */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/imports-first */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators'
import {CardStyleInterpolators} from 'react-navigation-stack'
import SyncStorage from 'sync-storage'
import Stars from 'react-native-stars'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-easy-toast'
// eslint-disable-next-line import/newline-after-import
import {Icon} from 'native-base'
import Dialog, {DialogContent, DialogTitle} from 'react-native-popup-dialog'
import {connect} from 'react-redux'
import WooComFetch from '../common/WooComFetch'
import ImageLoad from '../common/RnImagePlaceH'
import themeStyle from '../common/Theme.style'
Width2 = Dimensions.get('window').width
class RatingScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerRight: null,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
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
  // eslint-disable-next-line react/sort-comp
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson.Reviews,
    })
  }
  /// /////////////////
  constructor (props) {
    super(props)
    this.state = {
      reviews: [],
      visible: false,
      id: this.props.navigation.state.params.objectArray.id,
      average: 0,
      activityIndicatorTemp: true,
      name: '',
      email: '',
      description: '',
      nonce: '',
      rating: 1,
      spinnerTemp: false,
      colTemp: false,
    }
    this.getProductReviews()
    this.getNonce()
  }
  //= ==============================================================================================================================
  // <!-- 2.0 updates -->
  getProductReviews = async () => {
    try {
      console.log(this.state.id)
      console.log(this.props.isLoading.Config.productsArguments)
      const json2 = await WooComFetch.getProductsRating(
        this.state.id,
        this.props.isLoading.Config.productsArguments,
      )
      console.log(json2)
      let total = 0
      for (const value of this.state.reviews) {
        total += value.rating
      }
      this.state.average = total / this.state.reviews.length
      if (this.state.reviews.length == 0) this.state.average = 0
      this.setState({reviews: json2, activityIndicatorTemp: false})
    } catch (e) {
      console.log(e.message)
      this.setState({spinnerTemp: false})
    }
  }
  //= ==============================================================================================================================
  getNonce () {
    fetch(
      `${this.props.isLoading.Config.url}/api/get_nonce/?controller=reactappsettings&method=react_create_product_review`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(data => {
        this.setState({nonce: data.nonce})
      })
      .catch(error => {
        console.log(error)
      })
  }
  /// /////////////////////////////////
  addComment () {
    if (this.state.nonce !== '') {
      this.setState({spinnerTemp: true})
      fetch(
        `${
          this.props.isLoading.Config.url
        }/api/reactappsettings/react_create_product_review/?insecure=cool&nonce=${
          this.state.nonce
        }&author_name=${this.state.name}&author_email=${
          this.state.email
        }&product_id=${this.state.id}&author_content=${
          this.state.description
        }&rate_star=${this.state.rating}&user_id=${
          SyncStorage.get('customerData').id
        }`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(data => {
          if (data.status == 'ok') {
            this.refs.toast.show(data.message)
          } else {
            this.refs.toast.show(data.error)
          }

          this.setState({
            spinnerTemp: false,
            name: '',
            email: '',
            description: '',
            rating: 1,
          })
        })
        .catch(error => {
          console.log(error)
        })
      // }
    }
  }
  renderSeparator = () => (
    <View style={{height: 1, width: '100%', backgroundColor: '#ddd'}} />
  )
  canBeSubmitted () {
    const {email, name, rating, description, colTemp} = this.state
    return (
      email.length > 0 &&
      name.length > 0 &&
      rating > 0 &&
      description.length > 0 &&
      colTemp === true
    )
  }
  validate = text => {
    console.log(text)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(text) === false) {
      console.log('Email is Not Correct')
      this.setState({email: text, colTemp: false})
      return false
    } else {
      this.setState({email: text, colTemp: true})
      console.log('Email is Correct')
    }
  }
  render () {
    const isEnabled = this.canBeSubmitted()
    return this.state.activityIndicatorTemp ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: themeStyle.backgroundColor,
        }}>
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinnerTemp}
          textStyle={styles.spinnerTextStyle}
        />
        <Toast
          ref='toast'
          style={{backgroundColor: '#c1c1c1'}}
          position='bottom'
          positionValue={200}
          fadeOutDuration={7000}
          textStyle={{color: 'black', fontSize: 15}}
        />
        <Stars
          disabled
          default={parseFloat(
            this.props.navigation.state.params.averageRatingArray,
          )}
          count={5}
          starSize={60}
          half
          fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
          emptyStar={
            <Icon
              name={'star-outline'}
              style={[styles.myStarStyle, styles.myEmptyStarStyle]}
            />
          }
          halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
        />
        <View>
          <Text
            style={{
              fontSize: 30,
              color: '#000',
            }}>{`${this.props.navigation.state.params.averageRatingArray}`}</Text>
        </View>

        <View
          style={{
            backgroundColor: themeStyle.backgroundColor,
            padding: 8,
            flexDirection: 'row',
          }}>
          <Icon
            name={'person'}
            style={{
              color: themeStyle.otherBtnsColor,
              fontSize: 35,
              paddingRight: 5,
              paddingLeft: 5,
            }}
          />
          <Text
            style={{
              fontSize: 22,
              color: themeStyle.otherBtnsColor,
              paddingLeft: 15,
              paddingTop: 5,
            }}>
            {`${`${this.props.navigation.state.params.ratingCountArray} ${this.props.isLoading.Config.languageJson.rating}`} `}
          </Text>
        </View>
        <Button
          onPress={() => {
            console.log(SyncStorage.get('customerData'))
            if (
              SyncStorage.get('customerData') == null ||
              SyncStorage.get('customerData') == undefined ||
              SyncStorage.get('customerData') === ''
            ) {
              SyncStorage.set('cartScreen', 1)
              this.props.navigation.push('LoginScreen')
            } else {
              this.setState({visible: true})
            }
          }}
          title='Rate Product'
          color={themeStyle.primaryDark}
        />

        <FlatList
          data={
            this.state.reviews !== undefined &&
            this.state.reviews !== null &&
            this.state.reviews.toString() !== 'NaN'
              ? this.state.reviews
              : []
          }
          showsVerticalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{backgroundColor: 'white'}}
          style={{marginTop: 30}}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          extraData={this.state}
          renderItem={item => (
            <View style={styles.container2}>
              <ImageLoad
                key={item.index}
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45 / 2,
                  overflow: 'hidden',
                  marginRight: 8,
                }}
                loadingStyle={{size: 'large', color: '#557f5f'}}
                placeholder={false}
                ActivityIndicator={true}
                placeholderStyle={{width: 0, height: 0}}
                backgroundColor='transparent'
                color='transparent'
                source={require('../images/avatar.png')}
              />

              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  backfaceVisibility: 'hidden',
                  backgroundColor: 'white',
                  alignContent: 'center',
                  width: Width2 * 0.8,
                  padding: 8,
                  paddingLeft: 4,
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: themeStyle.largeSize,
                  }}>
                  {item.item.name}
                </Text>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backfaceVisibility: 'hidden',
                    backgroundColor: 'white',
                    alignContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Stars
                    disabled
                    default={parseFloat(item.item.rating)}
                    count={5}
                    half
                    fullStar={
                      <Icon
                        name={'star'}
                        style={{
                          color: '#eea532',
                          backgroundColor: 'transparent',
                          fontSize: 23,
                        }}
                      />
                    }
                    emptyStar={
                      <Icon
                        name={'star-outline'}
                        style={{
                          color: '#eea532',
                          backgroundColor: 'transparent',
                          fontSize: 23,
                        }}
                      />
                    }
                    halfStar={
                      <Icon
                        name={'star-half'}
                        style={{
                          color: '#eea532',
                          backgroundColor: 'transparent',
                          fontSize: 23,
                        }}
                      />
                    }
                  />

                  <Text style={{color: themeStyle.primary, paddingLeft: 20}}>
                    {item.item.date_created.substr(
                      0,
                      item.item.date_created.indexOf('T'),
                    )}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: themeStyle.mediumSize,
                  }}>{`${item.item.review}`}</Text>
              </View>
            </View>
          )}
        />

        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({visible: false})
          }}
          dialogTitle={
            <DialogTitle
              style={{
                backgroundColor: themeStyle.primary,
                color: '#fff',
                width: 300,
              }}
              textStyle={{color: '#fff', fontSize: 20}}
              title='Rate Product'
            />
          }>
          <DialogContent>
            <View style={{padding: 8}}>
              <Stars
                default={parseFloat(1)}
                update={val => {
                  this.setState({rating: val})
                }}
                count={5}
                starSize={60}
                fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                emptyStar={
                  <Icon
                    name={'star-outline'}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon name={'star-half'} style={[styles.myStarStyle]} />
                }
              />
            </View>

            <View
              style={{
                backgroundColor: '#f2f2f2',
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 4,
              }}>
              <Icon name={'person'} style={{color: '#979393'}} />
              <TextInput
                value={this.state.name}
                onChangeText={username => this.setState({name: username})}
                placeholder={this.props.isLoading.Config.languageJson.Name}
                style={styles.input}
              />
            </View>

            <View
              style={{
                backgroundColor: '#f2f2f2',
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 4,
              }}>
              <Icon name={'mail'} style={[styles.myStarStyle2]} />
              <TextInput
                value={this.state.email}
                onChangeText={text => this.validate(text)}
                placeholder={this.props.isLoading.Config.languageJson.Email}
                style={{
                  color: this.state.colTemp ? '#000000' : '#FF5050',
                  width: 200,
                  height: 40,
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: '#f2f2f2',
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 4,
              }}>
              <Icon name={'chatbubbles'} style={[styles.myStarStyle2]} />
              <TextInput
                value={this.state.description}
                onChangeText={text => this.setState({description: text})}
                placeholder={
                  this.props.isLoading.Config.languageJson['Your Messsage']
                }
                style={styles.input}
              />
            </View>
            <View style={{paddingLeft: 160, paddingTop: 5}}>
              <Button
                disabled={!isEnabled}
                onPress={() => {
                  this.addComment()
                  this.setState({visible: false})
                }}
                title='Rate It!'
                color={themeStyle.primary}
              />
            </View>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  isLoading: state,
})

export default connect(mapStateToProps, null)(RatingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: themeStyle.backgroundColor,
    paddingTop: 20,
  },
  myStarStyle: {
    color: themeStyle.primary,
    backgroundColor: 'transparent',
    fontSize: 35,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myStarStyle2: {
    color: '#979393',
    backgroundColor: 'transparent',
    fontSize: 28,
    paddingTop: 5,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: '#e0e0e0',
  },
  input: {
    width: 200,
    height: 40,
  },
  container2: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Width2,
    padding: 8,
    borderColor: 'gray',
    flexDirection: 'row',
    marginBottom: 5,
  },
})
