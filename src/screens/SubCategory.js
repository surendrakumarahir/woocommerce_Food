/* eslint-disable react/jsx-boolean-value */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import themeStyle from '../common/Theme.style';
import { connect } from 'react-redux';
import CategoryFlatList from '../common/CategoriesFlatList';
import { CardStyleInterpolators } from 'react-navigation-stack';
// eslint-disable-next-line import/newline-after-import
class SubCategory1 extends Component {
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
      subcategories: [],
      parent: 0
    };
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson['Sub Categories']
    });
    for (const value of this.props.cartItems2.cartItems.allCategories) {
      if (value.parent == this.props.navigation.state.params.parentId) {
        this.state.subcategories.push(value);
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <CategoryFlatList
          dataSource={this.state.subcategories}
          products={this.props.cartItems2.Config.languageJson.Products}
          allCategories={this.props.cartItems2.cartItems.allCategories}
          props={this.props}
          noOfCol={this.props.navigation.state.params.noOfCol}
          categoryPage={this.props.navigation.state.params.categoryPage}
          separator={this.props.navigation.state.params.separator}
          parentId={this.props.navigation.state.params.parentId}
          viewButton={true}
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
)(SubCategory1);
/// /////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
 
  
});
