
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
            source={require('../images/IntroImages/intro_bg_img.png')}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flex: 40 }}>
                <Image
                  style={{
                    height: Height * 0.5,
                    width: WIDTH * 0.62,
                    marginTop: 30
                  }}
                  resizeMode={'contain'}
                  source={require('../images/IntroImages/slide_1.png')}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 60
                }}
              >
                <Icon name='home' style={styles.iconStyleSize} />
                <Text style={styles.header}>Home Page</Text>
                <Text style={styles.text}>
                This is the main welcome page where different sections of your app will show up partially like some of the categories, offers and discounts etc.
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Second screen */}
          <ImageBackground
            style={{ width: WIDTH, flex: 1 }}
            source={require('../images/IntroImages/intro_bg_img.png')}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 40 }}>
                <Image
                    style={{
                    height: Height * 0.5,
                    width: WIDTH * 0.62,
                    marginTop: 30
                  }}
                  resizeMode={'contain'}
                  source={require('../images/IntroImages/slide_2.png')}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 60
                }}
              >
                <Icon name='apps' style={styles.iconStyleSize} />
                <Text style={styles.header}>Category Page</Text>
                <Text style={styles.text}>
                This page is supposed to exhibit all the categories that you deal in. this would help the visitors sort their search and make it really quick. 
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Third screen */}
          <ImageBackground
            style={{ width: WIDTH, flex: 1 }}
            source={require('../images/IntroImages/intro_bg_img.png')}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 40 }}>
                <Image
                    style={{
                    height: Height * 0.5,
                    width: WIDTH * 0.62,
                    marginTop: 30
                  }}
                  resizeMode={'contain'}
                  source={require('../images/IntroImages/slide_3.png')}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 60
                }}
              >
                <Icon name='card' style={styles.iconStyleSize} />
                <Text style={styles.header}>Shop Page</Text>
                <Text style={styles.text}>
                This is how your main shop page will look to others. This would display your products that you sell online. 
                </Text>
              </View>
            </View>
          </ImageBackground>
          {/* Fourth screen */}
          <ImageBackground
            style={{ width: WIDTH, flex: 1 }}
            source={require('../images/IntroImages/intro_bg_img.png')}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 40 }}>
                <Image
                    style={{
                    height: Height * 0.5,
                    width: WIDTH * 0.62,
                    marginTop: 30
                  }}
                  resizeMode={'contain'}
                  source={require('../images/IntroImages/slide_4.png')}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 60
                }}
              >
                <Icon name='cart' style={styles.iconStyleSize} />
                <Text style={styles.header}>Cart Page</Text>
                <Text style={styles.text}>
                The cart page will show the list of all saved and shopped items. User can further add or remove any items of their choice here. 
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Fifth screen */}
          <ImageBackground
            style={{ width: WIDTH, flex: 1 }}
            source={require('../images/IntroImages/intro_bg_img.png')}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 40 }}>
                <Image
                    style={{
                    height: Height * 0.5,
                    width: WIDTH * 0.62,
                    marginTop: 30
                  }}
                  resizeMode={'contain'}
                  source={require('../images/IntroImages/slide_5.png')}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 60
                }}
              >
                <Icon name='list-box' style={styles.iconStyleSize} />
                <Text style={styles.header}>Order Page</Text>
                <Text style={styles.text}>
                The order page will come up with a filling form for the complete execution of order taking process.
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
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: themeStyle.largeSize + (WIDTH * 0.02),
    fontWeight: 'bold'
  },
  // Text below header
  text: {
    color: '#4d4d4d',
    fontFamily: 'Avenir',
    fontSize: themeStyle.mediumSize + (WIDTH * 0.001),
    textAlign: 'center',
    margin: 10
  }
});
