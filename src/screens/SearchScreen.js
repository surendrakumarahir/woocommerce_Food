/* eslint-disable no-nested-ternary */
/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
/* eslint-disable import/imports-first */
/* eslint-disable import/newline-after-import */
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Dimensions,
  I18nManager
} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { CardStyleInterpolators } from 'react-navigation-stack';
// eslint-disable-next-line import/newline-after-import
import Category3Style from '../common/Categories3';
import { connect } from 'react-redux';
import WooComFetch from '../common/WooComFetch';
import CardTemHor from '../common/CardTemplateHori';
import { Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-easy-toast';
import themeStyle from '../common/Theme.style';
import ShoppingCartIcon from '../common/ShoppingCartIcon';
WIDTH = Dimensions.get('window').width;
class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle');
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
    };
  }
  // eslint-disable-next-line react/sort-comp
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: '',
      arrayholder: [],
      arrayholderHeader: [],
      spinnerTemp: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson.Search
    });
    this.setState(
      {
        isLoading: false,
        dataSource: this.props.isLoading.cartItems.allCategories
      },
      function () {
        // In this block you can do something with new state.
        this.setState({
          arrayholder: this.props.isLoading.cartItems.allCategories
        });
      }
    );
  }

  openSubCategories = (parent, name) => {
    console.log(parent);
    this.props.navigation.navigate('NewestScreen', {
      id: parent,
      name,
      sortOrder: 'newest'
    });
  }
  GetListViewItem(name) {
    this.setState({ text: name });
    this.props.navigation.state.params.onGoBack(
      name,
      this.props.navigation.state.params.onSelectionBase
    );
    this.props.navigation.goBack();
  }

  SearchFilterFunction(text) {
    this.setState({
      text
    });
  }

  getSearchData = async () => {
    try {
    this.setState({ spinnerTemp: true });
    if (this.state.text !== undefined) {
      if (this.state.text === null || this.state.text === '') {
        this.refs.toast.show('Please enter some text');
        this.setState({ spinnerTemp: false });
        return;
      }
    } else {
      this.setState({ spinnerTemp: false });
      return;
    }
    const json = await WooComFetch.getSearchData(
      this.props.isLoading.Config.productsArguments,
      100,
      this.state.text
    );
    if (json.length === 0) {
      this.refs.toast.show('No Product found!');
      console.log('No Product found!');
    }
    this.setState({ arrayholderHeader: json, spinnerTemp: false });
  } catch (e) {
    console.log(e.message);
    this.setState({ spinnerTemp: false });
  }
  }

  renderItem = item => <CardTemHor objectArray={item.item} rows={1} />
  renderSeparator = () => (
    <View style={{ height: 1, width: '100%', backgroundColor: '#ddd' }} />
  )
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <UIActivityIndicator color={themeStyle.loadingIndicatorColor} size={27} />
        </View>
      );
    }
    console.log(this.state.dataSource);
    return (
      <View style={styles.MainContainer}>
        <Spinner
          visible={this.state.spinnerTemp}
          textStyle={styles.spinnerTextStyle}
        />
        <Toast
          ref='toast'
          style={{ backgroundColor: '#c1c1c1' }}
          position='bottom'
          positionValue={200}
          fadeOutDuration={7000}
          textStyle={{ color: 'black', fontSize: 15 }}
        />
        <View style={styles.TextviewStyle}>
          <Icon
            name={'search'}
            style={{
              color: 'gray',
              fontSize: 22,
              margin: 7,
              marginLeft: 15,
              marginRight: 15
            }}
          />
          <TextInput
            style={styles.TextInputStyleClass, { textAlign: this.state.text === '' ? I18nManager.isRTL ? 'right' : 'left' : 'auto',
          width: WIDTH }}
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid='transparent'
            placeholder={this.props.isLoading.Config.languageJson.Search}
            returnKeyType={'search'}
            onSubmitEditing={() => this.getSearchData()}
          />
        </View>
        <FlatList
          data={this.state.dataSource}
          extraData={this.state}
          listKey={'products'}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={item => (
            <Category3Style
              item={item.item}
              id={item.index}
              products={this.props.isLoading.Config.languageJson.Products}
              image={item.item.image === null ? '' : item.item.image.src}
              openSubCategories={(t, n) => this.openSubCategories(t, n)}
            />
          )}
          ListHeaderComponent={
            <FlatList
              style={{ marginBottom: 1 }}
              contentContainerStyle={{ flex: 1 }}
              data={this.state.arrayholderHeader}
              renderItem={this.renderItem}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            />
          }
          enableEmptySections
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state
});

export default connect(
  mapStateToProps,
  null
)(SearchScreen);

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: themeStyle.backgroundColor
  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10
  },
  TextInputStyleClass: {
    height: 40,
    backgroundColor: '#fff',
    padding: 10,
    width: WIDTH - 61,
    // textAlign: I18nManager.isRTL ? 'right' : 'left',

  },
  TextviewStyle: {
    flexDirection: 'row',
    textAlign: 'center',
    height: 40,
    margin: 7,
    marginBottom: -3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 5
  }
});
