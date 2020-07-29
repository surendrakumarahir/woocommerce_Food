/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable import/newline-after-import */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  Dimensions,
  Platform,
  Text
} from 'react-native';
import { WebView } from 'react-native-webview';
import { CardStyleInterpolators } from 'react-navigation-stack';
import HTML from 'react-native-render-html';
import ImageLoad from '../common/RnImagePlaceH';
import { Icon } from 'native-base';
import themeStyle from '../common/Theme.style';
class NewDetail extends Component {
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
  // eslint-disable-next-line react/sort-comp
  componentDidMount() { 
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['News Details']
    });
  }
  render() {
    console.log(this.props.navigation.state.params.data);
    return Platform.OS === 'android' ? (
      <View style={styles.container}>
        <ScrollView>
          <ImageLoad
            key={this.props.navigation.state.params.data.id}
            style={{
              height: 380,
              width: Dimensions.get('window').width,
              overflow: 'hidden'
            }}
            loadingStyle={{ size: 'large', color: themeStyle.loadingIndicatorColor }}
            placeholder={false}
            ActivityIndicator={true}
            placeholderStyle={{width: 0, height: 0}}
            backgroundColor='transparent'
            color='transparent'
            source={{ uri: this.props.navigation.state.params.data.image }}
          />
          <View
            style={{
              marginTop: 0,
              marginLeft: 10,
              marginRight: 10,
              paddingRight: 10
            }}
          >
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: 'white'
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  margin: 5,
                  marginTop: 0,
                  color: '#000',
                  width: WIDTH * 0.7
                }}
              >
                {this.props.navigation.state.params.data.title.rendered}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name={'time'}
                  style={{
                    color: 'gray',
                    fontSize: 20,
                    paddingRight: 6,
                    paddingTop: 1,
                    paddingLeft: 5
                  }}
                />
                <Text
                  style={{
                    fontWeight: 'normal',
                    paddingBottom: 2,
                    color: '#51534f',
                    fontSize: 17
                  }}
                >
                  {this.props.navigation.state.params.data.date}
                </Text>
              </View>
            </View>

            <HTML
              onLinkPress={(event, href) => {
                Linking.openURL(href);
              }}
              html={this.props.navigation.state.params.data.content.rendered}
              imagesMaxWidth={Dimensions.get('window').width - 20}
              allowFontScaling
              imagesInitialDimensions={{ width: 100, height: 100 }}
              baseFontStyle={{ fontSize: 16, color: '#000' }}
            />
          </View>
        </ScrollView>
      </View>
    ) : (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: 'white'
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              margin: 5,
              marginTop: 0,
              color: '#000',
              width: WIDTH * 0.7
            }}
          >
            {this.props.navigation.state.params.data.title.rendered}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name={'time'}
              style={{
                color: 'gray',
                fontSize: 20,
                paddingRight: 6,
                paddingLeft: 5
              }}
            />
            <Text
              style={{
                fontWeight: 'normal',
                padding: 1,
                color: '#51534f',
                fontSize: 17
              }}
            >
              {this.props.navigation.state.params.data.date}
            </Text>
          </View>
        </View>
        <WebView
          originWhitelist={['*']}
          source={{
            html: this.props.navigation.state.params.data.content.rendered
          }}
          style={{ flex: 1, width: Dimensions.get('window').width }}
          scrollEnabled
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
)(NewDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
