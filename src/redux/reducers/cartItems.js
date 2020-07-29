/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/newline-after-import */
/* eslint-disable prefer-const */
/* eslint-disable one-var */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

/* eslint-disable default-case */
import SyncStorage from 'sync-storage';
import WooComFetch from '../../common/WooComFetch';
const initialState = {
  wishListProducts: [],
  recentViewedProducts: [],
  cartProductArray: [],
  cartquantity: 0,
  subTotal: [],
  totalSumPrice: 0,
  spinerTemp: false,
  indicatorTemp: false,
  spinnerArray: [],
  removerecentCondition: false,
  onScreen: false,
  couponArray: [],
  allCategories: [],
  categories: [],
  subCategories: [],
  sectionlist: []
};
/// /////////////////////////
removeHtmlEntites = value => {
  let multiple = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '&cent;': '¢',
    '&pound;': '£',
    '&yen;': '¥',
    '&euro;': '€',
    '&copy;': '©',
    '&reg;': '®',
    '&#160;': ' ',
    '&#60;': '<',
    '&#62;': '>',
    '&#38;': '&',
    '&#34;': '"',
    '&#39;': "'",
    '&#162;': '¢',
    '&#163;': '£',
    '&#165;': '¥',
    '&#8364;': '€',
    '&#169;': '©',
    '&#174;': '®'
  };
  for (let char in multiple) {
    let before = char;
    let after = multiple[char];
    let pattern = new RegExp(before, 'g');
    value = value.replace(pattern, after);
  }
  return value;
};
/// ////////////////////////////////////////////////////////////
getAllCategories = async (page, state) => {
  const data = await WooComFetch.getCategories(
    Object.create({
      lang: SyncStorage.get('languageCode'),
      currency: SyncStorage.get('currencyCode')
    }),
    page
  );
  console.log(data);
  let dat = data;
  for (let value of dat) {
    if (value.count !== 0) {
      value.name = this.removeHtmlEntites(value.name);
      state.allCategories.push(value);
      if (value.parent === 0) {
        state.categories.push(value);
      } else {
        state.subCategories.push(value);
      }
    }
  }
  if (dat.length === 0) {
    console.log('length is zeroooo');
  }
  if (state.categories === undefined || state.categories.length === 0) {
  } else {
    let CHILD = [];
    state.categories.map(key => {
      for (const value of state.allCategories) {
        if (value.parent == key.id) {
          CHILD.push(value);
        }
      }
      state.sectionlist.push({
        data: CHILD,
        parent: key
      });
      CHILD = [];
    });
  }
};
/// /////////////////////////////////////////////////////////////////

saveLocalDataIntoArrays = state => {
  state.cartProductArray = []; /// //////////////////////////////////////////////last change
  const val = SyncStorage.getAllKeys().includes('cartProducts');
  if (val != null) {
    let tempArray = SyncStorage.get('cartProducts');
    if (tempArray != null) {
      tempArray.map(row => {
        state.cartProductArray.push(row);
        this.cartTotalItems(state);
        this.productsTotal(state);
      });
    }
  }
};

/// /////////////////////////////////////////////////
removeWishList = (p, state) => {
  state.wishListProducts.forEach((value, index) => {
    if (value.id == p.id) {
      state.wishListProducts.splice(index, 1);
      SyncStorage.set('wishListProducts', state.wishListProducts);
    }
  });
};
addWishList = (p, state) => {
  state.wishListProducts.push(p);
  SyncStorage.set('wishListProducts', state.wishListProducts);
};
/// ////////////////////////////////////////////////

