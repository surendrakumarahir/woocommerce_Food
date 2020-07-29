/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/imports-first */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable brace-style */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/sort-comp */

import React, { Component } from 'react';
import { CardStyleInterpolators } from 'react-navigation-stack';
import {
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Text,
  Alert,
  Image,
  Platform
} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import Stars from 'react-native-stars';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageLoad from '../common/RnImagePlaceH';
import WooComFetch from '../common/WooComFetch';
import CardTem from '../common/CardTemplate';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import themeStyle from '../common/Theme.style';
import Mailer from 'react-native-mail';
// const Mailer = require('NativeModules').RNMail;
WIDTH = Dimensions.get('window').width;
class RewardPoints extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle');
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
        fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      objectArray: [],
      isLoading: false,
      SpinnerTemp: true,
      recent: false,
      rating: this.props.navigation.state.params.data.rating
        ? this.props.navigation.state.params.data.rating
        : 0,
      id: this.props.navigation.state.params.data.ID
        ? this.props.navigation.state.params.data.ID
        : this.props.navigation.state.params.data.user_id
          ? this.props.navigation.state.params.data.user_id
          : this.props.navigation.state.params.data.id,
      name: this.props.navigation.state.params.data.display_name
        ? this.props.navigation.state.params.data.display_name
        : this.props.navigation.state.params.data.name,
      banner:
        this.props.navigation.state.params.data.banner === false ||
        this.props.navigation.state.params.data.banner == undefined
          ? ''
          : this.props.navigation.state.params.data.banner,
      gravatar: this.props.navigation.state.params.data.display_name
        ? ''
        : this.props.navigation.state.params.data.gravatar,
      email: this.props.navigation.state.params.data.user_email
        ? this.props.navigation.state.params.data.user_email
        : '',
      page: 1,
      woLoading: true
    };
    this.getfirstData();
  }
  getfirstData = () => {
    if (this.props.isLoading.Config.showVendorInfo) {
      fetch(
        `${this.props.isLoading.Config.url}/wp-json/dokan/v1/stores/${
          this.state.id
        }`,
        {
          method: 'GET'
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data.user_email != undefined) {
            this.setState({ email: data.user_email });
          }
          if (data.email != undefined) this.setState({ email: data.email });
          if (data.rating != undefined) this.setState({ rating: data.rating });
          if (data.ID != undefined) this.setState({ id: data.ID });
          if (data.id != undefined) this.setState({ id: data.id });
          this.getProducts();
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.props.isLoading.Config.showWcVendorInfo) {
      if (this.props.navigation.state.params.data.meta != undefined) {
        this.setState({
          name: this.props.navigation.state.params.data.meta.pv_shop_name
        });
      }
      if (this.props.navigation.state.params.data.first_name != undefined) {
        this.setState({
          name: `${this.props.navigation.state.params.data.first_name} ${
            this.props.navigation.state.params.data.last_name
          }`
        });
      }
      if (this.props.navigation.state.params.data.display_name != undefined) {
        this.setState({
          name: this.props.navigation.state.params.data.display_name
        });
      }
      if (this.props.navigation.state.params.data.user_email != undefined) {
        this.setState({
          email: this.props.navigation.state.params.data.user_email
        });
      }
      if (this.props.navigation.state.params.data.user_id != undefined) {
        this.setState({ id: this.props.navigation.state.params.data.user_id });
      }
      this.getProducts();
    }
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.navigation.state.params.data.display_name
    });
    Image.getSize(this.state.banner, (width, height) => {
      if (this.props.width && !this.props.height) {
        this.setState({
          width: this.props.width,
          height: height * (this.props.width / width)
        });
      } else if (!this.props.width && this.props.height) {
        this.setState({
          width: width * (this.props.height / height),
          height: this.props.height
        });
      } else {
        this.setState({ width, height });
      }
    });
  }
  getData = () => {
    this.state.objectArray = [];
    this.setState({
      isLoading: false,
      SpinnerTemp: false
    });
  }
  getProducts = () => {
    fetch(
      `${
        this.props.isLoading.Config.url
      }/api/reactappsettings/react_vendor_products/?insecure=cool&post_author=${
        this.state.id
      }&page=${this.state.page}`,
      {
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.data.length != 0) {
          this.getWodata(data);
        } else {
          this.setState({ SpinnerTemp: false, refreshing: false });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleEmail = () => {
    Mailer.mail(
      {
        recipients: [this.state.email],
        subject: 'your title',
        body: 'your message',
        isHTML: true,
        attachment: {
          path: '', // The absolute path of the file from which to read data.
          type: '', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          name: '' // Optional: Custom filename for attachment
        }
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response')
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response')
            }
          ],
          { cancelable: true }
        );
      }
    );
  }

  getWodata = async data => {
    const json = await WooComFetch.getVendorProducts(data.data);
    console.log(json);
    if (data.length != 0) {
      for (const value of json) this.state.objectArray.push(value);
      this.setState({
        page: this.state.page++,
        SpinnerTemp: false,
        refreshing: false
      });
    } else {
      this.setState({ SpinnerTemp: false, refreshing: false });
    }
    return json;
  }

  handleLoadMore = () => {
    if (this.state.objectArray.length % 10 === 0) {
      this.setState({ refreshing: true, page: this.state.page + 1 }, () => {
        this.getProducts();
      });
    } else if (this.state.objectArray.length < 10) {
      this.setState({
        refreshing: false
      });
    }
  }

  renderItem = item => (
    <View>
      <CardTem
        objectArray={item.item}
        rows={this.props.vertical}
        recent={this.state.recent}
        width={WIDTH * themeStyle.twoRowCardWIdth}
      />
    </View>
  )

  renderSeparator = () => (
    <View style={{ height: 1, width: '100%', backgroundColor: '#ddd' }} />
  )

  renderFooter = () => (
      <View
        style={{
          marginBottom: 20,
          marginTop: 20,
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',
          backgroundColor: '#fff'
        }}
      >
    {this.state.refreshing ? (
        <View style={{
          height: 10,
         marginTop: 5,
       }}>
        <UIActivityIndicator
          size={27}
          count={12}
          color={themeStyle.loadingIndicatorColor}
        />
        </View>
      ) : null}
      </View>
    )

  render() {
    return (
      <FlatList
        style={{
          width: Dimensions.get('window').width,
          backgroundColor: themeStyle.backgroundColor
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{ backgroundColor: themeStyle.backgroundColor }}
        columnWrapperStyle={{
          alignItems: 'center',
          padding: 4,
          paddingBottom: 0,
          marginBottom: 0,
          paddingTop: 0,
          marginTop: 0,
          backgroundColor: themeStyle.backgroundColor,
          paddingLeft: WIDTH >= 375 ? WIDTH * 0.009 : WIDTH >= 360 && WIDTH <= 75 ? WIDTH * 0.008 : WIDTH * 0.007,
        }}
        data={this.state.objectArray}
        renderItem={this.renderItem}
        extraData={this.state}
        key={this.state.productView}
        ref={ref => {
          this.flatListRef = ref;
        }}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: themeStyle.primary,
              width: Dimensions.get('window').width
            }}
          >
            <Spinner visible={this.state.SpinnerTemp} />
            {this.state.banner == undefined ||
            this.state.banner == null ||
            this.state.banner == '' ||
            this.state.banner == false ? null : (
              <ImageLoad
              resizeMode={'cover'}
              key={'1'}
              style={{ width: WIDTH, height: Platform.OS === 'ios' ? themeStyle.singleRowCardWidth + 240 : themeStyle.singleRowCardWidth + 240 }}
              loadingStyle={{
                size: 'large',
                color: themeStyle.loadingIndicatorColor
              }}
              placeholder={false}
              ActivityIndicator={true}
              placeholderStyle={{width: 0, height: 0}}
              source={{ uri: this.state.banner }}
              />
              )}

            {this.state.gravatar !== null ? (
              <ImageLoad
                key={0}
                style={{ width: 70, height: 70, margin: 8, marginBottom: 0 }}
                loadingStyle={{
                  size: 'large',
                  color: themeStyle.loadingIndicatorColor
                }}
                placeholder={false}
                ActivityIndicator={true}
                placeholderStyle={{width: 0, height: 0}}
                source={require('../images/avatar.png')}
                borderRadius={70 / 2}
              />
            ) : null}
            {this.state.rating > 0 ? (
              <Stars
                disabled
                default={parseFloat(this.state.rating)}
                count={5}
                starSize={60}
                half
                fullStar={
                  <Icon
                    name={'star'}
                    style={{ fontSize: 26, color: 'white', marginTop: 2 }}
                  />
                }
                emptyStar={
                  <Icon
                    name={'star-outline'}
                    style={{ fontSize: 26, color: 'white', marginTop: 2 }}
                  />
                }
                halfStar={
                  <Icon
                    name={'star-half'}
                    style={{ fontSize: 26, color: 'white', marginTop: 2 }}
                  />
                }
              />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  paddingBottom: 0,
                  marginBottom: 0
                }}
              >
                <Icon
                  name={'star-outline'}
                  style={{ fontSize: 26, color: 'white', marginTop: 2 }}
                />
                <Text
                  style={{
                    padding: 8,
                    color: 'white',
                    fontSize: themeStyle.mediumSize
                  }}
                >
                  No Ratings found yet
                </Text>
              </View>
            )}
            <Text
              style={{
                padding: 6,
                color: 'white',
                fontWeight: 'bold',
                fontSize: themeStyle.largeSize + 2,
                paddingTop: 0
              }}
            >
              {this.state.name}
            </Text>
            <Text
              style={{
                padding: 8,
                paddingTop: 0,
                color: 'white',
                fontSize: themeStyle.mediumSize
              }}
            >
              {this.state.email}
            </Text>
            <TouchableOpacity
              style={{
                margin: 10,
                marginBottom: 20,
                marginTop: 5
              }}
              onPress={this.handleEmail}
            >
              <View
                style={{
                  borderColor: '#fff',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  elevation: 5,
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: 'black',
                  shadowOpacity: 0.5
                }}
              >
                <Text
                  style={{
                    color: themeStyle.primaryDark,
                    fontSize: themeStyle.mediumSize,
                    fontWeight: '500',
                    padding: 5
                  }}
                >
                  {this.props.isLoading.Config.languageJson['Contact Us']}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={() => this.renderFooter()}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={() => {
          if (!this.onEndReachedCalledDuringMomentum) {
            this.handleLoadMore();
            this.onEndReachedCalledDuringMomentum = true;
          }
        }}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state
});

export default connect(
  mapStateToProps,
  null
)(RewardPoints);
