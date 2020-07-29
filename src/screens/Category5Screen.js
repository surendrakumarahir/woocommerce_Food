/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import ShoppingCartIcon from '../common/ShoppingCartIcon';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { connect } from 'react-redux';
import CategoriesSectionList from '../common/CategoriesSectionList';
import themeStyle from '../common/Theme.style';
class Category5 extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle');
    return {
      headerTitle: headerStyle,
      headerTintColor: themeStyle.headerTintColor,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerTitleAlign: 'center',
    };
  }
   // eslint-disable-next-line react/sort-comp
   constructor(props) {
    super(props);
    this.state = {
      activityIndicatorTemp: true,
    };
    setTimeout(() => {
      this.setState({ activityIndicatorTemp: false });
    }, Math.floor(100 / 360000));
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson.Categories
    });
  }
  render() {
    return this.state.activityIndicatorTemp ? (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
        <UIActivityIndicator size={27} color={themeStyle.loadingIndicatorColor} />
      </View>
    ) :
      (
      <View style={styles.container}>
        <CategoriesSectionList
          dataSource={this.props.cartItems2.cartItems.categories}
          products={this.props.cartItems2.Config.languageJson.Products}
          allCategories={this.props.cartItems2.cartItems.allCategories}
          sectionlist={this.props.cartItems2.cartItems.sectionlist}
          props={this.props}
          noOfCol={1}
          categoryPage={5}
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
export default connect(
  mapStateToProps,
  null
)(Category5);
/// /////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
