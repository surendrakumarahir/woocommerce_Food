/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable brace-style */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import SyncStorage from 'sync-storage';
import InAppBrowser from 'react-native-inappbrowser-reborn';
  const shared = {
    orderComplete() {
      this.cartProducts = [];
      this.couponArray = [];
      this.storage.set('cartProducts', []);
      this.shipping_lines = [];
      this.cartTotalItems();
    },
    // <!-- 2.0 updates -->
    onePageCheckOut(globalObject) {
  console.log('onePageCheckOut');
      let customer_id = 0;
      let token = null;
      let biling = this.billing;
      let shiping = this.shipping;
  
      if (SyncStorage.get('customerData').id != null) {
        customer_id = SyncStorage.get('customerData').id;
        token = SyncStorage.get('customerData').cookie;
        biling = SyncStorage.get('customerData').billing;
        shiping = SyncStorage.get('customerData').shipping;
      }
      let onePage = globalObject.Config.checkOutPage;
      var data = {
        token: token,
        billing_info: biling,
        shipping_info: shiping,
        products: this.getProducts(globalObject),
        coupons: this.getCoupons(globalObject),
        customer_note: '',
        customer_id,
        one_page: onePage,
        platform: '',
      };
      console.log(data);
    fetch(
      `${
        globalObject.Config.url
      }/api/reactappsettings/react_data_link/?insecure=cool`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      
      }
    )
      .then(res => res.json())
      .then((id) => {
        console.log(`id2 ${id}`);
      })
      .catch(error => {
        console.log(error);
      });
    },
  
    //=================================================================================================================================
    // <!-- 2.0 updates -->
    getProducts(globalObject) {
      var data = [];
      for (let v of globalObject.cartItems.cartProductArray) {
        var obj = { quantity: v.quantity, product_id: v.product_id, total: v.total.toString() };
        if (v.variation_id) Object.assign(obj, { variation_id: v.variation_id });
        data.push(obj);
      }
      return data;
    },
    //=================================================================================================================================
    // <!-- 2.0 updates -->
    getCoupons(globalObject) {
      var data = [];
      for (let v of globalObject.cartItems.couponArray) {
        data.push({ code: v.code, discount: v.amount });
      }
      return data;
    },
    //=================================================================================================================================
    // <!-- 2.0 updates -->
    getShippingLines() {
      var data = [];
      for (let v of this.shipping_lines) {
        data.push({ code: v.code, discount: v.amount });
      }
      return data;
    },
    resetData() {
      this.billing = {
        first_name: '',
        last_name: '',
        company: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        email: '',
        phone: ''
      };
      this.billingCountryName = '';
      this.billingStateName = '';
      this.shipping = {
        first_name: '',
        last_name: '',
        company: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: ''
      };
      this.shippingCountryName = '';
      this.shippingStateName = '';
    },
    async openLink(globalObject, id) {
      try {
        console.log(`${globalObject.Config.url}/react-mobile-checkout/?order_id=${id}`);
        const url = `${globalObject.Config.url}/react-mobile-checkout/?order_id=${id}`;
        if (await InAppBrowser.isAvailable()) {
          const result = await InAppBrowser.open(url, {
            dismissButtonStyle: 'cancel',
            preferredBarTintColor: '#51688F',
            preferredControlTintColor: 'white',
            readerMode: true,
             modalPresentationStyle: 'overFullScreen',
            modalEnabled: true,
            modalTransitionStyle: 'crossDissolve',
            showTitle: false,
            toolbarColor: '#6200EE',
            secondaryToolbarColor: 'black',
            enableUrlBarHiding: true,
            enableDefaultShare: true,
            forceCloseOnRedirection: false,
            headers: {
              'my-custom-header': 'my custom header value'
            }
          });
          console.log(result);
          alert(result);
        }
        else Linking.openURL(url);
      } catch (error) {
        alert(error.message);
      }
    },
    uploadDataToServer(globalObject, data) {
      console.log(data);
      console.log(globalObject.Config.url);
      fetch(
        `${
          globalObject.Config.url
        }/api/reactappsettings/react_data_link/?insecure=cool`,
        {
          method: 'POST',
          body: JSON.stringify(data)
        
        }
      )
        .then(res => res.json())
        .then((id) => id
        )
        .catch(error => {
          console.log(error);
        });
    },
    //=================================================================================================================================
    checkAvatar() {
      let result = '';
      if (SyncStorage.get('customerData').avatar_url.indexOf('693fe9695abfa1fd64191cdd36fdc310') != -1) {
        result = 'avatar';
      }
      else if (SyncStorage.get('customerData').avatar_url.indexOf('693fe9695abfa1fd64191cdd36fdc310') == -1) {
        result = 'image';
      }
      return result;
    },
    getNameFirstLetter() {
      return SyncStorage.get('customerData').first_name.charAt(0);
    }

};
export default shared;
