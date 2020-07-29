/* eslint-disable react/sort-comp */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable import/newline-after-import */

import React, {Component} from 'react'
import {CardStyleInterpolators} from 'react-navigation-stack'
import {View, FlatList, Platform} from 'react-native'
import {connect} from 'react-redux'
import NewsCard from '../common/NewsCard'
import ThemeStyle from '../common/Theme.style'
import {UIActivityIndicator} from 'react-native-indicators'
class RewardPoints extends Component {
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerRight: null,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
      headerTitleAlign: 'center',

      headerTintColor: ThemeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: ThemeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal',
      },
      headerForceInset: {top: 'never', vertical: 'never'},
    }
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['News List'],
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      page2: 1,
      posts: [],
    }
    this.getPosts()
  }
  getImagePost2 (post, index, length) {
    console.log(`${index} ${length}`)
    post.image = 'assets/placeholder.png'
    if (post._links['wp:featuredmedia']) {
      fetch(post._links['wp:featuredmedia'][0].href, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          post.image = data.source_url
          this.state.posts.push(post)
          this.setState({})
          console.log(post)
          if (index + 1 == length) {
            this.setState({})
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  //= ===========================================================================================
  // getting list of posts
  getPosts () {
    fetch(
      `${this.props.isLoading.Config.url}/wp-json/wp/v2/posts/?page=${this.state.page2}&categories=${this.props.navigation.state.params.data.id}&${this.props.isLoading.Config.productsArguments}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data != undefined || data != '') {
          if (data.length == undefined) {
            this.setState({refreshing: false})
          } else {
            data.forEach((value, index) => {
              this.getImagePost2(value, index, data.length)
            })
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  //= ===========================================================================================
  convertHtmlTag = htmlprice => {
    const str = htmlprice
    return str.replace(/<[^>]*>/g, '')
  }
  /// ///////////////////////////////////
  renderFooter = () => (
    <View
      style={{
        marginBottom: 30,
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
      }}>
      {this.state.refreshing && this.state.posts.length !== 0 ? (
        <View
          style={{
            marginTop: 30,
          }}>
          <UIActivityIndicator
            size={27}
            count={12}
            color={ThemeStyle.loadingIndicatorColor}
          />
        </View>
      ) : null}
    </View>
  )

  renderSeparator = () => (
    <View style={{height: 1, width: '100%', backgroundColor: '#ddd'}} />
  )
  openSubCategories = data => {
    console.log(data)
    this.props.navigation.navigate('NewsDetails', {
      data,
    })
  }
  temp = () => {
    this.setState({refreshing: true, page2: this.state.page2 + 1}, () => {
      this.getPosts()
    })
  }
  render () {
    console.log('render2')
    return this.state.posts.length === 0 ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <UIActivityIndicator
          size={27}
          style={{height: 20, marginTop: 30, alignSelf: 'center'}}
          color={ThemeStyle.loadingIndicatorColor}
        />
      </View>
    ) : (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <FlatList
          data={this.state.posts}
          tabLabel={{
            label: this.props.isLoading.Config.languageJson.newest,
          }}
          showsVerticalScrollIndicator={false}
          vertical
          listKey={'123'}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={item => (
            <NewsCard
              item={item.item}
              id={item.index}
              html={this.convertHtmlTag(item.item.content.rendered)}
              image={item.item.image === null ? '' : item.item.image}
              openSubCategories={(t, n) => this.openSubCategories(t, n)}
            />
          )}
          onEndReachedThreshold={10}
          ListFooterComponent={() => this.renderFooter()}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false
          }}
          onEndReached={() => {
            if (!this.onEndReachedCalledDuringMomentum) {
              this.temp()
              this.onEndReachedCalledDuringMomentum = true
            }
          }}
        />
      </View>
    )
  }
}
const mapStateToProps = state => ({
  isLoading: state,
})

export default connect(mapStateToProps, null)(RewardPoints)
