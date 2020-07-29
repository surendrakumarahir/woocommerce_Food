/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */
/* eslint-disable global-require */
/* eslint-disable semi */
/* eslint-disable no-unused-expressions */

import React, { Component } from 'react';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { View, FlatList, I18nManager, TouchableOpacity } from 'react-native';
import { Container, Content, ListItem, CheckBox, Text, Body } from 'native-base';
import SyncStorage from 'sync-storage';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import ImageLoad from '../common/RnImagePlaceH';
import themeStyle from '../common/Theme.style';
import ShoppingCartIcon from '../common/ShoppingCartIcon';
import MenuIcon from '../common/MenuIcon';
 class Language extends Component {
 
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam(
      'headerTitle'
    );
    return {
      headerTitle: headerStyle,
      headerLeft: () => <MenuIcon navigation={navigation} />,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
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
  };
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['Select Language']
    });
  }
  constructor(props) {
    super(props);
 
    this.state = {
  
      languageList: [
        { id: 0, name: 'English', code: 'en', image: require('../images/flags/english.png'), direction: 'ltr' },
        { id: 1, name: 'Arabic', code: 'ar', image: require('../images/flags/uae.png'), direction: 'rtl' }],
      temp: 0,
      tick: [],
    };
    this.state.languageList.forEach(val => {
      if (val.code === SyncStorage.get('languageCode')) {
        console.log(val);
        this.state.tick[val.id] = true;
      }
    });
  }
/////////////////////////////////////////////
updateLanguage(item) {
  if (SyncStorage.get('languageCode') !== item.code) {
    SyncStorage.set('languageCode', item.code);
    SyncStorage.set('languageDirection', item.direction);
    SyncStorage.set('wishListProducts', []);
    SyncStorage.set('recentViewedProducts', []);
    SyncStorage.set('cartProducts', []);
    this.state.tick = [];
    this.state.tick[item.id] = true;
    this.setState({ temp: 0 })
    if (item.code === 'ar') { I18nManager.forceRTL(true); } else { I18nManager.forceRTL(false); }
 
    setTimeout(() => {
      RNRestart.Restart();
    }, 200);
  }
}

  render() {
    return (
  <Container style={{ backgroundColor: themeStyle.backgroundColor }}>    
        <Content style={{ backgroundColor: themeStyle.backgroundColor }}>
        <FlatList
        style={{ backgroundColor: themeStyle.backgroundColor }}
        data={this.state.languageList}
        horizontal={false}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
        <View>
          <ListItem >
            <TouchableOpacity 
            onPress={() => this.updateLanguage(item.item)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
            >
          <ImageLoad
            key={0}
            style={{ width: 28, height: 28 }}
            loadingStyle={{ size: 'large', color: themeStyle.loadingIndicatorColor }}
            placeholder={false}
            ActivityIndicator={true}
            placeholderStyle={{width: 0, height: 0}}
            source={item.item.image}
          />
          <Body>
            <Text>{item.item.name}</Text>
          </Body>
          <CheckBox
           onPress={() => this.updateLanguage(item.item)}
           checked={!!(this.state.tick[item.item.id] ||
           SyncStorage.get('languageCode') === item.item.code)}
          />
          </TouchableOpacity>
        </ListItem>
        </View>
        )
         }
        />
        </Content>
        </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state
});


export default connect(
mapStateToProps,
null
)(Language);
