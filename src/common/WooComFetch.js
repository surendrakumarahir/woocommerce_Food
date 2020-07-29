/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */
/* eslint-disable object-shorthand */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */

import WooCommerceAPI from 'react-native-woocommerce-api';
import theme from './Theme.style';
const WooAPI = new WooCommerceAPI({
  //url: theme.url.startsWith('https') ? theme.url : theme.url.replace('http', 'http'),
  url: theme.url,
  ssl: true,
  consumerKey: theme.consumerKey, // Your consumer secret
  consumerSecret: theme.consumerSecret, // Your consumer secret
  wp_api: true,
  version: 'wc/v2', // WooCommerce WP REST API version
  queryStringAuth: true
});

const WooAPIforBanners = new WooCommerceAPI({
  //url: `${theme.url.startsWith('https') ? theme.url : theme.url.replace('http', 'http')}/api/reactappsettings/react_get_all_banners/?insecure=cool`, // Your store URL
  url: `${ theme.url}/api/reactappsettings/react_get_all_banners/?insecure=cool`, // Your store URL
 
  ssl: true,
  consumerKey: theme.consumerKey, // Your consumer secret
  consumerSecret: theme.consumerSecret, // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v2', // WooCommerce WP REST API version
  queryStringAuth: true
});
const WooComFetch = {
  getAllBanners: async () => {
    try {
      const response = await WooAPIforBanners.get();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getProducts: async productsArguments => {
    try {
      const response = await WooAPI.get('products/', {
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getOnSaleProducts: async productsArguments => {
    try {
      const response = await WooAPI.get('products/', {
        on_sale: true,
        status: 'publish',
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getFeaturedProducts: async productsArguments => {
    try {
      const response = await WooAPI.get('products/', {
        featured: true,
        status: 'publish',
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getReleatedProducts: async (relatedIdsArray, productsArguments) => {
    try {
      const response = await WooAPI.get('products/', {
        include: relatedIdsArray,
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getVariableProducts: async (id, productsArguments) => {
    try {
      const response = await WooAPI.get(`products/${id}`, {
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getOneProduct: async (id, productsArguments) => {
    try {
      const response = await WooAPI.get('products/', {
        lang: productsArguments.lang,
        currency: productsArguments.currency,
        slug: id
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getCustomerData: async (id, productsArguments) => {
    try {
      console.log(id + productsArguments);
      console.log(productsArguments);
      const response = await WooAPI.get(`customers/${id}`, {
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  UpdateCustomerData: async (id, object, productsArguments) => {
    try {
      const response = await WooAPI.post(`customers/${id}`, object);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getCoupon: async code => {
    try {
      const response = await WooAPI.get('coupons/', {
        code
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getShippingZone: async productsArguments => {
    try {
      const response = await WooAPI.get('shipping/zones/', {
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getShippingZoneLocations: async (id, productsArguments) => {
    try {
      const response = await WooAPI.get(`shipping/zones/${id}/locations`, {
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getShippingZoneLocationsMethods: async (id, productsArguments) => {
    try {
      const response = await WooAPI.get(`shipping/zones/${id}/methods`, {
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getPaymentGateways: async productsArguments => {
    try {
      const response = await WooAPI.get('payment_gateways', {
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getCategories: async (productsArguments, page) => {
    try {
      const response = await WooAPI.get('products/categories', {
        lang: productsArguments.lang,
        currency: productsArguments.currency,
        per_page: 50,
        page
      });
      console.log('get all categories', response);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getSortProducts: async (productsArguments, inc, Order, OrderBY) => {
    try {
      const response = await WooAPI.get('products/', {
        lang: productsArguments.lang,
        currency: productsArguments.currency,
        status: 'publish',
        include: inc,
        order: Order,
        orderby: OrderBY
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  updateShippingAddress: async (id, object) => {
    try {
      console.log(id);
      console.log(object);
      const response = await WooAPI.post(`customers/${id}`, object);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getOrders: async (productsArguments, page, customerid) => {
    try {
      const response = await WooAPI.get('orders/', {
        lang: productsArguments.lang,
        currency: productsArguments.currency,
        page: page,
        customer: customerid
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  cancelOrder: async (id, object) => {
    try {
      const response = await WooAPI.put(`orders/${id}`, object);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getDownloads: async (productsArguments, id) => {
    try {
      const response = await WooAPI.get(`customers/${id}/downloads`, {
        lang: productsArguments.lang,
        currency: productsArguments.currency
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getSearchData: async (productsArguments, page, searchText) => {
    try {
      const response = await WooAPI.get('products/', {
        lang: productsArguments.lang,
        currency: productsArguments.currency,
        per_page: page,
        search: searchText,
        status: 'publish'
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getVendorProducts: async relatedIdsArray => {
    try {
      const response = await WooAPI.get('products/', {
        include: relatedIdsArray,
        status: 'publish'
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getProductsRating: async (id) => {
    try {
      const response = await WooAPI.get(`products/${id}/reviews?`, {
        lang: 'en',
        currency: 'USD'
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getProductsAll: async (productsArguments, page, category) => {
    try {
      const response = await WooAPI.get('products/', {
        lang: productsArguments.lang,
        currency: productsArguments.currency,
        page: page,
        category: category,
        status: 'publish'
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};
export default WooComFetch;
