/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-empty */
/* eslint-disable import/imports-first */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  I18nManager,
  Dimensions,
  Platform,
} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';
import {
  ActionSheet,
  Picker,
} from 'native-base';
import { connect } from 'react-redux';
import WooComFetch from '../common/WooComFetch';
import FlatListViewShop from '../common/FlatListViewShop';
import { Icon } from 'native-base';
import themeStyle from '../common/Theme.style';

const CANCEL_INDEX = 4;
WIDTH = Dimensions.get('window').width;
attributesGlobal = '';
let i = 0;
class Newest extends Component {
  static navigationOptions = props => {
    console.log(props);
    const headerStyle = props.navigation.getParam('headerTitle');
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleAlign: 'center',
      headerForceInset: { top: 'never', vertical: 'never' },
      headerTintColor: themeStyle.headerTintColor,
      gesturesEnabled: false,
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
      },
      gesturesDirection: 'inverted',
      headerLeft: (
        <Icon
          onPress={() => props.navigation.pop()}
          name={!I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'}
          style={{ color: '#fff', fontSize: 25, padding: 5, paddingLeft: 16, paddingRight: 16, marginRight: 16 }}
        />
      )
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      queryAttributes: '',
      attributes: [],
      tempAttributes: [],
      selectedAttributes: [],
      scrollTopButton: false,
      activityIndicatorTemp: true,
      products: [],
      tempmYarray: [0, 1000],
      tempmYarray2: [0, 1000],
      selectedTab:
        this.props.navigation.dangerouslyGetParent() !== undefined
          ? this.props.navigation.dangerouslyGetParent() !== null 
          && this.props.navigation.dangerouslyGetParent() !== undefined ?
           this.props.navigation.dangerouslyGetParent().state.params.id
          : '' : '',
      categoryId:
        this.props.navigation.dangerouslyGetParent() !== undefined
        ? this.props.navigation.dangerouslyGetParent() !== null 
        && this.props.navigation.dangerouslyGetParent() !== undefined ?
          this.props.navigation.dangerouslyGetParent().state.params.id
          : '' : '',
      categoryName:
        this.props.navigation.dangerouslyGetParent() !== undefined
        ? this.props.navigation.dangerouslyGetParent() !== null 
        && this.props.navigation.dangerouslyGetParent() !== undefined 
          ? this.props.navigation.dangerouslyGetParent().state.params.name
          : '' : '',
      sortOrder: 'Newest',
      sortArray: [],
      page: 1,
      applyFilter: false,
      tempApply: false,
      filters: [],
      selectedFilters: [],
      maxAmount: 1000,
      minAmount: 0,
      price: { lower: 0, upper: 1000 },
      priceData: { lower: 0, upper: 1000 },
      side: 'right',
      productView: 'grid',
      on_sale: '',
      featured: '',
      filterOnSale: false,
      filterFeatured: false,
      loadingServerData: true,
      type:
        this.props.navigation.dangerouslyGetParent() !== undefined
        ? this.props.navigation.dangerouslyGetParent() !== null 
        && this.props.navigation.dangerouslyGetParent() !== undefined  
          ? this.props.navigation.dangerouslyGetParent().state.params.sortOrder
          : '' : '',
      listOfFilteredIdsFromCustom: [],
      wrapperCondition: false,
      wrapperConditionDrawer: false,
      saleTemp: true,
      featuredTemp: true,
      radioButton: [],
      emptyBox: [],
      selected: 'key0',
      modalVisible: false,
      tempBox: []
    };
    this.child = '';
    this.props.navigation.setParams({
      minAmount: 0,
      maxAmount: 1000,
      tempmYarray: [0, 1000],
      tempmYarray2: [0, 1000],
      singaleRow: (p, n) => this.singaleRow(p, n),
      singaleRow2: (p, n) => this.singaleRow2(p, n),
      onChangeRange: obj => this.onChangeRange(obj)
    });