// adding into recent array products
addToRecent = (p, state) => {
  if (state.recentViewedProducts === undefined) {
    state.recentViewedProducts.push(p);
    SyncStorage.set('recentViewedProducts', state.recentViewedProducts);
  } else {
    let found = false;
    for (let value of state.recentViewedProducts) {
      if (value.id === p.id) {
        found = true;
      }
    }
    if (found === false) {
      state.recentViewedProducts.push(p);
      SyncStorage.set('recentViewedProducts', state.recentViewedProducts);
    }
  }
};
// removing from recent array products
removeRecent = (p, state) => {
  state.recentViewedProducts.forEach((value, index) => {
    if (value.id === p.id) {
      state.recentViewedProducts.splice(index, 1);
      SyncStorage.set('recentViewedProducts', state.recentViewedProducts);
    }
  });
};

/// /////////////////////////////////////////////////
convertHtmlTag = htmlprice => {
  let s = htmlprice;
  s = s.replace(/<del>/, '<s>');
  s = s.replace(/<\/del>/, '</s>');
  return s;
};
// adding into cart array products
/// /////////////
addToCart = (state, product, variation, quantity, metaData, t) => {
  if (!this.checkCart(state, product, quantity)) {
    return 0;
  }
  if (t.alreadyInCart(state, product, variation, quantity)) {
    return 0;
  }
  // eslint-disable-next-line vars-on-top
  let p = {};
  p.product = product;
  p.product_id = product.id;
  p.name = product.name;
  if (quantity == null) p.quantity = 1;
  else p.quantity = quantity;
  let seconds = new Date().getTime();
  p.cart_id = product.id + seconds;
  p.image = product.images[0].src;
  p.stock_quantity = product.stock_quantity;
  p.tax_class = product.tax_class;
  p.tax_status = product.tax_status;
  p.price = product.price;
  p.price_html = t.convertHtmlTag(product.price_html);
  p.subtotal = parseFloat(product.price) * Number(p.quantity);
  p.total = parseFloat(product.price) * Number(p.quantity);
  p.on_sale = product.on_sale;
  p.categories = product.categories;
  if (metaData != null) p.meta_data = metaData;
  p.sold_individually = product.sold_individually;
  if (product.type === 'variable' && variation != null) {
    p.variation_id = variation.id;
    p.price = parseFloat(variation.price) * Number(p.quantity);
    p.subtotal = parseFloat(variation.price) * Number(p.quantity);
    p.total = parseFloat(variation.price) * Number(p.quantity);
    p.name = variation.name;
    p.stock_quantity = variation.stock_quantity;
    p.tax_status = variation.tax_status;
    p.price_html = t.convertHtmlTag(variation.price_html);
    if (variation.images[0].src.indexOf('placeholder') === -1) {
      p.image = variation.images[0].src;
    }
  }
  state.cartProductArray.push(p);
  t.cartTotalItems(state);
  SyncStorage.set('cartProducts', state.cartProductArray);
};
/// //////////////////////
alreadyInCart = (state, p, vId, quantity) => {
  let count = 0;
  for (let value of state.cartProductArray) {
    if (p.type !== 'variable' && value.product_id === Number(p.id)) {
      count++;
      value.quantity = Number(value.quantity) + Number(quantity);
    } else if (
      value.product_id == Number(p.id) &&
      value.variation_id == Number(p.id)
    ) {
      count++;
      value.quantity = Number(value.quantity) + Number(quantity);
    }
  }
  this.cartTotalItems(state);
  this.productsTotal(state);
  SyncStorage.set('cartProducts', state.cartProductArray);
  if (count !== 0) return true;
  return false;
};

/// ////////////////////////
checkCart = (state, p, quantity) => {
  let name = null;
  let onlyOneAllowed = true;
  let quantityCheck = true;
  // check for only one item is allowed
  for (let value of state.cartProductArray) {
    if (value.sold_individually == true && p.id == value.product_id) {
      onlyOneAllowed = false;
      name = value.name;
    }
  }
  if (onlyOneAllowed === false) console.log("'Only One Item Allowed'");
  if (quantity == null) quantity = 1;

  if (p.stock_quantity == null || p.stock_quantity > quantity) {
    quantityCheck = true;
  } else if (p.stock_quantity < quantity) {
    quantityCheck = false;
    console.log('Product Quantity is Limited!');
  }

  if (onlyOneAllowed && quantityCheck) return true;
  return false;
};

