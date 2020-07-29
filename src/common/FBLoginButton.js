/* eslint-disable import/imports-first */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */

import React, { Component } from 'react';
import { View, Button, Dimensions } from 'react-native';
import { connect } from 'react-redux';
WIDTH = Dimensions.get('window').width;
const FBSDK = require('react-native-fbsdk');

const { LoginManager, AccessToken } = FBSDK;
import theme from './Theme.style';
class FBLoginButton extends Component {
  ok(NAV, im, h) {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        console.log(result);
        if (result.isCancelled) {
          console.log('cancelled');
          // eslint-disable-next-line no-undef
          alert('Login was cancelled');
        } else {
          console.log('successful');
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data);
            this.props.parentReference(data.accessToken, 'fb', h);
          });
          h._storeDatafb1();
          im.LoginValueChange();
        }
      },
      error => {
        console.log('Login failed with error');
        console.log(error);
        // eslint-disable-next-line no-undef
        alert(`Login failed with error:${error}`);
      }
    );
  }
  _storeDatafb1() {
    try {
      console.log('_storeData fb 1');
    } catch (error) {}
  }
  render() {
    return (
      <View  style={{width: WIDTH * 0.9}}>
        <Button
          title={this.props.LoginValue.Config.languageJson['Login with facebook']}
          color={theme.facebook}
          onPress={() => this.ok(this.props.NAV, this.props, this)}
        
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
    LoginValue: state
  });
const mapDispatchToProps = dispatch => ({
    LoginValueChange: () => dispatch({ type: 'Login', fb1: '1' })
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FBLoginButton);