    attributesGlobal = '';
    setTimeout(() => {
      this.setState({ activityIndicatorTemp: false });
    }, Math.floor(100 / 360000));
  }
  onValueChange(value) {
    if (value === 'key0') {
      this.getSortProducts('Newest');
    } else if (value === 'key1') {
      this.getSortProducts('A - Z');
    } else if (value === 'key2') {
      this.getSortProducts('Z - A');
    }
    this.setState({
      selected: value
    });
  }

  onChangeRange(obj) {
   // console.log(obj)
    // if (i == 0) {
    //   i = 1;
    // } else {
      i = 1;
      this.state.tempBox.push(obj);
      console.log('onChangeRange');
      this.setState(
        {
          price: obj,
          tempApply: false,
          tempBox: this.state.tempBox
        },
        () => {
          this.applyFilters('');
          i = 0;
        }
      );
    // }
  }

  componentWillUnmount() {
    clearInterval(this.state.activityIndicatorTemp);
  }

  setModalVisible(visible) {
    this.setState({ wrapperConditionDrawer: visible });
  }

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    console.log(';compoentdidMount');
   if (Platform.OS === 'ios') {
    this.props.navigation.setParams({
      headerTitle: this.props.cartItems2.Config.languageJson.Shop
    });
  } else {
    this.props.navigation.setParams({
      headerTitle: `${this.props.cartItems2.Config.languageJson.Shop}`
    });
  }
    this.getFilterdProducts();
  }
  /// //////////////////////////////
  resetProducts = data => {
    this.setState({
      products: [],
      tempApply: !!(this.state.applyFilter && data.data.length === 0)
    });
  }
  getFilterdProducts = () => {
    if (this.state.page == 1) {
      this.setState({ loadingServerData: false, products: [] }); /// /////////////////////////////check
    }

    let query = `&page=${this.state.page}`;
    if (this.state.sortOrder === 'Newest') query += '&order=desc&order_by=date';
    else if (this.state.sortOrder === 'A - Z') {
      query += '&order=asc&order_by=title';
    } else if (this.state.sortOrder === 'Z - A') {
      query += '&order=desc&order_by=title';
    }

    if (this.state.type === 'featured' || this.state.filterFeatured) {
      query += '&featured=true';
      this.setState({ filterFeatured: true });
    }

    if (
      this.state.type === 'sale' ||
      this.state.type === 'on_sale' ||
      this.state.filterOnSale
    ) {
      query += '&on_sale=true';
      this.setState({ filterOnSale: true });
    }

    if (
      this.state.price.lower !== this.state.minAmount &&
      this.state.applyFilter
    ) {
      query = `${query}&min_price=${this.state.price.lower}`;
    }
    if (
      this.state.price.upper !== this.state.maxAmount &&
      this.state.applyFilter
    ) {
      query = `${query}&max_price=${this.state.price.upper}`;
    }
    if (this.state.selectedTab !== '') {
      query = `${query}&cat_id=${this.state.selectedTab}`;
    }
    query += attributesGlobal;
    this.getAllAttributes(); /// ///////////////////////////

    fetch(
      `${
        this.props.cartItems2.Config.url
      }/api/reactappsettings/react_filter_products/?insecure=cool${query}`,
      {
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          this.setState({ listOfFilteredIdsFromCustom: data.data });
        }
        if (data.data.length === 0 && this.state.page === 1) {
          this.setState({ products: [], tempApply: true });
        }
        if (data.data.length === 0) {
          this.resetProducts(data);
        }
        this.getFilterdProductsFromWoo();
      })
      .catch(error => {
        console.log(error);
      });
  }

  getFilterdProductsFromWoo = async () => {
    if (this.state.listOfFilteredIdsFromCustom.length == 0) {
      this.setState({ loadingServerData: true });
      return 0;
    }

    let order = '';
    let order_by = '';

    if (this.state.sortOrder == 'Newest') {
      order = 'desc';
      order_by = 'date';
    } else if (this.state.sortOrder == 'A - Z') {
      order = 'asc';
      order_by = 'title';
    } else if (this.state.sortOrder == 'Z - A') {
      order = 'desc';
      order_by = 'title';
    }
    const data = await WooComFetch.getSortProducts(
      this.props.cartItems2.Config.url,
      this.state.listOfFilteredIdsFromCustom,
      order,
      order_by
    );
    if (this.state.page == 1) {
      this.emptyProductList();
    }
    if (data.length != 0) {
      this.setState({ page: this.state.page + 1 });
      for (const value of data) {
        this.state.products.push(value);
      }
    }

    if (data.length == 0 || data.length < 10) {
    }
    this.setState({ loadingServerData: true });
  }
  emptyProductList = () => {
    this.state.products = [];
  }
  //= ===========================================================================================
  resetFilters() {
    this.reset();
  }

  reset() {
    attributesGlobal = '';
    this.setState(
      {
        applyFilter: false,
        tempApply: false,
        filterFeatured: false,
        type: 'latest',
        sortOrder: 'Newest',
        filterOnSale: false,
        page: 1,
        products: [],
        selectedAttributes: [],
        queryAttributes: '',
        price: { lower: 0, upper: 1000 },
        attributes: [],
        filters: false,
        on_sale: false,
        saleTemp: true,
        featuredTemp: true,
        tempmYarray: [0, 1000],
        tempmYarray2: [0, 1000],
        selected: 'key0'
      },
      () => {
        this.getFilterdProducts();
      }
    );
  }

  // changing tab
  changeTab(c) {
    attributesGlobal = '';
    if (c === '') {
      this.props.navigation.setParams({
        minAmount: this.state.price.lower,
        maxAmount: this.state.price.upper,
        tempmYarray: [0, 1000],
        tempmYarray2: [0, 1000],
        attributes: []
      });

      this.setState(
        {
          selectedTab: c,
          applyFilter: false,
          tempApply: false,
          filterFeatured: false,
          type: 'latest',
          sortOrder: 'Newest',
          filterOnSale: false,
          page: 1,
          selectedAttributes: [],
          queryAttributes: '',
          products: [],
          minAmount: this.state.price.lower,
          maxAmount: this.state.price.upper,
          filters: false,
          on_sale: false,
          attributes: [],
          saleTemp: true,
          featuredTemp: true,
          tempmYarray: [0, 1000],
          tempmYarray2: [0, 1000],
          selected: 'key0'
        },
        () => {
          this.getFilterdProducts();
        }
      );
    } else {
      this.props.navigation.setParams({
        minAmount: this.state.price.lower,
        maxAmount: this.state.price.upper,
        tempmYarray: [0, 1000],
        tempmYarray2: [0, 1000],
        attributes: []
      });
      this.setState(
        {
          selectedTab: c.id,
          applyFilter: false,
          tempApply: false,
          filterFeatured: false,
          type: 'latest',
          sortOrder: 'Newest',
          filterOnSale: false,
          page: 1,
          products: [],
          selectedAttributes: [],
          queryAttributes: '',
          minAmount: this.state.price.lower,
          maxAmount: this.state.price.upper,
          attributes: [],
          filters: false,
          on_sale: false,
          saleTemp: true,
          featuredTemp: true,
          tempmYarray: [0, 1000],
          tempmYarray2: [0, 1000],
          selected: 'key0'
        },
        () => {
          this.getFilterdProducts();
        }
      );
    }
  }

  applyFilters(condition) {
    this.props.navigation.closeDrawer();
    if (condition === 'sale') {
      this.setState(
        {
          applyFilter: true,
          page: 1,
          wrapperConditionDrawer: false,
          filterOnSale: !!this.state.saleTemp,
          saleTemp: !this.state.saleTemp,
          tempApply: false
        },
        () => {
          this.state.tempmYarray[0] = this.state.price.lower;
          this.state.tempmYarray[1] = this.state.price.upper;
          this.getFilterdProducts();
        }
      );
    } else if (condition === 'featured') {
      this.setState(
        {
          applyFilter: true,
          page: 1,
          wrapperConditionDrawer: false,
          filterFeatured: !!this.state.featuredTemp,
          featuredTemp: !this.state.featuredTemp,
          tempApply: false
        },
        () => {
          this.state.tempmYarray[0] = this.state.price.lower;
          this.state.tempmYarray[1] = this.state.price.upper;
          this.getFilterdProducts();
        }
      );
    } else {
      this.setState(
        { applyFilter: true, page: 1, wrapperConditionDrawer: false },
        () => {
          this.state.tempmYarray[0] = this.state.price.lower;
          this.state.tempmYarray[1] = this.state.price.upper;
          this.getFilterdProducts();
        }
      );
    }
  }

  getSortProducts(value) {
    this.setState(
      {
        sortOrder: value,
        applyFilter: true,
        tempApply: false,
        page: 1,
        type: '',
        products: [],
        wrapperCondition: false,
        price: Object.create({
          lower: this.state.tempmYarray[0],
          upper: this.state.tempmYarray[1]
        })
      },
      () => {
        this.getFilterdProducts();
      }
    );
  }

  changeLayout = () => {
    if (this.state.productView === 'list') {
      this.setState({ productView: 'grid' }, () => {
        this.child.showAlert();
      });
    } else {
      this.setState({ productView: 'list' }, () => {
        this.child.showAlert();
      });
    }
  }

  //= ======================================================================================
  getAllAttributes() {
    let query = '';
    if (this.state.selectedTab !== '') {
      query = `${query}&cat_id=${this.state.selectedTab}`;
    }
    query += attributesGlobal;
    fetch(
      `${
        this.props.cartItems2.Config.url
      }/api/reactappsettings/react_get_attributes/?insecure=cool${query}`,
      {
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(data => {
        const myobject = data;
        if (
          myobject.attributes !== undefined &&
          myobject.attributes !== null &&
          myobject.attributes !== ''
        ) {
          for (let i = 0; i < myobject.attributes.length; i++) {
            for (
              let j = 0;
              j < myobject.attributes[i].attribute_terms.length;
              j++
            ) {
              if (this.state.attributes.length == 0) {
                console.log(
                  (myobject.attributes[i].attribute_terms[j].value = false)
                );
              } else if (!this.state.attributes[i].attribute_terms[j].value) {
                // console.log('ok');
                console.log(
                  (myobject.attributes[i].attribute_terms[j].value = false)
                );
              } else {
                console.log(
                  (myobject.attributes[i].attribute_terms[j].value = true)
                );
              }
            }
          }

          if (!this.state.applyFilter) {
            this.state.tempmYarray[0] = data.min_price;
            this.state.tempmYarray[1] = data.max_price;
          }

          this.props.navigation.setParams({
            minAmount:
              this.state.minAmount != data.min_price
                ? data.min_price
                : this.state.minAmount,
            maxAmount:
              this.state.maxAmount != data.max_price
                ? data.max_price
                : this.state.maxAmount,
            tempmYarray: this.state.tempmYarray,
            on_sale: data.on_sale,
            featured: data.featured,
            attributes: data.attributes ? myobject.attributes : []
          });

          this.setState({
            on_sale: data.on_sale,
            featured: data.featured,
            attributes: data.attributes ? myobject.attributes : [],
            minAmount:
              this.state.minAmount != data.min_price
                ? data.min_price
                : this.state.minAmount,
            maxAmount:
              this.state.maxAmount != data.max_price
                ? data.max_price
                : this.state.maxAmount,
            price:
              this.state.minAmount > this.state.price.lower ||
              this.state.maxAmount < this.state.price.upper
                ? Object.create({
                  lower: data.min_price,
                  upper: data.max_price
                })
                : this.state.applyFilter == false
                  ? Object.create({
                    lower: this.state.minAmount,
                    upper: this.state.maxAmount
                  })
                  : this.state.price
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  //= ======================================================================================
  selectAttribute(a, v) {
    let found = false;
    this.state.selectedAttributes.forEach((x, index) => {
      if (x.slug == a.attribute_slug) {
        found = true;
        if (v.value == false) {
          x.list.forEach((y, ind) => {
            if (y == v.name) {
              x.list.splice(ind, 1);
            }
          });
        } else {
          let valueFound = false;
          x.list.forEach((y, ind) => {
            if (y == v.name) {
              valueFound = true;
              x.list.splice(ind, 1);
            }
          });
          if (valueFound == false) {
            x.list.push(v.name);
          }
        }
      }

      if (x.list.length == 0) {
        this.state.selectedAttributes.splice(index, 1);
      }
    });

    if (found == false) {
      this.state.selectedAttributes.push({
        slug: a.attribute_slug,
        list: [v.name]
      });
    }
    let temp = '';
    for (const x of this.state.selectedAttributes) {
      temp = `${temp}&${x.slug}=`;
      for (const y of x.list) {
        temp = `${temp + y},`;
      }
    }
    attributesGlobal = temp;
    this.applyFilters('');
  }
  //= ======================================================================================
  checkAttributeSelected(a, v) {
    this.setState({ tempApply: false }, () => {
      const v1 = attributesGlobal.indexOf(a.attribute_slug);
      const v2 = attributesGlobal.indexOf(v.name);
      if (v1 != -1 && v2 != -1) {
        v.value = false;
      } else {
        v.value = true;
      }
      this.selectAttribute(a, v);
    });
  }
  getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({ orientation: 'portrait' });
    } else {
      this.setState({ orientation: 'landscape' });
    }
  }
  /// //////////////////////////////
  singaleRow(placeholderText, name) {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          padding: 6,
          flexDirection: 'row'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (name === 'sale') {
              this.applyFilters(name);
            } else if (name === 'featured') {
              this.applyFilters(name);
            }
          }}
        >
          <View
            style={{
              justifyContent: 'space-around',
              padding: 3,
              flexDirection: 'row'
            }}
          >
            {name === 'sale' ? (
              <Icon
                name={
                  !this.state.saleTemp ? 'radio-button-on' : 'radio-button-off'
                }
                style={{
                  color: themeStyle.primary,
                  fontSize: 22,
                  paddingRight: 20
                }}
              />
            ) : (
              <Icon
                name={
                  !this.state.featuredTemp
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                style={{
                  color: themeStyle.primary,
                  fontSize: 22,
                  paddingRight: 20
                }}
              />
            )}
            <Text
              style={{
                paddingRight: 5,
                fontSize: themeStyle.mediumSize,
                paddingTop: 2
              }}
            >
              {placeholderText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  /// /////////////////////////////
  singaleRow2(a, v) {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          padding: 6,
          flexDirection: 'row'
          // flex: 1
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.checkAttributeSelected(a, v);
          }}
        >
          <View
            style={{
              justifyContent: 'space-around',
              padding: 3,
              flexDirection: 'row'
            }}
          >
            <Icon
              name={v.value ? 'radio-button-on' : 'radio-button-off'}
              style={{ color: '#51688F', fontSize: 22, paddingRight: 20 }}
            />
            <Text
              style={{
                paddingRight: 5,
                fontSize: themeStyle.mediumSize,
                paddingTop: 2
              }}
            >
              {v.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const BUTTONS = [this.props.cartItems2.Config.languageJson.Newest, this.props.cartItems2.Config.languageJson['A - Z'],
    this.props.cartItems2.Config.languageJson['Z - A'], 'Cancel'];
    return this.state.activityIndicatorTemp ? (
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}
      >
        <UIActivityIndicator
          size={27}
          color={themeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'flex-start',
            flex: 1,
            backgroundColor: '#fff'
          }}
        >

          {/* //////////////DRawer///////// */}
          {/* ///////////////////////////////////////////////////////////////// */}
          <View style={{ height: 45, width: WIDTH, marginBottom: 3 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.props.cartItems2.cartItems.allCategories}
              extraData={this.state}
              horizontal
              style={{
                borderColor: '#000',
                backgroundColor: '#f2f2f2',
                elevation: 5,
                shadowOffset: { width: 5, height: 6 },
                shadowColor: 'black',
                shadowOpacity: 0.9
              }}
              ListHeaderComponent={
                this.props.cartItems2.cartItems.allCategories !== null ? (
                  <TouchableOpacity
                    disabled={this.state.selectedTab === '' || this.state.selectedTab === undefined}
                    onPress={() => this.changeTab('')}
                    style={{ borderBottomColor:
                      this.state.selectedTab === '' || this.state.selectedTab === undefined
                        ? themeStyle.primary
                        : 'black', 
                         borderBottomWidth:
                        this.state.selectedTab === '' || this.state.selectedTab === undefined
                          ? 2
                          : 0 }}
                  >
                    <Text
                      style={{
                        // textDecorationLine:
                        //   this.state.selectedTab === '' || this.state.selectedTab === undefined ? 'underline' : 'none',
                        padding: 12,
                        paddingLeft: 16,
                        paddingRight: 16,
                        // paddingTop: 13,
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        fontWeight: '400',
                        color:
                          this.state.selectedTab === '' || this.state.selectedTab === undefined
                            ? themeStyle.primary
                            : '#4E4E4E'
                      }}
                    >
                      {this.props.cartItems2.Config.languageJson.All}
                    </Text>
                  </TouchableOpacity>
                ) : null
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => (
                <TouchableOpacity
                  disabled={this.state.selectedTab === item.item.id}
                  onPress={() => this.changeTab(item.item)}
                  style={{ borderBottomColor:
                    this.state.selectedTab === item.item.id
                    ? themeStyle.primary
                    : 'black',
                       borderBottomWidth:
                       this.state.selectedTab === item.item.id
                       ? 2
                        : 0 }}
                >
                  <Text
                    style={{
                      padding: 12,
                      paddingLeft: 16,
                      paddingRight: 16,
                      fontWeight: '400',
                      fontFamily: 'Roboto',
                      fontSize: 14,
                      color:
                        this.state.selectedTab === item.item.id
                          ? themeStyle.primary
                          : '#4E4E4E'
                    }}
                  >
                    {item.item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View>
            <FlatListViewShop
              dataSource={this.state.products}
              products={this.props.cartItems2.Config.languageJson.Products}
              allCategories={this.props.cartItems2.cartItems.allCategories}
              props={this.props}
              state={this.state}
              onRef={ref => (this.child = ref)}
              page={this.state.page}
              functionPropNameHere={() => this.getFilterdProducts()}
              sortArray={this.state.sortArray}
              productView={this.state.productView}
              applyFilter={this.state.tempApply}
            />
          </View>
          {/* /////////////////products///////////////////////// */}
        </View>
        <View
          style={{
            borderColor: '#fff',
            alignItems: 'center',
            height: 44,
            backgroundColor: '#f2f2f2',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            shadowOffset: { width: 1, height: -1 },
            shadowColor: 'black',
            shadowOpacity: 0.3,
            elevation: 3
          }}
        >
          <View style={{ backgroundColor: '#f2f2f2' }}>
            <Text
              style={{
                fontSize: 11,
                paddingBottom: 0,
                paddingLeft: Platform.OS === 'ios' ? 2 : 7,
                paddingRight: Platform.OS === 'ios' ? 2 : 13,
                color: '#000',
                textAlign:
                  Platform.OS === 'ios'
                    ? 'left'
                    : !I18nManager.isRTL
                      ? 'left'
                      : 'right'
              }}
            >
              {this.props.cartItems2.Config.languageJson['Sort Products']}
            </Text>
            <View>
              {Platform.OS === 'android' ? (
                <View style={{ flexDirection: 'row' }}>
                  <Picker
                    note
                    mode='dropdown'
                    style={{
                      color: themeStyle.otherBtnsColor,
                      paddingLeft: 1,
                      width: 75,
                      height: 28,
                      backgroundColor: '#f2f2f2'
                    }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label='Newest' value='key0' />
                    <Picker.Item label='A - Z' value='key1' />
                    <Picker.Item label='Z - A' value='key2' />
                  </Picker>
                  <View>
                    <Icon
                      name={'md-arrow-up'}
                      style={{
                        color: themeStyle.otherBtnsColor,
                        fontSize: 19,
                        paddingTop: 4
                      }}
                    />
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={{ paddingTop: 2, paddingLeft: 3, width: 100 }}
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX
                      },
                      buttonIndex => {
                        if (buttonIndex === 0) {
                          this.getSortProducts('Newest');
                        } else if (buttonIndex === 1) {
                          this.getSortProducts('A - Z');
                        } else if (buttonIndex === 2) {
                          this.getSortProducts('Z - A');
                        } else if (buttonIndex === 3) {
                          this.setState({ clicked: BUTTONS[buttonIndex] });
                        }
                      }
                    )
                  }
                >
                  <View
                    style={{
                      borderColor: 'transparent',
                      width: 100,
                      backgroundColor: 'transparent',
                      flexDirection: 'row'
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        color: themeStyle.otherBtnsColor,
                        fontSize: 16
                      }}
                    >
                      {this.state.sortOrder === 'A - Z'
                        ? this.props.cartItems2.Config.languageJson['A - Z']
                        : this.state.sortOrder === 'Z - A'
                          ? this.props.cartItems2.Config.languageJson['Z - A']
                          : this.props.cartItems2.Config.languageJson.Newest}
                    </Text>
                    <View>
                      <Icon
                        name={'md-arrow-up'}
                        style={{
                          color: themeStyle.otherBtnsColor,
                          marginLeft: 5,
                          fontSize: 19
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{
              borderColor: '#fff',
              alignItems: 'center',
              height: 44,
              backgroundColor: '#f2f2f2',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity onPress={() => this.changeLayout()}>
              <Icon
                name={this.state.productView === 'grid' ? 'md-list' : 'md-apps'}
                size={10}
                style={{ color: '#000', marginRight: 15 }}
              />
            </TouchableOpacity>

            {this.state.applyFilter ? (
              <TouchableOpacity onPress={() => this.resetFilters()}>
                <Icon
                  name={'md-refresh'}
                  size={10}
                  style={{ color: '#000', marginRight: 15 }}
                />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={
                () => this.props.navigation.openDrawer()
                // this.setState({ wrapperConditionDrawer: true
                //  })
              }
            >
              <Icon
                name={'md-funnel'}
                size={10}
                style={{ color: '#000', marginRight: 9 }}
              />
            </TouchableOpacity>
          </View>
        </View>
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
)(withNavigation(Newest));
/// /////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.backgroundColor
  }
});
