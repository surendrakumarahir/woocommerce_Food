
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */

/* eslint-disable max-len */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  // StatusBar
  Image,
  ImageBackground,
  View,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { Icon } from 'native-base';
import SyncStorage from 'sync-storage';
import Swiper from '../common/Swiper';
import themeStyle from '../common/Theme.style';
import { connect } from 'react-redux';
// eslint-disable-next-line no-undef
WIDTH = Dimensions.get('window').width;
// eslint-disable-next-line no-undef
Height = Dimensions.get('window').height;
// DrawerWidth = this.WIDTH * 0.61;
// // eslint-disable-next-line no-undef
// DrawerHeight = this.Height * 0.50;
 class Screen extends Component {
  static navigationOptions = () => ({
    headerShown: false,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      
    })
   constructor(props) {
    super(props);
    state = {};
 
  
  }
  async componentDidMount() {
    if (SyncStorage.get('showIntroPage') === undefined) {
      SyncStorage.set('showIntroPage', '0');
      this.props.saveDefaultCurrency();
    } else {
      this.props.navigation.navigate('App');
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor='#000' barStyle='light-content' hidden borderBottomWidth={0} />
        <Swiper navigation={this.props.navigation} type='intro'>
          {/* First screen */}
          <ImageBackground
            style={{ width: WIDTH, flex: 1 }}
            source={require('../images/texture.png')}
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.header}>Fresh fruit drink</Text>
              <View style={{ flex: 0.4 }}>
                <Image
                  style={{
                     height: Height * 5,
                     width: WIDTH * 0.8,
                    //marginTop: 30,
                    flex: 1,
                    resizeMode: 'contain',
                  }}
                  resizeMode={'contain'}
                  source={require('../images/IntroImages/slider1.png')}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 0.4
                }}
              >
                {/* <Icon name='home' style={styles.iconStyleSize} /> */}
                <Text style={styles.text}>
                This is the main welcome page where different sections of your
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Second screen */}
          <ImageBackground
            style={{ width: WIDTH, flex: 1 }}
            source={require('../images/texture.png')}
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.header}>Healthy Food</Text>
              <View style={{ flex: 0.4 }}>
                <Image
                  style={{
                     height: Height * 5,
                     width: WIDTH * 0.8,
                    //marginTop: 30,
                    flex: 1,
                    resizeMode: 'contain',
                  }}
                  resizeMode={'contain'}
                  source={require('../images/IntroImages/slider2.png')}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 0.4
                }}
              >
                {/* <Icon name='home' style={styles.iconStyleSize} /> */}
                <Text style={styles.text}>
                This is the main welcome page where different sections of your
                </Text>
              </View>
            </View>
          </ImageBackground>
          {/* Third screen */}
          <ImageBackground
            style={{ width: WIDTH, flex: 1 }}
            source={require('../images/texture.png')}
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.header}>Fast Deliver Services</Text>
              <View style={{ flex: 0.4 }}>
                <Image
                  style={{
                     height: Height * 5,
                     width: WIDTH * 0.8,
                    //marginTop: 30,
                    flex: 1,
                    resizeMode: 'contain',
                  }}
                  resizeMode={'contain'}
                  source={require('../images/IntroImages/delivery.png')}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 0.4
                }}
              >
                {/* <Icon name='home' style={styles.iconStyleSize} /> */}
                <Text style={styles.text}>
                This is the main welcome page where different sections of your
                </Text>
              </View>
            </View>
          </ImageBackground>
        </Swiper>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveDefaultCurrency: () => {
    dispatch({
      type: 'saveDefaultCurrency'
    });
  },
});
/// ///////////////////////////////////////////////

export default connect(
  null,
  mapDispatchToProps
)(Screen);
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen

    width: WIDTH,
    paddingTop: Platform.OS === 'ios' ? 80 : 50,
    backgroundColor: '#fff'
  },
  iconStyleSize: {
    fontSize: Height * 0.07,
    color: themeStyle.primaryDark
  },
  // Header styles
  header: {
    flex: 0.1,
    marginTop: WIDTH * 0.05,
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: themeStyle.largeSize + (WIDTH * 0.02),
    fontWeight: 'bold'
  },
  // Text below header
  text: {
    width: WIDTH * 0.80,
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: themeStyle.mediumSize + (WIDTH * 0.001),
    textAlign: 'center',
    margin: 10
  }
});
