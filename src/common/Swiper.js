/* eslint-disable import/imports-first */
/* eslint-disable react/sort-comp */
/* eslint-disable no-useless-constructor */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */

/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Swiper
 * Renders a swipable set of screens passed as children,
 * pagination indicators and a button to swipe through screens
 * or to get out of the flow when the last screen is reached
 */
import React, { Component } from 'react';
import {
  Dimensions, // Detects screen dimensions
  Platform, // Detects platform running the app
  ScrollView, // Handles navigation between screens
  StyleSheet, // CSS-like styles
  View, // Container component,
  I18nManager,
  TouchableOpacity,
  Text,
  StatusBar
} from 'react-native';
import themeStyle from './Theme.style';
import SyncStorage from 'sync-storage';
// Detect screen width and height
const { width, height } = Dimensions.get('window');
let condition = 1;
export default class OnboardingScreens extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#16a085',
      elevation: null
    }
  }
  constructor(props) {
    super(props);
    // setTimeout(() => {
    //   console.warn('okokokokok')
    //   this.swipe(this.props.navigation)
    // }, Math.floor(100 / 360000));
    //const timer = setInterval(() => {  console.warn('okokokokok'); this.tick()}, 4000);
  }
  condition = 1;
  // Props for ScrollView component
  static defaultProps = {
    // Arrange screens horizontally
    horizontal: true,
    // Scroll exactly to the next screen, instead of continous scrolling
    pagingEnabled: true,
    // Hide all scroll indicators
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    // Do not bounce when the end is reached
    bounces: false,
    // Do not scroll to top when the status bar is tapped
    scrollsToTop: false,
    // Remove offscreen child views
    removeClippedSubviews: true,
    // Do not adjust content behind nav-, tab- or toolbars automatically
    automaticallyAdjustContentInsets: false,
    // Fisrt is screen is active
    index: 0,
  }

  state = this.initState(this.props)
  /**
   * Initialize the state
   */
  // eslint-disable-next-line react/sort-comp
  initState(props) {
    // Get the total number of slides passed as children
    // eslint-disable-next-line one-var
    const total = props.children ? props.children.length || 1 : 0,
      // Current index
      // eslint-disable-next-line no-nested-ternary
      
      index =
        this.props.type === 'Home' ? total > 1 ? 0 : 0 : total > 1 ? Math.min(props.index, total - 1) : 0,
      // index = this.props.type === 'Home' ? total > 1 ? -1 : 0 :
      // total > 1 ? Math.min(props.index, total - 1) : 0,

      // index = total > 1 ? Math.min(props.index, total - 1) : 0
      // index = total > 1 ? -1 : 0,
      // Current offset
      offset = width * (index - 1);

    const state = {
      total,
      index,
      offset,
      width,
      height,
      timer: null,
      temp: -1
    };

    // Component internals as a class property,
    // and not state to avoid component re-renders when updated
    this.internals = {
      isScrolling: false,
      offset
    };

    return state;
  }

  // // UNSAFE_componentWillMount() {
  // //  // if (this.props.type === 'Home') {
  // //     setTimeout(() => {
  // //       console.warn('okokokokok')
  // //       this.swipe(this.props.navigation)
  // //     }, Math.floor(100 / 360000));
  // //   // const timer = setInterval(() => this.tick(), 2000);
  // //   console.log('componentDidMount ');
  // //  // this.setState({ timer });
  // //  // }
  // // }

  // componentWillUnmount() {
  //   // if (this.props.type === 'Home') {
  //   // clearInterval(this.state.timer);
  //   // console.log('componentWillUnmount ');
  //   // }
  // }

  // tick() {
  //   console.log('tick ');
  //   this.swipe(this.props.navigation);
  // }
  /**
   * Scroll begin handler
   * @param {object} e native event
   */
  onScrollBegin = () => {
    // Update internal isScrolling state
    this.internals.isScrolling = true;
  }

  /**
   * Scroll end handler
   * @param {object} e native event
   */
  onScrollEnd = e => {
    // Update internal isScrolling state
    this.internals.isScrolling = false;

    // Update index
    this.updateIndex(
      e.nativeEvent.contentOffset
        ? e.nativeEvent.contentOffset.x
        : // When scrolled with .scrollTo() on Android there is no contentOffset
        e.nativeEvent.position * this.state.width
    );
  }

  /*
   * Drag end handler
   * @param {object} e native event
   */
  onScrollEndDrag = e => {
    // eslint-disable-next-line one-var
    const {
        contentOffset: { x: newOffset }
      } = e.nativeEvent,
      { children } = this.props,
      { index } = this.state,
      { offset } = this.internals;

    // Update internal isScrolling state
    // if swiped right on the last slide
    // or left on the first one
    if (
      offset === newOffset &&
      ((index - 1) === 0 || (index - 1) === children.length - 1)
    ) {
      this.internals.isScrolling = false;
    }
  }

  /**
   * Update index after scroll
   * @param {object} offset content offset
   */
  updateIndex = offset => {
    const state = this.state,
    
      diff = offset - this.internals.offset,
      step = state.width;
    let index = (state.temp);
    // console.log('index3  '+ index);
    // Do nothing if offset didn't change
    if (!diff) {
      return;
    }

    // Make sure index is always an integer
    index = parseInt((index) + Math.round(diff / step), 10);
    // Update internal offset
    this.internals.offset = offset;
    // Update index in the state
    this.setState({
     temp: index,
     index
    });
  }

  /**
   * Swipe one slide forward
   */
  swipe = () => {
    // Ignore if already scrolling or if there is less than 2 slides
    if (this.internals.isScrolling || this.state.total < 2) {
      return;
    }

    const state = this.state,
      diff = (this.state.index) + 1,
      x = diff * state.width,
      y = 0;

    // Call scrollTo on scrollView component to perform the swipe
    this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

    // Update internal scroll state
    this.internals.isScrolling = true;

    // Trigger onScrollEnd manually on android
    if (Platform.OS === 'android') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        });
      });
    }
  }

  /**
   * Render ScrollView component
   * @param {array} slides to swipe through
   */
  renderScrollView = pages => (
    <ScrollView
      ref={component => {
        this.scrollView = component;
      }}
      {...this.props}
       contentContainerStyle={[styles.wrapper, this.props.style]}
      onScrollBeginDrag={this.onScrollBegin}
      onMomentumScrollEnd={this.onScrollEnd}
      onScrollEndDrag={this.onScrollEndDrag}
    >
      {pages.map((page, i) => (
        // Render each slide inside a View
        <View style={styles.slide} key={i}>
          {page}
        </View>
      ))}
    </ScrollView>
  )

  componentDidMount() {
    condition = 1;
  }

  /**
   * Render pagination indicators
   */
  renderPagination = () => {
    console.log('renderPagination');
    if (this.state.total <= 1) {
      return null;
    }

    const ActiveDot = (
        <View
        style={
            this.props.type === 'Home'
              ? [styles.dotHome, styles.activeDot]
              : [styles.dot, styles.activeDot]
          }
        />
      ),
      Dot = (
        <View
          style={this.props.type === 'Home' ? styles.dotHome : styles.dot}
        />
      );
    // let temp =0;
    const dots = [];
    // console.log('index  '+this.state.index);
    for (let key = 0; key < this.state.total; key++) {
      dots.push(
        key == this.state.index
          ? // Active dot
          React.cloneElement(ActiveDot, { key })
          : // Other dots
          React.cloneElement(Dot, { key })
      );
    }
    if (this.props.type === 'Home') {
       if (this.state.index !== 0) {
        condition = 0;
       }
      return (
        <View
        pointerEvents='none' style={{ flexDirection: (condition === 1 && (this.state.total - 1) !== this.state.index) ? 'row' : Platform.OS === 'android' ? I18nManager.isRTL ? 'row-reverse' : 'row' : 'row', 
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
        backgroundColor: '#000'
      }}
        >
          {dots}
        </View>
      );
    }

    return (
      <View
        pointerEvents='none'
        style={[styles.pagination, styles.fullScreen2]}
      >
        {dots}
      </View>
    );
  }
  FUN = nav => {
    console.log(nav);
    // clearInterval(this.state.timer);
    StatusBar.setBackgroundColor(themeStyle.StatusBarColor);
    StatusBar.setHidden(false);
    if (SyncStorage.get('showIntroPage') === '0') {
      nav.navigate('Home1Screen');
    } else {
      nav.navigate('App');
    }
    
    // nav.navigate('App');
    // this.swipe();
  }

  /**
   * Render Continue or Done button
   */
  renderButton = nav => {
    // this.state = this.initState(this.props);
    const lastScreen = (this.state.index) === this.state.total - 1;
    // eslint-disable-next-line no-const-assign

    // console.log(`return button last screen value ${lastScreen}`);
    if (lastScreen) {
      this.state = this.initState(this.props);
      // this.setState({index:0})
    }
    return (
      <View
        pointerEvents='box-none'
        style={[styles.buttonWrapper, styles.fullScreen2]}
      >
        {this.props.type === 'Home' ? null : lastScreen ? (
          // Show this button on the last screen
          // TODO: Add a handler that would send a user to your app after onboarding is complete
          <TouchableOpacity
          style={{ paddingTop: 5 }}
          onPress={() => this.FUN(nav)}
          >
          <View
          style={{
              alignItems: 'center',
              height: 38,
              width: 80,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              borderColor: '#557f5f',
              borderWidth: 2 
            }}
          >
          <Text
              style={{
                textAlign: 'center',
                color: '#557f5f',
                fontSize: 13,
                fontWeight: '500'
              
              }}
          >
              {'Start Now'}
            </Text>
        </View>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity
          style={{ paddingTop: 5 }}
          onPress={() => this.swipe(nav)}
          >
          <View
          style={{
              alignItems: 'center',
              height: 38,
              width: 80,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              borderColor: '#557f5f',
              borderWidth: 2 
            }}
          >
          <Text
              style={{
                textAlign: 'center',
                color: '#557f5f',
                fontSize: 13,
                fontWeight: '500'
                
              }}
          >
              {'Continue'}
            </Text>
        </View>
        </TouchableOpacity>
        )}
      </View>
    );
  }

  /**
   * Render the component
   */

  render = ({ children } = this.props) => (
    
    <View>
      {
        <View>
          {console.log(this.props.type)}
   { console.log(this.props.type2)}
          {this.props.type === 'Home' &&
          this.props.type2 !== 'ProductDetails' ? (
            <View
              style={[styles.container, { width,
              // height: this.props.news === true ? height * 0.246 : Platform.OS === 'ios' ? height * 0.260 : height * 0.266,
              height: 200,
              backgroundColor: 'transparent' }]}
            >
                {/* Render screens */}
                {this.renderScrollView(children)}
                {/* Render pagination */}
                {this.renderPagination()}
                {/* Render Continue or Done button */}
                {this.renderButton(this.props.navigation)}
              </View>
            ) : this.props.type2 === 'ProductDetails' ? (
              <View style={[styles.container, styles.fullScreen3]}>
                {/* Render screens */}
                {this.renderScrollView(children)}
                {/* Render pagination */}
                {this.renderPagination()}
                {/* Render Continue or Done button */}
                {this.renderButton(this.props.navigation)}
              </View>
            ) : (
            // IntroScreen
              <View style={[styles.container, styles.fullScreen2]}>
                {/* Render screens */}
                {this.renderScrollView(children)}
                {/* Render pagination */}
                {this.renderPagination()}
                {/* Render Continue or Done button */}
                {this.renderButton(this.props.navigation)}
              </View>
            )}
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  // Set width and height to the screen size
  fullScreen2: {
    width,
    height
  },
  // fullScreen: {
  //   width,
  //   height: height * 0.246,
  //   // height: 208,
  //   backgroundColor: 'transparent',
  // },
  fullScreen3: {
    width,
     height: Platform.OS === 'ios' ? themeStyle.singleRowCardWidth + 240 : themeStyle.singleRowCardWidth + 240,
    backgroundColor: 'transparent'
  },
  // Main container
  container: {
    backgroundColor: 'transparent',
    position: 'relative'
  },
  // Slide
  slide: {
    backgroundColor: 'transparent',
    // width: width - 1,
    // height: 208,
  },
  // Pagination indicators
  pagination: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  paginationHome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#000'
  },
  // Pagination dot
  dotHome: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  // Pagination dot
  dot: {
    backgroundColor: 'rgba(0,0,0,.25)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3
  },
  // Active dot
  activeDot: {
    backgroundColor: themeStyle.otherBtnsColor
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 45,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1
  }
});
