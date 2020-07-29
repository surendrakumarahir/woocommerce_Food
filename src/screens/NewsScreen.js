/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-shadow */
/* eslint-disable react/sort-comp */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/imports-first */
/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */

import React, {Component} from 'react'
import {CardStyleInterpolators} from 'react-navigation-stack'
import {
  StyleSheet, // CSS-like styles
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators'
import {connect} from 'react-redux'
// eslint-disable-next-line import/newline-after-import
import Banner from '../common/NewsBanner'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from 'react-native-underline-tabbar'
import NewsCard from '../common/NewsCard'
import CategoriesNews from '../common/CategoriesNews'
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import themeStyle from '../common/Theme.style'
const {width} = Dimensions.get('window')
class News extends Component {
  static navigationOptions = ({navigation}) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerRight: () => <ShoppingCartIcon navigation={navigation} />,
      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal',
      },
      headerForceInset: {top: 'never', vertical: 'never'},
      gestureEnabled: true,
    }
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson.News,
    })
  }
  constructor (props) {
    super(props)
    this.state = {
      page2: 1,
      newsBannerData: [],
      categories: [],
      page: 1,
      posts: [],
      refreshing: false,
      categories2: [],
    }
    this.getPosts()
    this.getData()
  }

  getData = () => {
    fetch(
      `${this.props.isLoading.Config.url}/wp-json/wp/v2/posts/?sticky=true&page=${this.state.page2}&${this.props.isLoading.Config.productsArguments}`,
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
              this.getImagePost(value, index, data.length)
            })
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  getImagePost (post, index, length) {
    post.image = 'assets/placeholder.png'
    if (post._links['wp:featuredmedia']) {
      fetch(post._links['wp:featuredmedia'][0].href, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          post.image = data.source_url
          this.state.newsBannerData.push(post)
          if (index + 1 == length) this.setState({})
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  getImagePost2 (post, index, length) {
    post.image = 'assets/placeholder.png'
    if (post._links['wp:featuredmedia']) {
      fetch(post._links['wp:featuredmedia'][0].href, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          post.image = data.source_url
          this.state.posts.push(post)
          this.setState({})
          if (index + 1 == length) {
            if (this.state.posts.length <= 10) {
              this.getCategories()
            }
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
      `${this.props.isLoading.Config.url}/wp-json/wp/v2/posts/?page=${this.state.page2}&${this.props.isLoading.Config.productsArguments}`,
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

  //= ======================================== tab newest categories ===============================================================================

  getCategories = () => {
    const data = {}
    data.language_id = this.props.isLoading.Config.langId
    data.page_number = this.state.page
    fetch(
      `${this.props.isLoading.Config.url}/wp-json/wp/v2/categories/?page=${this.state.page}&${this.props.isLoading.Config.productsArguments}`,
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
              this.state.categories2.push(Object.assign(value, {image: ''}))
            })
          }
          this.setState({page: this.state.page++})
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
  /// ////
  renderSeparator = () => (
    <View style={{height: 1, width: '100%', backgroundColor: '#ddd'}} />
  )

  openSubCategories = data => {
    this.props.navigation.navigate('NewsDetails', {
      data,
    })
  }
  openSubCategories2 = data => {
    this.props.navigation.navigate('newsList', {
      data,
    })
  }

  temp = () => {
    this.setState({refreshing: true, page2: this.state.page2 + 1}, () => {
      this.getPosts()
    })
  }

  //= ===========================================================================================
  getRandomPost () {
    const rand = this.state.posts[
      Math.floor(Math.random() * this.state.posts.length)
    ]
    console.log(rand)
    if (rand != undefined || rand != undefined) return rand
  }
  // <!-- 2.0 updates -->
  getRandomImage (post, index, length) {
    // try {
    this.state.categories.forEach((value, index) => {
      console.log(`${index} ${length}`)
      value.image = 'assets/placeholder.png'
      const rand = this.getRandomPost()
      if (rand._links['wp:featuredmedia']) {
        fetch(rand._links['wp:featuredmedia'][0].href, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(data => {
            value.image = data.source_url
            this.state.categories2.push(value)
            this.setState({})
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  }

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
            height: 20,
            marginTop: 25,
          }}>
          <UIActivityIndicator
            size={27}
            count={12}
            color={themeStyle.loadingIndicatorColor}
          />
        </View>
      ) : null}
    </View>
  )

  render () {
    return (
      /// ////////
      this.state.posts.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <UIActivityIndicator
            color={themeStyle.loadingIndicatorColor}
            size={27}
            style={{height: 20, marginTop: 30, alignSelf: 'center'}}
          />
        </View>
      ) : (
        <SafeAreaView
          style={{flex: 1, backgroundColor: themeStyle.backgroundColor}}>
          <View style={styles.container}>
            <Banner
              newsBannerData={this.state.newsBannerData}
              navigation={this.props.navigation}
              news={true}
            />
          </View>
          {/* Shop */}
          <View style={styles.container1}>
            <ScrollableTabView
              tabBarActiveTextColor={themeStyle.primaryDark}
              ref={tabView => {
                this.tabView = tabView
              }}
              renderTabBar={() => (
                <TabBar
                  style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                  underlineColor={themeStyle.primaryDark}
                  inactiveTextColor='#A9A9A9'
                  backgroundColor='#fff'
                  tabMargin={40}
                  tabBarStyle={{height: 48, marginTop: 0, paddingTop: 10}}
                  tabBarTextStyle={{fontSize: 18}}
                />
              )}>
              <FlatList
                data={this.state.posts}
                tabLabel={{
                  label: this.props.isLoading.Config.languageJson.newest,
                }}
                vertical
                listKey={'123'}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
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
                onEndReachedThreshold={0.8}
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
              {this.state.categories2.length === 0 ? (
                <View
                  tabLabel={{
                    label: this.props.isLoading.Config.languageJson.Categories,
                  }}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <UIActivityIndicator
                    color={themeStyle.loadingIndicatorColor}
                    size={27}
                    style={{height: 20, marginTop: 30, alignSelf: 'center'}}
                  />
                </View>
              ) : (
                <FlatList
                  data={this.state.categories2}
                  tabLabel={{
                    label: this.props.isLoading.Config.languageJson.Categories,
                  }}
                  showsVerticalScrollIndicator={false}
                  vertical
                  listKey={'abcdasd'}
                  extraData={this.state}
                  contentContainerStyle={{paddingLeft: width * 0.008}}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  renderItem={item => (
                    <CategoriesNews
                      item={item.item}
                      id={item.index}
                      posts2={this.state.posts}
                      posts={this.state.categories2}
                      image={item.item.image === null ? '' : item.item.image}
                      openSubCategories2={t => this.openSubCategories2(t)}
                    />
                  )}
                />
              )}
            </ScrollableTabView>
          </View>
        </SafeAreaView>
      )
    )
  }
}
const mapStateToProps = state => ({
  isLoading: state,
})

export default connect(mapStateToProps, null)(News)

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
})
