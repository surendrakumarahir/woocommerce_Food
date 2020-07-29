/* eslint-disable no-useless-escape */
/* eslint-disable global-require */
/* eslint-disable max-len */
/* eslint-disable import/imports-first */
/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable import/newline-after-import */

import React, { Component } from 'react';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import CategoryFlatList from '../common/CategoriesFlatList';
import { View, Linking, Platform } from 'react-native';
import WooComFetch from '../common/WooComFetch';
import ShoppingCartIcon from '../common/ShoppingCartIcon';
import MenuIcon from '../common/MenuIcon';
import Spinner from 'react-native-loading-spinner-overlay';
import themeStyle from '../common/Theme.style';
import { UIActivityIndicator } from 'react-native-indicators';
class Category6 extends Component {
  static navigationOptions = ({ navigation}) => ({
    headerLeft: () => <MenuIcon navigation={navigation} />,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: themeStyle.homeTitle,  
    headerRight: () => <ShoppingCartIcon navigation={navigation} />,
    headerTitleAlign: 'center',
    headerTintColor: themeStyle.headerTintColor,
    headerStyle: {
      backgroundColor: themeStyle.primary,
    },
    headerTitleStyle: {
      fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
    },
    headerForceInset: { top: 'never', vertical: 'never' },
    gestureEnabled: true,
  })
  constructor(props) {
    super(props);
    this.state = {
      activityIndicatorTemp: true,
      SpinnerTemp: false
    };
    setTimeout(() => {
      this.setState({ activityIndicatorTemp: false });
    }, Math.floor(100 / 360000));
  }
  getOneProduct = async value => {
    try {
      const json2 = await WooComFetch.getOneProduct(
        value,
        this.props.cartItems2.Config.productsArguments
      );
      this.setState({ SpinnerTemp: false }, () => {
        this.navigate(json2[0]);
      });
    } catch (err) {
      console.log(err);
      this.setState({ SpinnerTemp: false });
    }
  }
  handleOpenURL = event => {
    // D
    if (event.url !== '' && event.url !== undefined && event.url !== null) {
      const route = event.url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      if (id !== '' && id !== undefined && id !== null) {
        this.setState({ SpinnerTemp: true }, () => {
          this.getOneProduct(id);
        });
      }
    }
  }
  navigate = json => {
    // E
    if (json !== '' && json !== undefined && json !== null) {
      Linking.removeEventListener('url', this.handleOpenURL);
      this.props.navigation.navigate('ProductDetails', { objectArray: json });
    }
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson.Home
    });
    if (!this.props.cartItems2.sharedData.deepTemp) {
      this.props.cartItems2.sharedData.deepTemp = true;
      if (Platform.OS === 'android') {
        Linking.getInitialURL().then(url => {
          if (url !== '' && url !== undefined && url !== null) {
            const route = url.replace(/.*?:\/\//g, '');
            const id = route.match(/\/([^\/]+)\/?$/)[1];
            if (id !== '' && id !== undefined && id !== null) {
              this.setState({ SpinnerTemp: true }, () => {
                this.getOneProduct(id);
              });
            }
          }
        });
      } else {
        Linking.addEventListener('url', this.handleOpenURL);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.activityIndicatorTemp);
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  render() {
    return this.state.activityIndicatorTemp ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center'
        }}
      >
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <View>
        <Spinner
          visible={this.state.SpinnerTemp}
        />
          <NavigationEvents
                onDidFocus={() => {
                  this.props.navigation.setParams({headerRight: () => <ShoppingCartIcon navigation={navigation} />})
                  this.setState({})}}
                />
        <CategoryFlatList
          dataSource={this.props.cartItems2.cartItems.categories}
          products={this.props.cartItems2.Config.languageJson.Products}
          allCategories={this.props.cartItems2.cartItems.allCategories}
          props={this.props}
          noOfCol={1}
          categoryPage={6}
          separator={false}
        />
      </View>
    );
  }
}
/// ///////////////////////////////////////////////
const mapStateToProps = state => ({
  cartItems2: state
});
/// //////////////////////////////////////////
export default connect(mapStateToProps, null)(Category6);