/// /////////////////////////////
// Function calcualte the total items of cart
cartTotalItems = state => {
  let total = 0;
  for (let value of state.cartProductArray) {
    total += Number(value.quantity);
  }
  state.cartquantity = total;
  return total;
};
/// ///////////////////////////////
productsTotal = state => {
  let total = 0;
  state.cartProductArray.map((val, key) => {
    // subTotal
    state.cartProductArray[key].subTotal = parseFloat(val.quantity * val.price);
    total += parseFloat(state.cartProductArray[key].subTotal);
  });
  state.totalSumPrice = parseFloat(total);
};
/// /////////////////////////////
const cartItems = (state = initialState, action) => {
  if (SyncStorage.get('recentViewedProducts')) {
    state.recentViewedProducts = SyncStorage.get('recentViewedProducts');
  }
  if (SyncStorage.get('wishListProducts')) {
    state.wishListProducts = SyncStorage.get('wishListProducts');
  }
  switch (action.type) {
    case 'GET_ALL_CATEGORIES':
      this.getAllCategories(1, state);

    return {
        ...state,
      }
    case 'SPLICE':
      state.cartProductArray.splice(action.index, 1);
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'CART_TOTAL_ITEMS':
      this.cartTotalItems(state);
    return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'PRODUCT_TOTAL':
      this.productsTotal(state);
    return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'UPDATE_PRODUCTS':
      state.cartProductArray = [action.product];
    return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'REMOVE_WISHLIST_PRODUCTS':
      this.removeWishList(action.product, state);
    return {
        ...state,
      }
      /// /////////////////////////////////////////////////

    case 'ADD_WISHLIST_PRODUCTS':
      this.addWishList(action.product, state);
    return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'REMOVE_RECENT':
      this.removeRecent(action.product, state);
    return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'ADD_RECENT':
      this.addToRecent(action.product, state);
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'SAVE_LOCAL_DATA_INTO_ARRAYS':
      this.saveLocalDataIntoArrays(state);
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'REMOVE_SPINNER':
      state.spinnerArray.map((val, key) => {
        state.spinnerArray[key] = null;
      });
      state.spinnerArray = [];
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'MY_SPINNER':
      state.spinnerArray[action.index1] = action.value;
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'SET_INDICATOR':
      state.indicatorTemp = action.value;
      state.onScreen = action.OnScreen;
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'SET_SPINNER':
      state.spinerTemp = action.value;
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'ADD_TO_CARTS':
      this.addToCart(
        state,
        action.product,
        action.variation,
        action.cartProductQuantity,
        action.metaData,
        this
      );
      this.productsTotal(state);
      SyncStorage.set('cartProducts', state.cartProductArray);
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'ADD_TO_CARTS_QUANTITY':
      state.cartProductArray.map((val, key) => {
        if (val.cart_id === action.product.cart_id) {
          state.cartProductArray[key].quantity++;
        }
      });

      this.cartTotalItems(state);
      this.productsTotal(state);
      SyncStorage.set('cartProducts', state.cartProductArray);
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'REMOVE_TO_CARTS_QUANTITY':
      state.cartProductArray.map((val, key) => {
        if (val.cart_id === action.product.cart_id) {
          state.cartProductArray[key].quantity--;
        }
      });

      this.cartTotalItems(state);
      this.productsTotal(state);
      SyncStorage.set('cartProducts', state.cartProductArray);
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
    case 'REMOVE_CARD_FROM_CART':
      state.cartProductArray = state.cartProductArray.filter(
        cartItem => cartItem.cart_id !== action.product.cart_id
      );

      this.cartTotalItems(state);
      this.productsTotal(state);
      SyncStorage.set('cartProducts', state.cartProductArray);
      return {
        ...state,
      }
    /// /////////////////////////////////////////////////
  }
  return state;
};

export default cartItems;
